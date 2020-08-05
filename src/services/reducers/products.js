import { addProducts } from '@/services/actions/products'

const initState = {
  data: []
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addProducts}`: 
      return {
        ...state,
        data: payload,
    }

    default: return state
  }
}