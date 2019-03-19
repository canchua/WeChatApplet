// 1 导入js文件
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({

  data: {},

  
  onLoad: function () {
  
    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      ['苹果', '荔枝', '香蕉', "西瓜", "杨梅", "芒果", "牛肉", "猪肉", "酸奶", "清蒸砂仁鲈鱼", "清炒芦笋虾仁", "韭菜虾仁炒鸡蛋", "清炒猪血", "栗子牛肉", "豆腐煲海带", "椒盐排骨", "弹跳千层豆腐", "乌鸡补肾汤", "砂仁肘子", "豆芽烧鲫鱼", "养胃助消化", "养心益肾", "乌鸡糯米葱白粥", "韭菜炒虾仁", "清蒸大虾", "蛋白丰富", "开胃舒畅", "产后补身", "芝麻酱拌面", "香脆南瓜饼", "清炒莴笋丝", "小米最养人"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
    
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    var url1 = '../secondSearchPage/secondSearchPage?searchValue=' + value + '&appname=baobaofushi';
    wx.redirectTo({
      url: '../secondSearchPage/secondSearchPage?searchValue='+value+'&appname=baobaofushi'
    })
    console.log('url --> ' + url1);
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here

    wx.navigateBack({
      url:'../homePage/homePage'
    })
  }

})