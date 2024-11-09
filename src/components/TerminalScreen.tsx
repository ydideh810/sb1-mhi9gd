import React from 'react';

interface TerminalScreenProps {
  children: React.ReactNode;
}

export default function TerminalScreen({ children }: TerminalScreenProps) {
  return (
    <div className="terminal-screen screen-flicker">
      <div className="screen-content terminal-grid">
        {children}
      </div>
      <div className="terminal-scanline" />
      <div className="screen-glow" />
    </div>
  );
}