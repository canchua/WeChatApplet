//index.js
//获取应用实例
const app = getApp()
var index1 = 0, index2 = 0;
var maybe = '', other = '';
var index_A = 0, index_B = 0;
Page({
  //---------------------------------------
 
  data: {
    array1: ['选择血型', 'A', 'B', 'AB', 'O'],
    objectarray1: [
      {
        id: 0,
        name: '选择血型'
      },
      {
        id: 1,
        name: 'A'
      },
      {
        id: 2,
        name: 'B'
      },
      {
        id: 3,
        name: 'AB'
      },
      {
        id: 4,
        name: 'O'
      }
    ],
    index1: 0,
    array2: ['选择血型', 'A', 'B', 'AB', 'O'],
    objectarray2: [
      {
        id: 0,
        name: '选择血型'
      },
      {
        id: 1,
        name: 'A'
      },
      {
        id: 2,
        name: 'B'
      },
      {
        id: 3,
        name: 'AB'
      },
      {
        id: 4,
        name: 'O'
      }
    ],
    index2: 0,
    hiddenValue: true, 
    
  },
  //-----------------------------------------
  your: function (e) {
    index_A = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
      
    })
  },
  parter: function (e) {
    index_B = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      
    })
  },
  //-------------------------------------------------
  
  judge: function () {
    var that = this;
    index1 = index_A
    index2 = index_B
    if (index1 == 0 || index2 == 0) {
      that.setData({
        hiddenValue: false
      })
    }

    else{
      that.setData({
        hiddenValue: true
      })
      if (index1 == 1) {
        if (index2 == 1) {
          maybe = 'A、O',
            other = 'B、AB'
        }
        else if (index2 == 2) {
          maybe = 'A、B、O、AB',
            other = '无'
        }
        else if (index2 == 3) {
          maybe = 'A、B、AB',
            other = 'O'
        }
        else {
          maybe = 'A、O',
            other = 'B、AB'
        }
      }
      else if (index1 == 2) {
        if (index2 == 1) {
          maybe = 'A、B、O、AB',
            other = '无'
        }
        else if (index2 == 2) {
          maybe = 'B、O',
            other = 'A、AB'
        }
        else if (index2 == 3) {
          maybe = 'A、B、AB',
            other = 'O'
        }
        else {
          maybe = 'B、O',
            other = 'A、AB'
        }
      }
      else if (index1 == 3) {
        if (index2 == 1) {
          maybe = 'A、B、AB',
            other = 'O'
        }
        else if (index2 == 2) {
          maybe = 'A、B、AB',
            other = 'O'
        }
        else if (index2 == 3) {
          maybe = 'A、B、AB',
            other = 'O'
        }
        else {
          maybe = 'A、B',
            other = 'AB、O'
        }
      }
      else {
        if (index2 == 1) {
          maybe = 'A、O',
            other = 'B、AB'
        }
        else if (index2 == 2) {
          maybe = 'B、O',
            other = 'A、AB'
        }
        else if (index2 == 3) {
          maybe = 'A、B',
            other = 'AB、O'
        }
        else {
          maybe = 'O',
            other = 'A、B、AB'
        }
      }
      wx.navigateTo({
        url: '../../pages/resultpage/resultpage?maybe=' + maybe + '&other=' + other,
      })
    }
    
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },

})

