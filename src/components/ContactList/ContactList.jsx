import { List, ListItem, Button } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { getAllContacts } from 'redux/selectors/selectors';

export const ContactList = () => {
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  return (
    <>
      <List>
        {contacts.map(({ name, id, phone }) => {
          return (
            <ListItem key={id}>
              {name} : {phone}
              <Button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
