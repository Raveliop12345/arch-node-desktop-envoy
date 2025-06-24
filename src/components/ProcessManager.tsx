
import React, { useState, useEffect } from 'react';
import { Window } from './Window';
import { Search, Square, AlertTriangle, Cpu, HardDrive } from 'lucide-react';

interface ProcessManagerProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped';
  user: string;
}

export const ProcessManager: React.FC<ProcessManagerProps> = ({ isActive, onClose, onFocus }) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'cpu' | 'memory'>('cpu');

  useEffect(() => {
    const generateProcesses = () => {
      const processNames = [
        'systemd', 'kthreadd', 'rcu_gp', 'rcu_par_gp', 'migration/0',
        'ksoftirqd/0', 'rcu_preempt', 'migration/1', 'ksoftirqd/1',
        'chrome', 'firefox', 'code', 'node', 'npm', 'bash', 'zsh',
        'gnome-shell', 'Xorg', 'pulseaudio', 'NetworkManager',
        'sshd', 'dbus', 'systemd-resolved', 'systemd-timesyncd'
      ];

      const mockProcesses: Process[] = processNames.map((name, index) => ({
        pid: 1000 + index,
        name,
        cpu: Math.random() * 25,
        memory: Math.random() * 15,
        status: Math.random() > 0.2 ? 'running' : Math.random() > 0.5 ? 'sleeping' : 'stopped',
        user: Math.random() > 0.3 ? 'user' : 'root'
      }));

      setProcesses(mockProcesses);
    };

    generateProcesses();
    const interval = setInterval(generateProcesses, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredProcesses = processes
    .filter(process => 
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.pid.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cpu':
          return b.cpu - a.cpu;
        case 'memory':
          return b.memory - a.memory;
        default:
          return 0;
      }
    });

  const killProcess = (pid: number) => {
    setProcesses(prev => prev.filter(p => p.pid !== pid));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <div className="w-2 h-2 bg-green-400 rounded-full" />;
      case 'sleeping':
        return <div className="w-2 h-2 bg-yellow-400 rounded-full" />;
      case 'stopped':
        return <div className="w-2 h-2 bg-red-400 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <Window
      title="Process Manager"
      isActive={isActive}
      onClose={onClose}
      onFocus={onFocus}
      width="900px"
      height="600px"
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-slate-700/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search processes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-slate-400 outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'cpu' | 'memory')}
              className="bg-slate-700/50 text-white rounded-lg px-3 py-2 outline-none"
            >
              <option value="name">Name</option>
              <option value="cpu">CPU</option>
              <option value="memory">Memory</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-green-400 mr-2" />
              <div>
                <div className="text-slate-400 text-sm">Total Processes</div>
                <div className="text-white font-semibold">{processes.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center">
              <Cpu className="w-5 h-5 text-blue-400 mr-2" />
              <div>
                <div className="text-slate-400 text-sm">Running</div>
                <div className="text-white font-semibold">
                  {processes.filter(p => p.status === 'running').length}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center">
              <HardDrive className="w-5 h-5 text-purple-400 mr-2" />
              <div>
                <div className="text-slate-400 text-sm">Sleeping</div>
                <div className="text-white font-semibold">
                  {processes.filter(p => p.status === 'sleeping').length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Table */}
        <div className="flex-1 overflow-auto bg-slate-700/30 rounded-lg">
          <table className="w-full">
            <thead className="bg-slate-700/50 sticky top-0">
              <tr className="text-left">
                <th className="p-3 text-slate-300">Status</th>
                <th className="p-3 text-slate-300">PID</th>
                <th className="p-3 text-slate-300">Name</th>
                <th className="p-3 text-slate-300">User</th>
                <th className="p-3 text-slate-300">CPU %</th>
                <th className="p-3 text-slate-300">Memory %</th>
                <th className="p-3 text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr 
                  key={process.pid}
                  className="hover:bg-slate-700/30 border-b border-slate-600/30"
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      {getStatusIcon(process.status)}
                    </div>
                  </td>
                  <td className="p-3 text-white font-mono">{process.pid}</td>
                  <td className="p-3 text-white">{process.name}</td>
                  <td className="p-3 text-slate-300">{process.user}</td>
                  <td className="p-3 text-white">{process.cpu.toFixed(1)}%</td>
                  <td className="p-3 text-white">{process.memory.toFixed(1)}%</td>
                  <td className="p-3">
                    <button
                      onClick={() => killProcess(process.pid)}
                      className="p-1 hover:bg-red-600/50 rounded transition-colors"
                      title="Kill Process"
                    >
                      <Square className="w-4 h-4 text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Window>
  );
};
