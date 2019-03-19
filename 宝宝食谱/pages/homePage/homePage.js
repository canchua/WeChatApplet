const homeUrl = require('../../config').homeUrl

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    classifyArray: [],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '正在加载中',
      mask: true,
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
    
   

    var that = this;
   wx.request({
     url: homeUrl,
     data:{
     appname:'baobaofushi',
     },
     method: 'GET',
     dataType: 'json',
     success:function(result){

     wx.hideLoading();
    
     console.log("dsf"+result.data.data);
    
     that.setData({
       classifyArray: result.data.data,
     })

     },
     fail:function({errMsg}){
        wx.hideLoading();
      
     }
   })

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
  onShareAppMessage: function () {
    
  },


  clickItem:function(e){
 
   
    var albumId = this.data.classifyArray[e.currentTarget.dataset.index].id;
    var title = this.data.classifyArray[e.currentTarget.dataset.index].title;

    app.aldstat.sendEvent('homeClassifyClick', {
      'albumId': albumId,
    });

 
    console.log("ddd"+albumId);
    wx.navigateTo({
      url: '../listPage/listPage?albumId=' + albumId +'&title='+title,
    })

  },

  srarchAction:function(e){
    wx.navigateTo({
      url: '../searchPage/searchPage'
    })
  }
})