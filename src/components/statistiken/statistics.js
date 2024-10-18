import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataStore } from 'aws-amplify/datastore';
import { HistoryEntry, Player } from '../../models';
import './statistics.css';

const Statistics = () => {
  const [chartData, setChartData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hiddenPlayers, setHiddenPlayers] = useState(new Set());
  const [allHidden, setAllHidden] = useState(false);

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

        // Initialize playerKatschings
        playersData.forEach(player => {
          playerKatschings[player.name] = { 
            history: {}
          };
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
            }
          };

          // Process history entries
          if (entry.event.includes('wurde als neuer Spieler hinzugefügt')) {
            const match = entry.event.match(/^(.+) wurde als neuer Spieler hinzugefügt\. (\d+) Katsching(?:s)?/);
            if (match) {
              processEntry(match[1], parseInt(match[2]));
            }
          } else if (entry.event.includes('Katsching')) {
            // Updated regex to handle multiple Katschings and plural form
            const matches = entry.event.matchAll(/(\d+) Katsching(?:s)? für (.+?)(?=\.\s\d+|$)/g);
            for (const match of matches) {
              processEntry(match[2].trim(), parseInt(match[1]));
            }
          }
        });

        const sortedWeeks = Array.from(allWeeks).sort();

        const filledData = Object.entries(playerKatschings).map(([playerName, data]) => {
          let runningTotal = 0;
          const filledDataPoints = sortedWeeks.map(week => {
            if (data.history[week] !== undefined) {
              runningTotal += data.history[week];
            }
            return { week, totalKatschings: runningTotal };
          });

          return { playerName, data: filledDataPoints };
        });

        setChartData(filledData);

        // Clustered console logs
    //     console.log('History Entries:', historyEntries);
    //     console.log('Players Data:', playersData);
    //     console.log('Player Katschings:', playerKatschings);
    //     console.log('Filled Data:', filledData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
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

  const CustomTooltip = () => {
    if (activeTooltip) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Woche: ${activeTooltip.week}`}</p>
          <p style={{ color: activeTooltip.color }}>
            {`${activeTooltip.playerName}: ${activeTooltip.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  //console.log('Rendering chart with data:', chartData);

  if (chartData.length === 0) {
    return <div className="statistics-container"><h1>No data available for the chart</h1></div>;
  }

  return (
    <div className="statistics-container">
      <h1>Katschingistik</h1>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              type="category"
              allowDuplicatedCategory={false}
              label={{ value: 'Woche', position: 'insideBottom', offset: -10 }}
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
                activeDot={{
                  onMouseEnter: (e, payload) => handleDotMouseEnter(payload, player.playerName, colors[index % colors.length]),
                  onMouseLeave: handleMouseLeave,
                  r: 8
                }}
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
