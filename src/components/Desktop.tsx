
import React, { useState, useEffect } from 'react';
import { Taskbar } from './Taskbar';
import { FileManager } from './FileManager';
import { Terminal } from './Terminal';
import { SystemMonitor } from './SystemMonitor';
import { ProcessManager } from './ProcessManager';
import { NotificationCenter } from './NotificationCenter';
import { DesktopIcon } from './DesktopIcon';
import { 
  Folder, 
  Terminal as TerminalIcon, 
  Activity, 
  Settings, 
  FileText,
  Image,
  Music,
  Video
} from 'lucide-react';

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
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

  const desktopIcons = [
    { id: 'files', label: 'Files', icon: Folder, action: () => openWindow('filemanager') },
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon, action: () => openWindow('terminal') },
    { id: 'monitor', label: 'System Monitor', icon: Activity, action: () => openWindow('monitor') },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => openWindow('settings') },
    { id: 'documents', label: 'Documents', icon: FileText, action: () => {} },
    { id: 'pictures', label: 'Pictures', icon: Image, action: () => {} },
    { id: 'music', label: 'Music', icon: Music, action: () => {} },
    { id: 'videos', label: 'Videos', icon: Video, action: () => {} },
  ];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid grid-cols-1 gap-6">
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
      <div className="absolute top-8 right-8 bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-slate-600/50">
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

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
        onOpenWindow={openWindow}
      />

      {/* Notification Center */}
      <NotificationCenter />
    </div>
  );
};
