
import React, { useState, useEffect } from 'react';
import { Window } from './Window';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Cpu, HardDrive, Wifi, Thermometer } from 'lucide-react';

interface SystemMonitorProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

interface SystemData {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export const SystemMonitor: React.FC<SystemMonitorProps> = ({ isActive, onClose, onFocus }) => {
  const [systemData, setSystemData] = useState<SystemData[]>([]);
  const [currentStats, setCurrentStats] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    temperature: 0
  });

  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      const newStats = {
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 40) + 30,
        disk: Math.floor(Math.random() * 20) + 10,
        network: Math.floor(Math.random() * 50) + 10,
        temperature: Math.floor(Math.random() * 20) + 45
      };
      
      setCurrentStats(newStats);
      
      const newDataPoint: SystemData = {
        time: timeString,
        cpu: newStats.cpu,
        memory: newStats.memory,
        disk: newStats.disk,
        network: newStats.network
      };

      setSystemData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 data points
      });
    };

    generateData(); // Initial data
    const interval = setInterval(generateData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Window
      title="System Monitor"
      isActive={isActive}
      onClose={onClose}
      onFocus={onFocus}
      width="900px"
      height="700px"
    >
      <div className="p-6 h-full overflow-auto">
        {/* System Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm">CPU Usage</div>
                <div className="text-2xl font-bold text-white">{currentStats.cpu}%</div>
              </div>
              <Cpu className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-2 bg-slate-600 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${currentStats.cpu}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm">Memory</div>
                <div className="text-2xl font-bold text-white">{currentStats.memory}%</div>
              </div>
              <HardDrive className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-2 bg-slate-600 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${currentStats.memory}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm">Network</div>
                <div className="text-2xl font-bold text-white">{currentStats.network} MB/s</div>
              </div>
              <Wifi className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-2 bg-slate-600 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(currentStats.network, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-sm">Temperature</div>
                <div className="text-2xl font-bold text-white">{currentStats.temperature}°C</div>
              </div>
              <Thermometer className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-2 bg-slate-600 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(currentStats.temperature - 30) * 2}%` }}
              />
            </div>
          </div>
        </div>

        {/* CPU Chart */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h3 className="text-white font-semibold mb-4">CPU Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={systemData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#334155', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="cpu" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Memory Chart */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <h3 className="text-white font-semibold mb-4">Memory Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={systemData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#334155', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="memory" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Information */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4">System Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400">OS</div>
              <div className="text-white">Arch Linux x86_64</div>
            </div>
            <div>
              <div className="text-slate-400">Kernel</div>
              <div className="text-white">6.6.8-arch1-1</div>
            </div>
            <div>
              <div className="text-slate-400">Uptime</div>
              <div className="text-white">2h 34m</div>
            </div>
            <div>
              <div className="text-slate-400">CPU</div>
              <div className="text-white">Intel Core i7-12700K</div>
            </div>
            <div>
              <div className="text-slate-400">Memory</div>
              <div className="text-white">16 GB DDR4</div>
            </div>
            <div>
              <div className="text-slate-400">Storage</div>
              <div className="text-white">512 GB NVMe SSD</div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};
