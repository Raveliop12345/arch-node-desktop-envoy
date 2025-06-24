
import React, { useState, useEffect } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Add some sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'System Update',
        message: 'System updated successfully. Restart recommended.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        type: 'warning',
        title: 'Disk Space',
        message: 'Disk space is running low on /home partition.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: '3',
        type: 'info',
        title: 'Network',
        message: 'Connected to WiFi network "ArchLinux-Home".',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      }
    ];
    
    setNotifications(sampleNotifications);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-lg p-4 w-80 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">
                  {notification.title}
                </div>
                <div className="text-slate-300 text-sm mt-1">
                  {notification.message}
                </div>
                <div className="text-slate-400 text-xs mt-2">
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
