import { addCustomers } from '@/services/actions/customers'

const initState = {
  data: []
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addCustomers}`: 
      return {
        ...state,
        data: payload,
    }

    default: return state
  }
}