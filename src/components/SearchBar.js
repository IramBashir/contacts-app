import React, { useState } from 'react';
import { TextField, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchContact, resetSearch} from '../redux/actions/contactActions';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    if (term.trim() === '') {
      dispatch(resetSearch());
    } else {
      dispatch(searchContact(term));
    }
  };
  

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <TextField
        fullWidth
        label="Search Contacts"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name..."
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                {searchTerm && (
                <IconButton
                    edge="end"
                    onClick={() => {
                    setSearchTerm(''); 
                    dispatch(resetSearch());
                    }}
                >
                    <ClearIcon />
                </IconButton>
                )}
            </InputAdornment>
            )
        }}
        />
    </Paper>
  );
};

export default SearchBar;
