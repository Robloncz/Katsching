import React, { useState, useEffect, useRef, useCallback } from 'react';
import './KatschingPopup.css';
import { Player, HistoryEntry } from '../../models';
import { DataStore } from 'aws-amplify/datastore';

const KatschingPopup = ({ isVisible, togglePopup, addKatschings, selectedPlayer, refreshHistory }) => {
    const [comment, setComment] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const popupRef = useRef(null);
    const commentRef = useRef(null);

    const closePopup = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            togglePopup();
            setIsClosing(false);
        }, 300);
    }, [togglePopup]);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            setIsClosing(false);
            setTimeout(() => setIsAnimating(false), 400);
        } else {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                setIsAnimating(false);
            }, 300);
        }
    }, [isVisible]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup]);

    useEffect(() => {
        if (isVisible && commentRef.current) {
            commentRef.current.focus();
        }
    }, [isVisible]);

    const handleAddKatsching = async () => {
        if (selectedPlayer) {
            try {
                console.log("Adding Katsching for player:", selectedPlayer);
                const currentSelectedPlayer = await DataStore.query(Player, selectedPlayer.id);

                if (!currentSelectedPlayer) {
                    throw new Error("Selected player not found in the database");
                }

                const updatedPlayer = Player.copyOf(currentSelectedPlayer, item => {
                    item.katschings += 1;
                    item.lastKatsching = new Date().toISOString();
                });

                const newHistoryEntry = new HistoryEntry({
                    playerId: updatedPlayer.id,
                    time: new Date().toISOString(),
                    event: `1 Katsching für ${updatedPlayer.name}`,
                    comments: comment,
                });

                console.log("Calling addKatschings with:", updatedPlayer, newHistoryEntry);
                await addKatschings(updatedPlayer, newHistoryEntry);
                console.log("Katsching added successfully");
                setComment('');
                closePopup();
                refreshHistory(); // Call the refreshHistory function after adding a Katsching
            } catch (error) {
                console.error("Error adding Katsching:", error);
                alert("Failed to add Katsching. Please try again.");
            }
        } else {
            console.error("No player selected");
            alert("No player selected. Please try again.");
        }
    };

    if (!isVisible && !isAnimating) return null;

    return (
        <div className={`popup-overlay ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className="popup-container" ref={popupRef}>
                <div className="popup-content">
                    <div className="popup-subtitle">Warum Katsching?</div>
                    <textarea 
                        ref={commentRef}
                        className="popup-comment" 
                        placeholder="Kommentar" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                    />
                    <div className="popup-add-button" onClick={handleAddKatsching}>Katsching hinzufügen</div>
                </div>
            </div>
        </div>
    );
};

export default KatschingPopup;
