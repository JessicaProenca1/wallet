export const email = 'email';
export const walletType = 'walletType';

export const loginAction = (emailsalvo) => ({
  type: 'email',
  payload: emailsalvo,
});

export const walletAction = (walletDados) => ({
  type: 'walletType',
  payload: walletDados,
});
