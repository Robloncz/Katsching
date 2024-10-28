import React, { useState, useRef, useEffect } from 'react';
import { Player, HistoryEntry } from '../../models';
import './KatschingPopup.css';
import './emoji-mart.css';
import { emojiList } from './emojiList';

const AddPlayer = ({ isVisible, togglePopup, addPlayer }) => {
    const [playerName, setPlayerName] = useState('');
    const [comment, setComment] = useState('');
    const [emoji, setEmoji] = useState('💸');
    const [showEmojiList, setShowEmojiList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                togglePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [togglePopup]);

    if (!isVisible) return null;

    const handleEmojiSelect = (selectedEmoji) => {
        setEmoji(selectedEmoji);
        setShowEmojiList(false);
        setSearchTerm(''); // Clear search when emoji is selected
    };

    const handleSubmit = async () => {
        if (!playerName.trim()) {
            alert('Bitte gib einen Namen ein');
            return;
        }

        const newPlayer = new Player({
            name: playerName.trim(), // Store just the name without emoji
            emoji: emoji,            // Store emoji separately
            katschings: 0,
            lastKatsching: new Date().toISOString()
        });

        const historyEntry = new HistoryEntry({
            playerId: newPlayer.id,
            time: new Date().toISOString(),
            event: `Neuer Spieler ${playerName.trim()} ${emoji} hinzugefügt`, // Display name with emoji in history
            comments: comment
        });

        await addPlayer(newPlayer, historyEntry);
        setPlayerName('');
        setComment('');
        setEmoji('💸');
        togglePopup();
    };

    // Filter emojis based on search term
    const getFilteredEmojis = () => {
        if (!searchTerm) return emojiList;
        
        const filtered = {};
        Object.entries(emojiList).forEach(([category, emojis]) => {
            const filteredEmojis = emojis.filter(emoji => 
                emoji.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredEmojis.length > 0) {
                filtered[category] = filteredEmojis;
            }
        });
        return filtered;
    };

    const filteredEmojiList = getFilteredEmojis();

    return (
        <div className="popup-overlay visible">
            <div className="popup-container" ref={popupRef}>
                <div className="popup-content">
                    <div className="popup-title">Füge einen neuen Wicht hinzu.</div>
                    <div className="popup-input-group">
                        <div className="popup-input-container">
                            <div className="popup-label">Name</div>
                            <input
                                className="popup-name"
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Name des Wichts"
                            />
                        </div>
                        <div className="popup-input-container">
                            <div className="popup-label">Emoji</div>
                            <div className="popup-emoji-picker">
                                <div className="selected-emoji" onClick={() => setShowEmojiList(!showEmojiList)}>
                                    {emoji}
                                </div>
                                {showEmojiList && (
                                    <>
                                        <div className="emoji-list-backdrop" onClick={() => setShowEmojiList(false)} />
                                        <div className="emoji-list">
                                            <input
                                                type="text"
                                                className="emoji-search"
                                                placeholder="Emoji suchen..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            {Object.entries(filteredEmojiList).map(([category, emojis]) => (
                                                <div key={category} className="emoji-category">
                                                    <div className="emoji-category-title">{category}</div>
                                                    <div className="emoji-category-content">
                                                        {emojis.map((e, index) => (
                                                            <span
                                                                key={index}
                                                                className="emoji-option"
                                                                onClick={() => handleEmojiSelect(e)}
                                                            >
                                                                {e}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <textarea
                        className="popup-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Kommentar (optional)"
                    />
                    <div className="popup-add-button" onClick={handleSubmit}>
                        Wicht hinzufügen
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlayer;
