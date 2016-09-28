function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function diffTime(t1, t2) {
  var stamp = Math.abs((t1 - t2) / 1000)
  var str = ''
  var timeDir = t1 - t2 > 0 ? '前' : '后'; 

  if (stamp <= 60) {
    str = parseInt(stamp) + '秒'
  } else if (stamp > 60 && stamp < 3600) {
    str = parseInt(stamp / 60) + '分钟'
  } else if (stamp >= 3600 && stamp < 86400) {
    str = parseInt(stamp / 3600) + '小时'
  } else if (stamp >= 86400 && stamp < 2592000) {
    str = parseInt(stamp / 86400) + '天'
  } else if (stamp >= 2592000 && stamp < 31536000) {
    str = parseInt(stamp / 2592000) + '个月'
  } else {
    str = parseInt(stamp / 31536000) + '年'
  }

  return str + timeDir
}

module.exports = {
  formatTime: formatTime,
  diffTime: diffTime
}
