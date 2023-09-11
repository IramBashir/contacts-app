import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
  contacts: contactReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
