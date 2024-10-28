import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DataStore } from 'aws-amplify/datastore';
import { HistoryEntry, Player } from '../../models';
import './statistics.css';
import { useMediaQuery } from 'react-responsive';

const calculateRecentWinner = async () => {
  console.log('Starting calculateRecentWinner');  // Debug log
  try {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Query all history entries from the last 14 days
    const recentEntries = await DataStore.query(
      HistoryEntry,
      entry => entry.time.ge(twoWeeksAgo.toISOString())
    );

    console.log('Recent entries:', recentEntries.length);
    console.log('Two weeks ago:', twoWeeksAgo.toISOString());

    // Create a map to count Katschings per player
    const playerKatschings = new Map();

    recentEntries.forEach(entry => {
      console.log('Processing entry:', entry.event);
      
      // Process new player entries
      if (entry.event.includes('wurde als neuer Spieler hinzugefügt')) {
        const match = entry.event.match(/^(.+?) wurde als neuer Spieler hinzugefügt\. (\d+) Katsching(?:s)?/);
        if (match) {
          const [_, playerName, amount] = match;
          const cleanName = playerName.trim();
          console.log('New player:', cleanName, 'amount:', amount);
          playerKatschings.set(cleanName, (playerKatschings.get(cleanName) || 0) + parseInt(amount));
        }
      }
      // Process direct katsching assignments
      else if (entry.event.includes('Katsching für')) {
        const matches = Array.from(entry.event.matchAll(/(\d+) Katsching(?:s)? für (.+?)(?=\.\s|$)/g));
        matches.forEach(match => {
          const [_, amount, playerName] = match;
          const cleanName = playerName.trim();
          console.log('Direct assignment:', cleanName, 'amount:', amount);
          playerKatschings.set(cleanName, (playerKatschings.get(cleanName) || 0) + parseInt(amount));
        });
      }
      // Process katsching transfers between players
      else if (entry.event.includes('gab')) {
        const match = entry.event.match(/^(.+?) gab (\d+) Katsching(?:s)? an (.+?)(?=\s|$)/);
        if (match) {
          const [_, fromPlayer, amount, toPlayer] = match;
          const cleanToPlayer = toPlayer.trim();
          console.log('Transfer:', fromPlayer, 'to', cleanToPlayer, 'amount:', amount);
          playerKatschings.set(cleanToPlayer, (playerKatschings.get(cleanToPlayer) || 0) + parseInt(amount));
        }
      }
    });

    console.log('Final player Katschings:', Object.fromEntries(playerKatschings));

    // Find the player with the most Katschings
    let maxKatschings = 0;
    let winner = '';
    
    playerKatschings.forEach((katschings, player) => {
      if (katschings > maxKatschings) {
        maxKatschings = katschings;
        winner = player;
      }
    });

    console.log('Winner:', winner, 'with', maxKatschings, 'Katschings');
    return { name: winner, value: maxKatschings };
  } catch (error) {
    console.error('Error calculating recent winner:', error);
    return { name: 'Error', value: 0 };
  }
};

