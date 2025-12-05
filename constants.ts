import { Category, MenuItem, Review } from './types';

// Orange 'U' Logo SVG Data URI
export const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYjkyM2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlYTU4MGMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjEyOCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0xNzYgMTYwdjE2MGE4MCA4MCAwIDAgMCAxNjAgMFYxNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2NCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+";

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Gobi 65', price: 180, category: Category.STARTERS, isSignature: false },
  { id: 's2', name: 'Veg Kola Urundai (4 Pcs)', price: 150, category: Category.STARTERS, isSignature: true, description: 'Traditional spice-blended vegetable dumplings' },
  { id: 's3', name: 'Mushroom 65', price: 220, category: Category.STARTERS },
  { id: 's4', name: 'Veg Chukka Namma Madurai Style', price: 240, category: Category.STARTERS, description: 'Veg meat and curry leaf delight' },
  { id: 's5', name: 'Zafrani Paneer Tikka', price: 320, category: Category.STARTERS, isSignature: true, description: 'Rich saffron infused paneer' },
  { id: 's6', name: 'Tandoori Platter', price: 445, category: Category.STARTERS, isSignature: true, description: 'Assortment of tikka and kebabs' },
  { id: 's7', name: 'Mushroom Cheese Stuffed Tikka', price: 325, category: Category.STARTERS, isSignature: true },

  // Dosa Specials (Bangalore Style & Festival)
  { id: 'd1', name: 'Open Benne Masala Dosa', price: 140, category: Category.DOSA_SPECIALS, isSignature: true, image: 'https://picsum.photos/id/493/400/300' },
  { id: 'd2', name: 'Ghee Podi Thattu Idly', price: 110, category: Category.DOSA_SPECIALS, image: 'https://picsum.photos/id/22/400/300' },
  { id: 'd3', name: 'Mushroom Masala Dosa', price: 160, category: Category.DOSA_SPECIALS },
  { id: 'd4', name: 'Ghee Kaara Masala Dosa', price: 130, category: Category.DOSA_SPECIALS, isSpicy: true },
  { id: 'd5', name: 'Set Dosa with Veg Paaya', price: 150, category: Category.DOSA_SPECIALS },

  // Rice & Biryani
  { id: 'r1', name: 'Kongu Biriyani with Veg Meat', price: 290, category: Category.RICE_BIRYANI, isSignature: true, description: 'Shastra Special Biriyani you cannot miss' },
  { id: 'r2', name: 'Hyderabadi Paneer Biryani', price: 250, category: Category.RICE_BIRYANI, description: 'Basmati Rice, Spicy Manavadu style' },
  { id: 'r3', name: 'Mushroom Thokku Biryani', price: 250, category: Category.RICE_BIRYANI },
  { id: 'r4', name: 'Zafrani Cashew Pulao', price: 280, category: Category.RICE_BIRYANI },

  // Curries
  { id: 'c1', name: 'Paneer Butter Masala', price: 260, category: Category.CURRIES, isJainAvailable: true },
  { id: 'c2', name: 'Paneer Chettinadu', price: 270, category: Category.CURRIES, isSpicy: true },
  { id: 'c3', name: 'Dal Makhani', price: 240, category: Category.CURRIES },
  { id: 'c4', name: 'Veg Malai Kofta', price: 260, category: Category.CURRIES, isJainAvailable: true },

  // Breads
  { id: 'b1', name: 'Coin Parotta', price: 65, category: Category.BREADS, isSignature: true },
  { id: 'b2', name: 'Butter Naan', price: 90, category: Category.BREADS, isJainAvailable: true },
  { id: 'b3', name: 'Garlic Naan', price: 110, category: Category.BREADS },
  { id: 'b4', name: 'Wheat Parotta', price: 75, category: Category.BREADS },

  // Desserts
  { id: 'de1', name: 'Shastra Special Falooda', price: 220, category: Category.DESSERTS, isSignature: true },
  { id: 'de2', name: 'Rose Milk Cake (Tres Leches)', price: 190, category: Category.DESSERTS },
  { id: 'de3', name: 'Sizzler Brownie', price: 240, category: Category.DESSERTS },
  { id: 'de4', name: 'Tiramisu (Eggless)', price: 210, category: Category.DESSERTS },
  { id: 'de5', name: 'Elaneer Payasam', price: 140, category: Category.DESSERTS, description: 'Classic tender coconut delight' },

  // Tiffin
  { id: 't1', name: 'Mini Tiffin Combo', price: 65, category: Category.TIFFIN, isSignature: true, description: 'Idly, Vada, Pongal, Coffee/Sweet. Available till 10 AM.' },
  { id: 't2', name: 'Bun Butter Jam', price: 80, category: Category.TIFFIN, description: 'Chennai famous classic' },
];

export const REVIEWS: Review[] = [
  { id: 1, name: "Arjun K.", rating: 5, comment: "A new vegetarian gem in Mogappair West! The vintage interiors are stunning.", source: "Google Review" },
  { id: 2, name: "Divya S.", rating: 5, comment: "Lovely ambience, awesome service. The Valet parking is a huge plus.", source: "Google Review" },
  { id: 3, name: "Ramesh P.", rating: 4, comment: "South Indian meals were absolutely delicious. Service was a bit slow due to crowd, but worth the wait.", source: "Google Review" },
  { id: 4, name: "Anita M.", rating: 5, comment: "The Benne Dosa is to die for. Reminds me of Bangalore. Highly recommended!", source: "Google Review" },
  { id: 5, name: "Karthik R.", rating: 5, comment: "Clean ambience and very warm hospitality. The Mushroom Biryani is a must-try.", source: "Google Review" },
];