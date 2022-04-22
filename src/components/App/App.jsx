// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

// import {
//   setContactsAction,
//   delContactAction,
//   filterAction,
// } from '../../redux/store';

import { setContactsAction, delContactAction } from '../../redux/contactsSlice';
import { filterAction } from '../../redux/filterSlice';

import { Container, TitleMain, TitleSecond } from './App.styled';

// const LS_KEY = 'contacts';

function App() {
  // =====================================================
  // State. Contacts from localStorage
  // const [contacts, setContacts] = useState(
  //   () => JSON.parse(window.localStorage.getItem(LS_KEY)) ?? []
  // );

  // const [contacts, setContacts] = useState([]);
  // const [filter, setFilter] = useState('');
  // =====================================================

  // --- REDUX ---
  const dispatch = useDispatch();

  // console.log(
  //   'App state.contacts: ',
  //   useSelector(state => state.contacts.items)
  // );
  // console.log(
  //   'App state.filter: ',
  //   useSelector(state => state.filter)
  // );

  const contacts = useSelector(state => state.contacts.items);
  // console.log('contacts', contacts);

  const filter = useSelector(state => state.contacts.filter);
  // console.log('filter:', filter);

  // =====================================================

  // for filter
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const formSubmitHandler = data => {
    // checking name for matches
    const normalizedName = data.name.toLowerCase();
    const isFoundName = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    // if already exist - show message
    if (isFoundName) {
      toast.error(`${data.name} is already in contacts!`);
      return;
    }
    // if not found, add new contact
    const newData = { id: nanoid(5), ...data };

    // setContacts(prevState => [...prevState, newData]); // old

    // --- REDUX ---
    dispatch(setContactsAction(newData));
    // console.log('1::');
    // console.log('2::');
    // console.log('3::');

    toast.success('Successfully added!');
  };

  const changeFilter = evt => {
    // setFilter(evt.currentTarget.value);
    // console.log('3::', evt.currentTarget.value);
    dispatch(filterAction(evt.currentTarget.value));
  };

  // const deleteContact = id => {
  //   setContacts(prevState => prevState.filter(contact => contact.id !== id));
  // };

  // dispatch(setContactsAction(newData));
  const deleteContact = id => {
    dispatch(delContactAction(id));
    //   setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  // contacts were updated!
  useEffect(() => {
    // window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    if (contacts.length === 0) {
      toast.error('Phonebook is empty!');
    }
  }, [contacts]);

  return (
    <Container>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
          },
        }}
      />
      <TitleMain>Phonebook</TitleMain>
      <Form onSubmit={formSubmitHandler} />
      <TitleSecond>Contacts</TitleSecond>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts arr={filteredContacts} onDelContact={deleteContact} />
    </Container>
  );
}

export default App;
