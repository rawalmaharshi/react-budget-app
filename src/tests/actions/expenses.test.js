import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('Should setup remove expense action object', () => {
  const result = removeExpense({ id: 'abc123' });
  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    expenseId: 'abc123'
  });
});

test('Should setup edit expense action object', () => {
  const result = editExpense('abc123', {
    description: 'New Description',
    note: 'Note'
  });

  expect(result).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      description: 'New Description',
      note: 'Note'
    }
  });
});

test('Should setup add expense action object with the provided value', () => {
  const result = addExpense(expenses[2]);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('Should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 2000,
    note: 'This one is cheap (and better)',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});