import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class ExpenseListItem extends React.Component {
  render() {
    return (
      <Link
        className="list-item"
        to={`/edit/${this.props.expense.id}`}>
        <div>
          <h3 className="list-item__title">{this.props.expense.description}</h3>
          <span className="list-item__sub-title">{moment(this.props.expense.createdAt).format('MMM Do, YYYY')}</span>
        </div>
        <h3 className="list-item__data">{numeral(this.props.expense.amount / 100).format('$0,0.00')} </h3>
      </Link>
    );
  }
}

export default ExpenseListItem;