export function dateCount (value, format) {
  var mydate = new Date(value)
  var fmt = format
  var year = mydate.getFullYear() + ''
  var month = mydate.getMonth() + 1
  var day = mydate.getDay()
  var hour = mydate.getHours()
  var minutes = mydate.getMinutes()
  var str1 = /(y+)/
  var str2 = /(m+)/
  var str3 = /(d+)/
  var str4 = /(h+)/
  var str5 = /(m+)/
  var check = str1.test(fmt)
  if (!check) {
  	return
  }
  fmt = fmt.replace(RegExp.$1, year)
  str2.test(fmt)
  fmt = fmt.replace(RegExp.$1, month)
  str3.test(fmt)
  fmt = fmt.replace(RegExp.$1, day)
  str4.test(fmt)
  fmt = fmt.replace(RegExp.$1, hour)
  str5.test(fmt)
  fmt = fmt.replace(RegExp.$1, minutes)
  return fmt
}
