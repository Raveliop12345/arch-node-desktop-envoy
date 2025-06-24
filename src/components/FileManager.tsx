
import React, { useState, useEffect } from 'react';
import { Window } from './Window';
import { 
  Folder, 
  File, 
  Home, 
  HardDrive, 
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Search,
  Grid,
  List
} from 'lucide-react';

interface FileManagerProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
  icon?: string;
}

export const FileManager: React.FC<FileManagerProps> = ({ isActive, onClose, onFocus }) => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate file system
    const mockFiles: FileItem[] = [
      { name: 'Documents', type: 'folder', modified: '2024-01-15' },
      { name: 'Downloads', type: 'folder', modified: '2024-01-14' },
      { name: 'Pictures', type: 'folder', modified: '2024-01-13' },
      { name: 'Videos', type: 'folder', modified: '2024-01-12' },
      { name: 'Music', type: 'folder', modified: '2024-01-11' },
      { name: 'Desktop', type: 'folder', modified: '2024-01-10' },
      { name: 'config.txt', type: 'file', size: '2.3 KB', modified: '2024-01-09' },
      { name: 'system.log', type: 'file', size: '15.7 MB', modified: '2024-01-08' },
      { name: 'install.sh', type: 'file', size: '1.2 KB', modified: '2024-01-07' },
    ];
    setFiles(mockFiles);
  }, [currentPath]);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pathSegments = currentPath.split('/').filter(segment => segment !== '');

  return (
    <Window
      title="File Manager"
      isActive={isActive}
      onClose={onClose}
      onFocus={onFocus}
      width="800px"
      height="600px"
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-600/50">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <ArrowRight className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <Home className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-700/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-slate-400 outline-none"
              />
            </div>
            <button
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600' : 'hover:bg-slate-700/50'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-5 h-5 text-white" />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600' : 'hover:bg-slate-700/50'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center p-4 text-sm text-slate-300 border-b border-slate-600/50">
          <HardDrive className="w-4 h-4 mr-2" />
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <span className="hover:text-white cursor-pointer">{segment}</span>
              {index < pathSegments.length - 1 && <ChevronRight className="w-4 h-4 mx-1" />}
            </React.Fragment>
          ))}
        </div>

        {/* File List */}
        <div className="flex-1 p-4 overflow-auto">
          {viewMode === 'list' ? (
            <div className="space-y-1">
              {filteredFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-slate-700/30 rounded-lg cursor-pointer transition-colors"
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-blue-400 mr-3" />
                  ) : (
                    <File className="w-5 h-5 text-slate-400 mr-3" />
                  )}
                  <div className="flex-1">
                    <div className="text-white">{file.name}</div>
                    {file.size && (
                      <div className="text-xs text-slate-400">{file.size}</div>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {file.modified}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {filteredFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 hover:bg-slate-700/30 rounded-lg cursor-pointer transition-colors"
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-12 h-12 text-blue-400 mb-2" />
                  ) : (
                    <File className="w-12 h-12 text-slate-400 mb-2" />
                  )}
                  <div className="text-white text-sm text-center truncate w-full">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};
