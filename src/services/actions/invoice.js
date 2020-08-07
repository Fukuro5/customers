import { createAction } from 'redux-actions'

export const addInvoice = createAction(
  'ACTION_INVOICE',
  (data) => (data)
)

export const invoiceChange = createAction(
  'INVOICE_CHANGE',
  (data) => (data)
)