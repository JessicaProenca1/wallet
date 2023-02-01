export const email = 'email';
export const walletType = 'walletType';
export const moedasStarted = 'moedasStarted';
export const moedasSucess = 'moedasSucess';
export const moedasFail = 'moedasFail';

export const loginAction = (emailsalvo) => ({
  type: 'email',
  payload: emailsalvo,
});

export const walletAction = (walletDados) => ({
  type: 'walletType',
  payload: walletDados,
});

export const moedasActionStarted = () => ({
  type: 'moedasStarted',
});

export const moedasActionSucess = (moedas) => ({
  type: 'moedasSucess',
  payload: moedas,
});

export const moedasActionFail = (error) => ({
  type: 'moedasFail',
  payload: error,
});

export const moedasAPI = () => (dispatch) => {
  dispatch(moedasActionStarted());
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const dataFilter = Object.keys(data).filter((element) => element !== 'USDT');
      dispatch(moedasActionSucess(dataFilter));
    })
    .catch((error) => dispatch(moedasActionFail(error)));
};
