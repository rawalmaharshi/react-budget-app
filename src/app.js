import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import expensesReducer from './reducers/expenses';
import filtersReducer from './reducers/filters';
import getVisibleExpenses from './selectors/expenses';
import configureStore from './store/configureStore';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

store.dispatch(addExpense({description: 'Water Bill', amount: 6000}));
store.dispatch(addExpense({description: 'Gas Bill', amount: 1000, createdAt: 100}));
store.dispatch(addExpense({description: 'Rent', amount: 109500}));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx =(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));