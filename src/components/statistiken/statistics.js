import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataStore } from 'aws-amplify/datastore';
import { HistoryEntry, Player } from '../../models';
import './statistics.css';
import { useMediaQuery } from 'react-responsive';

const Statistics = () => {
  const [chartData, setChartData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hiddenPlayers, setHiddenPlayers] = useState(new Set());
  const [allHidden, setAllHidden] = useState(false);
  const [chartHeight, setChartHeight] = useState(60);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVeryNarrow = useMediaQuery({ maxWidth: 576 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const historyEntries = await DataStore.query(HistoryEntry);
        const playersData = await DataStore.query(Player);
        setPlayers(playersData);

        const playerKatschings = {};
        const allWeeks = new Set();
        const playerFirstAppearance = {};

        // Initialize playerKatschings and playerFirstAppearance
        playersData.forEach(player => {
          playerKatschings[player.name] = { 
            history: {}
          };
          playerFirstAppearance[player.name] = null;
        });

        // Sort history entries by time in ascending order (oldest first)
        const sortedEntries = historyEntries.sort((a, b) => new Date(a.time) - new Date(b.time));

        sortedEntries.forEach(entry => {
          const date = new Date(entry.time);
          const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
          const formattedWeek = weekStart.toISOString().split('T')[0];
          allWeeks.add(formattedWeek);

          const processEntry = (playerName, katschingCount) => {
            if (playerName && !isNaN(katschingCount)) {
              if (!playerKatschings[playerName]) {
                playerKatschings[playerName] = { history: {} };
              }
              if (!playerKatschings[playerName].history[formattedWeek]) {
                playerKatschings[playerName].history[formattedWeek] = 0;
              }
              playerKatschings[playerName].history[formattedWeek] += katschingCount;

              // Update first appearance if not set
              if (!playerFirstAppearance[playerName]) {
                playerFirstAppearance[playerName] = formattedWeek;
              }
            }
          };

          // Process history entries
          if (entry.event.includes('wurde als neuer Spieler hinzugefügt')) {
            const match = entry.event.match(/^(.+) wurde als neuer Spieler hinzugefügt\. (\d+) Katsching(?:s)?/);
            if (match) {
              processEntry(match[1], parseInt(match[2]));
            }
          } else if (entry.event.includes('Katsching')) {
            const matches = entry.event.matchAll(/(\d+) Katsching(?:s)? für (.+?)(?=\.\s\d+|$)/g);
            for (const match of matches) {
              processEntry(match[2].trim(), parseInt(match[1]));
            }
          }
        });

        const sortedWeeks = Array.from(allWeeks).sort();

        const filledData = Object.entries(playerKatschings).map(([playerName, data]) => {
          let runningTotal = 0;
          const firstWeek = playerFirstAppearance[playerName];
          const firstWeekIndex = sortedWeeks.indexOf(firstWeek);

          const filledDataPoints = sortedWeeks.map((week, index) => {
            if (index < firstWeekIndex) {
              // Before first appearance, use the initial value
              return { week, totalKatschings: Object.values(data.history)[0] || 0 };
            } else {
              if (data.history[week] !== undefined) {
                runningTotal += data.history[week];
              }
              return { week, totalKatschings: runningTotal };
            }
          });

          return { playerName, data: filledDataPoints };
        });

        setChartData(filledData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sort chartData by total Katschings in descending order
  const sortedChartData = [...chartData].sort((a, b) => {
    const lastIndexA = a.data.length - 1;
    const lastIndexB = b.data.length - 1;
    return b.data[lastIndexB].totalKatschings - a.data[lastIndexA].totalKatschings;
  });

  const togglePlayerVisibility = (playerName) => {
    setHiddenPlayers(prevHiddenPlayers => {
      const newHiddenPlayers = new Set(prevHiddenPlayers);
      if (newHiddenPlayers.has(playerName)) {
        newHiddenPlayers.delete(playerName);
      } else {
        newHiddenPlayers.add(playerName);
      }
      return newHiddenPlayers;
    });
  };

  const toggleAllPlayers = () => {
    if (allHidden) {
      setHiddenPlayers(new Set());
    } else {
      setHiddenPlayers(new Set(sortedChartData.map(player => player.playerName)));
    }
    setAllHidden(!allHidden);
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div>
        <button onClick={toggleAllPlayers} className="toggle-all-button">
          {allHidden ? 'Alle einblenden' : 'Alle ausblenden'}
        </button>
        <ul className="custom-legend">
          {payload.map((entry, index) => (
            <li
              key={`item-${index}`}
              className={`legend-item ${hiddenPlayers.has(entry.value) ? 'hidden' : ''}`}
              onClick={() => togglePlayerVisibility(entry.value)}
            >
              <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
              <span className="legend-text">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleDotMouseEnter = (data, playerName, color) => {
    setActiveTooltip({
      week: data.payload.week,
      playerName: playerName,
      value: data.payload.totalKatschings,
      color: color
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Sort the payload by value in descending order
      const sortedPayload = payload
        .filter(entry => !hiddenPlayers.has(entry.name))
        .sort((a, b) => b.value - a.value);

      return (
        <div className="custom-tooltip">
          <p className="label">{`Woche: ${label}`}</p>
          {sortedPayload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  //console.log('Rendering chart with data:', chartData);

  if (chartData.length === 0) {
    return <div className="statistics-container"><h1>No data available for the chart</h1></div>;
  }

  // Function to reduce data points for smaller screens
  const getAdjustedChartData = () => {
    if (isVeryNarrow) {
      // Show only every 4th data point on very narrow screens
      return sortedChartData.map(player => ({
        ...player,
        data: player.data.filter((_, index) => index % 4 === 0)
      }));
    } else if (isMobile) {
      // Show only every 2nd data point on mobile screens
      return sortedChartData.map(player => ({
        ...player,
        data: player.data.filter((_, index) => index % 2 === 0)
      }));
    }
    return sortedChartData;
  };

  const handleChartResize = (event) => {
    setChartHeight(event.target.value);
  };

  return (
    <div className="statistics-container" style={{ height: `${chartHeight + 30}vh` }}>
      <h1>Katschingistik</h1>
      {isMobile && (
        <div className="chart-resize-control">
          <input
            type="range"
            min="30"
            max="90"
            value={chartHeight}
            onChange={handleChartResize}
            className="chart-resize-slider"
          />
        </div>
      )}
      <div className="chart-container" style={{ height: `${chartHeight}vh` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              type="category"
              allowDuplicatedCategory={false}
              label={{ value: 'Woche', position: 'insideBottom', offset: -10 }}
              tick={isMobile ? { fontSize: 10, angle: -45, textAnchor: 'end' } : {}}
              height={isMobile ? 60 : 30}
              interval={isMobile ? 'preserveStartEnd' : 0}
            />
            <YAxis label={{ value: 'Total Katschings', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {sortedChartData.map((player, index) => (
              <Line
                key={player.playerName}
                data={player.data}
                type="monotone"
                dataKey="totalKatschings"
                name={player.playerName}
                stroke={colors[index % colors.length]}
                strokeOpacity={hiddenPlayers.has(player.playerName) ? 0.2 : 1}
                hide={hiddenPlayers.has(player.playerName)}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