const Statistics = () => {
  const [chartData, setChartData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hiddenPlayers, setHiddenPlayers] = useState(new Set());
  const [allHidden, setAllHidden] = useState(false);
  const [chartHeight, setChartHeight] = useState(40); // Set a default height of 40vh
  const [yAxisDomain, setYAxisDomain] = useState([50, 'auto']);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isVeryNarrow = useMediaQuery({ maxWidth: 576 });
  const [stats, setStats] = useState({
    katschingKing: { name: '', value: 0 },
    recentWinner: { name: '', value: 0 },
    totalKatschings: 0,
    averageKatschings: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const historyEntries = await DataStore.query(HistoryEntry);
        const playersData = await DataStore.query(Player);
        setPlayers(playersData);

        // Create a map of player names to their full names with emojis
        const playerNameMap = new Map(
          playersData.map(player => [
            player.name.trim(),
            `${player.name.trim()}${player.emoji ? ' ' + player.emoji : ''}`
          ])
        );

        // Initialize data structures
        const playerKatschings = {};
        const allDates = new Set();
        const playerFirstAppearance = {};

        // Sort entries chronologically first
        const sortedEntries = historyEntries.sort((a, b) => new Date(a.time) - new Date(b.time));

        // Process entries
        sortedEntries.forEach(entry => {
          const date = new Date(entry.time);
          const formattedDate = date.toISOString().split('T')[0];
          allDates.add(formattedDate);

          // Helper function to process player entries
          const processPlayer = (name, katschings) => {
            const cleanName = name.trim();
            const fullName = playerNameMap.get(cleanName) || cleanName;

            if (!playerKatschings[fullName]) {
              playerKatschings[fullName] = { history: {} };
              playerFirstAppearance[fullName] = formattedDate;
            }

            playerKatschings[fullName].history[formattedDate] = 
              (playerKatschings[fullName].history[formattedDate] || 0) + katschings;
          };

          // Process new player entries
          if (entry.event.includes('wurde als neuer Spieler hinzugefügt')) {
            const match = entry.event.match(/^(.+?) wurde als neuer Spieler hinzugefügt\. (\d+) Katsching(?:s)?/);
            if (match) {
              processPlayer(match[1], parseInt(match[2]));
            }
          }
          // Process direct katsching assignments
          else if (entry.event.includes('Katsching für')) {
            const matches = Array.from(entry.event.matchAll(/(\d+) Katsching(?:s)? für (.+?)(?=\.\s|$)/g));
            matches.forEach(match => {
              processPlayer(match[2], parseInt(match[1]));
            });
          }
          // Process katsching transfers between players
          else if (entry.event.includes('gab')) {
            const match = entry.event.match(/^(.+?) gab (\d+) Katsching(?:s)? an (.+?)(?=\s|$)/);
            if (match) {
              const [_, fromPlayer, amount, toPlayer] = match;
              processPlayer(toPlayer, parseInt(amount));
            }
          }
        });

        // Create chronological data points
        const sortedDates = Array.from(allDates).sort();
        const filledData = Object.entries(playerKatschings).map(([playerName, data]) => {
          let runningTotal = 0;
          const dataPoints = sortedDates.map(date => {
            runningTotal += data.history[date] || 0;
            return { date, totalKatschings: runningTotal };
          });

          return { 
            playerName,
            data: dataPoints
          };
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

  // Add this useEffect specifically for the recent winner calculation
  useEffect(() => {
    const fetchRecentWinner = async () => {
      console.log('Fetching recent winner...');
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      try {
        const recentEntries = await DataStore.query(
          HistoryEntry,
          entry => entry.time.ge(twoWeeksAgo.toISOString())
        );

        console.log('Found recent entries:', recentEntries.length);
        
        // Count entries per player
        const playerCounts = new Map();
        
        recentEntries.forEach(entry => {
          const playerId = entry.playerId;
          playerCounts.set(playerId, (playerCounts.get(playerId) || 0) + 1);
        });

        console.log('Player counts:', Object.fromEntries(playerCounts));

        // Find player with most entries
        let maxEntries = 0;
        let winnerId = '';
        
        playerCounts.forEach((count, playerId) => {
          if (count > maxEntries) {
            maxEntries = count;
            winnerId = playerId;
          }
        });

        // Get player name from players state
        const winnerPlayer = players.find(p => p.id === winnerId);
        const winnerName = winnerPlayer ? winnerPlayer.name : 'Unknown';

        setStats(prevStats => ({
          ...prevStats,
          recentWinner: { name: winnerName, value: maxEntries }
        }));

      } catch (error) {
        console.error('Error fetching recent winner:', error);
      }
    };

    fetchRecentWinner();
  }, [players]); // Depend on players state to ensure we have the player data

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sort chartData by total Katschings in descending order
  const sortedChartData = [...chartData].sort((a, b) => {
    const lastIndexA = a.data.length - 1;
    const lastIndexB = b.data.length - 1;
    return b.data[lastIndexB].totalKatschings - a.data[lastIndexA].totalKatschings;
  });

  const calculateYAxisDomain = (data, hiddenPlayers) => {
    let min = Infinity;
    let max = -Infinity;

    data.forEach(player => {
      if (!hiddenPlayers.has(player.playerName)) {
        player.data.forEach(point => {
          if (point.totalKatschings < min) min = point.totalKatschings;
          if (point.totalKatschings > max) max = point.totalKatschings;
        });
      }
    });

    // If all players are hidden, return default domain
    if (min === Infinity || max === -Infinity) {
      return [0, 'auto'];
    }

    // Calculate nice round numbers for the domain
    const range = max - min;
    const step = Math.pow(10, Math.floor(Math.log10(range)));
    const lowerBound = Math.floor(min / step) * step;
    const upperBound = Math.ceil(max / step) * step;

    return [lowerBound, upperBound];
  };

  const togglePlayerVisibility = (playerName) => {
    setHiddenPlayers(prevHiddenPlayers => {
      const newHiddenPlayers = new Set(prevHiddenPlayers);
      if (newHiddenPlayers.has(playerName)) {
        newHiddenPlayers.delete(playerName);
      } else {
        newHiddenPlayers.add(playerName);
      }
      // Calculate new Y-axis domain after toggling player visibility
      setYAxisDomain(calculateYAxisDomain(sortedChartData, newHiddenPlayers));
      return newHiddenPlayers;
    });
  };

  const toggleAllPlayers = () => {
    if (allHidden) {
      setHiddenPlayers(new Set());
      setYAxisDomain(calculateYAxisDomain(sortedChartData, new Set()));
    } else {
      const allPlayers = new Set(sortedChartData.map(player => player.playerName));
      setHiddenPlayers(allPlayers);
      setYAxisDomain([0, 'auto']); // Reset to default when all players are hidden
    }
    setAllHidden(!allHidden);
  };

  const CustomLegend = ({ payload }) => {
    
    // Remove duplicates from payload based on value
    const uniquePayload = payload.reduce((acc, current) => {
      const isDuplicate = acc.find(item => item.value === current.value);
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

    return (
      <div>
        <button onClick={toggleAllPlayers} className="toggle-all-button">
          {allHidden ? 'Alle einblenden' : 'Alle ausblenden'}
        </button>
        <ul className="custom-legend">
          {uniquePayload.map((entry, index) => {
            // Use the entry value directly since it already contains the emoji
            const displayName = entry.value;
            

            return (
              <li
                key={`item-${index}`}
                className={`legend-item ${hiddenPlayers.has(entry.value) ? 'hidden' : ''}`}
                onClick={() => togglePlayerVisibility(entry.value)}
              >
                <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
                <span className="legend-text">{displayName}</span>
              </li>
            );
          })}
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

  // Update the CustomTooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Sort the payload by value in descending order and limit to 8 entries
      const sortedPayload = payload
        .filter(entry => !hiddenPlayers.has(entry.name))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8); // Limit to 8 entries

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

  // Add this function after your existing useEffect
  const calculateStats = (chartData) => {
    if (!chartData.length) return;

    // Find player with highest total
    const katschingKing = chartData.reduce((max, player) => {
      const lastValue = player.data[player.data.length - 1]?.totalKatschings || 0;
      return lastValue > max.value ? { name: player.playerName, value: lastValue } : max;
    }, { name: '', value: 0 });

    // Calculate total Katschings
    const totalKatschings = chartData.reduce((sum, player) => {
      return sum + (player.data[player.data.length - 1]?.totalKatschings || 0);
    }, 0);

    // Calculate average
    const averageKatschings = Math.round(totalKatschings / chartData.length);

    // Calculate 14-day winner
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const recentWinner = chartData.reduce((max, player) => {
      const recentPoints = player.data
        .filter(entry => new Date(entry.date) >= twoWeeksAgo)
        .reduce((sum, entry) => sum + (entry.totalKatschings || 0), 0);
      
      return recentPoints > max.value ? { name: player.playerName, value: recentPoints } : max;
    }, { name: '', value: 0 });

    setStats({
      katschingKing,
      recentWinner,
      totalKatschings,
      averageKatschings
    });
  };

  // Add this to your existing useEffect after setChartData
  useEffect(() => {
    if (chartData.length) {
      calculateStats(chartData);
    }
  }, [chartData]);

  // Add this before the return statement
  const preparePieChartData = () => {
    if (!chartData.length) return [];

    const sortedData = [...chartData]
      .sort((a, b) => {
        const valueA = a.data[a.data.length - 1]?.totalKatschings || 0;
        const valueB = b.data[b.data.length - 1]?.totalKatschings || 0;
        return valueB - valueA;
      });

    const top7 = sortedData.slice(0, 7);
    const others = sortedData.slice(7).reduce((sum, player) => {
      return sum + (player.data[player.data.length - 1]?.totalKatschings || 0);
    }, 0);

    const pieData = top7.map(player => ({
      name: player.playerName,
      value: player.data[player.data.length - 1]?.totalKatschings || 0
    }));

    if (others > 0) {
      pieData.push({ name: 'Andere', value: others });
    }

    return pieData;
  };


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
    <div className="statistics-container">
      <h1>Katschingistik</h1>
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
      
      {/* Main Line Chart */}
      <div className="chart-container" style={{ height: `${chartHeight}vh`, minHeight: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              type="category"
              allowDuplicatedCategory={false}
              label={{ value: 'Datum', position: 'insideBottom', offset: -10 }}
              tick={isMobile ? { fontSize: 10, angle: -45, textAnchor: 'end' } : {}}
              height={isMobile ? 60 : 30}
              interval={isMobile ? 'preserveStartEnd' : 0}
            />
            <YAxis 
              label={{ value: 'Total Katschings', angle: -90, position: 'insideLeft' }} 
              domain={yAxisDomain}
              allowDataOverflow={true}
              scale="linear"
              type="number"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {getAdjustedChartData().map((player, index) => (
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
                legendType="none"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={preparePieChartData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                // Make the outer radius smaller
                outerRadius={({width, height}) => Math.min(width, height) * 0.22}
                label={({ name, percent }) => {
                  // Truncate name if it's too long
                  const shortName = name.length > 10 ? name.substring(0, 10) + '...' : name;
                  return `${shortName} ${(percent * 100).toFixed(0)}%`;
                }}
                labelLine={{ 
                  stroke: '#999999', 
                  strokeWidth: 1,
                  strokeOpacity: 0.5,
                }}
                isAnimationActive={false}
              >
                {preparePieChartData().map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]}
                    style={{ cursor: 'default' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} Katschings`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="interesting-stats">
          <div className="stat-card">
            <div className="stat-title">Katsching König</div>
            <div className="stat-value">{stats.katschingKing.name} ({stats.katschingKing.value} 💸)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">14-Tage-Sieger</div>
            <div className="stat-value">{stats.recentWinner.name} ({stats.recentWinner.value} 💸)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Gesamte Katschings</div>
            <div className="stat-value">{stats.totalKatschings}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Durchschnittliche Punktzahl</div>
            <div className="stat-value">{stats.averageKatschings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
