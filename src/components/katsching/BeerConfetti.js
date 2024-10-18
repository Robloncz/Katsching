import React, { useEffect, useState } from 'react';
import './BeerConfetti.css';

const BeerConfetti = ({ isActive, onAnimationComplete }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newEmojis = [];
      for (let i = 0; i < 50; i++) {
        newEmojis.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 1}s`,
          animationDelay: `${Math.random() * 0.5}s`
        });
      }
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onAnimationComplete]);

  if (!isActive) return null;

  return (
    <div className="beer-confetti-container">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="beer-emoji"
          style={{
            left: emoji.left,
            animationDuration: emoji.animationDuration,
            animationDelay: emoji.animationDelay
          }}
        >
          🍺
        </div>
      ))}
    </div>
  );
};

export default BeerConfetti;
