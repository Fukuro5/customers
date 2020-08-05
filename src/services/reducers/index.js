import { combineReducers } from 'redux';
import customers from './customers'
import products from './products'
import invoice from './invoice'

export default combineReducers({
  customers,
  products,
  invoice,
});
