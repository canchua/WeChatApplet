// pages/home/home.js

var app = getApp();
var util = require('../../utils/util.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var timer;
var seconds = 0;
var flag;
var i = 0;
var timestamp;
var table = new Array();
// var stampFlag = 1;
var gap;
var lastStartSecond, lastStartMinute;
var tableArray = [];
var dic = [];
var thisPage = [];                                    //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
var thisPage_num = 0                                  //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
var n = 0;
var tempArray;
var begin = 1534159025;
var wait = 1534159005;
var beginFlag = 1;
var homeFlag = 1;
var timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    clock: '00:00',
    gap: '00:00',
    start: '00:00:00',
    date: '2018年08月08日',
    startHidden: false,
    endHidden: true,
    tableArray: [],
    theHour: 0,
    scrolltop: 0,
    // theMinute: 0,
    // theSecond: 0,  
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    clearTimeout(timer);
    // var now1Time = Date.parse(new Date());         //获取当前时间
    // var now1Timestamp = now1Time / 1000;                //获取当前时间戳
    // var valuefirst = wx.getStorageSync('homeArray');
    // console.log("valuefirst: " + valuefirst);
    // if (valuefirst) {
    //   for (var key in valuefirst) {
    //     console.log("valuefirst[key].gapSecond: " + valuefirst[key].gapSecond);
    //     if (now1Timestamp - valuefirst[key].Begin >= 86400) {
    //       valuefirst.splice(key, 1);
    //       wx.setStorageSync('homeArray', valuefirst);
    //     }
    //   }
    // }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // var that = this;
    // WxNotificationCenter.addNotification('appHide', that.homeArrayClear, that);
    // var valuesecond = [];
    // wx.setStorageSync('homeArray', valuesecond);
    // console.log("onload success");
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // console.log("home_globalData_homeFlag: " + app.globalData.homeFlag);
    // var valuefirst = wx.getStorageSync('homeArray');
    // var valuethird = wx.getStorageSync('tableArray');
    // console.log("valuefirst: " + valuefirst);
    // if (valuefirst) {                               //如果homeArray不为空
    //   if (app.globalData.homeFlag != 1) {           //若homeArray经过修改
    //     this.setData({
    //       tableArray: wx.getStorageSync('homeArray'),   //将homeArray的值赋给home页
    //     })
    //     thisPage = wx.getStorageSync('homeArray');      //将thisPage更新为homeArray的值即根据在历史记录的修改更新首页信息
    //   }
    //   else{                                         //若homeArray未经过修改
    //     if(valuethird){                                   //若'tableArray'不为空
    //       this.setData({
    //         tableArray: wx.getStorageSync('homeArray'),    //将homeArray的值赋给home页       
    //       })
    //     }
    //     else {                                       //若'tableArray'为空，即历史记录被清空
    //       var valuesecond = [];                                       
    //       wx.setStorageSync('homeArray', valuesecond);            //将homeArray置空
    //     }
    //   }
    // }
    // else {                                        //若homeArray为空
    //   this.setData({                              //清空数组
    //     tableArray: [],
    //     homeArray: [],
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {                                                        //同onLoad
    var that = this;
    var now2Time = Date.parse(new Date());         //获取当前时间
    var now2Timestamp = now2Time / 1000;                //获取当前时间戳
    console.log("home_globalData_homeFlag: " + app.globalData.homeFlag);
    var valuefirst = wx.getStorageSync('homeArray');

    var valuethird = wx.getStorageSync('tableArray');
    console.log("valuefirst: " + valuefirst);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // var aa=[];
    // if(valuefirst){
    //   for (var key in valuefirst) {
    //     console.log("key1: " + key);
 
    //     if (now2Timestamp - valuefirst[key].Begin >= 86400) {
    //       console.log("key2: " + key);
    //       aa.push(key);
    //     }
    //   }

    //   for(var key in aa){
    //     valuefirst.splice(key, 1);
    //     key--;
    //   }
    //   wx.setStorageSync('homeArray', valuefirst);

    // }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    if (valuefirst) {
      for (var i = 0; i < valuefirst.length; i++) {
        if (now2Timestamp - valuefirst[0].Begin >= 86400) {
          valuefirst.splice(0, 1);
          i--;
        }
        else{
          break;
        }
      }
      wx.setStorageSync('homeArray', valuefirst);
    }  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    if (valuefirst) {
      console.log("homeArray不为空");
      if (app.globalData.homeFlag != 1) {
        this.setData({
          tableArray: wx.getStorageSync('homeArray'),
          scrolltop: 50 * thisPage.length
        })
        thisPage = wx.getStorageSync('homeArray');
      }
      else {
        if (valuethird) {
          this.setData({
            tableArray: wx.getStorageSync('homeArray'),
            scrolltop: 50 * thisPage.length
          })
          thisPage = wx.getStorageSync('homeArray');
        }
        else {
          var valuesecond = [];
          wx.setStorageSync('homeArray', valuesecond);
        }
      }
    }
    else {
      console.log("homeArray为空");
      this.setData({
        tableArray: [],
        homeArray: [],
      })
    }
    
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

  homeArrayClear: function(){
    console.log("homeArrayClear success");
  },
  
  startBtn: function () {
    var that = this;
    var time = Date.parse(new Date());         //获取当前时间
    var timestamp = time / 1000;               //获取当前时间戳
    console.log("当前时间戳为: " + timestamp);
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (beginFlag == 1) {                       //判断程序是否是首次运行 
      begin = timestamp + 10;
      wait = timestamp;
      beginFlag = 0;                          //是   
    }
    else {
      begin = timestamp;                      //否
    }
    var thePage = wx.getStorageSync('homeArray');          //获取homeArray里存储的数据
    console.log("thePage.length: " + thePage.length);
    console.log("begin: " + begin);
    console.log("wait: " + wait);
    if (thePage.length != 0) {            //homeArray是否为空     @@@@@@@@@@@@@@@@@@@@@
      if (begin - wait >= 10) {       //判断两次计时间隔时间是否大于十秒

        
        var gapSecond, gapMinute, gapHour;
        console.log("app.globalData.stampFlag: " + app.globalData.stampFlag);
        var allTime_gapSecond = wx.getStorageSync('lastSecond');
        var allTime_gapMinute = wx.getStorageSync('lastMinute');
        console.log('allTime_gapSecond: ' + allTime_gapSecond);
        console.log('allTime_gapMinute: ' + allTime_gapMinute);
        if (!allTime_gapSecond) {
          lastStartSecond = second;                          //将现在时间的秒记为lastStartSecond
          lastStartMinute = minute;                          //将现在时间的分记为lastStartMinute
        }
        else {
          lastStartSecond = allTime_gapSecond;
          lastStartMinute = allTime_gapMinute;
        }
        if (app.globalData.stampFlag == 1) {                 //若tableArray为空
          app.globalData.stampFlag = 0;
          //lastStartSecond = second;                          //将现在时间的秒记为lastStartSecond
          //lastStartMinute = minute;                          //将现在时间的分记为lastStartMinute
        }
        gapSecond = second - lastStartSecond;                //获取间隔时间 
        gapMinute = minute - lastStartMinute;                //     
        if (gapSecond < 0) {
          gapSecond += 60;
          gapMinute--;
        }
        if (gapMinute < 0) {
          gapMinute += 60;
        }
        if (gapMinute > 30) {
          gapMinute = 0;
          gapSecond = 0;
        }
        flag = 1;
        console.log("start");
        var timegap = fill_zero_prefix(gapMinute) + ":" + fill_zero_prefix(gapSecond);
        if (begin - wait > 1800)                              //判断两次间隔是否超过半小时
          timegap = '00:00';
        that.setData({
          start: fill_zero_prefix(hour) + ":" + fill_zero_prefix(minute) + ":" + fill_zero_prefix(second),
          beginSecond: begin,
          gap: timegap,
          date: year + "年" + fill_zero_prefix(month) + "月" + fill_zero_prefix(day) + "日",
          dateNum: 10000 * year + 100 * month + day,
          theHour: hour,
          theMinute: minute,
          theSecond: second,
          gapSecond: begin - wait,
          startHidden: true,
          endHidden: false,
        })
        console.log("that.data.gapSecond: " + that.data.gapSecond);
        console.log("Start: " + that.data.start);
        console.log("Gap: " + that.data.gap);
        lastStartSecond = second;                      //
        lastStartMinute = minute;                      //
        wx.setStorageSync('lastSecond', lastStartSecond);
        wx.setStorageSync('lastMinute', lastStartMinute);
        Countdown(that);
      }
      else {
        wx.showToast({
          title: '间隔时间太短啦~不要玩手机哦~',
          icon: "none",
          duration: 2000,
        })
      }
    }
    else{
      timegap = '00:00';
      that.setData({
        start: fill_zero_prefix(hour) + ":" + fill_zero_prefix(minute) + ":" + fill_zero_prefix(second),
        beginSecond: begin,
        gap: timegap,
        date: year + "年" + fill_zero_prefix(month) + "月" + fill_zero_prefix(day) + "日",
        dateNum: 10000 * year + 100 * month + day,
        theHour: hour,
        theMinute: minute,
        theSecond: second,
        gapSecond: begin - wait,
        startHidden: true,
        endHidden: false,
      })
      console.log("Start: " + that.data.start);
      console.log("Gap: " + that.data.gap);
      lastStartSecond = second;                      //
      lastStartMinute = minute;                      //
      wx.setStorageSync('lastSecond', lastStartSecond);
      wx.setStorageSync('lastMinute', lastStartMinute);
      Countdown(that);
    }
    
  },
  // startBtn: function () {
  //   var time = Date.parse(new Date());         //获取当前时间
  //   var timestamp = time / 1000;               //获取当前时间戳
  //   console.log("当前时间戳为: " + timestamp);
  //   var date = new Date(time);                 
  //   var year = date.getFullYear();
  //   var month = date.getMonth() + 1;
  //   var day = date.getDate();
  //   var hour = date.getHours();
  //   var minute = date.getMinutes();
  //   var second = date.getSeconds();
  //   if(beginFlag == 1){                       //判断程序是否是首次运行 
  //     beginFlag = 0;                          //是   
  //   }
  //   else{
  //     begin = timestamp;                      //否
  //   }
  //   var thePage = wx.getStorageSync('homeArray');          //获取homeArray里存储的数据
  //   console.log("thePage.length: " + thePage.length);
  //   console.log("begin: " + begin);
  //   console.log("wait: " + wait);
  //   if (begin - wait >= 10 || thePage.length != 0) {       //判断两次计时间隔时间是否大于十秒或homeArray是否为空     @@@@@@@@@@@@@@@@@@@@@
      
  //     var that = this;
  //     var gapSecond, gapMinute, gapHour;
  //     console.log("app.globalData.stampFlag: " + app.globalData.stampFlag);
  //     var allTime_gapSecond = wx.getStorageSync('lastSecond');
  //     var allTime_gapMinute = wx.getStorageSync('lastMinute');
  //     console.log('allTime_gapSecond: ' + allTime_gapSecond);
  //     console.log('allTime_gapMinute: ' + allTime_gapMinute);
  //     if (!allTime_gapSecond){
  //       lastStartSecond = second;                          //将现在时间的秒记为lastStartSecond
  //       lastStartMinute = minute;                          //将现在时间的分记为lastStartMinute
  //     }
  //     else{
  //       lastStartSecond = allTime_gapSecond;
  //       lastStartMinute = allTime_gapMinute;
  //     }
  //     if (app.globalData.stampFlag == 1) {                 //若tableArray为空
  //       app.globalData.stampFlag = 0;                      
  //       //lastStartSecond = second;                          //将现在时间的秒记为lastStartSecond
  //       //lastStartMinute = minute;                          //将现在时间的分记为lastStartMinute
  //     }
  //     gapSecond = second - lastStartSecond;                //获取间隔时间 
  //     gapMinute = minute - lastStartMinute;                //     
  //     if (gapSecond < 0) {
  //       gapSecond += 60;
  //       gapMinute--;
  //     }
  //     if (gapMinute < 0) {
  //       gapMinute += 60;
  //     }
  //     if (gapMinute > 30) {
  //       gapMinute = 0;
  //       gapSecond = 0;
  //     }
  //     flag = 1;
  //     console.log("start");
  //     var timegap = fill_zero_prefix(gapMinute) + ":" + fill_zero_prefix(gapSecond);
  //     if (begin - wait > 1800 || thePage.length == 0)                              //判断两次间隔是否超过半小时
  //       timegap = '00:00';
  //     that.setData({                                       
  //       start: fill_zero_prefix(hour) + ":" + fill_zero_prefix(minute) + ":" + fill_zero_prefix(second),
  //       gap: timegap,
  //       date: year + "年" + fill_zero_prefix(month) + "月" + fill_zero_prefix(day) + "日",
  //       dateNum: 10000*year + 100*month + day,
  //       theHour: hour,
  //       theMinute: minute,
  //       theSecond: second,
  //       gapSecond: begin - wait,
  //       startHidden: true,
  //       endHidden: false,
  //     })
  //     console.log("Start: " + that.data.start);
  //     console.log("Gap: " + that.data.gap);
  //     lastStartSecond = second;                      //
  //     lastStartMinute = minute;                      //
  //     wx.setStorageSync('lastSecond', lastStartSecond);
  //     wx.setStorageSync('lastMinute', lastStartMinute);
  //     Countdown(that);
  //   }
  //   else{
  //     wx.showToast({
  //       title: '间隔时间太短啦~不要玩手机哦~',
  //       icon: "none",
  //       duration: 2000,
  //     })
  //   }
  // },

  endBtn: function () {
    //dic -> 'tableArray'
    //thisPage -> 'homeArray'
    var that = this;
    var value = wx.getStorageSync('tableArray');          //获取tableArray的值
    console.log("value: " + value);
    if (value || app.globalData.homeFlag != 1){           //若tableArray非空或homeArray有修改
      dic = wx.getStorageSync('tableArray');              //获取tableArray的值，这是个重复的多余的操作！！！！！！！！！！！！！！！！！！！！！！！！
      thisPage = wx.getStorageSync('homeArray');          //更新thisPage的值
    }
    else{                                //若tableArray为空或homeArray未修改， 不可能
      dic = [];                          
      thisPage = [];
    }
    console.log("app.globalData.homeFlag: " + app.globalData.homeFlag)
    // if (app.globalData.homeFlag == 1) {               
    //   thisPage = [];                                  
    // }
    // else{
      //  thisPage = wx.getStorageSync('homeArray');
    // }                                                 
    console.log("thisPAge:" + thisPage);                 
    //+++++++++++++++++++++++++++++++++++++++++++++
    if(seconds >= 10) {
    //+++++++++++++++++++++++++++++++++++++++++++++

      clearTimeout(timer);
      //====================json-Set-Get====================== 
      var row = {
        num: n,                                //行编号，没有用到可以删掉
        Date: that.data.date,                  //日期，为一字符串 
        dateNum: that.data.dateNum,            //日期，整型
        Begin:that.data.beginSecond,
        Start: that.data.start,                //开始时间
        Last: that.data.clock,                 //持续时间
        Gap: that.data.gap,                    //间隔时间，字符串形式，mm:ss  
        gapSecond: that.data.gapSecond,        //间隔秒数，整型
        timeHour: that.data.theHour,           //当前时间，时
        timeMinute: that.data.theMinute,       //当前时间，分
        timeSecond: that.data.theSecond,       //当前时间，秒 
      }
      console.log("num: " + n);
      console.log("row.Date: " + row.Date);
      console.log("row.Start: " + row.Start);
      console.log("row.Last: " + row.Last);
      console.log("row.Gap: " + row.Gap);
      dic.push(row);
      thisPage.push(row);                              
      thisPage_num++;                                  
      console.log("dic: " + dic);
      wx.setStorageSync('tableArray', dic);   //给tableArray赋值
      
      try{                                      //在home页显示数据
        var table = [];
        table = wx.getStorageSync('tableArray');
        if(table){
          for(var key in table){
            console.log("table: " + table[key]);
            that.setData({
              // tableArray: table,                    
              tableArray: thisPage, 
              scrolltop: 50 * thisPage.length,                   
            })
          }
          
        }
      }catch(e){
        console.log("------GET_ERROR1------");
      }
      // that.setData({
      //   clock: '00:00'
      // });
      seconds = 0;
      //---------------------输出检测-----------------------
      console.log("end");
      console.log("Start: " + that.data.start);
      console.log("Last: " + that.data.clock);
      console.log("Gap: " + that.data.gap);
      //--------------------------------------
      that.setData({
        endHidden: true,
        startHidden: false,
      });
      var endtime = Date.parse(new Date());
      var endtimestamp = endtime / 1000;
      wait = endtimestamp;
      //+++++++++++++++++++++++++++++++++++++++++++++++
    }
    else{
      wx.showToast({
        title: '持续时间太短啦~不要玩手机哦~',
        icon: "none",
        duration: 2000,
      })
    }                                         
    //+++++++++++++++++++++++++++++++++++++++++++++

    wx.setStorageSync('homeArray', thisPage);           //homePage                              
    console.log("thisPage_date: " + that.data.date);
    n++;
  },

  Delete:function (e) {
    var that = this;
    console.log("e ===> " + e.currentTarget.dataset.index);
    console.log("number: " + that.data.tableArray[e.currentTarget.dataset.index].num);

    console.log("e.currentTarget.dataset.index: " + e.currentTarget.dataset.index);   
    wx.showModal({
      title: '删除该记录',
      confirmColor: '#FF6969',
      success: function(res){
        if(res.confirm){
          console.log('用户点击确认');
          try {
            console.log("------TRY------")
            tempArray = wx.getStorageSync('tableArray');
            if (tempArray) {                                         
              console.log("length: " + thisPage.length);  
              if (e.currentTarget.dataset.index == 0 && e.currentTarget.dataset.index + 1 == thisPage.length) {                     
                console.log("only you");
                var shanchu = wx.getStorageSync('homeArray');
                shanchu[e.currentTarget.dataset.index].Gap = '00:00'
                wx.setStorageSync('homeArray', shanchu);
                that.setData({
                  tableArray: shanchu,
                })
                
                app.globalData.stampFlag = 1;    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
              }
              else if (e.currentTarget.dataset.index + 1 == thisPage.length) {
                console.log("the last one");
              }
              else if (e.currentTarget.dataset.index == 0 || thisPage[e.currentTarget.dataset.index].Gap == '00:00') {
                tempArray[tempArray.length - thisPage.length + e.currentTarget.dataset.index + 1].Gap = "00:00";
                thisPage[e.currentTarget.dataset.index + 1].Gap = "00:00";
              }
              else {
                var newGapSecond, newGapMinute, newGapHour;
                newGapSecond = thisPage[e.currentTarget.dataset.index + 1].timeSecond - thisPage[e.currentTarget.dataset.index - 1].timeSecond;
                newGapMinute = thisPage[e.currentTarget.dataset.index + 1].timeMinute - thisPage[e.currentTarget.dataset.index - 1].timeMinute;
                if (newGapSecond < 0) {
                  newGapSecond += 60;
                  newGapMinute--;
                }
                if (newGapMinute < 0) {
                  newGapMinute += 60;
                }
                if (newGapMinute > 30) {
                  newGapMinute = 0;
                  newGapSecond = 0;
                }
                tempArray[tempArray.length - thisPage.length + e.currentTarget.dataset.index + 1].Gap = fill_zero_prefix(newGapMinute) + ":" + fill_zero_prefix(newGapSecond);
                thisPage[e.currentTarget.dataset.index + 1].Gap = fill_zero_prefix(newGapMinute) + ":" + fill_zero_prefix(newGapSecond);   //GGGGG
                console.log("just a try: " + tempArray[tempArray.length - thisPage.length + e.currentTarget.dataset.index + 1].timeSecond);
                console.log("newGap: " + tempArray[tempArray.length - thisPage.length + e.currentTarget.dataset.index + 1].Gap);
              }
              tempArray.splice(tempArray.length - thisPage.length + e.currentTarget.dataset.index, 1);
              thisPage.splice(e.currentTarget.dataset.index, 1);

              console.log("-------DELETE_SUCCESS-------");
              console.log("length after splice: " + tempArray.length);
              console.log("e.currentTarget.dataset.index: " + e.currentTarget.dataset.index);                                   
            }
            wx.removeStorageSync('tableArray');
            wx.setStorageSync('tableArray', tempArray);
            console.log("reset success");
            console.log("app.globalData.stampFlag" + app.globalData.stampFlag);
          } catch (err) {
            console.log("------DELETE_ERROR------");
          }
          dic = wx.getStorageSync('tableArray');                                        
          if (thisPage && thisPage == []) {
            for (var key in thisPage) {
              console.log("[] thisPage: " + thisPage);
              that.setData({
                //tableArray: nowTable,               
                tableArray: thisPage,
              })
              wx.setStorageSync('homeArray', thisPage);
            }
          }
          else {
            console.log("thisPage: " + thisPage);
            console.log("this dic:" + dic);
            that.setData({
              // tableArray: nowTable,                
              tableArray: thisPage,
              scrolltop: 50 * thisPage.length, 
            })
            wx.setStorageSync('homeArray', thisPage);
          }                                                                              


        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    })
  },



  toHistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
   },
  

});

function Countdown (that) {
  that.setData({
    clock: date_format(seconds)
  });
  console.log("flag------>" + flag);
  timer = setTimeout(function () {
    console.log("-----Countdown-----");
    seconds += 1;
    Countdown(that);
  }, 1000);
};

function date_format(second) {
  var min = 
  fill_zero_prefix((seconds - second % 60) / 60);
  var sec = fill_zero_prefix(seconds % 60);
  return min + ":" + sec;
}

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
};

