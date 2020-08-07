import { combineReducers } from 'redux';
import customers from './customers'
import products from './products'
import invoice from './invoice'
import invoiceItems from './invoiceItems'

export default combineReducers({
  customers,
  products,
  invoice,
  invoiceItems,
});
