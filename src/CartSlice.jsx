import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const existingItem = state.items.find((entry) => entry.name === item.name)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.name !== action.payload)
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload
      const item = state.items.find((entry) => entry.name === name)
      if (!item) return
      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.name !== name)
      } else {
        item.quantity = quantity
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer