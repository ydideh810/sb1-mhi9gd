import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SystemLogProps {
  messages: string[];
}

export default function SystemLog({ messages }: SystemLogProps) {
  return (
    <div className="terminal-window">
      <div className="window-header">
        <span className="flex items-center gap-2">
          <AlertCircle size={12} />
          SYSTEM LOG
        </span>
      </div>
      <div className="space-y-1 text-xs">
        {messages.map((message, index) => (
          <div key={index} className="terminal-text">
            {`>${message}`}
          </div>
        ))}
      </div>
    </div>
  );
}