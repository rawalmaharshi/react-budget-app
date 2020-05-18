import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpense from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = (props) => (
  <div>
    {
      props.expensesCount > 1 ?
        (
          <h2>Viewing {props.expensesCount} expenses totaling: {numeral(props.expensesTotal / 100).format('$0,0.00')} </h2>
        ) :
        (
          <h2>Viewing {props.expensesCount} expense totaling: {numeral(props.expensesTotal / 100).format('$0,0.00')} </h2>
        )
    }
  </div>
);

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpense(state.expenses, state.filters);

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: expensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);