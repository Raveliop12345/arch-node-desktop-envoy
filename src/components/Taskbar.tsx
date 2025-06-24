
import React, { useState, useEffect } from 'react';
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
  Bell,
  Monitor,
  Sun,
  Moon,
  WifiOff,
  BatteryLow,
  VolumeX,
  Volume1,
  Calculator,
  FileText,
  Image,
  Music,
  Video,
  Folder,
  Terminal,
  Activity,
  Chrome,
  Mail,
  Clock,
  Gamepad2,
  Bot
} from 'lucide-react';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onOpenWindow: (windowId: string) => void;
  onToggleChatbot: () => void;
  isChatbotOpen: boolean;
}

interface SystemStatus {
  wifi: boolean;
  battery: number;
  volume: number;
  brightness: number;
  theme: 'light' | 'dark';
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindow,
  onWindowClick,
  onOpenWindow,
  onToggleChatbot,
  isChatbotOpen
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    wifi: true,
    battery: 85,
    volume: 70,
    brightness: 80,
    theme: 'dark'
  });

  const [notifications] = useState([
    { id: 1, title: 'System Update', message: 'Windows updates are available', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Battery Low', message: 'Consider plugging in your device', time: '5 min ago', type: 'warning' },
    { id: 3, title: 'New Message', message: 'You have 3 unread messages', time: '10 min ago', type: 'message' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const windowNames: Record<string, string> = {
    filemanager: 'File Manager',
    terminal: 'Terminal',
    monitor: 'System Monitor',
    processes: 'Process Manager',
    settings: 'Settings',
    calculator: 'Calculator',
    notepad: 'Notepad',
    browser: 'Browser',
    mail: 'Mail'
  };

  const applications = [
    { id: 'filemanager', label: 'File Manager', icon: Folder, category: 'System' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, category: 'System' },
    { id: 'monitor', label: 'System Monitor', icon: Activity, category: 'System' },
    { id: 'processes', label: 'Task Manager', icon: Settings, category: 'System' },
    { id: 'calculator', label: 'Calculator', icon: Calculator, category: 'Accessories' },
    { id: 'notepad', label: 'Notepad', icon: FileText, category: 'Accessories' },
    { id: 'browser', label: 'Browser', icon: Chrome, category: 'Internet' },
    { id: 'mail', label: 'Mail', icon: Mail, category: 'Internet' },
    { id: 'photos', label: 'Photos', icon: Image, category: 'Media' },
    { id: 'music', label: 'Music', icon: Music, category: 'Media' },
    { id: 'videos', label: 'Videos', icon: Video, category: 'Media' },
    { id: 'games', label: 'Games', icon: Gamepad2, category: 'Games' }
  ];

  const filteredApps = applications.filter(app => 
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWifi = () => {
    setSystemStatus(prev => ({ ...prev, wifi: !prev.wifi }));
  };

  const toggleTheme = () => {
    setSystemStatus(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemStatus(prev => ({ ...prev, volume: parseInt(e.target.value) }));
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemStatus(prev => ({ ...prev, brightness: parseInt(e.target.value) }));
  };

  const getVolumeIcon = () => {
    if (systemStatus.volume === 0) return VolumeX;
    if (systemStatus.volume < 50) return Volume1;
    return Volume2;
  };

  const getBatteryColor = () => {
    if (systemStatus.battery < 20) return 'text-red-500';
    if (systemStatus.battery < 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <>
      {/* Overlay for closing menus */}
      {(showStartMenu || showSystemMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowStartMenu(false);
            setShowSystemMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 flex items-center px-4 z-50">
        {/* Start Menu Button */}
        <div className="relative">
          <button
            className={`p-2 rounded-lg transition-colors ${
              showStartMenu ? 'bg-blue-600' : 'hover:bg-slate-700/50'
            }`}
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          {showStartMenu && (
            <div className="absolute bottom-16 left-0 w-96 h-96 bg-slate-800/95 backdrop-blur-md rounded-t-xl border border-slate-600/50 p-4 z-50">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="flex items-center p-3 bg-slate-700/50 rounded-lg mb-3">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Type here to search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white placeholder-slate-400 outline-none flex-1"
                  />
                </div>
              </div>
              
              {/* Pinned Apps */}
              <div className="mb-4">
                <h3 className="text-slate-300 text-sm font-semibold mb-2">Pinned</h3>
                <div className="grid grid-cols-4 gap-2">
                  {filteredApps.slice(0, 8).map((app) => (
                    <button
                      key={app.id}
                      className="p-3 hover:bg-slate-700/50 rounded-lg text-center transition-colors group"
                      onClick={() => {
                        onOpenWindow(app.id);
                        setShowStartMenu(false);
                        setSearchQuery('');
                      }}
                    >
                      <app.icon className="w-6 h-6 text-white mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <div className="text-white text-xs truncate">{app.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Files */}
              <div className="mb-4">
                <h3 className="text-slate-300 text-sm font-semibold mb-2">Recent</h3>
                <div className="space-y-1">
                  {['Document.txt', 'Presentation.pptx', 'Photo.jpg'].map((file, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-left transition-colors"
                    >
                      <FileText className="w-4 h-4 text-blue-400 mr-3" />
                      <span className="text-white text-sm">{file}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Options */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  title="Settings"
                  onClick={() => {
                    onOpenWindow('settings');
                    setShowStartMenu(false);
                  }}
                >
                  <Settings className="w-5 h-5 text-slate-300" />
                </button>
                <button
                  className="p-2 hover:bg-red-600/50 rounded-lg transition-colors"
                  title="Power"
                >
                  <Power className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="ml-4 flex items-center bg-slate-700/50 rounded-lg px-3 py-1 w-64">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search"
            className="bg-transparent text-white placeholder-slate-400 outline-none text-sm flex-1"
          />
        </div>

        {/* Open Windows */}
        <div className="flex-1 flex items-center ml-4 space-x-2">
          {openWindows.map((windowId) => (
            <button
              key={windowId}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center space-x-2 ${
                activeWindow === windowId
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
              }`}
              onClick={() => onWindowClick(windowId)}
            >
              <span>{windowNames[windowId] || windowId}</span>
              {activeWindow === windowId && (
                <div className="w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-1">
          {/* AI Assistant */}
          <button 
            onClick={onToggleChatbot}
            className={`p-2 rounded-md transition-colors duration-200 ${isChatbotOpen ? 'bg-cyan-500/50 text-cyan-300' : 'hover:bg-slate-700/50'}`}
            aria-label="Toggle AI Assistant"
          >
            <Bot className="w-5 h-5" />
          </button>
          {/* Wifi Status */}
          <button
            className={`p-2 hover:bg-slate-700/50 rounded-lg transition-colors ${
              systemStatus.wifi ? 'text-slate-300' : 'text-red-400'
            }`}
            onClick={toggleWifi}
            title={systemStatus.wifi ? 'WiFi Connected' : 'WiFi Disconnected'}
          >
            {systemStatus.wifi ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          </button>
          
          {/* Volume */}
          <button
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300"
            title={`Volume: ${systemStatus.volume}%`}
          >
            {React.createElement(getVolumeIcon(), { className: "w-5 h-5" })}
          </button>
          
          {/* Battery */}
          <button
            className={`p-2 hover:bg-slate-700/50 rounded-lg transition-colors ${getBatteryColor()}`}
            title={`Battery: ${systemStatus.battery}%`}
          >
            {systemStatus.battery < 20 ? <BatteryLow className="w-5 h-5" /> : <Battery className="w-5 h-5" />}
          </button>
        </div>

        {/* Notifications */}
        <div className="relative ml-2">
          <button
            className={`p-2 rounded-lg transition-colors relative ${
              showNotifications ? 'bg-blue-600' : 'hover:bg-slate-700/50'
            }`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-slate-300" />
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute bottom-16 right-0 w-80 bg-slate-800/95 backdrop-blur-md rounded-t-xl border border-slate-600/50 p-4 z-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Notifications</h3>
                <button className="text-slate-400 hover:text-white text-sm">
                  Clear all
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{notification.title}</h4>
                        <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
                      </div>
                      <span className="text-slate-400 text-xs">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* System Menu */}
        <div className="relative ml-2">
          <button
            className={`p-2 rounded-lg transition-colors ${
              showSystemMenu ? 'bg-blue-600' : 'hover:bg-slate-700/50'
            }`}
            onClick={() => setShowSystemMenu(!showSystemMenu)}
          >
            <Settings className="w-5 h-5 text-slate-300" />
          </button>
          
          {showSystemMenu && (
            <div className="absolute bottom-16 right-0 w-72 bg-slate-800/95 backdrop-blur-md rounded-t-xl border border-slate-600/50 p-4 z-50">
              {/* Quick Settings */}
              <div className="mb-4">
                <h3 className="text-white font-semibold mb-3">Quick Settings</h3>
                
                {/* WiFi */}
                <div className="flex items-center justify-between mb-3 p-2 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    {systemStatus.wifi ? <Wifi className="w-5 h-5 text-blue-400 mr-3" /> : <WifiOff className="w-5 h-5 text-red-400 mr-3" />}
                    <span className="text-white text-sm">WiFi</span>
                  </div>
                  <button
                    onClick={toggleWifi}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      systemStatus.wifi ? 'bg-blue-600' : 'bg-slate-600'
                    } relative`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      systemStatus.wifi ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between mb-3 p-2 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    {systemStatus.theme === 'dark' ? <Moon className="w-5 h-5 text-blue-400 mr-3" /> : <Sun className="w-5 h-5 text-yellow-400 mr-3" />}
                    <span className="text-white text-sm">Dark Mode</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      systemStatus.theme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'
                    } relative`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      systemStatus.theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="mb-3 p-2 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center mb-2">
                    {React.createElement(getVolumeIcon(), { className: "w-5 h-5 text-blue-400 mr-3" })}
                    <span className="text-white text-sm">Volume</span>
                    <span className="text-slate-300 text-xs ml-auto">{systemStatus.volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={systemStatus.volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Brightness Control */}
                <div className="mb-3 p-2 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Monitor className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-white text-sm">Brightness</span>
                    <span className="text-slate-300 text-xs ml-auto">{systemStatus.brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={systemStatus.brightness}
                    onChange={handleBrightnessChange}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* System Actions */}
              <div className="space-y-2">
                <button 
                  className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-white transition-colors"
                  onClick={() => {
                    onOpenWindow('settings');
                    setShowSystemMenu(false);
                  }}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  All Settings
                </button>
                <button className="w-full flex items-center p-2 hover:bg-slate-700/50 rounded-lg text-white transition-colors">
                  <User className="w-5 h-5 mr-3" />
                  Account Settings
                </button>
                <button className="w-full flex items-center p-2 hover:bg-red-600/50 rounded-lg text-white transition-colors">
                  <Power className="w-5 h-5 mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clock */}
        <div className="ml-4 text-right">
          <div className="text-white text-sm font-medium">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-slate-300 text-xs">
            {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};
