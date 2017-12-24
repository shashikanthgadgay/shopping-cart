import { combineReducers } from 'redux';
import shoppingCart from './shoppingCart';

const reducer = {
  shoppingCart,
};

export default combineReducers(reducer);
