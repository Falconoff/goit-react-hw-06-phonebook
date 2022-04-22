import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];

export const contactsSlice = createSlice({
  name: 'items',
  // initialState: { items: [] },
  initialState: [],
  reducers: {
    setContactsAction: (state, action) => [...state, action.payload],
    delContactAction: (state, action) =>
      state.filter(contact => contact.id !== action.payload),
  },
});

export const { setContactsAction, delContactAction } = contactsSlice.actions;

// export default contactsSlice.reducer;
