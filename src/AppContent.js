import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import logo from './alt.png';
import statisticsEmoji from './📊.png';
import rulebookEmoji from './📖.png';
import '@aws-amplify/ui-react/styles.css';
import {
  Button,
  Image,
  View,
  Card,
  useAuthenticator,
  Authenticator
} from "@aws-amplify/ui-react";
import Popup from './components/katsching/AddPlayer';
import KatschingPopup from './components/katsching/KatschingPopup';
import HistoryTable from './components/katsching/HistoryTable';
import { DataStore } from 'aws-amplify/datastore';
import { Player, HistoryEntry } from './models'; 
import { getCurrentUser } from 'aws-amplify/auth';
import KatschingTable from './components/katsching/KatschingTable';
import { ReactComponent as WhatsAppIcon } from './WhatsApp.svg';
import { FaBars } from 'react-icons/fa';
import Statistics from './components/statistiken/statistics';
import Rulebook from './components/regelbuch/Rulebook';

function AppContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isKatschingPopupVisible, setIsKatschingPopupVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [numHistoryEntries, setNumHistoryEntries] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sortPlayersByKatschings = useCallback((players) => {
    return [...players].sort((a, b) => b.katschings - a.katschings);
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      const playersData = await DataStore.query(Player);
      setPlayers(sortPlayersByKatschings(playersData));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [sortPlayersByKatschings]);

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      try {
        await fetchAllData();
        await checkAdmin();
      } catch (err) {
        console.error("Error during app initialization:", err);
      }
    };

    initializeApp();
  }, [fetchAllData]);

  const checkAdmin = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.username === 'rene271') {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error("Error checking admin status:", err);
    }
  };

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      try {
        await DataStore.sync();
        console.log("DataStore synced successfully");
      } catch (error) {
        console.error("Error syncing DataStore:", error);
      }
    }, 60000); // Sync every minute

    return () => clearInterval(syncInterval);
  }, []);

  const togglePopup = useCallback(() => {
    setIsPopupVisible(prev => !prev);
  }, []);

  const toggleKatschingPopup = useCallback((player) => {
    setSelectedPlayer(player);
    setIsKatschingPopupVisible(prev => !prev);
  }, []);

  const addPlayer = useCallback(async (newPlayer, historyEntry) => {
    try {
      await DataStore.save(newPlayer);
      const updatedPlayers = sortPlayersByKatschings([...players, newPlayer]);
      setPlayers(updatedPlayers);

      await DataStore.save(historyEntry);
    } catch (err) {
      console.error("Error adding player:", err);
    }
  }, [players, sortPlayersByKatschings]);

  const addKatschings = useCallback(async (updatedPlayer, newHistoryEntry) => {
    try {
      const savedPlayer = await DataStore.save(updatedPlayer);
      await DataStore.save(newHistoryEntry);

      setPlayers(prevPlayers => {
        const newPlayersList = prevPlayers.map(player =>
          player.id === updatedPlayer.id ? savedPlayer : player
        );
        return sortPlayersByKatschings(newPlayersList);
      });

      setIsKatschingPopupVisible(false);
      setSelectedPlayer(null);
    } catch (err) {
      console.error("Error occurred while adding Katschings:", err);
    }
  }, [sortPlayersByKatschings]);

  const editKatschingScore = useCallback(async (playerId, newScore) => {
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
  }, [players, sortPlayersByKatschings]);

  const handleNumEntriesChange = (event) => {
    setNumHistoryEntries(parseInt(event.target.value, 10));
  };

  const copyToClipboard = async () => {
    const playersText = players.map(player => `${player.name}: ${player.katschings}`).join('\n');
    
    try {
      const historyEntries = await DataStore.query(HistoryEntry, null, {
        sort: s => s.time("DESCENDING"),
        limit: numHistoryEntries
      });
      
      const historyText = historyEntries.map(entry => 
        `${new Date(entry.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}: ${entry.event} - Kommentar: *${entry.comments}*`
      ).join('\n');
      
      const clipboardText = `${playersText}\n\nRecent History:\n${historyText}`;
      
      await navigator.clipboard.writeText(clipboardText);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 1500);
    } catch (err) {
      console.error("Failed to copy data to clipboard:", err);
    }
  };

  const shareOnWhatsApp = async () => {
    try {
      const playersText = players.map(player => `${player.name}: ${player.katschings}`).join('\n');
  
      const historyEntries = await DataStore.query(HistoryEntry, null, {
        sort: s => s.time("DESCENDING"),
        limit: numHistoryEntries
      });
  
      const historyText = historyEntries.map(entry => 
        `${new Date(entry.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}: ${entry.event} - Kommentar: *${entry.comments}*`
      ).join('\n');
  
      const message = `${playersText}\n\nRecent History:\n${historyText}`;
  
      if (navigator.share) {
        await navigator.share({ text: message });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message);
        alert('Message copied to clipboard. Please paste it into WhatsApp.');
      } else {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (err) {
      console.error("Error sharing on WhatsApp:", err);
    }
  };

  const getHeaderImage = () => {
    switch (location.pathname) {
      case '/statistics':
        return { src: statisticsEmoji, alt: "statistics emoji" };
      case '/rules':
        return { src: rulebookEmoji, alt: "rulebook emoji" };
      default:
        return { src: logo, alt: "logo" };
    }
  };

  return (
    <View className="App">
      <div className="menu-container">
        <FaBars className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        {isMenuOpen && (
          <div className="sandwich-menu">
            <Button onClick={() => { setIsMenuOpen(false); navigate('/'); }}>Katsching</Button>
            <Button onClick={() => { setIsMenuOpen(false); navigate('/statistics'); }}>Statistiken</Button>
            <Button onClick={() => { setIsMenuOpen(false); navigate('/rules'); }}>Regelbuch</Button>
            {user ? (
              <Button onClick={() => { setIsMenuOpen(false); signOut(); navigate('/'); }}>Abmelden</Button>
            ) : (
              <Button onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>Anmelden</Button>
            )}
          </div>
        )}
      </div>
      <div className="App-header">
        <h1 className="App-title">Katsching</h1>
        <Image 
          src={getHeaderImage().src} 
          className="App-logo" 
          alt={getHeaderImage().alt} 
        />
      </div>
      <Routes>
        <Route path="/" element={
          loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Card className="mainscreen-card">
                <div className="table-container">
                  <KatschingTable 
                    players={players}
                    isAdmin={isAdmin}
                    toggleKatschingPopup={toggleKatschingPopup}
                    editKatschingScore={editKatschingScore}
                    isLoggedIn={!!user}
                  />
                  <div className="add-player-button-container">
                    {isAdmin && user && (
                      <Button className="add-player-button" onClick={togglePopup}>Neuen Wicht hinzufügen</Button>
                    )}
                    <div className="copy-container">
                      <Button className="copy-to-clipboard-button" onClick={copyToClipboard}>In Zwischenablage</Button>
                      <Button className="whatsapp-button" onClick={shareOnWhatsApp}>
                        <WhatsAppIcon className="whatsapp-icon" />
                      </Button>
                      {showCopyNotification && (
                        <div className="copy-notification">
                          In Zwischenablage kopiert!
                        </div>
                      )}
                    </div>
                    <div className="history-selection-container">
                      <label htmlFor="numEntries">Einträge:</label>
                      <input
                        type="number"
                        id="numEntries"
                        value={numHistoryEntries}
                        onChange={handleNumEntriesChange}
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="history-table-container">
                <HistoryTable isAdmin={isAdmin} />
              </Card>
              {user && (
                <>
                  <Popup isVisible={isPopupVisible} togglePopup={togglePopup} addPlayer={addPlayer} />
                  {selectedPlayer && (
                    <KatschingPopup
                      isVisible={isKatschingPopupVisible}
                      togglePopup={toggleKatschingPopup}
                      addKatschings={addKatschings}
                      selectedPlayer={selectedPlayer}
                    />
                  )}
                </>
              )}
            </>
          )
        } />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/rules" element={<Rulebook />} />
        <Route path="/login" element={
          <Authenticator>
            {({ signOut, user }) => {
              if (user) {
                navigate('/');
                return null;
              }
              return <div>Loading...</div>;
            }}
          </Authenticator>
        } />
      </Routes>
    </View>
  );
}

export default AppContent;