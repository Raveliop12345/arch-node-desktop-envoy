import React, { useState, useRef } from 'react';
import { X, ArrowLeft, Search, Star, Coins, Menu, Swords, Shield, Gem, ToyBrick, Puzzle, Package } from 'lucide-react';

// Import local images
import Img1 from '../store/images.jpeg';
import Img2 from '../store/images (1).jpeg';
import Img3 from '../store/images (2).jpeg';
import Img4 from '../store/3b5de488e4db8aec.png';
import Img5 from '../store/Generated Image June 22, 2025 - 3_41PM.jpeg';
import Img6 from '../store/body.png';

// Props for the main window
interface WindowProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

// Mock data for store items using local images
const featuredItems = [
  { id: 1, title: 'Cybernetic Enhancements', creator: 'Future-Tech', rating: 4.8, price: 1500, image: Img1 },
  { id: 2, title: 'Pixel Adventure World', creator: 'Retro Studios', rating: 4.5, price: 1100, image: Img2 },
  { id: 3, title: 'Steampunk Gear Pack', creator: 'Cog & Sprocket', rating: 4.6, price: 1250, image: Img3 },
  { id: 4, title: 'Galactic Arsenal', creator: 'StarForge', rating: 4.9, price: 2000, image: Img4 },
];

const bestSellingItems = [
  { id: 5, title: 'Mecha-Suit Blueprints', creator: 'Ironclad Inc.', rating: 4.7, price: 1800, image: Img5 },
  { id: 6, title: 'Holo-Pet Companion', creator: 'Digital Friends', rating: 4.4, price: 950, image: Img2 },
  { id: 7, title: 'Neon Cityscape', creator: 'Nightfall Worlds', rating: 4.8, price: 1600, image: Img3 },
];

// Item Card Component
const StoreItemCard = ({ item, large = false }) => (
  <div className={`group relative flex-shrink-0 ${large ? 'w-72' : 'w-64'} mr-4 bg-slate-800/70 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-500/20 snap-start border-2 border-transparent hover:border-blue-500`}>
    <img src={item.image} alt={item.title} className={`${large ? 'h-40' : 'h-32'} w-full object-cover transition-transform duration-300 group-hover:scale-105`} />
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-white font-bold truncate font-mono text-md">{item.title}</h3>
      <p className="text-slate-400 text-xs mb-2">By {item.creator}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-slate-300 bg-black/50 px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
          <span>{item.rating}</span>
        </div>
        <div className="flex items-center text-yellow-500 font-semibold bg-black/50 px-2 py-1 rounded-full">
          <Coins className="w-4 h-4 mr-1" />
          <span>{item.price}</span>
        </div>
      </div>
    </div>
  </div>
);

// Main Store Component
export const Store: React.FC<WindowProps> = ({ isActive, onClose, onFocus }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Packs');

  const windowClasses = `
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] max-w-6xl
    flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md 
    rounded-lg shadow-2xl border border-slate-700/50
    ${isActive ? 'z-20' : 'z-10'}
  `;

  const sidebarIcons = [
    { icon: Menu, label: 'Menu' },
    { icon: Package, label: 'Packs' },
    { icon: Swords, label: 'Mods' },
    { icon: Gem, label: 'Resources' },
    { icon: ToyBrick, label: 'Skins' },
    { icon: Puzzle, label: 'Worlds' },
  ];

  return (
    <div className={windowClasses} onClick={onFocus}>
      <div className="flex items-center justify-between p-2 bg-slate-800/80 rounded-t-lg cursor-grab text-white border-b border-slate-700/50">
        <h2 className="font-bold pl-2">Store</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-red-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <div className="w-24 bg-black/20 p-3 flex flex-col items-center space-y-4 border-r border-slate-700/50">
          {sidebarIcons.map((item) => (
            <div key={item.label} className="relative group">
              <button 
                onClick={() => setActiveCategory(item.label)}
                className={`p-4 rounded-xl w-full transition-all duration-300 transform hover:scale-110 ${activeCategory === item.label ? 'bg-blue-600/60 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800/50 hover:bg-slate-700/80'}`}>
                <item.icon className={`w-8 h-8 mx-auto transition-colors duration-300 ${activeCategory === item.label ? 'text-blue-300' : 'text-slate-400 group-hover:text-white'}`} />
              </button>
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.label}
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="flex-grow flex flex-col bg-slate-800/60 overflow-y-auto"
          style={{ backgroundImage: `url(${Img6})`, backgroundBlendMode: 'overlay', backgroundSize: 'cover' }}
        >
          <div className="flex items-center p-4 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
            <button className="p-2 rounded-full hover:bg-slate-700/50 mr-4 text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mr-auto font-mono">Marketplace</h2>
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search..." className="w-full bg-slate-900/80 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="p-8 space-y-10">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Featured</h3>
                <button className="text-sm text-blue-400 hover:underline">View All</button>
              </div>
              <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
                {featuredItems.map(item => <StoreItemCard key={item.id} item={item} />)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Best Selling</h3>
              <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
                {bestSellingItems.map(item => <StoreItemCard key={item.id} item={item} large={true} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
