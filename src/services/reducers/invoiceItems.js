import { addInvoiceItems, loadInvoicesItems, changeProductQuantity, deleteInvoiceItems } from '@/services/actions/invoiceItems'

const initState = {
  data: [],
  total: 0
}

export default (state = initState, { type, payload}) => {
  switch(type) {
    case `${addInvoiceItems}`: {
      if(payload.id != state.data.map(item => item.id)) {
        return {
          ...state,
          data: [
            ...state.data,
            payload
          ],
          total: state.total += payload.price 
        }
      }
      else return state
    }

    case `${loadInvoicesItems}`: {
      let tmp = 0
      tmp += payload.price
      if(state.total == tmp) {
        state.total = 0
      }

      if(state.data.map(el => el.id) == payload.id){
        return state
      }
      else return {
        ...state,
        data: [
          ...state.data,
          payload
        ],
        total: state.total += payload.price 
      }
    }

    case `${changeProductQuantity}`: {
      let sum = 0
      state.data.forEach(prod => {
        sum += prod.price * prod.quantity
      })
      return {
        ...state,
        data: payload,
        total: sum
      }
    }

    case `${deleteInvoiceItems}`: {
      let sum = 0
      const arr = state.data.filter(prod => {
        if(prod.id != payload) return prod
      })
      arr.forEach(prod => {
        sum += prod.price * prod.quantity
      })
      return {
        data: arr,
        total: sum
      }
    }

    default: return state
  }
}