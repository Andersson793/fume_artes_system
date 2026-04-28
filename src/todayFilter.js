export default function todayFilter(d) {
  const date = Date.parse(d);

  const today = new Date();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return date >= today;
}
