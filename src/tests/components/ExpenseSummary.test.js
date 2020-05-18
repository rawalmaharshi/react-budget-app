import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('Should render ExpenseSummary correctly with one expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={125.56} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseSummary correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={10} expensesTotal={5125.56} />);
  expect(wrapper).toMatchSnapshot();
});