import database from '../firebase/firebase';

const addExpense = (expense) => {
  return {
    type: 'ADD_EXPENSE',
    expense
  }
};

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  expenseId: id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export { addExpense, removeExpense, editExpense };