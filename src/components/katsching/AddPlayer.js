import React, { useState, useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './AddPlayer.css';
import { Player, HistoryEntry } from '../../models';

const Popup = ({ isVisible, togglePopup, addPlayer }) => {
    const [emoji, setEmoji] = useState('💸'); // Default emoji
    const [showPicker, setShowPicker] = useState(false);
    const [name, setName] = useState('');
    const [katschings, setKatschings] = useState(1); // Default value of Katschings
    const [comment, setComment] = useState(''); // State to manage the comment

    const popupRef = useRef(null); // Ref for the popup container

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                togglePopup(); // Close the popup if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [togglePopup]);

    if (!isVisible) return null;

    const handleEmojiSelect = (selectedEmoji) => {
        setEmoji(selectedEmoji.native);
        setShowPicker(false); // Close the picker after selecting an emoji
    };

    const handleAddPlayer = () => {
        const fullName = `${name} ${emoji}`;
        const katschingText = katschings === 1 ? 'Katsching' : 'Katschings';

        const newPlayer = new Player({
            name: fullName,
            emoji,
            katschings,
            lastKatsching: new Date().toISOString(),
        });

        const newHistoryEntry = new HistoryEntry({
            playerId: newPlayer.id,
            time: new Date().toISOString(),
            event: `${fullName} wurde als neuer Spieler hinzugefügt. ${katschings} ${katschingText}`,
            comments: comment,
        });

        addPlayer(newPlayer, newHistoryEntry);
        togglePopup();
        setName('');
        setKatschings(1);
        setComment('');
    };

    const handleKatschingsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setKatschings(value);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container" ref={popupRef}>
                <div className="popup-content">
                    <div className="popup-title">Füge einen neuen Wicht hinzu.</div>
                    <div className="popup-input-group">
                        <div className="popup-input-container">
                            <div className="popup-label">Name</div>
                            <input
                                className="popup-name"
                                type="text"
                                placeholder="Name des Wichts"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="popup-input-container">
                            <div className="popup-label">Emoji</div>
                            <div className="popup-emoji-picker">
                                <div className="selected-emoji" onClick={() => setShowPicker(!showPicker)}>
                                    {emoji}
                                </div>
                                {showPicker && (
                                    <div className="picker-container">
                                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="popup-subtitle">Gib die Anzahl der Katschings an.</div>
                    <div className="popup-counter-group">
                        <div className="popup-counter minus" onClick={() => setKatschings(katschings > 0 ? katschings - 1 : 0)}>
                            <span>-</span>
                        </div>
                        <input
                            className="popup-counter"
                            type="number"
                            value={katschings}
                            onChange={handleKatschingsChange}
                        />
                        <div className="popup-counter plus" onClick={() => setKatschings(katschings + 1)}>
                            <span>+</span>
                        </div>
                    </div>
                    <input 
                        className="popup-comment" 
                        type="text" 
                        placeholder="Kommentar" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} // Handle comment input
                    />
                    <div className="popup-add-button" onClick={handleAddPlayer}>Wicht hinzufügen</div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
