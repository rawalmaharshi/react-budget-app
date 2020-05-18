import moment from 'moment';

export default [{
  id: '1',
  description: 'Books',
  note: '',
  amount: 750,
  createdAt: moment(0).valueOf()
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 30000,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Grocery',
  note: '',
  amount: 2000,
  createdAt: moment(0).add(4, 'days').valueOf()
}];