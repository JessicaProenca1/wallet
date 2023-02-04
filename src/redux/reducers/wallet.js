import {
  moedasStarted,
  moedasSucess,
  moedasFail,
  moedaCode,
  ADD_EXPENSES,
  ADD_TOTAL,
  DELETE } from '../actions';

// função reducer faz o mesmo trabalho que o setstate. O reducer modifica o state.

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: '',
  isFetchingMoedas: false,
  total: 0,
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ADD_TOTAL:
    return {
      ...state,
      total: (state.total
        + (parseFloat(action.payload.value) * parseFloat(action.payload.ask))),
    };
  case DELETE:
    return {
      ...state,
      expenses: action.payload,

    };
  case moedaCode:
    return {
      ...state,
      currencies: Object.values({ ...action.payload }),
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
      currencies: Object.keys(action.payload),
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
