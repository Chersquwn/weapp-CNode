var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    article: {}
  },
  onLoad: function (options) {
    var that = this

    wx.request({
        url: 'https://cnodejs.org/api/v1/topic/' + options.id,
        data: {
          mdrender: false
        },
        success: function(res) {
          var now = new Date(),
              data = res.data.data

          data['create_at'] = util.diffTime(now, new Date(data['create_at']))
          data['last_reply_at'] = util.diffTime(now, new Date(data['last_reply_at']))

          data['replies'] = data['replies'].map(function(v, i, a) {
            v['create_at'] = util.diffTime(now, new Date(v['create_at']))

            return v
          })

          that.setData({
              article: data
          })
        }
    })
  }
})
