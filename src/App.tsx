import React, { useState, useEffect } from 'react';
import { Monitor, Search, Calendar, FileText, MessageSquare, Image, Upload } from 'lucide-react';
import SystemStats from './components/SystemStats';
import SearchEngine from './components/SearchEngine';
import CodeEditor from './components/CodeEditor';
import FileTransfer from './components/FileTransfer';
import CalendarTool from './components/Calendar';
import TodoList from './components/TodoList';
import AIChat from './components/AIChat';
import ImageGen from './components/ImageGen';
import CircularDisplay from './components/CircularDisplay';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemLoad, setSystemLoad] = useState(Math.random() * 100);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemLoad(Math.random() * 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const systemStats = [
    { label: 'CPU Usage', value: `${Math.round(systemLoad)}%` },
    { label: 'Memory', value: '640K' },
    { label: 'Disk Space', value: '10MB' },
    { label: 'Network', value: '1200 BAUD' },
  ];

  const tabs = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'code', icon: FileText, label: 'Code' },
    { id: 'files', icon: Upload, label: 'Files' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'todo', icon: FileText, label: 'Todo' },
    { id: 'chat', icon: MessageSquare, label: 'AI Chat' },
    { id: 'image', icon: Image, label: 'Image Gen' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'search': return <SearchEngine />;
      case 'code': return <CodeEditor />;
      case 'files': return <FileTransfer />;
      case 'calendar': return <CalendarTool />;
      case 'todo': return <TodoList />;
      case 'chat': return <AIChat />;
      case 'image': return <ImageGen />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="terminal-frame">
        <div className="terminal-layout">
          <div className="terminal-sidebar">
            <CircularDisplay value={systemLoad} />
            <SystemStats stats={systemStats} time={currentTime.toLocaleTimeString()} />
          </div>
          
          <div className="terminal-main">
            <div className="terminal-window h-full">
              <div className="window-header">
                <div className="flex items-center gap-4">
                  <Monitor className="w-8 h-8 text-[var(--terminal-red)]" />
                  <h1 className="text-2xl font-bold terminal-text">SYSTEM INTERFACE v1.0</h1>
                </div>
                <div className="text-lg">{currentTime.toLocaleTimeString()}</div>
              </div>
              
              <div className="window-content">
                <nav className="flex gap-4 mb-6">
                  {tabs.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`terminal-button flex items-center gap-2 ${
                        activeTab === id ? 'terminal-button-active' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="min-h-[calc(100vh-16rem)]">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;