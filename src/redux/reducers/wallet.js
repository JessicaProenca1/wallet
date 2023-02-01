import { walletType, moedasStarted, moedasSucess, moedasFail } from '../actions';

// função reducer faz o mesmo trabalho que o setstate. O reducer modifica o state.

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: '',
  isFetchingMoedas: false,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case walletType:
    return {
      ...state,
      expenses: { ...action.payload },
    };
  case moedasStarted:
    return {
      ...state,
      isFetchingMoedas: true,
    };
  case moedasSucess:
    return {
      ...state,
      isFetchingMoedas: false,
      currencies: Object.values({ ...action.payload }),
    };
  case moedasFail:
    return {
      ...state,
      isFetchingMoedas: false,
      errorMessage: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
