<script>
function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function trim(val) {
  if(!isEmpty(val)){
    return val.replace(/(^\s*)|(\s*$)/g, "");
  }else{
    return ""
  }
}

// 数字转字符前补0
function pad(num, n) {
  num = String(num);
  var len = String(num).length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}

function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
}

function convertNumToDate(dt, tm) {
  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  var str = dt + pad(tm);
  return str.replace(pattern, "$1/$2/$3 $4:$5:$6");
}

export default {
  isEmpty,
  trim,
  formatDate, //格式化日期
  convertNumToDate //将数字转为日期字符串
};
</script>
