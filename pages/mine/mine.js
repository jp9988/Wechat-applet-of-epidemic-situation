// pages/mine/mine.js
var app = getApp();
var that;
var arr_list = [];
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

   //获取谣言信息
   runmour:function(page){
    that = this;
    wx.request({
      url: 'https://api.tianapi.com/txapi/rumour/index?key=' + app.global.APIKEY + '&page=' + page,
      success:res=>{
        console.log(res.data);
        for(let key in res.data.newslist){
          arr_list.push(res.data.newslist[key])
        }
        that.setData({
          arr:arr_list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.runmour(page);
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
    page++;
    this.runmour(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})