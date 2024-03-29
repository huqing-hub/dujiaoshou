// const QQMapWX = require('../other/qqmap-wx-jssdk.min.js');

// const request_01 = require('../request/request_01.js');

// const alert = require('./alert.js');

//当前时间、时间戳(秒)、毫秒转换
const formatTime = (date, types, connect = '/', connect2 = ' ', connect3 = ':') => {
    if (types === 's') {
        date = new Date(date * 1000)
    } else if (types === 'ms') {
        date = new Date(date);
    } else {
        date = new Date();
    }
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, month, day].map(formatNumber).join(connect) + connect2 + [hour, minute, second].map(formatNumber).join(connect3)
}

//某个时间距离当前时间转换
const distanceTime = (time) => {
    time = time.replace(/-/g, '/')
    let _str
    let _date = new Date().getTime()
    let _curDate = new Date(time).getTime()
    let _differDate = _date - _curDate
    let _min = parseInt(_differDate / 60000) > 0 ? parseInt(_differDate / 60000) : 1
    let _hour = parseInt(_min / 60)
    let _day = parseInt(_hour / 24)
    let _mon = parseInt(_day / 30)
    if (_min < 60) {
        _str = { ch: _min + "分钟前", en: _min + ' minutes ago' }
    } else if (_hour < 24) {
        _str = { ch: _hour + "小时前", en: _hour + ' hours ago' }
    } else if (_day < 30) {
        _str = { ch: _day + "天前", en: _day + ' days ago' }
    } else if (_mon < 12) {
        _str = { ch: _mon + "月前", en: _mon + ' months ago' }
    }
    return _str
}

//当前是几月
const sameMonth = () => {
    let _month = new Date().getMonth() + 1
    let _months
    switch (_month) {
        case 1:
            _months = { ch: '一月', en: 'January ' }
            break
        case 2:
            _months = { ch: '二月', en: 'February ' }
            break
        case 3:
            _months = { ch: '三月', en: 'March ' }
            break
        case 4:
            _months = { ch: '四月', en: 'April ' }
            break
        case 5:
            _months = { ch: '五月', en: 'May ' }
            break
        case 6:
            _months = { ch: '六月', en: 'June ' }
            break
        case 7:
            _months = { ch: '七月', en: 'July ' }
            break
        case 8:
            _months = { ch: '八月', en: 'August ' }
            break
        case 9:
            _months = { ch: '九月', en: 'September ' }
            break
        case 10:
            _months = { ch: '十月', en: 'October ' }
            break
        case 11:
            _months = { ch: '十一月', en: 'November ' }
            break
        case 12:
            _months = { ch: '十二月', en: 'December ' }
    }
    return _months
}

//生成随机字符串
const randomString = (len) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//个位数自动在前面添加0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//保留固定小数不足添0
const decimal_place = (x, n = 2, math = 'round') => {
    let f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return 0;
    }
    let _n = '1';
    for (let i = 0; i < n; i++) {
        _n += '0'
    }
    _n = Number(_n)
    if (math == 'none') {
        f_x = parseInt(x * _n) / _n
    } else if (math == 'round') {
        f_x = Math.round(x * _n) / _n
    } else if (math == 'floor') {
        f_x = Math.floor(x * _n) / _n
    }
    let s_x = f_x.toString()
    let pos_decimal = s_x.indexOf('.')
    if (pos_decimal < 0) {
        pos_decimal = s_x.length
        s_x += '.'
    }
    while (s_x.length <= pos_decimal + n) {
        s_x += '0'
    }
    return s_x
}

//获取图片本地路径
const getImgLocalPath = imgUrl => {
    return new Promise(resolve => {
        wx.getImageInfo({
            src: imgUrl,
            success: function (res) {
                resolve(res.path)
            }
        })
    })
}

