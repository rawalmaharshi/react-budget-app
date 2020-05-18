const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  };
};

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
});

// endDate is not = undefined (it will be undefined by default (same is the case with startDate, this is for example))
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

export { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate };