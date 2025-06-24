
import React from 'react';

interface DesktopIconProps {
  icon: React.ElementType | string;
  label: string;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  const IconComponent = icon as React.ElementType;
  return (
    <div 
      className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 group"
      onClick={onClick}
    >
      <div className="mb-2">
        {typeof icon === 'string' ? (
          <img src={icon} alt={label} className="w-12 h-12 object-contain" />
        ) : (
          <IconComponent className="w-12 h-12 text-white" />
        )}
      </div>
      <span className="text-white text-sm text-center max-w-16 truncate">
        {label}
      </span>
    </div>
  );
};
