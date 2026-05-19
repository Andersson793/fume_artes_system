export default function DifDate(oldDate, today) {
  const date1 = new Date(oldDate);
  const date2 = new Date(today);

  const hour = 3600000;

  const day = 24;
  const month = day * 30;

  let difHours = Math.floor(Math.abs(date1 - date2) / hour);

  let resp;

  if (difHours < 1) {
    resp = "Agora";
  } else if (difHours >= 1 && difHours < day) {
    resp = difHours + " hora(s) atrás";
  } else if (difHours >= day && difHours < month) {
    resp = Math.floor(difHours / day) + " dia(s) atrás.";
  } else if (difHours >= month && difHours < month * 2) {
    resp = Math.floor(difHours / month) + " mês atrás.";
  } else if (difHours >= month * 2) {
    resp = Math.floor(difHours / month) + " meses atrás.";
  } else {
    resp = "--";
  }

  return resp;
}
