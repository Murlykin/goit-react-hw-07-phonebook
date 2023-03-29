import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from 'redux/selectors/selectors';
import { ThreeDots } from 'react-loader-spinner';
import { fetchContacts } from "redux/operations";
import { getAllContacts } from 'redux/selectors/selectors';
import { ContactsTitle, Container, Title } from './App.styled';
import { GlobalStyle } from 'components/GlobalStyle';

export const App = () => {
  const contacts = useSelector(getAllContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  return (
    <Container>
         <GlobalStyle />
        <Title>Phonebook</Title>
        <ContactForm />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        {isLoading&&!error?<div><ThreeDots /></div>:<ContactList />}
        {!contacts.length && <p>There are no contacts in the Phonebook</p>}
    
      </Container>

  );
};
