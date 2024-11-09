import React from 'react';

interface CircularDisplayProps {
  value: number;
}

export default function CircularDisplay({ value }: CircularDisplayProps) {
  return (
    <div className="terminal-window mb-4">
      <div className="window-header">
        <span>SYSTEM STATUS</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="window-content">
        <div className="circular-display">
          <div className="circular-display-inner">
            <div className="circular-ring" />
            <div className="circular-ring" style={{ animationDelay: '-2s' }} />
            <div className="circular-ring" style={{ animationDelay: '-4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}