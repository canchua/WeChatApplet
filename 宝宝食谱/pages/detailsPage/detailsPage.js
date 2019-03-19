const detailsUrl = require('../../config').detailsUrl

var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: options.title
    // })
    // var that = this;

    // var id = options.id;
    // var uid = options.uid;
    // var article;
    // wx.request({
    //   url: detailsUrl,
    //   method: 'GET',
    //   dataType: 'json',
    //   data: {
    //     id: options.id,
    //     uid: options.uid,
    //   },
    //   success: function (result) {
    //     var web = result.data.data.content + '&uid=' + uid;
    //     console.log('web: ' + web);

    //     that.setData({
    //       article: web,
    //     })
    //     console.log("article: " + that.data.article);
        
    //   },
    //   fail: function ({ errMsg }) {

    //   }
    // })
    this.data.title = options.title;
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.data.shareId = options.id;
    var uid = options.uid;
    var that = this;
    wx.request({
      url: detailsUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        id: options.id,
        // uid: options.uid,
      },
      success: function (result) {
        // var article = result.data.data.content + '&uid=' + uid;
        var article = result.data.data.content;
        console.log('article: ' + article);
        WxParse.wxParse('article', 'html', article, that, 5);

        that.setData({
          // img_url: result.data.data.detail_img_url,
          title: result.data.data.title,

        })

      },
      fail: function ({ errMsg }) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮

      return{
        title: this.data.title,
        path: "/pages/detailsPage/detailsPage?id=" + this.data.shareId,
        success: function (res) {

            app.aldstat.sendEvent('shareSuccessCount');

        },
        fail: function (res) {

            app.aldstat.sendEvent('shareFailCount');

        }
      }
    }

    return {
      title: this.data.title,
      path: "/pages/detailsPage/detailsPage?id=" + this.data.shareId,
      success: function (res) {

          app.aldstat.sendEvent('shareSuccessCount');

      },
      fail: function (res) {
        console.log("---ddddddddddfsdf"),

          app.aldstat.sendEvent('shareFailCount');

      }
    }
  },
  shareAction:function(){

    app.aldstat.sendEvent('shareCount'); 
  }
})