import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { Category, MenuItem } from '../types';
import { Leaf, Flame, Star } from 'lucide-react';

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <div className="group flex items-start justify-between p-4 border-b border-dashed border-shastra-maroon/20 hover:bg-shastra-cream/50 transition-colors rounded-lg">
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg md:text-xl font-serif text-shastra-dark font-medium group-hover:text-shastra-maroon transition-colors">
            {item.name}
          </h3>
          <div className="flex gap-1">
            {item.isSignature && (
              <span title="Signature Dish" className="text-shastra-gold animate-pulse">
                <Star size={14} fill="currentColor" />
              </span>
            )}
            {item.isSpicy && (
               <span title="Spicy" className="text-red-500">
                <Flame size={14} fill="currentColor" />
              </span>
            )}
            {item.isJainAvailable && (
               <span title="Jain Option Available" className="text-green-600">
                <Leaf size={14} />
              </span>
            )}
          </div>
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 font-sans leading-relaxed">{item.description}</p>
        )}
      </div>
      <div className="text-right">
        <span className="text-lg font-semibold text-shastra-maroon font-sans">₹{item.price}</span>
      </div>
    </div>
  );
};

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.DOSA_SPECIALS);

  const categories = Object.values(Category);
  
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-white relative overflow-hidden scroll-mt-20">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-shastra-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h4 className="text-shastra-gold font-sans font-semibold tracking-widest uppercase text-sm mb-2">Taste the Tradition</h4>
          <h2 className="text-4xl md:text-5xl font-serif text-shastra-maroon font-medium">Digital Menu</h2>
          <div className="w-24 h-1 bg-shastra-gold mx-auto mt-6"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 font-sans ${
                activeCategory === cat
                  ? 'bg-shastra-maroon text-white shadow-lg shadow-shastra-maroon/20'
                  : 'bg-shastra-sand/30 text-shastra-maroon hover:bg-shastra-sand/60 border border-shastra-maroon/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-serif italic">
                More delicious items coming soon in this category.
            </div>
        )}
      </div>
    </section>
  );
};