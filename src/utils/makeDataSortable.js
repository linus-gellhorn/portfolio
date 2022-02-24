export function makeDataSortable(data) {
  let sorted = data;
  for (let day of sorted) {
    day.date = new Date(day.date);
  }
  return sorted;
}
