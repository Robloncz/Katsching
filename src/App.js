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

  async function currentAuthenticatedUser() {
    console.log("Fetching current authenticated user...");
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`User authenticated: username=${username}, userId=${userId}, signInDetails=${signInDetails}`);
      return { username, userId, signInDetails };
    } catch (err) {
      console.error("Error fetching current authenticated user:", err);
      return null;
    }
  }

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch players and history after DataStore has started
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
          console.log("Starting DataStore...");
          await DataStore.start();
        }

        // Polling to wait for DataStore to start (max 10 seconds)
        let retries = 10;
        while (!DataStore.isStarted && retries > 0) {
          console.log(`Waiting for DataStore to start. Retries left: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
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
      console.log("Checking if user is admin...");
      try {
        const user = await currentAuthenticatedUser();
        if (user && user.username === 'rene271') { 
          console.log("User is admin.");
          setIsAdmin(true);
        } else {
          console.log("User is not admin.");
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
      }
    };
  
    syncData();
    checkAdmin();
  }, [fetchAllData]);

  const sortPlayersByKatschings = (players) => {
    console.log("Sorting players by Katschings...");
    const sortedPlayers = [...players].sort((a, b) => b.katschings - a.katschings);
    console.table(sortedPlayers);
    return sortedPlayers;
  };

  const sortHistoryByTime = (history) => {
    console.log("Sorting history entries by time...");
    const sortedHistory = [...history].sort((a, b) => new Date(b.time) - new Date(a.time));
    console.table(sortedHistory);
    return sortedHistory;
  };

  const togglePopup = () => {
    console.log("Toggling popup visibility...");
    setIsPopupVisible(prev => !prev);
  };

  const toggleKatschingPopup = (player) => {
    console.log("Toggling Katsching popup visibility for player:", player);
    setSelectedPlayer(player);
    setIsKatschingPopupVisible(prev => !prev);
  };

  const addPlayer = async (name, emoji, katschings, comment) => {
    console.log(`Adding new player: name=${name}, emoji=${emoji}, katschings=${katschings}, comment=${comment}`);
    const fullName = `${name} ${emoji}`;
    const katschingText = katschings === 1 ? 'Katsching' : 'Katschings';

    const newPlayer = new Player({
      name: fullName,
      emoji,
      katschings,
      lastKatsching: new Date().toISOString(),
    });

    try {
      console.log("Saving new player to DataStore...");
      await DataStore.save(newPlayer);
      const updatedPlayers = sortPlayersByKatschings([...players, newPlayer]);
      setPlayers(updatedPlayers);

      const newHistoryEntry = new HistoryEntry({
        playerId: newPlayer.id,
        time: new Date().toISOString(),
        event: `${fullName} wurde als neuer Spieler hinzugefügt. ${katschings} ${katschingText}`,
        comments: comment,
      });

      console.log("Saving new history entry to DataStore...");
      await DataStore.save(newHistoryEntry);
      setHistory(prevHistory => sortHistoryByTime([newHistoryEntry, ...prevHistory]));

      console.log("Player added successfully.");
    } catch (err) {
      console.error("Error adding player:", err);
    }
  };

  const addKatschings = async (katschings, comment) => {
    if (!selectedPlayer) {
      console.warn("No player selected for adding Katschings.");
      return;
    }

    console.log(`Adding ${katschings} Katschings to player: ${selectedPlayer.name}, comment=${comment}`);
    try {
      const updatedPlayer = await DataStore.save(Player.copyOf(selectedPlayer, item => {
        item.katschings += katschings;
        item.lastKatsching = new Date().toISOString();
      }));
      console.log("Player updated:", updatedPlayer);

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

      console.log("Saving new history entry for Katschings...");
      await DataStore.save(newHistoryEntry);
      setHistory(prevHistory => sortHistoryByTime([newHistoryEntry, ...prevHistory]));

      console.log("Katschings added successfully.");
      setIsKatschingPopupVisible(false);
      setSelectedPlayer(null);

    } catch (err) {
      console.error("Error occurred while adding Katschings:", err);
    }
  };

  const formatDate = (dateString) => {
    console.log("Formatting date:", dateString);
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    console.log("Formatted date:", formattedDate);
    return formattedDate;
  };

  const copyToClipboard = () => {
    console.log("Copying data to clipboard...");
    const playersText = players.map(player => `${player.name}: ${player.katschings}`).join('\n');
    const lastHistory = history[0];
    const lastHistoryText = `${new Date(lastHistory.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}: ${lastHistory.event} - Kommentar: *${lastHistory.comments}*`;
    const clipboardText = `${playersText}\n\n${lastHistoryText}`;
    
    navigator.clipboard.writeText(clipboardText).then(() => {
      console.log("Data copied to clipboard successfully.");
      alert('Copied to clipboard!');
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
                  <TableCell style={{ width: "40%", fontFamily: 'Irish Grover' }}>Spieler</TableCell>
                  <TableCell style={{ width: "30%", fontFamily: 'Irish Grover' }}>Letzter Katsching</TableCell>
                  <TableCell style={{ width: "30%", fontFamily: 'Irish Grover' }}>Katschings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontFamily: 'Irish Grover' }}>{player.name}</TableCell>
                    <TableCell style={{ fontFamily: 'Irish Grover' }}>
                      {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
                    </TableCell>
                    <TableCell style={{ fontFamily: 'Irish Grover' }}>
                      <div className="katsching-container">
                        <div className="katsching-counter">{player.katschings}</div>
                        <Button className="add-katsching-button" onClick={() => toggleKatschingPopup(player)}>+</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <div className="add-player-button-container">
            {isAdmin && (
              <Button className="add-player-button" onClick={togglePopup}>Neuen Wicht hinzufügen</Button>
            )}
            <Button className="copy-to-clipboard-button" onClick={copyToClipboard}>In Zwischenablage</Button>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontFamily: 'Irish Grover' }}>{formatDate(entry.time)}</TableCell>
                  <TableCell style={{ fontFamily: 'Irish Grover' }}>{entry.event}</TableCell>
                  <TableCell style={{ fontFamily: 'Irish Grover' }}>{entry.comments}</TableCell>
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
        <Button className="sign-out-button" onClick={signOut}>Sign Out</Button>
      </div>
    </View>
  );
}  
// be proud bro... it works.
export default withAuthenticator(App);
