import React, { useMemo } from 'react';

interface DynamicBackgroundProps {
  person: string;
}

const emojiMap: Record<string, string[]> = {
  'Divi': ['🤵‍♂️', '✨', '💎', '🤍', '🍸'],
  'Liya': ['👰‍♀️', '💐', '💍', '🕊️', '✨'],
  'Milo 🐱': ['🐈', '🐾', '🐟', '🧶', '🥛'],
};

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ person }) => {
  // Fallback to empty if not matched
  const activeEmojis = emojiMap[person] || [];

  if (activeEmojis.length === 0) return null;

  // Render 24 scattered floating emojis to fill the space
  const spans = useMemo(() => Array.from({ length: 24 }).map((_, i) => {
    const randomLeft = Math.floor(Math.random() * 100) + '%';
    // Negative delay ensures they are already distributed on screen when loaded
    const randomDelay = '-' + Math.floor(Math.random() * 25) + 's';
    const randomDuration = Math.floor(Math.random() * (30 - 15 + 1) + 15) + 's';
    const randomSize = (Math.random() * 2 + 1.5).toFixed(1) + 'rem';
    const randomOpacity = (Math.random() * 0.15 + 0.1).toFixed(2);
    const emoji = activeEmojis[i % activeEmojis.length];

    return (
      <span 
        key={i} 
        className="floating-emoji" 
        style={{ 
          left: randomLeft, 
          animationDelay: randomDelay,
          animationDuration: randomDuration,
          fontSize: randomSize,
          opacity: randomOpacity
        }}
      >
        {emoji}
      </span>
    );
  }), [person, activeEmojis]);

  return (
    <div className="emoji-bg-container">
      {spans}
    </div>
  );
};

export default DynamicBackground;
