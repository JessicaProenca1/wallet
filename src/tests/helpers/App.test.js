import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import Table from '../../components/Table';
import WalletForm from '../../components/WalletForm';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(mockData) },
  );
});

describe('Login TrybeWallet', () => {
  const meuEmail = 'je.proenca@yahoo.com.br';

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

  test('Verifica se a API é chamada e se renderiza as moedas', () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
  });

  test('Verifica se os dados são renderizados na tabela', () => {
    const initialState = {
      wallet: {
        expenses: [
          {
            id: 0,
            value: '5',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Ossinho da Pedrita',
            exchangeRates: mockData,
          }],
      },
    };
    renderWithRouterAndRedux(<Table />, { initialState });
    expect(screen.getByTestId('value-table')).toBeInTheDocument('5');
    expect(screen.getByTestId('description-table')).toBeInTheDocument('Ossinho da Pedrita');
    expect(screen.getByTestId('method-table')).toBeInTheDocument('Dinheiro');
    expect(screen.getByTestId('name-table')).toBeInTheDocument('Dólar Americano/Real Brasileiro');
    expect(screen.getByTestId('tag-table')).toBeInTheDocument('Alimentação');
  });

  test('Verifica se ao clicar no botão Editar a despesa a nova despesa é renderizada na tabela', () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '5',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Ração da Pedrita',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '10',
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Saúde',
            description: 'Banho da Pedrita',
            exchangeRates: mockData,
          },
        ],
      },
    };
    renderWithRouterAndRedux(<Table />, { initialState });
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(2);
    userEvent.click(screen.getAllByTestId('edit-btn')[0]);

    renderWithRouterAndRedux(<WalletForm />);
    userEvent.type(screen.getByTestId('description-input'), 'Ossinho da Pedrita que é mais importante');
    userEvent.click(screen.getByTestId('add-button'));
    expect(screen.getAllByTestId('description-table')[0]).toBeInTheDocument('Ossinho da Pedrita que é mais importante');
  });

  test('Verifica se a edição funciona', () => {
    const initialState = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '5',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Ossinho da Feia',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '10',
            currency: 'CAD',
            method: '',
            tag: '',
            description: '',
            exchangeRates: mockData,
          },
        ],
        editor: true,
        idToEdit: 1,
      },
    };

    renderWithRouterAndRedux(<WalletForm />, { initialState });
    userEvent.type(screen.getByTestId('value-input'), '20');
    userEvent.type(screen.getByTestId('description-input'), 'Passear com a Pedrita');
    expect(screen.getByTestId('value-input')).toBeInTheDocument('20');
    expect(screen.getByTestId('value-input')).toHaveAttribute('value', '20');
    userEvent.selectOptions(screen.getByTestId('currency-input'), 'USD');
    userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
    userEvent.click(screen.getByTestId('add-button'));
    expect(screen.getAllByTestId('method-table')[1]).toBeInTheDocument('Dinheiro');
  });

  test('Verifica se ao clicar no botão Excluir a despesa não renderiza na tela', () => {
    const initialState = {
      wallet: {
        expenses: [
          {
            id: 0,
            value: '5',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            description: 'Ração da Pedrita',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '10',
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Saúde',
            description: 'Banho da Pedrita',
            exchangeRates: mockData,
          },
        ],
      },
    };
    renderWithRouterAndRedux(<Table />, { initialState });
    expect(screen.getAllByTestId('delete-btn')).toHaveLength(2);
    userEvent.click(screen.getAllByTestId('delete-btn')[1]);
    expect(screen.getAllByTestId('description-table')).toHaveLength(1);
  });

  // test('should first', () => {
  // });
});
