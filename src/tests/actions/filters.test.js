import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

test('Should setup set text filter action object with provided value', () => {
  const result = setTextFilter('Bill');
  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Bill'
  });
});

test('Should setup set text filter action object with default value', () => {
  const result = setTextFilter();
  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('Should setup sort by amount filter action object', () => {
  const result = sortByAmount();
  expect(result).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('Should setup sort by date filter action object', () => {
  const result = sortByDate();
  expect(result).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should setup set start date filter action with provided date', () => {
  const result = setStartDate(moment(0));

  expect(result).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('Should setup set start date filter action with undefined date', () => {
  const result = setStartDate();

  expect(result).toEqual({
    type: 'SET_START_DATE',
    startDate: undefined
  });
});

test('Should setup end start date filter action with provided date', () => {
  const result = setEndDate(moment(0));

  expect(result).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});