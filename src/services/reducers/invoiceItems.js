import { addInvoiceItems, changeProductQuantity } from '@/services/actions/invoiceItems'

const initState = {
  data: [],
  total: 0
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addInvoiceItems}`: {
      // console.log(payload)
      return {
        ...state,
        data: [
          ...state.data,
          payload
        ],
        total: state.total += payload.price 
      }
    }

    case `${changeProductQuantity}`: {
      payload.forEach((data) => {
        state.total *= data.quantity
      })
      return {
        ...state,
        data: payload,
        total: state.total
      }
    }

    default: return state
  }
}