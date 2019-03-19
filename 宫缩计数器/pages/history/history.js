// pages/history/history.js

var app = getApp();
// var util = require('../home/home.js');
var tempArray=[];
var dic = [];
var homeArray;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("history_load_seccess");
    // var historyTable = wx.getStorageSync('tableArray');
    this.setData({
      tableArray: wx.getStorageSync('tableArray'),
    })
    //*********************************************************************
    // let object = JSON.parse(options.tableArray);
    // this.setData({
    //   tableArray: object,
    // })
    //*********************************************************************
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
    console.log("tableArray: " + this.data.tableArray);
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

  clearBtn: function (){
    var that = this;
    wx.showModal({
      title: '清空历史记录',
      confirmColor: '#FF6969',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确认');
          wx.removeStorageSync('homeArray');
          wx.removeStorageSync('tableArray');
          var hi = wx.getStorageSync('homeArray');
          var hello = wx.getStorageSync('tableArray');
          console.log("homeArray: " + hi);
          console.log("tableArray: " + hello);
          that.setData({
            tableArray: wx.getStorageSync('tableArray'),
          })
          app.globalData.homeFlag = 1;
          app.globalData.stampFlag = 1;
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        // app.globalData.homeFlag = 1;
      }
    })
  },
  
  Delete: function (e) {
    var that = this;
    console.log("e ===> " + e.currentTarget.dataset.index);
    console.log("number: " + that.data.tableArray[e.currentTarget.dataset.index].num);
    wx.showModal({
      title: '删除该记录',
      confirmColor: '#FF6969',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确认');
          //******************************************************************
          try {
            console.log("------TRY------")
            //+++++++++++++++++++++++++++++++++++++++++++++++
            tempArray = wx.getStorageSync('tableArray');             //获取缓存

            homeArray = wx.getStorageSync('homeArray');              //获取缓存
            console.log("homeArray.length: " + homeArray.length);
            console.log("tempArray.length: " + tempArray.length);
            if (tempArray) {                                         //若tableArray不为空 
              console.log("-------DELETE_SUCCESS-------");
              console.log("length: " + tempArray.length);
              //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              if (e.currentTarget.dataset.index == 0 && e.currentTarget.dataset.index + 1 == tempArray.length) {        //删除tableArray仅存一个元素
                console.log("only you");
                app.globalData.stampFlag = 1;                        //此时tableArray被清空 这里可以修改为直接改缓存！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
              }
              else if (e.currentTarget.dataset.index + 1 == tempArray.length) {                                         //删除tableArray最尾端的一个元素
                console.log("the last one");
              }
              else if (e.currentTarget.dataset.index == 0 || tempArray[e.currentTarget.dataset.index].Gap == '00:00') {  //删除每一轮计数的最前端元素
                tempArray[e.currentTarget.dataset.index + 1].Gap = "00:00";                                     
                if (tempArray.length - homeArray.length <= e.currentTarget.dataset.index){                               //同步至homeArray
                  homeArray[e.currentTarget.dataset.index + homeArray.length - tempArray.length + 1].Gap = "00:00";      
                }
              }
              else {                                                             //删除tableArray中间项
                console.log("=====OK=====");
                var newGapSecond, newGapMinute, newGapHour;
                newGapSecond = tempArray[e.currentTarget.dataset.index + 1].timeSecond - tempArray[e.currentTarget.dataset.index - 1].timeSecond;
                newGapMinute = tempArray[e.currentTarget.dataset.index + 1].timeMinute - tempArray[e.currentTarget.dataset.index - 1].timeMinute;
                console.log("newGapSecond: " + newGapSecond);
                console.log("newGapMinute: " + newGapMinute);
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
                if (tempArray.length - homeArray.length <= e.currentTarget.dataset.index) {            //同步至homeArray
                  homeArray[e.currentTarget.dataset.index + homeArray.length - tempArray.length + 1].Gap = fill_zero_prefix(newGapMinute) + ":" + fill_zero_prefix(newGapSecond);
                }
                tempArray[e.currentTarget.dataset.index + 1].Gap = fill_zero_prefix(newGapMinute) + ":" + fill_zero_prefix(newGapSecond);
                console.log("just a try: " + tempArray[e.currentTarget.dataset.index + 1].timeSecond);
                console.log("newGap: " + tempArray[e.currentTarget.dataset.index + 1].Gap);
                
              }
              if (tempArray.length - homeArray.length <= e.currentTarget.dataset.index) {
                homeArray.splice(e.currentTarget.dataset.index + homeArray.length - tempArray.length, 1);
              }
              tempArray.splice(e.currentTarget.dataset.index, 1);        //删除
              //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

              console.log("length after splice: " + tempArray.length);
            }
            wx.removeStorageSync('tableArray');
            wx.removeStorageSync('homeArray');
            console.log("tempArray: " + tempArray);
            wx.setStorageSync('tableArray', tempArray);
            wx.setStorageSync('homeArray', homeArray);
            that.setData({
              tableArray: wx.getStorageSync('tableArray'),    //更新history
            });
            console.log("reset success");
            console.log("toHome ------>" + that.data.tableArray);
            app.globalData.homeFlag = 0;      
          } catch (err) {
            console.log("------DELETE_ERROR------");
          }
          try {                                               //修改显示的历史记录
            var nowTable = [];
            nowTable = wx.getStorageSync('tableArray');
            dic = wx.getStorageSync('tableArray');
            if (nowTable && nowTable == []) {
              for (var key in nowTable) {
                console.log("[] nowTable: " + nowTable);
                that.setData({
                  tableArray: nowTable,
                })
              }
            }
            else {
              console.log("nowTable: " + nowTable);
              console.log("this dic:" + dic);
              that.setData({
                tableArray: nowTable,
              })
            }
          } catch (e) {
            console.log("------GET_ERROR2------");
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },

})

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
};