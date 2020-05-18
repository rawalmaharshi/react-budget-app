export default (expenses) => {
  return expenses
  .map(({ amount }) => amount)
  .reduce((accumulator, currentVal) => accumulator + currentVal, 0);
}