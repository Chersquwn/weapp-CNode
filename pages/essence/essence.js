var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    hidden: true,
    query: 40,
    list: {}
  },
  onLoad: function (options) {
    updateDate.call(this)
  },
  scrolltolower: updateDate,
  onPullDownRefresh: function () {
    this.setData({
      query: 0
    })
    updateDate.call(this)
  },
})

function updateDate() {
  var that = this

  this.setData({
    hidden: false
  })

  wx.request({
    url: 'https://cnodejs.org/api/v1/topics',
    data: {
      tab: 'good',
      limit: that.data.query
    },
    success: function(res) {
      var now = new Date()

      var data = res.data.data.map(function(v, i, a) {
        v['create_at'] = util.diffTime(now, new Date(v['create_at']))
        v['last_reply_at'] = util.diffTime(now, new Date(v['last_reply_at']))
        v['tab'] = 'good'

        return v
      })

      that.setData({
        list: data,
        hidden: true
      })
    }
  })

  this.data.query += 15
}
