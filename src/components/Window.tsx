
import React, { useState, useRef, useEffect } from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  width?: string;
  height?: string;
  initialX?: number;
  initialY?: number;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  isActive,
  onClose,
  onFocus,
  width = '600px',
  height = '400px',
  initialX = 100,
  initialY = 100
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      onFocus();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: Math.max(0, e.clientY - dragStart.y)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 56px)', // Account for taskbar
        transform: 'none'
      }
    : {
        top: position.y,
        left: position.x,
        width,
        height,
        transform: 'none'
      };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-slate-800 border border-slate-600/50 rounded-lg shadow-2xl overflow-hidden transition-all duration-200 ${
        isActive ? 'z-40' : 'z-30'
      }`}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-10 bg-slate-700/80 border-b border-slate-600/50 flex items-center justify-between px-4 cursor-move select-none ${
          isActive ? 'bg-slate-700' : 'bg-slate-700/60'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="text-white font-medium text-sm">{title}</div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 hover:bg-slate-600/50 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Minimize functionality would go here
            }}
          >
            <Minimize2 className="w-4 h-4 text-slate-300" />
          </button>
          <button
            className="p-1 hover:bg-slate-600/50 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
          >
            <Maximize2 className="w-4 h-4 text-slate-300" />
          </button>
          <button
            className="p-1 hover:bg-red-600/50 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full bg-slate-800 text-white overflow-hidden">
        {children}
      </div>
    </div>
  );
};
