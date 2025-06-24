import React from 'react';
import { X } from 'lucide-react';

interface WindowProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

export const Store: React.FC<WindowProps> = ({ isActive, onClose, onFocus }) => {
  const windowClasses = `
    absolute top-1/4 left-1/4 w-1/2 h-1/2 
    flex flex-col bg-slate-800/90 backdrop-blur-md 
    rounded-lg shadow-2xl border border-slate-600/50
    ${isActive ? 'z-20' : 'z-10'}
  `;

  return (
    <div className={windowClasses} onClick={onFocus}>
      <div className="flex items-center justify-between p-2 bg-slate-700/80 rounded-t-lg cursor-grab">
        <h2 className="text-white font-bold">Store</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-red-500">
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="p-4 flex-grow text-white">
        <h3 className="text-xl font-semibold mb-4">Gestionnaire de Paquets</h3>
        <p>Bientôt disponible... Ici, vous pourrez gérer les paquets de votre système, télécharger des logiciels, ainsi que des mods et des packs de ressources pour Minecraft.</p>
      </div>
    </div>
  );
};
