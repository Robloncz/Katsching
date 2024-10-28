import React, { useState, useEffect, useRef, useCallback } from 'react';
import './KatschingPopup.css';
import { Player, HistoryEntry } from '../../models';
import { DataStore } from 'aws-amplify/datastore';
import { getCurrentUser } from 'aws-amplify/auth';

const KatschingPopup = ({ isVisible, togglePopup, addKatschings, selectedPlayer, refreshHistory }) => {
    const [comment, setComment] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const popupRef = useRef(null);
    const commentRef = useRef(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (err) {
                console.error("Error fetching current user:", err);
            }
        };
        fetchCurrentUser();
    }, []);

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
        if (selectedPlayer && currentUser) {
            try {
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
                    // Include the player's emoji in the event text
                    event: `${currentUser.username} gab 1 Katsching an ${updatedPlayer.name} ${updatedPlayer.emoji}`,
                    comments: comment,
                });

                await addKatschings(updatedPlayer, newHistoryEntry);
                setComment('');
                
                setSuccessMessage(`${currentUser.username} hat ${selectedPlayer.name} ${selectedPlayer.emoji} einen Katsching gegeben!`);
                setShowSuccess(true);
                
                setTimeout(() => {
                    setShowSuccess(false);
                    closePopup();
                }, 2000);
                
                if (typeof refreshHistory === 'function') {
                    refreshHistory();
                }
            } catch (error) {
                console.error("Error adding Katsching:", error);
                alert("Failed to add Katsching. Please try again.");
            }
        } else {
            console.error("No player selected or user not logged in");
            alert("No player selected or not logged in. Please try again.");
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
                    {showSuccess && <div className="success-message">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default KatschingPopup;
