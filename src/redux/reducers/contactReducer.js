const initialState = {
    contacts: [],
    filteredContacts: []
  };
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        return { ...state, contacts: [...state.contacts, action.payload] };
      case "EDIT_CONTACT":
        return {
          ...state,
          contacts: state.contacts.map((contact) => contact.id === action.payload.id ? action.payload.updatedContact : contact)
        };
    case "SEARCH_CONTACT":
        return {
            ...state,
            filteredContacts: state.contacts.filter((contact) => contact.name.toLowerCase().includes(action.payload.toLowerCase()))
        };
    case "RESET_SEARCH":
        return {
            ...state,
            filteredContacts: []
        };
    default:
    return state;
    }
  };
  
  export default contactReducer;
  