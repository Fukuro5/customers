import { createAccount } from '@/services/actions/accounts';

const initState = {
  currentUser: '',
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case createAccount.toString():
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
