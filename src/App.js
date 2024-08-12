import React, { useState, useEffect } from 'react';
import logo from './alt.png';
import { ThemeProvider } from "@aws-amplify/ui-react";
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Button,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { studioTheme } from "./ui-components";
import Popup from './ui/Popup';
import KatschingPopup from './ui/KatschingPopup';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
function App({ signOut }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]);

  // Function to sort players by 'katschings' in descending order
  const sortPlayersByKatschings = (players) => {
    return [...players].sort((a, b) => b.katschings - a.katschings);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleKatschingPopup = (player) => {
    setSelectedPlayer(player);
    setIsKatschingPopupVisible(!isKatschingPopupVisible);
  };

  const addPlayer = (name, emoji, katschings, comment) => {
    const fullName = `${name} ${emoji}`;
    const katschingText = katschings === 1 ? 'Katsching' : 'Katschings';
    const newPlayer = { name: fullName, emoji, katschings, lastKatsching: new Date().toLocaleDateString() };
    const updatedPlayers = sortPlayersByKatschings([...players, newPlayer]);
    setPlayers(updatedPlayers);
    setHistory([{
      time: new Date().toLocaleTimeString(),
      event: `${fullName} wurde als neuer Spieler hinzugefügt. ${katschings} ${katschingText}`,
      comments: comment
    }, ...history]);
  };

  const addKatschings = (katschings, comment) => {
    const katschingText = katschings === 1 ? 'Katsching' : 'Katschings';
    const updatedPlayers = players.map(player =>
      player === selectedPlayer ? { ...player, katschings: player.katschings + katschings, lastKatsching: new Date().toLocaleDateString() } : player
    );
    setPlayers(sortPlayersByKatschings(updatedPlayers));
    setHistory([{
      time: new Date().toLocaleTimeString(),
      event: `${katschings} ${katschingText} für ${selectedPlayer.name}`,
      comments: comment
    }, ...history]);
    setIsKatschingPopupVisible(false);
    setSelectedPlayer(null);
  };



  return (
      <ThemeProvider theme={studioTheme}>
        <View className="App">
          <div className="App-header">
            <Button className="sign-out-button" onClick={signOut}>Sign Out</Button>
          </div>
          <Image src={logo} className="App-logo" alt="logo" />
          <Card className="mainscreen-card">
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
                  <div className="table-cell">{player.lastKatsching}</div>
                  <div className="table-cell">
                    <div className="katsching-container">
                      <div className="katsching-counter">{player.katschings}</div> {/* Replace with your actual counter element */}
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
          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table stickyHeader style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "15%", fontFamily: 'Irish Grover' }}>Uhrzeit</TableCell>
                  <TableCell style={{ width: "70%", fontFamily: 'Irish Grover' }}>Event</TableCell>
                  <TableCell style={{ width: "20%", fontFamily: 'Irish Grover' }}>Kommentar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: "10%", fontFamily: 'Irish Grover' }}>{entry.time}</TableCell>
                    <TableCell style={{ width: "70%", fontFamily: 'Irish Grover' }}>{entry.event}</TableCell>
                    <TableCell style={{ width: "20%", fontFamily: 'Irish Grover' }}>{entry.comments}</TableCell>
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
      </ThemeProvider>
  );
}

export default withAuthenticator(App);