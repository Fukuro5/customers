import { createAction } from 'redux-actions'

export const addInvoiceItems = createAction(
  'ACTION_INVOICE_ITEMS',
  (data) => (data)
)

export const changeProductQuantity = createAction(
  'ACTION_PRODUCT_CHANGE',
  (data) => (data)
)