import React from 'react';
import { X, ArrowLeft, Search, Star, Coins, Menu, Swords, Shield, Gem, ToyBrick, Puzzle, Package } from 'lucide-react';

// Props for the main window
interface WindowProps {
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

// Mock data for store items
const featuredItems = [
  { id: 1, title: 'SpongeBob SquarePants', creator: 'Spark Universe', rating: 4.7, price: 1340, image: 'https://via.placeholder.com/300x150/1a202c/FFFFFF?text=SpongeBob' },
  { id: 2, title: 'Avatar Legends', creator: 'Gamemode One', rating: 4.6, price: 1340, image: 'https://via.placeholder.com/300x150/1a202c/FFFFFF?text=Avatar' },
  { id: 3, title: 'TrueRealism HD', creator: 'Pathway Studios', rating: 4.2, price: 990, image: 'https://via.placeholder.com/300x150/1a202c/FFFFFF?text=Realism' },
  { id: 4, title: 'Batman', creator: 'Noxcrew', rating: 4.6, price: 1340, image: 'https://via.placeholder.com/300x150/1a202c/FFFFFF?text=Batman' },
];

const bestSellingItems = [
  { id: 5, title: 'LASER BLASTERS', creator: 'The Misfit Society', rating: 4.6, price: 830, image: 'https://via.placeholder.com/300x200/1a202c/FFFFFF?text=Lasers' },
  { id: 6, title: 'X-RAY', creator: 'd6b', rating: 3.8, price: 660, image: 'https://via.placeholder.com/300x200/1a202c/FFFFFF?text=X-Ray' },
  { id: 7, title: 'Avatar Legends', creator: 'Gamemode One', rating: 4.6, price: 1340, image: 'https://via.placeholder.com/300x200/1a202c/FFFFFF?text=Avatar' },
];

// Item Card Component
const StoreItemCard = ({ item, large = false }) => (
  <div className="flex-shrink-0 w-64 mr-4 bg-slate-700/50 rounded-lg overflow-hidden snap-start">
    <img src={item.image} alt={item.title} className={`${large ? 'h-40' : 'h-32'} w-full object-cover`} />
    <div className="p-3">
      <h3 className="text-white font-bold truncate">{item.title}</h3>
      <p className="text-slate-400 text-xs mb-2">By {item.creator}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-slate-300">
          <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
          <span>{item.rating}</span>
        </div>
        <div className="flex items-center text-yellow-500 font-semibold">
          <Coins className="w-4 h-4 mr-1" />
          <span>{item.price}</span>
        </div>
      </div>
    </div>
  </div>
);

// Main Store Component
export const Store: React.FC<WindowProps> = ({ isActive, onClose, onFocus }) => {
  const windowClasses = `
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] max-w-6xl
    flex flex-col bg-slate-900/90 backdrop-blur-md 
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
      {/* Window Header */}
      <div className="flex items-center justify-between p-2 bg-slate-800/80 rounded-t-lg cursor-grab text-white">
        <h2 className="font-bold">Store</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-red-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 bg-slate-900/50 p-2 flex flex-col items-center space-y-4">
          {sidebarIcons.map((item, index) => (
            <button key={index} className="p-3 rounded-lg hover:bg-slate-700/60 transition-colors w-full">
              <item.icon className="w-8 h-8 mx-auto text-slate-300" />
            </button>
          ))}
        </div>

        {/* Store Content */}
        <div className="flex-grow flex flex-col bg-slate-800/60 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center p-4 bg-slate-800/70 sticky top-0 z-10">
            <button className="p-2 rounded-full hover:bg-slate-700/50 mr-4 text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mr-auto">Marketplace</h2>
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search..." className="w-full bg-slate-900/80 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-8">
            {/* Featured Carousel */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Featured</h3>
                <button className="text-sm text-blue-400 hover:underline">View All</button>
              </div>
              <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory">
                {featuredItems.map(item => <StoreItemCard key={item.id} item={item} />)}
              </div>
            </div>

            {/* Best Selling Carousel */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Best Selling</h3>
              <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory">
                {bestSellingItems.map(item => <StoreItemCard key={item.id} item={item} large={true} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
