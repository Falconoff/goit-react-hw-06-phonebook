import { createSlice } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

// const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [] },
  // initialState: [],
  reducers: {
    setContactsAction: (state, action) => {
      console.log('action state:', state);
      return [...state.contacts.items, action.payload];
    },
    delContactAction: (state, action) =>
      state.contacts.items.filter(contact => contact.id !== action.payload),
  },
});

const persistConfig = {
  key: 'phones',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { setContactsAction, delContactAction } = contactsSlice.actions;

// SELECTORS

export const getContactsArr = state => state.contacts.items;
