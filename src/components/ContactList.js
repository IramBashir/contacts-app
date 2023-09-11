
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { editContact, deleteContact } from '../redux/actions/contactActions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const ContactList = ({ onEdit }) => {

    const contacts = useSelector((state) => 
        state.contacts.filteredContacts.length 
        ? state.contacts.filteredContacts 
        : state.contacts.contacts
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    
    const dispatch = useDispatch();

    const handleEdit = (contact) => {
        onEdit(contact);
    };

    const handleDelete = (id) => {
        // For now, we'll simply filter out the contact. However, this isn't persistent.
        // In a more complete application, you'd want to handle this in your Redux store.
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        dispatch(editContact(updatedContacts));
    };

    const handleDeleteDialog = (id) => {
        setContactToDelete(id);
        setDialogOpen(true);
      };
      
    

    const handleConfirmDelete = (id) => {
        // Here you'll dispatch the action to delete the contact
        dispatch(deleteContact(id));
        // After deletion, reset contactToDelete
        setContactToDelete(null);
    };
  
    return (
        <Paper style={{ margin: '20px' }}>
        <Typography variant="h5" component="h2" style={{ padding: '20px' }}>
            Contacts
        </Typography>

        <List>
            {contacts.map((contact) => (
            <ListItem key={contact.id}>
                <ListItemText primary={contact.name} secondary={contact.contactNumber} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(contact)}>
                        <EditIcon />
                    </IconButton>
                    {/* <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(contact.id)}>
                        <DeleteIcon />
                    </IconButton> */}
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDialog(contact.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ))}
        </List>

        {contacts.length === 0 && (
            <Typography variant="body1" style={{ textAlign: 'center', padding: '20px' }}>
            No contacts available. Add some!
            </Typography>
        )}

        <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Delete Contact?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
            </Button>
            <Button 
            onClick={() => {
                handleConfirmDelete(contactToDelete);
                setDialogOpen(false);
            }} 
            color="primary" 
            autoFocus
            >
            Delete
            </Button>
        </DialogActions>
        </Dialog>


        </Paper>
    );
};

export default ContactList;
