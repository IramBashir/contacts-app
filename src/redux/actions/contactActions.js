export const addContact = (contact) => ({
    type: "ADD_CONTACT",
    payload: contact
  });
  
export const editContact = (id, updatedContact) => ({
type: "EDIT_CONTACT",
payload: { id, updatedContact }
});

export const searchContact = (name) => ({
type: "SEARCH_CONTACT",
payload: name
});

//  This action will be dispatched when the user clears the search input
export const resetSearch = () => ({
type: "RESET_SEARCH",
});

export const deleteContact = (id) => ({
    type: "DELETE_CONTACT",
    payload: id,
  });
  
  
  