import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('Should setup remove expense action object', () => {
  const result = removeExpense({ id: 'abc123'});
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
  const expenseData = {
    description: 'Rent',
    amount: 30000,
    createdAt: 1000,
    note: 'This is last months rent'
  };

  const result = addExpense(expenseData);
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should setup add expense action object with the default value', () => {
  const result = addExpense({});
  expect(result).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});