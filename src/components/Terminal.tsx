
import React, { useState, useEffect, useRef } from 'react';
import { Window } from './Window';

interface TerminalProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export const Terminal: React.FC<TerminalProps> = ({ isActive, onClose, onFocus }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        type: 'output',
        content: 'Arch Linux Terminal Emulator v1.0',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: 'Type "help" for available commands',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command: string) => {
    const cmd = command.trim();
    if (!cmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command line to output
    const newHistory: TerminalLine[] = [
      ...history,
      {
        type: 'command',
        content: `[user@arch ~]$ ${cmd}`,
        timestamp: new Date()
      }
    ];

    // Process command
    let output = '';
    const parts = cmd.split(' ');
    const baseCmd = parts[0];

    switch (baseCmd) {
      case 'help':
        output = `Available commands:
  help          - Show this help message
  ls            - List directory contents
  pwd           - Print working directory
  whoami        - Display current user
  date          - Show current date and time
  uname         - System information
  ps            - Show running processes
  free          - Display memory usage
  df            - Show disk usage
  clear         - Clear terminal
  echo          - Display text
  cat           - Display file contents
  ping          - Ping a host
  curl          - Make HTTP requests
  systemctl     - Control systemd services
  pacman        - Package manager commands`;
        break;
      
      case 'ls':
        output = `total 32
drwxr-xr-x 2 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x 2 user user 4096 Jan 14 09:15 Downloads
drwxr-xr-x 2 user user 4096 Jan 13 14:22 Pictures
drwxr-xr-x 2 user user 4096 Jan 12 16:45 Videos
drwxr-xr-x 2 user user 4096 Jan 11 11:30 Music
-rw-r--r-- 1 user user  2048 Jan 10 08:15 config.txt
-rw-r--r-- 1 user user 15728 Jan 09 12:00 system.log`;
        break;
      
      case 'pwd':
        output = '/home/user';
        break;
      
      case 'whoami':
        output = 'user';
        break;
      
      case 'date':
        output = new Date().toString();
        break;
      
      case 'uname':
        if (parts[1] === '-a') {
          output = 'Linux arch 6.6.8-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
        } else {
          output = 'Linux';
        }
        break;
      
      case 'ps':
        output = `  PID TTY          TIME CMD
 1234 pts/0    00:00:01 bash
 1235 pts/0    00:00:00 node
 1236 pts/0    00:00:00 terminal-ui
 1237 pts/0    00:00:00 ps`;
        break;
      
      case 'free':
        output = `              total        used        free      shared  buff/cache   available
Mem:        8165324     2341256     4123068      125476     1701000     5456789
Swap:       2097148           0     2097148`;
        break;
      
      case 'df':
        output = `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20511312 8234156  11231840  43% /
/dev/sda2         524252   45123    454378  10% /boot
tmpfs            4082662       0   4082662   0% /dev/shm`;
        break;
      
      case 'clear':
        setHistory([]);
        setCurrentInput('');
        return;
      
      case 'echo':
        output = parts.slice(1).join(' ');
        break;
      
      case 'ping':
        if (parts[1]) {
          output = `PING ${parts[1]} (1.2.3.4) 56(84) bytes of data.
64 bytes from ${parts[1]} (1.2.3.4): icmp_seq=1 ttl=64 time=0.123 ms
64 bytes from ${parts[1]} (1.2.3.4): icmp_seq=2 ttl=64 time=0.156 ms
--- ${parts[1]} ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`;
        } else {
          output = 'ping: usage error: Destination address required';
        }
        break;
      
      case 'systemctl':
        if (parts[1] === 'status' && parts[2]) {
          output = `● ${parts[2]}.service - ${parts[2]} service
   Loaded: loaded (/usr/lib/systemd/system/${parts[2]}.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2024-01-15 10:30:45 UTC; 2h 15min ago
 Main PID: 1234 (${parts[2]})
    Tasks: 3 (limit: 4915)
   Memory: 24.2M
   CGroup: /system.slice/${parts[2]}.service
           └─1234 /usr/bin/${parts[2]}`;
        } else {
          output = 'systemctl: command requires additional arguments';
        }
        break;
      
      case 'pacman':
        if (parts[1] === '-Q') {
          output = `base 3-1
bash 5.2.015-1
coreutils 9.4-2
filesystem 2023.09.18-1
glibc 2.38-7
linux 6.6.8.arch1-1
pacman 6.0.2-7
systemd 254.5-1`;
        } else {
          output = 'pacman: invalid operation';
        }
        break;
      
      default:
        output = `bash: ${cmd}: command not found`;
        break;
    }

    if (output) {
      newHistory.push({
        type: baseCmd === 'help' || ['ls', 'ps', 'free', 'df'].includes(baseCmd) ? 'output' : 
              cmd.includes('not found') ? 'error' : 'output',
        content: output,
        timestamp: new Date()
      });
    }

    setHistory(newHistory);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <Window
      title="Terminal"
      isActive={isActive}
      onClose={onClose}
      onFocus={onFocus}
      width="700px"
      height="500px"
    >
      <div className="h-full bg-black p-4 font-mono text-sm">
        <div 
          ref={terminalRef}
          className="h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${
                line.type === 'command' ? 'text-green-400' :
                line.type === 'error' ? 'text-red-400' :
                'text-white'
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {line.content}
            </div>
          ))}
          
          <div className="flex items-center">
            <span className="text-green-400">[user@arch ~]$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none ml-1"
              autoFocus={isActive}
            />
          </div>
        </div>
      </div>
    </Window>
  );
};