//摇一摇1
const shake_one_shake = (isOpen, shakeNum = 2, interval = 2000, audio, callBack) => { // 摇一摇方法封装
    let numX = 0 //x轴
    let numY = 0 // y轴
    let numZ = 0 // z轴
    let stsw = true // 开关，保证在一定的时间内只能是一次摇成功
    let positivenum = 0 //正数 摇一摇总数
    let audioCtx//音频，用于摇成功提示
    if (!isOpen) {
        wx.stopAccelerometer()
        callBack('已经关闭摇一摇')
        return;
    }
    wx.startAccelerometer({
        interval: 'ui'
    })
    wx.onAccelerometerChange(function (res) {  //小程序api 加速度计
        if (numX < res.x && numY < res.y) {  //个人看法，一次正数算摇一次，还有更复杂的
            positivenum++
            setTimeout(() => { positivenum = 0 }, 2000) //计时两秒内没有摇到指定次数，重新计算
        }
        if (numZ < res.z && numY < res.y) { //可以上下摇，上面的是左右摇
            positivenum++
            setTimeout(() => { positivenum = 0 }, 2000) //计时两秒内没有摇到指定次数，重新计算
        }
        if (positivenum == shakeNum && stsw) { //是否摇了指定的次数，执行成功后的操作
            stsw = false
            if (audio) {
                let audioCtx = wx.createAudioContext(audio.split(",")[0])
                audioCtx.setSrc(audio.split(",")[1]) //音频文件，第三方的可自行选择
                audioCtx.play() //播发音频
            }
            callBack('摇一摇成功...')
            setTimeout(() => {
                positivenum = 0 // 摇一摇总数，重新0开始，计算
                stsw = true
            }, shakeSpeed)
        }
    })
}

//摇一摇2
const shake_one_shake2 = (isOpen, shakeSpeed = 100, interval = 2000, audio, callBack) => {
    //首先定义一下，全局变量
    let lastTime = 0; //此变量用来记录上次摇动的时间
    let x = 0,
        y = 0,
        z = 0,
        lastX = 0,
        lastY = 0,
        lastZ = 0; //此组变量分别记录对应x、y、z三轴的数值和上次的数值
    let stsw = true // 开关，保证在一定的时间内只能是一次摇成功
    if (!isOpen) {
        wx.stopAccelerometer()
        callBack('已经关闭摇一摇')
        return;
    }
    wx.onAccelerometerChange(shake)
    //wx.startAccelerometer()
    //编写摇一摇方法
    function shake(acceleration) {
        let nowTime = new Date().getTime(); //记录当前时间
        //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
        if (nowTime - lastTime > 100) {
            let diffTime = nowTime - lastTime; //记录时间段
            lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
            x = acceleration.x; //获取x轴数值，x轴为垂直于北轴，向东为正
            y = acceleration.y; //获取y轴数值，y轴向正北为正
            z = acceleration.z; //获取z轴数值，z轴垂直于地面，向上为正
            //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
            let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
            //console.log(speed)
            lastX = x; //赋值，为下一次计算做准备
            lastY = y; //赋值，为下一次计算做准备
            lastZ = z; //赋值，为下一次计算做准备
            if (speed > shakeSpeed && stsw) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
                stsw = false
                if (audio) {
                    let audioCtx = wx.createAudioContext(audio.split(",")[0])
                    audioCtx.setSrc(audio.split(",")[1]) //音频文件，第三方的可自行选择
                    audioCtx.play() //播发音频
                }
                callBack('摇一摇成功...')
                setTimeout(() => {
                    stsw = true
                }, interval)
            }
        }
    }
}

//输入框判断
const regexp = (opation, sensitiveWords, lang) => {
    return new Promise((resolve, reject) => {
        let reg_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//正则--手机号
        let reg_chs = /^[\u4E00-\u9FA0]{2,6}$/;//正则--中文
        let sensitivewords = []
        for (let i = 0; i < sensitiveWords.length; i++) {
            if (lang == 'CH') {
                sensitivewords.push(sensitiveWords[i].sensitive_name)
            } else {
                sensitivewords.push(sensitiveWords[i].sensitive_name_english)
            }
        }
        for (let k in opation) {
            if (!(opation[k].value).replace(/\s+/g, "")) {
                resolve({ status: 1, prompt: opation[k].prompt[0] })
            }
            if (opation[k].reg) {
                if (opation[k].reg.indexOf('minLength') != -1) {
                    if (opation[k].value.length < opation[k].reg.split("-")[1]) {
                        resolve({ status: 1, prompt: opation[k].prompt[4] })
                    }
                }
            }
            if (opation[k].type === 'tel') {
                if (!reg_tel.test(opation[k].value)) {
                    resolve({ status: 1, prompt: opation[k].prompt[1] })
                }
            }
            for (let i = 0; i < sensitivewords.length; i++) {
                if (opation[k].value.indexOf(sensitivewords[i]) != -1) {
                    resolve({ status: 1, prompt: opation[k].prompt[1] + opation[k].prompt[2] + sensitivewords[i] + opation[k].prompt[3] })
                }
            }
        }
        resolve({ status: 0 })
    })
}


