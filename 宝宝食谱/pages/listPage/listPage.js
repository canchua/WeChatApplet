const listUrl = require('../../config').listUrl



var page = 0;

var GetDataList = function(that){

console.log("----------------->>>>"+page);
  
  that.setData({
    hidden: false
  });
  wx.request({
    url: listUrl,
    data: {
      page: page,
      albumId:that.data.albumId
    },
    success: function (res) {

      var dataArray = that.data.dataList;
      console.log("----" + dataArray);
        dataArray.push(res.data.data[i])
      }

      that.setData({
        dataList: dataArray,
      })

      page++;
      that.setData({
        hidden: true
      });

    }
  });

}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    hidden:true,
    albumId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    page = 0;

    var that = this;


    that.data.albumId = options.albumId;
    wx.setNavigationBarTitle({
      title: options.title
    })
    GetDataList(that);
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
    // var that = this;
    // GetDataList(that);

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

    console.log("xiala");
    this.data.dataList = [];
    page = 0;
    this.setData({
      dataList: [],
    });
    GetDataList(this);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    var that = this;
    GetDataList(that);
    console.log("shangla");


  },


  lower: function(e){
     console.log("sdfad");
  },
  listClickItem:function(e){
    page = 0;

    console.log(e.currentTarget.dataset.index);
    var id = this.data.dataList[e.currentTarget.dataset.index].id;
    var title = this.data.dataList[e.currentTarget.dataset.index].title;
    // var uid = this.data.dataList[e.currentTarget.dataset.index].uid;
    var uid = 'ojpQEvx5VqpmMUy4CHXYgVujlBA8';
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("uid: " + uid);

    wx.navigateTo({
      url: '../detailsPage/detailsPage?id=' + id + '&title=' + title + '&uid=' + uid,
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})