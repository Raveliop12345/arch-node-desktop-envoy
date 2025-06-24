
import React, { useState, useEffect } from 'react';
import { Bell, X, Settings, Info, AlertTriangle, Mail, Calendar, Download, Shield } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'message' | 'system';
  urgent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
    primary?: boolean;
  }>;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'System Update Available',
      message: 'Version 22H2 is ready to install. This update includes security improvements and new features.',
      time: '2 minutes ago',
      type: 'system',
      actions: [
        { label: 'Install Now', action: () => {}, primary: true },
        { label: 'Schedule', action: () => {} }
      ]
    },
    {
      id: 2,
      title: 'Low Battery Warning',
      message: 'Your battery is at 15%. Consider connecting your charger.',
      time: '5 minutes ago',
      type: 'warning',
      urgent: true,
      actions: [
        { label: 'Power Settings', action: () => {} }
      ]
    },
    {
      id: 3,
      title: 'New Email',
      message: 'You have 3 unread messages from john.doe@example.com',
      time: '10 minutes ago',
      type: 'message',
      actions: [
        { label: 'Open Mail', action: () => {}, primary: true },
        { label: 'Mark as Read', action: () => {} }
      ]
    },
    {
      id: 4,
      title: 'Calendar Reminder',
      message: 'Meeting with team starts in 30 minutes',
      time: '15 minutes ago',
      type: 'info',
      actions: [
        { label: 'Join Meeting', action: () => {}, primary: true },
        { label: 'Snooze', action: () => {} }
      ]
    },
    {
      id: 5,
      title: 'Download Complete',
      message: 'project-files.zip has been downloaded successfully',
      time: '1 hour ago',
      type: 'success',
      actions: [
        { label: 'Open File', action: () => {} },
        { label: 'Show in Folder', action: () => {} }
      ]
    },
    {
      id: 6,
      title: 'Security Alert',
      message: 'Suspicious login detected from unknown device. Please verify.',
      time: '2 hours ago',
      type: 'error',
      urgent: true,
      actions: [
        { label: 'Review Activity', action: () => {}, primary: true },
        { label: 'Change Password', action: () => {} }
      ]
    }
  ]);

  const [settings, setSettings] = useState({
    showBannerNotifications: true,
    showSounds: true,
    showInActionCenter: true,
    priority: 'all' as 'all' | 'priority' | 'alarmsOnly'
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return Info;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return Download;
      case 'error':
        return Shield;
      case 'message':
        return Mail;
      case 'system':
        return Settings;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'border-blue-500 bg-blue-500/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'success':
        return 'border-green-500 bg-green-500/10';
      case 'error':
        return 'border-red-500 bg-red-500/10';
      case 'message':
        return 'border-purple-500 bg-purple-500/10';
      case 'system':
        return 'border-gray-500 bg-gray-500/10';
      default:
        return 'border-slate-500 bg-slate-500/10';
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const urgentNotifications = notifications.filter(n => n.urgent);
  const regularNotifications = notifications.filter(n => !n.urgent);

  return (
    <>
      {/* Notification Button */}
      <button
        className={`fixed bottom-20 right-6 p-3 rounded-full transition-all duration-300 z-40 ${
          isOpen 
            ? 'bg-blue-600 text-white scale-110' 
            : 'bg-slate-800/80 backdrop-blur-md text-slate-300 hover:bg-slate-700/80 hover:scale-105'
        } border border-slate-600/50 shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {notifications.length > 9 ? '9+' : notifications.length}
          </div>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-4 top-4 bottom-20 w-96 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-600/50">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">Notifications</h2>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4 text-slate-300" />
                  </button>
                  <button
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
              
              {notifications.length > 0 && (
                <div className="flex items-center justify-between mt-3">
                  <span className="text-slate-400 text-sm">
                    {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    onClick={clearAllNotifications}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No new notifications</p>
                  <p className="text-slate-500 text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <>
                  {/* Urgent Notifications */}
                  {urgentNotifications.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-red-400 text-sm font-semibold mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Urgent
                      </h3>
                      {urgentNotifications.map((notification) => {
                        const IconComponent = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} mb-2 animate-pulse`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start flex-1">
                                <IconComponent className={`w-5 h-5 mr-3 mt-0.5 ${
                                  notification.type === 'error' ? 'text-red-400' :
                                  notification.type === 'warning' ? 'text-yellow-400' :
                                  'text-blue-400'
                                }`} />
                                <div className="flex-1">
                                  <h4 className="text-white font-medium text-sm mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-slate-300 text-xs leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <span className="text-slate-400 text-xs mt-1 block">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="p-1 hover:bg-slate-700/50 rounded transition-colors ml-2"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <X className="w-4 h-4 text-slate-400" />
                              </button>
                            </div>
                            
                            {notification.actions && notification.actions.length > 0 && (
                              <div className="flex space-x-2 mt-2">
                                {notification.actions.map((action, index) => (
                                  <button
                                    key={index}
                                    className={`px-3 py-1 rounded text-xs transition-colors ${
                                      action.primary
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                    }`}
                                    onClick={action.action}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Regular Notifications */}
                  {regularNotifications.length > 0 && (
                    <div>
                      {urgentNotifications.length > 0 && (
                        <h3 className="text-slate-400 text-sm font-semibold mb-2">Recent</h3>
                      )}
                      {regularNotifications.map((notification) => {
                        const IconComponent = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} mb-2 hover:bg-slate-700/20 transition-colors`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start flex-1">
                                <IconComponent className={`w-5 h-5 mr-3 mt-0.5 ${
                                  notification.type === 'success' ? 'text-green-400' :
                                  notification.type === 'message' ? 'text-purple-400' :
                                  notification.type === 'system' ? 'text-gray-400' :
                                  'text-blue-400'
                                }`} />
                                <div className="flex-1">
                                  <h4 className="text-white font-medium text-sm mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-slate-300 text-xs leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <span className="text-slate-400 text-xs mt-1 block">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="p-1 hover:bg-slate-700/50 rounded transition-colors ml-2"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <X className="w-4 h-4 text-slate-400" />
                              </button>
                            </div>
                            
                            {notification.actions && notification.actions.length > 0 && (
                              <div className="flex space-x-2 mt-2">
                                {notification.actions.map((action, index) => (
                                  <button
                                    key={index}
                                    className={`px-3 py-1 rounded text-xs transition-colors ${
                                      action.primary
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                    }`}
                                    onClick={action.action}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="text-slate-400 hover:text-white text-sm transition-colors">
                    Focus assist
                  </button>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  Manage notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
