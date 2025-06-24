
import React, { useState, useEffect } from 'react';
import { Taskbar } from './Taskbar';
import { FileManager } from './FileManager';
import { Terminal } from './Terminal';
import { SystemMonitor } from './SystemMonitor';
import { ProcessManager } from './ProcessManager';
import { Store } from './Store';
import { Chatbot } from './Chatbot';
import { NotificationCenter } from './NotificationCenter';
import { DesktopIcon } from './DesktopIcon';
import { 
  FileText,
  Image,
  Music,
  Video
} from 'lucide-react';
import FilesIcon from '../free icon/Files.svg?react';
import SettingsIcon from '../free icon/Settings.png';
import SystemMonitorIcon from '../free icon/System Monitor.svg?react';
import TerminalIcon from '../free icon/Terminal.png';
import StoreIcon from '../free icon/store.png';

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
    setActiveWindow(windowId);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(openWindows[openWindows.length - 2] || null);
    }
  };

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  const desktopIcons = [
    { id: 'files', label: 'Files', icon: FilesIcon, action: () => openWindow('filemanager') },
    { id: 'store', label: 'Store', icon: StoreIcon, action: () => openWindow('store') },
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon, action: () => openWindow('terminal') },
    { id: 'monitor', label: 'System Monitor', icon: SystemMonitorIcon, action: () => openWindow('monitor') },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, action: () => openWindow('settings') },
  ];

  const applications = [
    { id: 'documents', label: 'Documents', icon: FileText, action: () => {} },
    { id: 'pictures', label: 'Pictures', icon: Image, action: () => {} },
    { id: 'music', label: 'Music', icon: Music, action: () => {} },
    { id: 'videos', label: 'Videos', icon: Video, action: () => {} },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images2.alphacoders.com/137/1370592.jpeg")`
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid grid-cols-1 gap-6 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={icon.action}
          />
        ))}
      </div>

      {/* Clock Widget */}
      <div className="absolute top-8 right-8 bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-slate-600/50 z-10">
        <div className="text-white text-2xl font-mono">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="text-slate-300 text-sm">
          {currentTime.toLocaleDateString()}
        </div>
      </div>

      {/* Windows */}
      {openWindows.includes('filemanager') && (
        <FileManager
          isActive={activeWindow === 'filemanager'}
          onClose={() => closeWindow('filemanager')}
          onFocus={() => setActiveWindow('filemanager')}
        />
      )}
      
      {openWindows.includes('terminal') && (
        <Terminal
          isActive={activeWindow === 'terminal'}
          onClose={() => closeWindow('terminal')}
          onFocus={() => setActiveWindow('terminal')}
        />
      )}
      
      {openWindows.includes('monitor') && (
        <SystemMonitor
          isActive={activeWindow === 'monitor'}
          onClose={() => closeWindow('monitor')}
          onFocus={() => setActiveWindow('monitor')}
        />
      )}
      
      {openWindows.includes('processes') && (
        <ProcessManager
          isActive={activeWindow === 'processes'}
          onClose={() => closeWindow('processes')}
          onFocus={() => setActiveWindow('processes')}
        />
      )}

      {openWindows.includes('store') && (
        <Store
          isActive={activeWindow === 'store'}
          onClose={() => closeWindow('store')}
          onFocus={() => setActiveWindow('store')}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
        onOpenWindow={openWindow}
        onToggleChatbot={toggleChatbot}
        isChatbotOpen={isChatbotOpen}
      />

      {/* Notification Center */}
      {/* AI Chatbot Window */}
      {isChatbotOpen && <Chatbot onClose={toggleChatbot} />}

      <NotificationCenter />
    </div>
  );
};
