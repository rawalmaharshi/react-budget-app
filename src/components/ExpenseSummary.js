import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpense from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => {
  const expenseWord = props.expensesCount > 1 ? 'expenses' : 'expense';
  const formattedExpenseTotal = numeral(props.expensesTotal / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> {expenseWord} totalling <span>{formattedExpenseTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpense(state.expenses, state.filters);

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);