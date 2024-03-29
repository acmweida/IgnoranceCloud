var time = require('../../utils/time.js')
var app = getApp();
import { MusicModel } from '../../models/music.js'
const musicMedel = new MusicModel()

Page({

  data: {
    song: {},
    currentProcess: '00:00',
    totalProcess: '00:00',
    active: [],
    animationData: [],
    stickAnimation: [],
    showLrc: false,
    isStop: false,
    scroll: 0,
    statusImg: '../../imgs/pause.png',
    isMovingSlider: false,
    loop: false,
    oneloop: true,
    random: true
  },

  onLoad: function () {
    this.setData({
      loop: app.globalData.loop,
      oneloop: app.globalData.oneloop,
      random: app.globalData.random
    })
    musicMedel.getSong()
    .then(res => {
      console.log(res)
      this.setData({
        songUrl: res[0].data[0].url,
        song: res[1].songs[0]
      })
      this.createAudio()
      console.log(res[2].tlyric)
      if (res[2].tlyric.lyric)
        this.parseLyric(res[2].tlyric.lyric)
      else
        this.parseLyric(res[2].lrc.lyric)
    })
  },
  

  

  createAudio() {
    var _this = this;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    const options = {
      onWaiting() {
        wx.showLoading({
          title: '音频加载中…'
        });
        _this.isWaiting = true;
      },
    }
    app.globalData.backgroundAudioManage = backgroundAudioManager
    backgroundAudioManager.title = this.data.song.name
    backgroundAudioManager.epname = this.data.song.name
    backgroundAudioManager.singer = this.data.song.ar[0].name - this.data.song.al.name
    backgroundAudioManager.coverImgUrl = this.data.song.al.picUrl
    backgroundAudioManager.src = this.data.songUrl


    backgroundAudioManager.onPlay(() => {
      this.beginAnimation();
      //console.log(res)
    });
    backgroundAudioManager.onTimeUpdate(res => {
      if (!_this.data.isMovingSlider) {
        _this.setData({
          sliderMax: Math.floor(backgroundAudioManager.duration),
          currentProcess: time.formatTime(backgroundAudioManager.currentTime),
          currentTime: backgroundAudioManager.currentTime,
          totalProcess: time.formatTime(backgroundAudioManager.duration),
          sliderValue: Math.floor(backgroundAudioManager.currentTime)
        })
      }
    });
    backgroundAudioManager.onWaiting(() => {
      if (_this.isWaiting) {
        _this.isWaiting = false;
        setTimeout(() => {
          wx.hideLoading();
        }, 300);
      }
    })
    backgroundAudioManager.onEnded(() => {
      this.stopAnimation()
      this.next()
    })
  },
  onShow() {

    const backgroundAudioManager = wx.getBackgroundAudioManager()
   
    console.log("onShow")
    console.log(this.data.showLrc)
    backgroundAudioManager.onPlay(() => {
      console.log("playing")
      //console.log(res)
    });
  },

  onHide() {
    console.log(this.data.isStop)
  },
  
  play: function () {

  },
  handleSliderMoveEnd() {

  },
  handleSliderMoveStart() {
    this.setData({
      isMovingSlider: true
    });
  },
  handleSliderMoveEnd() {
    this.setData({
      isMovingSlider: false
    });
  },
  changeStatus() {
    var backgroundAudioManager = app.globalData.backgroundAudioManage
    if (this.data.isStop) {
      this.setData({
        statusImg: '../../imgs/pause.png',
        isStop: false
      })
      backgroundAudioManager.play();
      this.beginAnimation();
    }
    else {
      this.setData({
        statusImg: '../../imgs/play.png',
        isStop: true
      })
      backgroundAudioManager.pause();
      this.stopAnimation();
    }
  },
  hanleSliderChange(e) {
    console.log(e)
    const position = e.detail.value;
    console.log(position)
    this.seekCurrentAudio(position);
  },
  seek(options) {
    wx.seekBackgroundAudio(options);  // 这样实现，就可以配置success回调了
  },
  seekCurrentAudio(position) {
    var backgroundAudioManager = app.globalData.backgroundAudioManage
    // 更新进度条
    const _this = this;
    // 音频控制跳转
    // 这里有一个诡异bug：seek在暂停状态下无法改变currentTime，需要先play后pause
    var pauseStatusWhenSlide = backgroundAudioManager.paused;
    if (pauseStatusWhenSlide) {
      backgroundAudioManager.play();
    }
    var newPosition = Math.floor(position)
    wx.seekBackgroundAudio({
      position: newPosition,
      success: () => {
        _this.setData({
          currentProcess: time.formatTime(newPosition),
          sliderValue: newPosition
        })
        if (pauseStatusWhenSlide) {
          backgroundAudioManager.pause();
        }
        console.log(`The process of the audio is now in ${backgroundAudioManager.currentTime}s`);
      }
    })
  },
  beginAnimation() {
    var _this = this
    var animation = wx.createAnimation({
      duration: 200000,
      timingFunction: 'linear'
    })
    var stickAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      transformOrigin: 'top'
    })
    animation.rotate(3600).step().rotate(1).step().rotate(3600).step()
    stickAnimation.rotate(20).step()
    this.setData({
      animationData: animation.export(),
      stickAnimation: stickAnimation.export()
    })
    // setTimeout(function () {
    //     _this.setData({
    //         animationData: animation.export()
    //     })
    // }, 8000);
  },
  stopAnimation() {
    var animation = wx.createAnimation({
      duration: 500000
    })
    var stickAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      transformOrigin: 'top'
    })
    this.animation = animation;
    animation.rotate(0).step()
    stickAnimation.rotate(-20).step()
    this.setData({
      animationData: animation.export(),
      stickAnimation: stickAnimation.export()
    })
  },
  parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        lrcObj[time] = clause;
      }
    }
    this.setData({
      lrc: lrcObj
    })
    console.log(lrcObj);
  },
  change() {
    if (this.data.showLrc) {
      this.setData({
        showLrc: false
      })
      if (!app.globalData.backgroundAudioManage.pasued)
        this.beginAnimation()
    }
    else {
      this.setData({
        showLrc: true
      })
      this.stopAnimation()
      if (!app.globalData.backgroundAudioManage.pasued)
        this.scrollLrc()
    }
  },
  scrollLrc() {
    var _this = this, active = [], temp = 0, lrcHeight = 0;
    var inter = setInterval(function () {
      for (var key in _this.data.lrc) {
        if (key == Math.floor(_this.data.currentTime) && !app.globalData.backgroundAudioManage.pasued) {
          active[temp] = ''
          active[key] = 'lrcActive'
          let height = wx.getSystemInfoSync().windowHeight * 0.85 * 0.7
          var query = wx.createSelectorQuery()
          query.select('.lrcActive').boundingClientRect().exec(
            res => {
              if (res[0]!=null) 
                lrcHeight = res[0].top
            }
          )
          if (lrcHeight <= height * 2 / 5)
            _this.data.scroll += 15
          else
            _this.data.scroll += 40
          _this.setData({
            active: active,
            scroll: _this.data.scroll
          })
         
          temp = key;
          break;
        }
      }
      app.globalData.backgroundAudioManage.onStop(() => {
        clearInterval(inter)
      })
    }, 800)
  },
  pre() {
    if (!this.data.oneloop) {
      const backgroundAudioManager = app.globalData.backgroundAudioManage
      backgroundAudioManager.seek(0.000)
    }
    if (!this.data.random) {
      wx.setStorage({
        key: 'songid',
        data: this.idRandom(),
        success: () => {
          wx.redirectTo({
            url: '/pages/audio/index',
          })
        }
      })
    }
    if (!this.data.loop) {
    let songid = wx.getStorageSync("songid")
    if (songid == 0) {
      songid = wx.getStorageSync("playlist").length-1
    } else {
      --songid
    }
    wx.setStorage({
      key: 'songid',
      data: songid,
      success: () => {
        wx.redirectTo({
          url: '/pages/audio/index',
        })
      }
    })
    }
  },
  next() {
    
    if (!this.data.loop) {
      let songid = wx.getStorageSync("songid")
      songid +=1 
      if (songid == wx.getStorageSync("playlist").length) {
        songid = 0
      }
      wx.setStorage({
        key: 'songid',
        data: songid,
        success: () => {
          wx.redirectTo({
            url: '/pages/audio/index',
          })
        }
      })
    }
    if (!this.data.oneloop) {
      const backgroundAudioManager = app.globalData.backgroundAudioManage
      backgroundAudioManager.seek(0.000)
      // wx.redirectTo({
      //   url: '/pages/audio/index',
      // })
    }
    if (!this.data.random) {
      wx.setStorage({
        key: 'songid',
        data: this.idRandom(),
        success: () => {
          wx.redirectTo({
            url: '/pages/audio/index',
          })
        }
      })
    }
  },
  changePlay() {
    var _global = app.globalData
    if (!_global.loop && _global.oneloop) {
      this.setData({
        loop: true,
        oneloop: false,
      })
      _global.loop = true
      _global.oneloop = false
    } else if (!_global.oneloop && _global.random) {
      this.setData({
        oneloop: true,
        random: false
      })
      _global.oneloop = true
      _global.random = false
    } else if (!_global.random && _global.loop) {
      this.setData({
        random: true,
        loop: false
      })
      _global.random = true
      _global.loop = false
    }
  },
  idRandom() {
    var max = wx.getStorageSync("playlist").length-1
    var min = 0
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  surprise() {
    // wx.showModal({
    //   title: '彩蛋!!~',
    //   content: '开发者addoneG的QQ号: 467072280~',
    //   showCancel: false
    // })
  }


})
