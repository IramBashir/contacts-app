import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import { Container, Typography } from '@material-ui/core';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Provider store={store}>
      <Container style={{ marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contactly - Contacts App
        </Typography>

        {/* Search Bar */}
        <SearchBar />

        {/* Contact Form */}
        <ContactForm currentContact={selectedContact} />

        {/* Contacts List */}
        <ContactList onEdit={handleEditContact} />
      </Container>
    </Provider>
  );
}

export default App;
