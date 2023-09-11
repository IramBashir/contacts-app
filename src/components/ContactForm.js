import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/actions/contactActions';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    formField: {
      margin: theme.spacing(1, 0),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));


const ContactForm = ({ currentContact = null }) => {
    
  const classes = useStyles();
  const [contact, setContact] = useState({
    id: currentContact ? currentContact.id : Date.now(),
    name: currentContact ? currentContact.name : '',
    contactNumber: currentContact ? currentContact.contactNumber : '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentContact) {
      dispatch(editContact(contact.id, contact));
    } else {
      dispatch(addContact(contact));
      // Reset the form after adding
      setContact({
        id: Date.now(),
        name: '',
        contactNumber: '',
      });
    }
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" component="h2">
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Name"
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className={classes.formField}
            fullWidth
          />
        </div>

        <div>
          <TextField
            label="Contact Number"
            required
            value={contact.contactNumber}
            onChange={(e) => setContact({ ...contact, contactNumber: e.target.value })}
            style={{ margin: '10px 0' }}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          {currentContact ? 'Update' : 'Add'}
        </Button>
      </form>
    </Paper>
  );
};

export default ContactForm;
