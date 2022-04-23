import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

import {
  setContactsAction,
  delContactAction,
  getContactsArr,
} from '../../redux/contactsSlice';
import { filterAction, getFilterValue } from '../../redux/filterSlice';

import { Container, TitleMain, TitleSecond } from './App.styled';

function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(getContactsArr);

  const filter = useSelector(getFilterValue);

  const changeFilter = evt => dispatch(filterAction(evt.currentTarget.value));

  const deleteContact = id => dispatch(delContactAction(id));

  // =====================================================

  // for filter
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  // add new contact
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
    dispatch(setContactsAction(newData));
    toast.success('Successfully added!');
  };

  // contacts were updated!
  useEffect(() => {
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
