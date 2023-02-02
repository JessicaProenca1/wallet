export const email = 'email';
export const moedaCode = 'moedaCode';
export const moedasStarted = 'moedasStarted';
export const moedasSucess = 'moedasSucess';
export const moedasFail = 'moedasFail';
export const stateDados = 'stateDados';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const loginAction = (emailsalvo) => ({
  type: email,
  payload: emailsalvo,
});

export const addExpenses = (add) => ({
  type: ADD_EXPENSES,
  payload: add,
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
      dispatch(addExpenses({ ...expenses, exchangeRates: data }));
    });
};
