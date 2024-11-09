import React from 'react';
import { Terminal } from 'lucide-react';

interface SystemStat {
  label: string;
  value: string;
}

interface SystemStatsProps {
  stats: SystemStat[];
  time: string;
}

export default function SystemStats({ stats, time }: SystemStatsProps) {
  return (
    <div className="terminal-window">
      <div className="window-header">
        <span className="flex items-center gap-2">
          <Terminal size={12} />
          SYSTEM CONSOLE v1.0
        </span>
        <span>{time}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span>{stat.label}:</span>
            <span className="terminal-text">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}