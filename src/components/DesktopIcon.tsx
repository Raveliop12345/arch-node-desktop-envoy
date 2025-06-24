
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 group"
      onClick={onClick}
    >
      <div className="p-3 bg-slate-700/50 rounded-lg mb-2 group-hover:bg-slate-600/50 transition-colors">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-white text-sm text-center max-w-16 truncate">
        {label}
      </span>
    </div>
  );
};
