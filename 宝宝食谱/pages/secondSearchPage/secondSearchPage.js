// 1 导入js文件
const searchUrl = require('../../config').searchUrl

var WxSearch = require('../../wxSearchView/wxSearchView.js');
var app = getApp();
Page({

  data: {
    value:'',
    dataList: [],
  },


  onLoad: function (options) {


    console.log("searchUrl: " + searchUrl);

    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      [],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
    this.setData({
      value: options.searchValue,
    })
    console.log('value: ' + options.searchValue);
    app.aldstat.sendEvent('searchCount');
    var that = this;
    // var tempWord =  + 'baobaofushi';
    wx.request({
      url: searchUrl,
      method: 'GET',
      dataType: 'json',
      
      data: {
        word: options.searchValue,
        appname: 'baobaofushi',
      },
      success: function (result) {

        if (result.data.data.length > 0) {
          that.setData({
            dataList: result.data.data,
          })
          console.log("dsf" + result.data.data.title);

        } else {
          console.log("adfa" + result.data.data.title);

          wx.showToast({
            title: '没有搜索到结果哦~',
            icon: "none"
          })
        }


      },
      fail: function ({ errMsg }) {

      }
    })


  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
 
   console.log("----------sousuo");
    app.aldstat.sendEvent('searchCount');

   this.data.dataList = [];

    var that = this;
    wx.request({
      url: searchUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        word: value,
        appname: 'baobaofushi',
      },
      success: function (result) {
        
        console.log("===" + result.data.data);

        if (result.data.data.length>0){
          that.setData({
            dataList: result.data.data,
          })
          console.log("dsf" + result.data.data.title);

        }else{
          console.log("adfa" + result.data.data.title);

          wx.showToast({
            title: '没有搜索到结果哦~',
            icon: "none"
          })
        }

        

      

      },
      fail: function ({ errMsg }) {
       
      }
    })


  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here

    wx.navigateBack({
      url: '../homePage/homePage'
    })
  }, 
  listClickItem: function (e) {

    console.log(e.currentTarget.dataset.index);
    var id = this.data.dataList[e.currentTarget.dataset.index].id;
    var title = this.data.dataList[e.currentTarget.dataset.index].title;

    wx.navigateTo({
      url: '../detailsPage/detailsPage?id=' + id + '&title=' + title,
    })

  },
})