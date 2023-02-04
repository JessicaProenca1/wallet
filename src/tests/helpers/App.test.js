import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import mockFetch from './mockFetch';

describe('Login TrybeWallet', () => {
  const meuEmail = 'je.proenca@yahoo.com.br';
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Verifica se a tela Login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const headingElement = screen.getByRole('heading', { level: 1, name: /Faça o seu login/i });
    const buttonElement = screen.queryAllByRole('button');

    expect(headingElement).toBeInTheDocument();
    expect(buttonElement.length).toBe(1);
  });

  test('Verifica se o email é renderizado na tela da carteira', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, meuEmail);
    expect(emailInput.value).toBe(meuEmail);

    const senhaInput = screen.getByTestId('password-input');
    expect(senhaInput).toBeInTheDocument();
    userEvent.type(senhaInput, '123456');
    expect(senhaInput.value).toBe('123456');

    const loginButton = screen.getByRole('button');
    userEvent.click(loginButton);

    expect(screen.getByText(meuEmail)).toBeInTheDocument();
  });

  test('Verifica se a página renderiza o form', () => {
    renderWithRouterAndRedux(<App />);
    // para acessar à página da carteira
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, meuEmail);
    expect(emailInput.value).toBe(meuEmail);
    const senhaInput = screen.getByTestId('password-input');
    expect(senhaInput).toBeInTheDocument();
    userEvent.type(senhaInput, '123456');
    expect(senhaInput.value).toBe('123456');
    const loginButton = screen.getByRole('button');
    userEvent.click(loginButton);
    // para acessar à página da carteira
    const valorInput = screen.getByTestId('value-input');
    userEvent.type(valorInput, '5');

    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
  });

  // test('Verifica se é renderizada a carteira com os gastos', () => {
  //   const initialState = {
  //     wallet: {
  //       currencies: [],
  //       expenses: [
  //         {
  //           id: 0,
  //           value: '5',
  //           description: 'Ossinho da Pedrita',
  //           currency: 'USD',
  //           method: 'Dinheiro',
  //           tag: 'Alimentação',
  //         },
  //       ],
  //     },
  //   };

  //   const firstEndpoint = 'https://economia.awesomeapi.com.br/json/all';
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith(firstEndpoint);

  //   expect(screen.getByText('5')).toBeInTheDocument();
  //   expect(screen.getByText('Ossinho da Pedrita')).toBeInTheDocument();
  //   expect(screen.getByText('USD')).toBeInTheDocument();
  //   expect(screen.getByText('Dinheiro')).toBeInTheDocument();
  //   expect(screen.getByText('Alimentação')).toBeInTheDocument();
  // });
});
