
const ajax = (url, data = {}, tokenKey, method = 'GET', callback) => {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/json',
      "Authorization": tokenKey
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const gets = (url, data = {}, tokenKey, callback) => {
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/json',
      "Authorization": tokenKey
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const post = (url, data = {}, tokenKey, callback) => {
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/json',
      "Authorization": tokenKey
    },
    success: function (res) {
      callback(res)
    },
    fail: function (err) {
      callback(res)
    }
  })
}
const getP = (url, data = {}, tokenKey, header = {
  'content-type': 'application/json',
  "Authorization": tokenKey
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
const postP = (url, data = {}, tokenKey, header = {
  'content-type': 'application/json',
  "Authorization": tokenKey
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
module.exports = {
  ajax,
  gets,
  post,
  getP,
  postP
}