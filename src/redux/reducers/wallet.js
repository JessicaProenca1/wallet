import {
  moedasSucess,
  ADD_EXPENSES,
  ADD_TOTAL,
  DELETE,
  ID_EDIT,
  EXPENSES_EDIT } from '../actions';

// função reducer faz o mesmo trabalho que o setstate. O reducer modifica o state.

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0.00,
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
      total: (state.total)
        + (parseFloat(action.payload.value) * parseFloat(action.payload.ask)),
    };
  case DELETE:
    return {
      ...state,
      expenses: action.payload.novasDespesas,
      total: Math.abs(state.total - parseFloat(action.payload.totalDeletar)),
    };
  case ID_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case EXPENSES_EDIT:
    return {
      ...state,
      idToEdit: 0,
      editor: false,
      expenses: action.payload.expenses,
      total: action.payload.totalEdit,
    };
  case moedasSucess:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
