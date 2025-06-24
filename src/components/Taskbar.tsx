
import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Wifi, 
  Battery, 
  Volume2, 
  Settings,
  Power,
  User,
  Calendar,
  Bell
} from 'lucide-react';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onOpenWindow: (windowId: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowClick,
  onOpenWindow
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSystemMenu, setShowSystemMenu] = useState(false);

  const windowNames: Record<string, string> = {
    filemanager: 'File Manager',
    terminal: 'Terminal',
    monitor: 'System Monitor',
    processes: 'Process Manager',
    settings: 'Settings'
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 flex items-center px-4">
      {/* Start Menu Button */}
      <div className="relative">
        <button
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        
        {showStartMenu && (
          <div className="absolute bottom-16 left-0 w-80 bg-slate-800/95 backdrop-blur-md rounded-t-xl border border-slate-600/50 p-4">
            <div className="mb-4">
              <div className="flex items-center p-3 bg-slate-700/50 rounded-lg mb-3">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search applications..."
                  className="bg-transparent text-white placeholder-slate-400 outline-none flex-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'filemanager', label: 'Files', icon: '📁' },
                { id: 'terminal', label: 'Terminal', icon: '💻' },
                { id: 'monitor', label: 'Monitor', icon: '📊' },
                { id: 'processes', label: 'Tasks', icon: '⚙️' },
                { id: 'settings', label: 'Settings', icon: '🔧' },
                { id: 'browser', label: 'Browser', icon: '🌐' }
              ].map((app) => (
                <button
                  key={app.id}
                  className="p-3 hover:bg-slate-700/50 rounded-lg text-center transition-colors"
                  onClick={() => {
                    onOpenWindow(app.id);
                    setShowStartMenu(false);
                  }}
                >
                  <div className="text-2xl mb-1">{app.icon}</div>
                  <div className="text-white text-xs">{app.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center ml-4 space-x-2">
        {openWindows.map((windowId) => (
          <button
            key={windowId}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeWindow === windowId
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
            onClick={() => onWindowClick(windowId)}
          >
            {windowNames[windowId] || windowId}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 text-slate-300">
          <Wifi className="w-5 h-5" />
          <Volume2 className="w-5 h-5" />
          <Battery className="w-5 h-5" />
        </div>
        
        <div className="relative">
          <button
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setShowSystemMenu(!showSystemMenu)}
          >
            <Bell className="w-5 h-5 text-slate-300" />
          </button>
          
          {showSystemMenu && (
            <div className="absolute bottom-16 right-0 w-64 bg-slate-800/95 backdrop-blur-md rounded-t-xl border border-slate-600/50 p-4">
              <div className="space-y-2">
                <button className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-white transition-colors">
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </button>
                <button className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-white transition-colors">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
                <button className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-white transition-colors">
                  <Power className="w-5 h-5 mr-3" />
                  Power Options
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
