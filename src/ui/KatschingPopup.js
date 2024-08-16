import React, { useState, useEffect, useRef } from 'react';
import './Popup.css';

const KatschingPopup = ({ isVisible, togglePopup, addKatschings }) => {
    const [katschings, setKatschings] = useState(0);
    const [comment, setComment] = useState('');

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

    const handleAddKatschings = () => {
        if (katschings > 0) {
            addKatschings(katschings, comment);
            setKatschings(0);
            setComment('');
            togglePopup();
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container" ref={popupRef}>
                <div className="popup-content">
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
                        onChange={(e) => setComment(e.target.value)} 
                    />
                    <div className="popup-add-button" onClick={handleAddKatschings}>Katsching/s hinzufügen</div>
                </div>
            </div>
        </div>
    );
};

export default KatschingPopup;