//获取手机系统信息
const getSystem = () => {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success(res) {
                resolve(res)
            },
            fail(reason) {
                reject(reason)
            }
        })
    })

}

//预览图片
const previewImage = ({ urls = [], current = '' }) => {
    wx.previewImage({
        urls,
        current,
    })
}

//canvas绘图
const canvasImg = (options, callback) => {
    const ctx = wx.createCanvasContext(options.canvasId);

    ctx.clearRect(0, 0, 680, 1040);
    ctx.beginPath();

    ctx.setFillStyle("#ffffff")
    ctx.fillRect(0, 0, 680, 1040)

    if (options.imgList.length > 0) {
        for (let i = 0; i < options.imgList.length; i++) {
            let _curimg = options.imgList[i]
            ctx.save()
            ctx.beginPath()
            if (_curimg.isRadius) {
                ctx.arc(_curimg.imgX + _curimg.imgW / 2, _curimg.imgY + _curimg.imgW / 2, _curimg.imgW / 2, 0, 2 * Math.PI)
                ctx.clip()
            }
            ctx.drawImage(_curimg.url, _curimg.imgX, _curimg.imgY, _curimg.imgW, _curimg.imgH)
            ctx.restore()
        }
    }

    if (options.textList.length > 0) {
        for (let i = 0; i < options.textList.length; i++) {
            let _curText = options.textList[i];
            ctx.setFontSize(_curText.fontSize)
            ctx.setFillStyle(_curText.color)
            ctx.setTextAlign(_curText.align)
            ctx.setTextBaseline('top')
            ctx.fillText(_curText.string, _curText.textX, _curText.textY)
            if (_curText.bold) {
                ctx.fillText(_curText.string, _curText.textX, _curText.textY - 0.5)
                ctx.fillText(_curText.string, _curText.textX - 0.5, _curText.textY)
            }
        }
    }

    new Promise((resolve, reject) => {
        ctx.draw(true, function (res) {
            resolve(res)
        })
    }).then((value) => {
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: options.canvasId,
                success(res) {
                    callback(res.tempFilePath)
                }
            })
        }, 100)
    })
}

//添加wx卡卷
const addCard = (...cardList) => {
    return new Promise((resolve, reject) => {
        wx.addCard({
            cardList,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

//获取定位（地理位置）
const getPosition = () => {
    return new Promise((resolve, reject) => {
        let qqmapsdk = new QQMapWX({ key: 'GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ' });
        qqmapsdk.reverseGeocoder({
            success: (res) => {//成功后的回调
                console.log(res)
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

/**
 * 
 * 
 * H5小游戏
 */

//button用户信息授权
const userInfoAuth = (e)=>{
    const detail = e.detail;
    const errMsg = detail.errMsg;
    const userInfo = detail.userInfo;
    const locationUserInfo = wx.getStorageSync('userInfo');

    alert.loading({
        str: '授权中'
    });

    return new Promise((resolve, reject)=>{

        if( errMsg == 'getUserInfo:ok' ){//用户接受授权，获取用户信息
            request_01.perfectInfo({
                user_id: locationUserInfo.user_id,//用户ID
                nickname: userInfo.nickName,//用户昵称
                headimg: userInfo.avatarUrl,//用户头像
                gender: userInfo.gender,//用户性别 1-男 2-女 获取不到-0
            })
                .then(() => {
        
                    alert.loading_h();
        
                    wx.setStorageSync('userInfo', Object.assign(locationUserInfo, userInfo));
                    

                    resolve()
        
                })
                .catch((reason) => {
        
                    alert.loading_h();
        
                    alert.alert({
                        str: reason
                    })
        
                })
        }else{//用户拒绝授权

            alert.loading_h();

            reject()

        }

    })

}

module.exports = {
    formatTime,//当前时间、时间戳(秒)、毫秒转换
    distanceTime,//某个时间距离当前时间转换
    sameMonth,//当前是几月
    randomString,//生成随机字符串
    formatNumber,//个位数自动在前面添加0
    decimal_place,//保留固定小数不足添0
    getImgLocalPath,//获取图片本地路径
    shake_one_shake,//摇一摇1
    shake_one_shake2,//摇一摇2
    regexp,//输入框判断
    getSystem,//获取手机系统信息
    previewImage,//预览图片
    canvasImg,//canvas绘图
    addCard,//添加wx卡卷
    getPosition,//获取定位（地理位置）
    userInfoAuth,//button用户信息授权
}