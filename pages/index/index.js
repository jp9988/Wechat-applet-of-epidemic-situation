// pages/index/index.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0
  },

  onClick:function(event){
    that = this;
    var index = event.currentTarget.dataset.id;
    that.setData({
      current:index
    })
  },
//获取缓存
getStorage:function(){
  //获取缓存里面的数据 超时时间的缓存
    wx.getStorage({
      key: 'out_time',
      success: function(res) {
        //获取当前的时间
          var now_time = new Date().getTime();

          if(now_time - res.data <=0 ){
            //缓存没过期

            //获取缓存里面的疫情数据
            wx.getStorage({
              key: 'ncov',
              success: function(res) {

                console.log(res.data),

                //把缓存中的数据存到data（数据绑定）
                that.setData(
                  {
                    "ncov":res.data
                  }
                )
              },
            })

          }else{
            //缓存过期了

            //重新设定疫情信息缓存 和 过期时间缓存
            that.getHomeNcov();

          }


      },
      //获取缓存失败 => 不存在这个缓存
      fail:err => {
          //重新缓存疫情信息 和 过期时间
          that.getHomeNcov();
      }
    })

  //停止下拉刷新
  wx.stopPullDownRefresh();
},


  //获取全国的疫情信息
  getHomeNcov:function(){
    wx.request({
      url: 'https://api.tianapi.com/txapi/ncov/index',
      method:"GET",
      dataType:"JSON",
      data: { key:""},

      success:res=>{
          var newslist = JSON.parse(res.data).newslist[0];
          //当前时间的时间戳
          

          //存数据缓存之前，给缓存设置一个过期时间 十分钟
          wx.setStorage({
            key: 'out_time',
            data: new Date().getTime() + 600000,
          })
          //存缓存的API
          wx.setStorage({
            //缓存的key
            key: 'ncov',
            //缓存里面的内容
            data: newslist,
          })
          //获取缓存中的数据
          that.getStorage();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //调用缓存
    that.getStorage();
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
    //调用缓存
    that.getStorage();
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

  }
})