import { useState } from 'react';
import shortid from 'shortid';
import { addContact } from '../../redux/operations';
import { getContactsValue } from 'redux/selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Label } from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(getContactsValue);

  const dispatch = useDispatch();
  const id = shortid.generate();

  const createContact = ({ name, phone }) => ({
    id: id,
    name,
    phone,
  });

  const addContactToState = contact => dispatch(addContact(contact));

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userName = contacts.find(
      user => user.name.toLocaleLowerCase() === name.toLowerCase()
    );
    if (userName) {
      alert(`${name} is already in contacs`);
    } else {
      addContactToState(createContact({ name, phone }));
      reset();
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>Name</Label>

      <Input
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
      />

      <Label>
        phone
        <Input
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </Label>
      <Button>Add contact</Button>
    </form>
  );
};
