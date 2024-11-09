import React from 'react';
import { Activity } from 'lucide-react';

export default function PerformanceMonitor() {
  return (
    <div className="terminal-window">
      <div className="window-header">
        <span className="flex items-center gap-2">
          <Activity size={12} />
          PERFORMANCE MONITOR
        </span>
      </div>
      <div className="h-20 flex items-end gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-3 bg-[var(--terminal-red)] transition-all duration-300"
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}