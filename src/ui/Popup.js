import React, { useState, useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './Popup.css';

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
        addPlayer(name, emoji, katschings, comment); // Pass the comment to the addPlayer function
        togglePopup(); // Close the popup after adding a player
        setName(''); // Reset the name input
        setKatschings(1); // Reset the katschings input
        setComment(''); // Reset the comment input
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
                        <div className="popup-counter-value">{katschings}</div>
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
