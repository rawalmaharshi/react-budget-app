import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ExpenseListItem extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/edit/${this.props.expense.id}`}>Edit Expense</Link>
        <h1>{!!this.props.expense.description && this.props.expense.description}</h1>
        {!!this.props.expense.amount && <p>Amount: {this.props.expense.amount}</p>}
        {!!this.props.expense.createdAt && <p>Created At: {moment.unix(this.props.expense.createdAt).format('MMM Do, YYYY')}</p>}
      </div>
    );
  }
}

export default ExpenseListItem;