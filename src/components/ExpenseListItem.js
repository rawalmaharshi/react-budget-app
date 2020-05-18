import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class ExpenseListItem extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/edit/${this.props.expense.id}`}>
          <h1>{!!this.props.expense.description && this.props.expense.description}</h1>
        </Link>
        {!!this.props.expense.amount && <p>Amount: {numeral(this.props.expense.amount / 100).format('$0,0.00')}</p>}
        {!!this.props.expense.createdAt && <p>Created At: {moment(this.props.expense.createdAt).format('MMM Do, YYYY')}</p>}
      </div>
    );
  }
}

export default ExpenseListItem;