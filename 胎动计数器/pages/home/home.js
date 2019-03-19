// pages/home/home.js

var util = require('../../utils/util.js');

var timer;
var timer1;
var seconds;
var n = 0;
var last;
var now;
var homeArray = [];
// var charge = 1;    
var beginTimestamp;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '8月15日',
    time: '60:00',
    count: n,
    startHidden: false,
    restartHidden: true,
    gapHidden: true,
    // plusHidden: true,
    animationData: {},
    // tableArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      seconds = 3600;
      clearTimeout(timer);
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
    //判断当前缓存中是否存有数据
    var nowArray = wx.getStorageSync('historyArray');
    if(!nowArray){
      nowArray = [];
      wx.setStorageSync('historyArray', nowArray);
    }
    var that = this;
    //获取当前时间
    var time = Date.parse(new Date());         
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    console.log("当前日期：" + month + "月" + day + "日");
    that.setData({
      date: month + "月" + day + "日",
      dateNum: month * 100 + day,
      allDate: year + "年" + month + "月" + day + "日",
    });
    console.log("当前日期值：" + that.data.dateNum);
    
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

  /**
   *点击开始按钮触发函数 
   */
  startCount:function () {
    var that = this;
    that.setData({
      startHidden: true,
      restartHidden: true,
      gapHidden: false,
      // plusHidden: false, 
    });
    // charge = 0;
    var animation = wx.createAnimation({
      duration: 3600,
      timingFunction: 'linear',
    });
    that.animation = animation;
    animation.opacity(0).step();
    that.setData({
      animationData: animation.export(),
    });
    Countdown(that);
  },

  /**
   * 点击重新计数按钮触发函数
   */
  restartCount: function () {
    var that = this;
    that.setData({
      startHidden: true,
      restartHidden: true,
      gapHidden: false,
    });
    var animation = wx.createAnimation({
      duration: 3600,
      timingFunction: 'linear',
    });
    that.animation = animation;
    animation.opacity(0).step();
    that.setData({
      animationData: animation.export(),
    });
    Countdown(that);
  },

  /**
   * 点击计数按钮触发函数
   */
  gapCount:function () {
    var that = this;
    //获取当前时间戳
    var time = Date.parse(new Date());  
    var timestamp = time / 1000;
    if(n == 0){
      last = timestamp - 300;
      now = timestamp;
    }
    else{
      now = timestamp;
    }
    if(now - last >= 300){
      last = now;
      n++;

      // clearTimeout(timer1);
      // console.log("after_plusHidden: " + that.data.plusHidden);
      that.setData({
        count: n,
        // plusHidden: false,
      });
      // console.log("plusHidden: " + that.data.plusHidden);

      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear',
      });
      that.animation = animation;
      setTimeout(function () {
        animation.opacity(0).scale(2, 2).step();
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 1000)
      animation.opacity(1).step();
      that.setData({
        animationData: animation.export(),
      });
      
      // timer1 = setTimeout(function () {
      //   animation.opacity(1).step();
      //   that.setData({
      //     animationData: animation.export(),
      //     plusHidden: true,
      //   })
      // }.bind(that), 1000);
    }
    else{
      wx.showToast({
        title: '宝宝5分钟内活动只记一次胎动~',
        icon: "none",
        duration: 2000,
      })
    }
    
  },

  /**
   * 点击进入胎动说明页
   */
  toExplain:function () {
    wx.navigateTo({
      url: '../explain/explain',
    })
  },

  /**
   * 点击进入历史记录页
   */
  toHistory:function () {
    wx.navigateTo({
      url: '../history/history',
    })
  }
});



/**
 * 倒计时函数
 */
function Countdown (that) {
  that.setData({
    time: date_format(seconds),
  });
  //判断倒计时是否结束
  if (seconds == 0) {
    // wx.setStorageSync('isFirst', charge);
    clearTimeout(timer);
    seconds = 3600;
    homeArray = wx.getStorageSync('historyArray');
    //刷新homeArray，将所得数据存入缓存
    
    var row = {
      Hour: n,
      Day: 12 * n,
      Date: that.data.date,
      AllDate:that.data.allDate,
      DateNum: that.data.dateNum,
      Count: that.data.count,
    };
    console.log("row.DateNum: " + row.DateNum);
    homeArray.push(row);
    
    wx.setStorageSync('historyArray', homeArray);
    wx.showModal({
      title: '宝宝一小时动了：' + n + ' 次',
      confirmColor: '#FF6969',
      showCancel: false,
    })
    n = 0;
    that.setData({
      count: n,
      startHidden: true,
      gapHidden: true,
      restartHidden: false,
      time: date_format(seconds),
    });
    return;
  }
  //计数器
  timer = setTimeout(function () {
    console.log("-----Countdown-----");
    seconds -= 1;
    Countdown(that);
  }, 1000);
};

function date_format(second) {
  var min = fill_zero_prefix((seconds - second % 60) / 60);
  var sec = fill_zero_prefix(seconds % 60);
  return min + ":" + sec;
}

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
};
