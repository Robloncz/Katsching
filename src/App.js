import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import logo from './alt.png';
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Button,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import Popup from './ui/Popup';
import KatschingPopup from './ui/KatschingPopup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataStore } from 'aws-amplify/datastore';
import { Player, HistoryEntry } from './models'; 
import { getCurrentUser } from 'aws-amplify/auth';

function App({ signOut }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false); // Lock UI during operations
  const [showCopyNotification, setShowCopyNotification] = useState(false); // State for copy notification

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      return { username, userId, signInDetails };
    } catch (err) {
      console.error("Error fetching current authenticated user:", err);
      return null;
    }
  }

  const fetchAllData = useCallback(async () => {
    try {
      const playersData = await DataStore.query(Player);
      setPlayers(sortPlayersByKatschings(playersData));

      const historyData = await DataStore.query(HistoryEntry);
      setHistory(sortHistoryByTime(historyData));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, []);

  useEffect(() => {
    const syncData = async () => {
      try {
        if (!DataStore.isStarted) {
          await DataStore.start();
        }

        let retries = 10;
        while (!DataStore.isStarted && retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          retries--;
        }

        if (!DataStore.isStarted) {
          console.error("DataStore failed to start after multiple retries.");
          return;
        }

        await fetchAllData();  
      } catch (err) {
        console.error("Error during DataStore synchronization:", err);
        setLoading(false);
      }
    };
  
    const checkAdmin = async () => {
      try {
        const user = await currentAuthenticatedUser();
        if (user && user.username === 'rene271') { 
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
      }
    };
  
    syncData();
    checkAdmin();
  }, [fetchAllData]);

  const sortPlayersByKatschings = (players) => {
    const sortedPlayers = [...players].sort((a, b) => b.katschings - a.katschings);
    return sortedPlayers;
  };

  const sortHistoryByTime = (history) => {
    const sortedHistory = [...history].sort((a, b) => new Date(b.time) - new Date(a.time));
    return sortedHistory;
  };

  const togglePopup = () => {
    if (!isOperationInProgress) {
      setIsPopupVisible(prev => !prev);
    }
  };

  const toggleKatschingPopup = (player) => {
    if (!isOperationInProgress) {
      setSelectedPlayer(player);
      setIsKatschingPopupVisible(prev => !prev);
    }
  };
  
  const addPlayer = async (name, emoji, katschings, comment) => {
    const fullName = `${name} ${emoji}`;
    const katschingText = katschings === 1 ? 'Katsching' : 'Katschings';

    const newPlayer = new Player({
      name: fullName,
      emoji,
      katschings,
      lastKatsching: new Date().toISOString(),
    });

    try {
      await DataStore.save(newPlayer);
      const updatedPlayers = sortPlayersByKatschings([...players, newPlayer]);
      setPlayers(updatedPlayers);

      const newHistoryEntry = new HistoryEntry({
        playerId: newPlayer.id,
        time: new Date().toISOString(),
        event: `${fullName} wurde als neuer Spieler hinzugefügt. ${katschings} ${katschingText}`,
        comments: comment,
      });

      await DataStore.save(newHistoryEntry);
      setHistory(prevHistory => sortHistoryByTime([newHistoryEntry, ...prevHistory]));

    } catch (err) {
      console.error("Error adding player:", err);
    }
  };

  const addKatschings = async (katschings, comment) => {
    if (!selectedPlayer || isOperationInProgress) {
      console.warn("No player selected for adding Katschings or operation already in progress.");
      return;
    }

    setIsOperationInProgress(true);
  
    try {
      const currentSelectedPlayer = players.find(player => player.id === selectedPlayer.id);
      const updatedPlayer = await DataStore.save(Player.copyOf(currentSelectedPlayer, item => {
        item.katschings += katschings;
        item.lastKatsching = new Date().toISOString();
      }));

      setPlayers(prevPlayers => {
        const newPlayersList = prevPlayers.map(player =>
          player.id === selectedPlayer.id ? updatedPlayer : player
        );
        return sortPlayersByKatschings(newPlayersList);
      });

      const newHistoryEntry = new HistoryEntry({
        playerId: updatedPlayer.id,
        time: new Date().toISOString(),
        event: `${katschings} ${katschings === 1 ? 'Katsching' : 'Katschings'} für ${updatedPlayer.name}`,
        comments: comment,
      });

      await DataStore.save(newHistoryEntry);
      setHistory(prevHistory => sortHistoryByTime([newHistoryEntry, ...prevHistory]));

      setIsKatschingPopupVisible(false);
      setSelectedPlayer(null);
  
    } catch (err) {
      console.error("Error occurred while adding Katschings:", err);
    } finally {
      setIsOperationInProgress(false);
    }
  };

  const deleteHistoryEntry = async (entryId) => {
    try {
      await DataStore.delete(HistoryEntry, entryId);
      setHistory(history.filter(entry => entry.id !== entryId));
    } catch (err) {
      console.error("Error deleting history entry:", err);
    }
  };

  const editKatschingScore = async (playerId, newScore) => {
    try {
      const player = players.find(p => p.id === playerId);
      const numericScore = parseInt(newScore, 10);
      
      if (isNaN(numericScore)) {
        console.error("Invalid score input");
        return;
      }

      const updatedPlayer = await DataStore.save(Player.copyOf(player, item => {
        item.katschings = numericScore;
        item.lastKatsching = new Date().toISOString();
      }));

      setPlayers(prevPlayers => {
        const newPlayersList = prevPlayers.map(p =>
          p.id === playerId ? updatedPlayer : p
        );
        return sortPlayersByKatschings(newPlayersList);
      });
    } catch (err) {
      console.error("Error editing Katsching score:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    return formattedDate;
  };

  const copyToClipboard = () => {
    const playersText = players.map(player => `${player.name}: ${player.katschings}`).join('\n');
    
    let lastHistoryText = 'No recent history';
    
    if (history.length > 0) {
      const lastHistory = history[0];
      lastHistoryText = `${new Date(lastHistory.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}: ${lastHistory.event} - Kommentar: *${lastHistory.comments}*`;
    }
  
    const clipboardText = `${playersText}\n\n${lastHistoryText}`;
    
    navigator.clipboard.writeText(clipboardText).then(() => {
      setShowCopyNotification(true); // Show notification
      setTimeout(() => setShowCopyNotification(false), 1500); // Hide after 1.5 seconds
    }).catch(err => {
      console.error("Failed to copy data to clipboard:", err);
    });
  };

  return (
    <View className="App">
      <div className="App-header">
        <h1 className="App-title">Katsching</h1>
        <Image src={logo} className="App-logo" alt="logo" />
      </div>
      <Card className="mainscreen-card">
        <Button className="update-button" onClick={fetchAllData}>🔄 Update</Button>
        <div className="table-container">
          {/* Katsching Table */}
          <TableContainer component={Paper}>
            <Table stickyHeader style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Irish Grover' }}>Spieler</TableCell>
                  <TableCell style={{width: "50%", fontFamily: 'Irish Grover' }}>Letzter Katsching</TableCell>
                  <TableCell style={{ fontFamily: 'Irish Grover' }}>Katschings</TableCell>
                  {isAdmin && <TableCell style={{ width: "10%", fontFamily: 'Irish Grover' }}>Aktionen</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontFamily: 'Montserrat' }}>{player.name}</TableCell>
                    <TableCell style={{ fontFamily: 'Montserrat' }}>
                      {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Montserrat' }}>
                      <div className="katsching-container">
                        <div className="katsching-counter">{player.katschings}</div>
                        <Button className="add-katsching-button" onClick={() => toggleKatschingPopup(player)}>+</Button>
                      </div>
                    </TableCell>
                    {isAdmin && (
                      <TableCell style={{ fontFamily: 'Montserrat' }}>
                        <Button onClick={() => editKatschingScore(player.id, prompt("New Katsching Score:", player.katschings))}>Edit</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <div className="add-player-button-container">
            {isAdmin && (
              <Button className="add-player-button" onClick={togglePopup}>Neuen Wicht hinzufügen</Button>
            )}
            <div className="copy-container">
              <Button className="copy-to-clipboard-button" onClick={copyToClipboard}>In Zwischenablage</Button>
              {showCopyNotification && (
                <div className="copy-notification">
                  In Zwischenablage kopiert!
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
  
      {/* History Table */}
      <Card className="history-table-container">
        <TableContainer component={Paper}>
          <Table stickyHeader style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "30%", fontFamily: 'Irish Grover' }}>Uhrzeit</TableCell>
                <TableCell style={{ width: "60%", fontFamily: 'Irish Grover' }}>Event</TableCell>
                <TableCell style={{ width: "40%", fontFamily: 'Irish Grover' }}>Kommentar</TableCell>
                {isAdmin && <TableCell style={{ width: "10%", fontFamily: 'Irish Grover' }}>Aktionen</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontFamily: 'Montserrat' }}>{formatDate(entry.time)}</TableCell>
                  <TableCell style={{ fontFamily: 'Montserrat' }}>{entry.event}</TableCell>
                  <TableCell style={{ fontFamily: 'Montserrat' }}>{entry.comments}</TableCell>
                  {isAdmin && (
                    <TableCell style={{ fontFamily: 'Montserrat' }}>
                      <Button onClick={() => deleteHistoryEntry(entry.id)}>Delete</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
  
      <Popup isVisible={isPopupVisible} togglePopup={togglePopup} addPlayer={addPlayer} />
      {selectedPlayer && (
        <KatschingPopup
          isVisible={isKatschingPopupVisible}
          togglePopup={toggleKatschingPopup}
          addKatschings={addKatschings}
        />
      )}
      <div className="sign-out-button-container">
        <Button className="sign-out-button" onClick={signOut}>Abmelden</Button>
      </div>
    </View>
  );
}  
export default withAuthenticator(App);
