export const email = 'email';
export const moedaCode = 'moedaCode';
export const moedasStarted = 'moedasStarted';
export const moedasSucess = 'moedasSucess';
export const moedasFail = 'moedasFail';
export const stateDados = 'stateDados';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_TOTAL = 'ADD_TOTAL';
export const DELETE = 'DELETE';

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

export const deletar = (apagar) => ({
  type: DELETE,
  payload: apagar,
});

export const moeda = (moedas) => ({
  type: moedaCode,
  payload: moedas,
});

export const moedasActionStarted = () => ({
  type: moedasStarted,
});

export const moedasActionSucess = (data) => ({
  type: moedasSucess,
  payload: data,
});

export const moedasActionFail = (error) => ({
  type: moedasFail,
  payload: error,
});

export const moedasAPI = () => async (dispatch) => {
  dispatch(moedasActionStarted());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      dispatch(moedasActionSucess(data));
    })
    .catch((error) => dispatch(moedasActionFail(error)));
};

export const addExpensesAPI = (expenses) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
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
