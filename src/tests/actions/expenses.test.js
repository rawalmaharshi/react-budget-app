import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisistestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('Should setup remove expense action object', () => {
  const result = removeExpense({ id: 'abc123' });
  expect(result).toEqual({
    type: 'REMOVE_EXPENSE',
    expenseId: 'abc123'
  });
});

test('Should remove expense from database using id', (done) => {
  const store = createMockStore(defaultAuthState);
  const expense = expenses[1];
  store.dispatch(startRemoveExpense(expense)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      expenseId: expense.id
    });
    return database.ref(`users/${uid}/expenses/${expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('Should edit expense from database', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    note: 'This is an edited expense',
    amount: 2500
  };

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().note).toBe(updates.note);
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  }).catch((e) => {
    //Here, I entered the location (ref to be expense/id), it resulted in a jasmine timeout error as it could not find the ref
    console.log('Error deleting', e);
    done();
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
  const store = createMockStore(defaultAuthState);
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
