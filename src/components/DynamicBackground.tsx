import React from 'react';

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

  // Render 8 staggered floating emojis
  const spans = Array.from({ length: 8 }).map((_, i) => {
    const randomLeft = Math.floor(Math.random() * 90) + '%';
    const randomDelay = Math.floor(Math.random() * 10) + 's';
    const randomDuration = Math.floor(Math.random() * (20 - 12 + 1) + 12) + 's';
    const emoji = activeEmojis[i % activeEmojis.length];

    return (
      <span 
        key={i} 
        className="floating-emoji" 
        style={{ 
          left: randomLeft, 
          animationDelay: randomDelay,
          animationDuration: randomDuration 
        }}
      >
        {emoji}
      </span>
    );
  });

  return (
    <div className="emoji-bg-container">
      {spans}
    </div>
  );
};

export default DynamicBackground;
