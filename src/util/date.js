/*eslint-disable*/
/* Source: https://stackoverflow.com/questions/25275696/javascript-format-date-time#25275808
*  Altered for use in NewsFreak 
*/
export function formatDate(utcDate) {
  var date = new Date(utcDate)
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime
}

/*eslint enable*/