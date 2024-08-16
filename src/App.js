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

function App({ signOut }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch players and sort them
      const playersData = await DataStore.query(Player);
      console.log('Fetched players:', playersData); // Log the fetched data
      setPlayers(sortPlayersByKatschings(playersData));
  
      // Fetch history
      const historyData = await DataStore.query(HistoryEntry);
      setHistory(historyData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, []);
  
  useEffect(() => {
    const syncData = async () => {
      await DataStore.clear();
      await DataStore.start();
      fetchAllData(); // Fetch both players and history
    };
    syncData();
  }, [fetchAllData]);


  const sortPlayersByKatschings = (players) => {
    return [...players].sort((a, b) => b.katschings - a.katschings);
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
      // Save the new player to the DataStore
      await DataStore.save(newPlayer);

      // Update the players state with the new player
      const updatedPlayers = sortPlayersByKatschings([...players, newPlayer]);
      setPlayers(updatedPlayers);

      // Create a new history entry
      const newHistoryEntry = new HistoryEntry({
        playerId: newPlayer.id,
        time: new Date().toISOString(), // Ensure the time is recorded correctly
        event: `${fullName} wurde als neuer Spieler hinzugefügt. ${katschings} ${katschingText}`,
        comments: comment,
      });

      // Save the new history entry to the DataStore
      await DataStore.save(newHistoryEntry);

      // Update the history state with the new history entry
      setHistory(prevHistory => [newHistoryEntry, ...prevHistory]);

    } catch (err) {
      console.error('Error adding player:', err);
    }
  };


  const addKatschings = async (katschings, comment) => {
    if (!selectedPlayer) return;

    try {
      const updatedPlayer = await DataStore.save(Player.copyOf(selectedPlayer, item => {
        item.katschings += katschings;
        item.lastKatsching = new Date().toISOString();
      }));

      setPlayers(prevPlayers =>
        sortPlayersByKatschings(prevPlayers.map(player =>
          player.id === selectedPlayer.id ? updatedPlayer : player
        ))
      );

      const newHistoryEntry = new HistoryEntry({
        playerId: updatedPlayer.id,
        time: new Date().toISOString(),  // Corrected here
        event: `${katschings} ${katschings === 1 ? 'Katsching' : 'Katschings'} für ${updatedPlayer.name}`,
        comments: comment,
      });

      await DataStore.save(newHistoryEntry);
      setHistory(prevHistory => [newHistoryEntry, ...prevHistory]);

      setIsKatschingPopupVisible(false);
      setSelectedPlayer(null);

    } catch (err) {
      console.error('Error adding katschings:', err);
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
  

  return (
    <View className="App">
      <div className="App-header">
        <Button className="sign-out-button" onClick={signOut}>Sign Out</Button>
      </div>
      <Image src={logo} className="App-logo" alt="logo" />
      <Card className="mainscreen-card">
        <Button className="update-button" onClick={fetchAllData}>🔄</Button>
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
            <Button className="add-player-button" onClick={togglePopup}>Neuen Wicht hinzufügen</Button>
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
    </View>
  );
}  
// be proud bro... it works.
export default withAuthenticator(App);
