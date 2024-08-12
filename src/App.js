import React, { useState, useEffect } from 'react';
import logo from './alt.png';
import { ThemeProvider } from "@aws-amplify/ui-react";
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { studioTheme } from "./ui-components";
import Popup from './ui/Popup';
import KatschingPopup from './ui/KatschingPopup';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary

function App({ signOut }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]); // State to manage players
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]); // State to manage history

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleKatschingPopup = (player) => {
    setSelectedPlayer(player);
    setIsKatschingPopupVisible(!isKatschingPopupVisible);
  };

  const addPlayer = (name, emoji, katschings, comment) => {
    const newPlayer = { name, emoji, katschings, lastKatsching: new Date().toLocaleDateString() };
    setPlayers([...players, newPlayer]);
    setHistory([{
      time: new Date().toLocaleTimeString(),
      event: `${name} wurde als neuer Spieler hinzugefügt.`,
      comments: comment // Include the comment in the history
    }, ...history]); // Add new history entry to the start
  };

  const addKatschings = (katschings, comment) => {
    setPlayers(players.map(player => 
      player === selectedPlayer ? { ...player, katschings: player.katschings + katschings, lastKatsching: new Date().toLocaleDateString() } : player
    ));
    setHistory([{
      time: new Date().toLocaleTimeString(),
      event: `${katschings} Katsching(s) für ${selectedPlayer.name} von Mir`,
      comments: comment // Include the comment in the history
    }, ...history]); // Add new history entry to the start
    setIsKatschingPopupVisible(false);
    setSelectedPlayer(null); // Reset selected player
  };

  return (
    <ErrorBoundary> {/* Wrap the entire app with ErrorBoundary */}
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
            <div className="history-table-header">
              <div className="history-table-header-cell">
                <div className="history-table-header-text">Uhrzeit</div>
              </div>
              <div className="history-table-header-cell">
                <div className="history-table-header-text">Event</div>
              </div>
              <div className="history-table-header-cell">
                <div className="history-table-header-text">Kommentar</div>
              </div>
            </div>
            {history.map((entry, index) => (
              <div key={index} className="history-table-row">
                <div className="history-table-cell">{entry.time}</div>
                <div className="history-table-cell">{entry.event}</div>
                <div className="history-table-cell">{entry.comments}</div>
              </div>
            ))}
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
    </ErrorBoundary>
  );
}

export default withAuthenticator(App);