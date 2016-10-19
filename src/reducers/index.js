import { combineReducers } from 'redux';
import users from './users';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export const reducers = combineReducers({
    routing: routerReducer,
    users: users,
    form: formReducer
});