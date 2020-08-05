import { addInvoice } from '@/services/actions/invoice'

const initState = {
  data: []
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addInvoice}`: 
      return {
        ...state,
        data: [
          ...state.data,
          payload
        ]
    }

    default: return state
  }
}