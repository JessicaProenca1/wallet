import { walletType } from '../actions';

// função reducer faz o mesmo trabalho que o setstate. O reducer modifica o state.

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case walletType:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
