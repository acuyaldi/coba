import moment from 'moment';

export const toTimestamp = (strDate) => {
  var datum = Date.parse(strDate);
  return (datum / 1000).toString();
}

export const fromTimestamp = (strDate, format = 'YYYY-MM-DD') => {
  var datum = strDate * 1000;
  return moment(datum).format(format);
}