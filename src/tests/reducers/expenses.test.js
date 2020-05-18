import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    expenseId: expenses[1].id
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    expenseId: -1
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add a new expense', () => {
  const newExpense = {
    id: '4',
    description: 'New Expense to Add',
    note: '',
    amount: 1000,
    createdAt: moment().valueOf()
  }

  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

test('Should edit an expense', () => {
  const updatesExpense = {
    description: 'Updated data (Amount)',
    amount: 1000,
  }

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: updatesExpense
  };

  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual({...expenses[0], ...updatesExpense});
});

test('Should not edit an expense if id not found', () => {
  const updatesExpense = {
    description: 'Updated data (Amount)',
    amount: 1000,
  }

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: updatesExpense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});