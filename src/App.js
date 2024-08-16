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
import { Player, HistoryEntry } from './models'; // Adjust according to your DataStore models
import { getCurrentUser } from 'aws-amplify/auth';


function App({ signOut }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      return { username, userId, signInDetails };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  const fetchAllData = useCallback(async () => {
    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
      try {
        if (DataStore.isStarted) {
          const playersData = await DataStore.query(Player);
          setPlayers(sortPlayersByKatschings(playersData));
      
          const historyData = await DataStore.query(HistoryEntry);
          setHistory(sortHistoryByTime(historyData));
          return; // Exit the loop on success
        }
      } catch (err) {
        console.error('Error fetching data, retrying:', err);
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }

    console.error('Failed to fetch data after multiple retries');
  }, []);

  useEffect(() => {
    const syncData = async () => {
      try {
        // Ensure DataStore is stopped and cleared
        await DataStore.stop(); // Ensure DataStore is stopped before clearing
        await DataStore.clear(); // Clear DataStore state
        await DataStore.start(); // Start DataStore
        
        await fetchAllData();  
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error syncing DataStore:', err);
        setLoading(false); // Handle loading state in case of an error
      }
    };
  
    const checkAdmin = async () => {
      try {
        const user = await currentAuthenticatedUser();
        if (user && user.username === 'rene271') { 
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };
  
    syncData();
    checkAdmin();
  }, [fetchAllData]);
  


  const sortPlayersByKatschings = (players) => {
    return [...players].sort((a, b) => b.katschings - a.katschings);
  };

  const sortHistoryByTime = (history) => {
    return [...history].sort((a, b) => new Date(b.time) - new Date(a.time));
  };

  const togglePopup = () => {
    setIsPopupVisible(prev => !prev);
  };

  const toggleKatschingPopup = (player) => {
    setSelectedPlayer(player);
    setIsKatschingPopupVisible(prev => !prev);
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
      setHistory(prevHistory => sortHistoryByTime([newHistoryEntry, ...prevHistory])); // Sort history after adding

    } catch (err) {
      console.error('Error adding player:', err);
    }
  };

  const addKatschings = async (katschings, comment) => {
    if (!selectedPlayer) {
        console.warn('No player selected for adding Katschings.');
        return;
    }

    console.log(`Attempting to add ${katschings} Katsching(s) to player: ${selectedPlayer.name} (ID: ${selectedPlayer.id})`);
    
    try {
        // Log the current state before updating
        console.log('Current state of selectedPlayer before update:', selectedPlayer);

        // Update player Katschings
        const updatedPlayer = await DataStore.save(Player.copyOf(selectedPlayer, item => {
            item.katschings += katschings;
            item.lastKatsching = new Date().toISOString();
        }));

        console.log('Updated player successfully saved:', updatedPlayer);

        // Update the players state
        setPlayers(prevPlayers => {
            const newPlayersList = prevPlayers.map(player =>
                player.id === selectedPlayer.id ? updatedPlayer : player
            );
            console.log('New players list after Katsching update:', newPlayersList);
            return sortPlayersByKatschings(newPlayersList);
        });

        // Create a new history entry
        const newHistoryEntry = new HistoryEntry({
            playerId: updatedPlayer.id,
            time: new Date().toISOString(),
            event: `${katschings} ${katschings === 1 ? 'Katsching' : 'Katschings'} für ${updatedPlayer.name}`,
            comments: comment,
        });

        console.log('New history entry created:', newHistoryEntry);

        // Save history entry
        await DataStore.save(newHistoryEntry);
        console.log('History entry successfully saved.');

        // Update the history state
        setHistory(prevHistory => {
            const newHistoryList = [newHistoryEntry, ...prevHistory];
            console.log('New history list after adding entry:', newHistoryList);
            return sortHistoryByTime(newHistoryList);
        });

        // Close the popup and clear the selected player
        setIsKatschingPopupVisible(false);
        setSelectedPlayer(null);

        console.log('Katsching popup closed and selected player cleared.');

    } catch (err) {
        console.error('Error occurred while adding Katschings:', err);
    }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  const copyToClipboard = () => {
    const playersText = players.map(player => `${player.name}: ${player.katschings}`).join('\n');
    const lastHistory = history[0];
    const lastHistoryText = `${new Date(lastHistory.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}: ${lastHistory.event} - Kommentar: *${lastHistory.comments}*`;
    const clipboardText = `${playersText}\n\n${lastHistoryText}`;
    navigator.clipboard.writeText(clipboardText).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
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
          <div className="table-header">
            <div className="table-header-cell">
              <div className="table-header-text">Spieler</div>
            </div>
            <div className="table-header-cell">
              <div className="table-header-text">Letzter Katsching</div>
            </div>
            <div className="table-header-cell">
              <div className="table-header-text">Katschings</div>
            </div>
          </div>
          {players.map((player, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{player.name}</div>
              <div className="table-cell">
                {player.lastKatsching ? formatDate(player.lastKatsching) : "No Katsching yet"}
              </div>
              <div className="table-cell">
                <div className="katsching-container">
                  <div className="katsching-counter">{player.katschings}</div>
                  <Button className="add-katsching-button" onClick={() => toggleKatschingPopup(player)}>+</Button>
                </div>
              </div>
            </div>
          ))}
  
          <div className="add-player-button-container">
            {isAdmin && ( // Only show this button if the user is an admin
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
