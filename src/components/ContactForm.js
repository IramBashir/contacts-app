import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../redux/actions/contactActions';

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


const ContactForm = ({ currentContact = null, setCurrentContact }) => {
    
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

  const resetForm = () => {
        setContact({
            id: Date.now(),
            name: '',
            contactNumber: '',
        });
        if (setCurrentContact) setCurrentContact(null);  // reset currentContact to null
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentContact) {
            dispatch(editContact(contact.id, contact));
            resetForm(); // Resetting after updating
        } else {
            dispatch(addContact(contact));
            resetForm(); // Resetting after adding
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

        {currentContact ? (
            <>
                <Button variant="contained" color="primary" type="submit" className={classes.submitButton} >
                    Update
                </Button>
                <Button
                    variant="contained"
                    style={{ marginLeft: '10px', marginTop: '16px' }}
                    onClick={resetForm}
                >
                    Cancel
                </Button>
            </>
        ) : (
            <Button variant="contained" color="primary" type="submit" className={classes.submitButton}>
                Add
            </Button>
        )}
      </form>
    </Paper>
  );
};

export default ContactForm;
