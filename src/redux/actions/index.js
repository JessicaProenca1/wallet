export const email = 'email';
export const moedasSucess = 'moedasSucess';
export const stateDados = 'stateDados';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_TOTAL = 'ADD_TOTAL';
export const DELETE = 'DELETE';
export const ID_EDIT = 'ID_EDIT';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';

export const loginAction = (emailsalvo) => ({
  type: email,
  payload: emailsalvo,
});

export const addExpenses = (add) => ({
  type: ADD_EXPENSES,
  payload: add,
});

export const addTotal = (value, ask) => ({
  type: ADD_TOTAL,
  payload: { value, ask },
});

export const deletar = (novasDespesas, totalDeletar) => ({
  type: DELETE,
  payload: {
    novasDespesas,
    totalDeletar,
  },
});

export const editExpensesAction = (expenses, totalEdit) => ({
  type: EXPENSES_EDIT,
  payload: {
    expenses,
    totalEdit,
  },
});

export const edit = (id) => ({
  type: ID_EDIT,
  payload: id,
});

export const moedasActionSucess = (data) => ({
  type: moedasSucess,
  payload: data,
});

export const moedasAPI = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      dispatch(moedasActionSucess(data));
    });
};

export const addExpensesAPI = (expenses) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      if (expenses.currency === '') {
        expenses.currency = 'USD';
      }
      const dadosCode = Object.values(data)
        .find((code) => code.code === expenses.currency);
      const cotacao = dadosCode.ask;
      dispatch(addExpenses({
        ...expenses,
        exchangeRates: data,
      }));
      dispatch(addTotal(expenses.value, cotacao));
    });
};
