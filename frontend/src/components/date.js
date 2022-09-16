function dateformat(data) {
  var data = Date.parse(data);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var date = "";
  if (data) {
    date = new Date(data);
  }

  let current_date =
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return current_date;
}

export default dateformat;
