// pages/cloud/cloud.js
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },
  /**
   * 增
   */
  insert: function() {
    // db.collection('user').add({
    //   data: {
    //     name: 'jerry',
    //     age: 20
    //   },
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
    db.collection('user').add({
      data: {
        name: 'jack',
        age: 18
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 改
   */
  update: function() {
    db.collection('user').doc('3c4c6d855d7862ac179072fb429d3cb6').update({
      data: {
        name: 'jack11',
        age: 100
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 查
   */
  search: function() {
    db.collection('user').where({
      name: 'jack11'
    }).get().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 删
   */
  deleteFn: function() {
    db.collection('user')
      .doc('3c4c6d855d7862ac179072fb429d3cb6')
      .remove()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 调用云函数
   */
  sum: function() {
    wx.cloud.callFunction({
        name: 'sum',
        data: {
          a: 3,
          b: 6
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 获取openid
   */
  getOpenId: function() {
    wx.cloud.callFunction({
        name: 'login',
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 批量删除
   */
  batchDelete: function() {
    wx.cloud.callFunction({
        name: 'batchDelete',
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 上传
   */
  upload: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png', //指定图片名称
          filePath: tempFilePaths[0], // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID);
          db.collection('image').add({
            data: {
              fileID: res.fileID
            }
          }).then(res => {
            console.log(res)
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          // handle error
        })
      }
    })
  },
  /**
   * 文件展示
   */
  getFile: function() {
    wx.cloud.callFunction({
        name: 'login',
      })
      .then(res => {
        db.collection('image')
          .where({
            _openid: res.result.openid
          })
          .get()
          .then(res2 => {
            this.setData({
              images: res2.data
            })
          })
          .catch(err2 => {
            console.log(err2)
          })
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 文件下载
   */
  downLoadFile: function(event) {
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath);
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          wx.showToast({
            title: '保存成功',
          })
        }
      })
    }).catch(error => {
      // handle error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})