/*import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

export const setContactsAction = createAction('contacts/setContacts');
// console.log(setContacts('qwe'));

export const delContactAction = createAction('contacts/delContact');

export const filterAction = createAction('contacts/filter');
  // console.log(filterAction('rty'));
  // console.log(filterAction.toString('rty'));
  // console.log(filterAction('rty').type);

const setContactsReducer = createReducer([], {
  [setContactsAction]: (state, action) => [...state, action.payload],
  [delContactAction]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
});

const filterReducer = createReducer('', {
  [filterAction]: (state, action) => action.payload,
});

export const store = configureStore({
  reducer: {
    // myValue: myReducer,
    contacts: setContactsReducer,
    filter: filterReducer,
  },
});
*/
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: combineReducers({
      items: contactsSlice.reducer,
      filter: filterSlice.reducer,
    }),
  },
});
