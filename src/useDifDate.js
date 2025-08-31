export default function DifDate(oldDate, today) {
  const date1 = new Date(oldDate);
  const date2 = new Date(today);
  const day = 86400000;

  let dif = Math.floor(Math.abs(date1 - date2) / day);

  let resp;

  if (dif == 0) {
    resp = "Hoje";
  } else if (dif >= 1 && dif <= 30) {
    resp = dif + " dia(s) atrás.";
  } else if (dif > 30 && dif <= 60) {
    resp = Math.floor(dif / 30) + " mês atrás.";
  } else if (dif > 60) {
    resp = Math.floor(dif / 30) + " meses atrás.";
  }

  return resp;
}
