export enum Category {
  STARTERS = 'Starters',
  CURRIES = 'Curries',
  BREADS = 'Breads',
  RICE_BIRYANI = 'Rice & Biryani',
  DOSA_SPECIALS = 'Dosa Specials',
  DESSERTS = 'Desserts',
  TIFFIN = 'Mini Tiffin',
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: Category;
  isSignature?: boolean;
  isSpicy?: boolean;
  isJainAvailable?: boolean;
  image?: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  source: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}
