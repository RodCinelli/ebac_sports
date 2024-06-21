// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  items: { id: number; name: string; quantity: number }[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
