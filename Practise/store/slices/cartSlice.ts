import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: string;
  description: string;
  category: {
    id: number;
    categoryName: string;
    categoryStatus: string;
    categoryDescription: string;
  };
  createdAt: string;
  images: {
    id: number;
    url: string;
    publicId: string;
  }[];
}

export interface CartItem {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: string;
  description: string;
  category: {
    id: number;
    categoryName: string;
    categoryStatus: string;
    categoryDescription: string;
  };
  createdAt: string;
  images: {
    id: number;
    url: string;
    publicId: string;
  }[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          productCode: product.productCode,
          productName: product.productName,
          price: product.price,
          priceFull: product.priceFull,
          productStatus: product.productStatus,
          description: product.description,
          category: product.category,
          createdAt: product.createdAt,
          images: product.images,
          quantity: 1,
        });
      }
      
      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      // Update totals
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
