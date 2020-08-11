import { addInvoice, invoiceChange } from '@/services/actions/invoice'

const initState = {
  data: null
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addInvoice}`: 
      return {
        ...state,
        // data: [
        //   ...state.data,
        //   payload
        // ]
        data: payload
      }
    case `${invoiceChange}`:
      return {
        ...state,
        data: payload
      }

    default: return state
  }
}