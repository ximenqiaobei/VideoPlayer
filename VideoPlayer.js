/*
1，写出HTML
2，往页面中添加按钮
3，绑定按钮事件

*/
//视频库
const videos = {
    0:'0.mp4',
    1:'1.mp4',
    2:'2.mp4',
    sum: 3,
}

// 在 load 之后判断播放状态，改变播放图标
const state = function(){
    var v = e('.button_play')
    var video = e('.video')
    if (video.paused) {
        v.setAttribute('src', 'images/video_play.png')
    } else {
        v.setAttribute('src', 'images/video_pause.png')
    }
}


// 判断是否 autoplay(自动播放)，改变播放图标
const autoPlay = function(){
    var video = e('.video')
    //查看是否拥有autoplay
    var auto = video.getAttribute('autoplay')
    //如果有，就判断播放状态，改变图标
    if (auto != null) {
        state()
    }
}



// 播放/暂停 的函数
const togglePlay = function() {
    var v = e('.button_play')
    var video = e('.video')
    video.focus()
    // paused 返回当前播放状态 未播放时为 true
    if (video.paused) {
        video.play()
        //播放时替换图标
        v.setAttribute('src', 'images/video_pause.png')
    }else {
        video.pause()
        //暂停时替换图标
        v.setAttribute('src', 'images/video_play.png')
    }
}

//下一个视频的函数
const nextButton = function(){
    // 点击下一个时，让video获得焦点
    var video = e('.video')
    video.focus()
    // 选到当前视频
    var song = e('.song')
    //getAttribute 获得属性的值
    var url = song.getAttribute('src')
    var index = url.slice(0,1)
    //算出下一个视频的下标
    var newIndex = (index + 1) % (videos.sum)
    // log('new',newIndex)
    //
    var src = videos[`${newIndex}`]
    // log('src', src)
    //替换
    song.setAttribute('src', src)
    //加载视频
    video.load()
    //切换 播放/暂停 图标
    state()
}

//上一个视频的函数
const lastButton = function(){
    // 点击上一个时，让video获得焦点
    var video = e('.video')
    video.focus()
    // 选到当前视频
    var song = e('.song')
    //getAttribute 获得属性的值
    var url = song.getAttribute('src')
    var index = url.slice(0,1)
    //算出上一个视频的下标
    var newIndex = ((index - 1) + (videos.sum)) % (videos.sum)
    // log('new',newIndex)
    //
    var src = videos[`${newIndex}`]
    // log('src', src)
    //替换
    song.setAttribute('src', src)
    //加载视频
    video.load()
    //切换 播放/暂停 图标
    state()
}

//转换时间格式函数
const formattingTime = function(time) {
    //时
    var hour = String(parseInt(time / 3600, 10))
    //分
    var minute = String(parseInt((time % 3600) / 60, 10))
    //秒
    var second = String(parseInt(time % 60, 10))

    if (hour.length == 1) {
       hour = '0' + hour
    }

    if (minute.length == 1) {
       minute = '0' + minute
    }

    if (second.length == 1) {
       second = '0' + second
    }

    var timeAll = `${hour}:${minute}:${second}`

    if (hour == '00') {
        timeAll = `${minute}:${second}`
    }

    return timeAll
}



//获得当前播放时间点 currentTime
const currentTime = function(){
    var video = e('.video')
    var nowTimeCell = e('.current_time')
    var nowTime =  video.currentTime
    //转换时间格式
    var newNowTime = formattingTime(nowTime)
    nowTimeCell.innerText = newNowTime
}

//获得当前视频总时长 duration
const durationTime = function() {
    var video = e('.video')
    var timeCell = e('.duration_time')
    var time = video.duration
    //转换时间格式
    var newTime = formattingTime(time)
    timeCell.innerText = newTime
    //
}


//视频滑条 跟随时间
const setInputTime = function() {
    var input = e('.time_input')
    //当前时间点
    var video = e('.video')
    var nowTimeCell = e('.current_time')
    var nowTime =  parseInt(video.currentTime)
    //视频总时长
    var timeCell = e('.duration_time')
    var time = parseInt(video.duration)

    //没有下面的判断，视频播放完，滑条的值会回到 50
    if (video.currentTime != 0) {
        input.value = 100 * (nowTime / time)
    }else {
        input.value = 0
    }
    // log('input.value', input.value)
}

//当前时间进度 跟随 视频滑条
const setTimeInput = function() {
    var input = e('.time_input')
    var val = parseInt(input.value)
    //当前时间点
    var video = e('.video')
    var nowTimeCell = e('.current_time')
    var nowTime =  parseInt(video.currentTime)
    //视频总时长
    var timeCell = e('.duration_time')
    var time = parseInt(video.duration)
     // 当前时间 = 滑条的值 / 100 * 总时长
    //  video.currentTime 不能用变量
     video.currentTime = val / 100 * time
    //
     nowTimeCell.innerText = formattingTime(nowTime)
    //  log('nowTime', nowTime)
}




// 获得音量的值 volume
const setInputValue = function() {
    var video = e('.video')
    var input = e('.input_volume')
    //  input的值 /100  赋值 给音量
    video.volume = input.value / 100
    // log('video.volume is', video.volume, 'input.value / 100 is', input.value / 100)
}

//音量 是否静音 切换图标 函数
const replaceVolumeImg = function() {
    var video = e('.video')
    var input = e('.input_volume')
    var mute = e('.volume_img')
    if (video.volume != 0) {
        // log('if')
        mute.setAttribute('src', 'images/video_vol.png')
    }else {
        // log('else')
        mute.setAttribute('src', 'images/video_vol_mute.png')
    }
}

// 设置 音量 圆点图标的 margin-left 等于音量滑条的值
const setVolumeImg = function() {
    var video = e('.video')
    // var volume = video.volume * 53
    // log('video.volume', video.volume, 'volume', volume)
    // input_volume
    var inp = e('.input_volume')
    var len = inp.value / 100 * 53
    var img = e('.video_vol0')
    img.style.cssText = `margin-left:${len}px;`
}

// 设置 视频滑条 圆点图标的 margin-left 等于视频滑条的值
const setTimeInputDot = function() {
    var inp = e('.time_input')
    var len = inp.value / 100 * 334
    var img = e('.time_dot')
    img.style.cssText = `margin-left:${len}px;`
}

// 设置 填充条的div的  width: 0px;  等于视频滑条的值
const setInputFill = function() {
    var inp = e('.time_input')
    var len = inp.value / 100 * 334 + 6
    var fill = e('.input_fill')
    fill.style.cssText = `width:${len}px;`
}



// 音量 静音 函数
const volumeMute = function() {
    var video = e('.video')
    var input = e('.input_volume')
    if (video.volume != 0) {
        // log('if 1')
        input.value = 0
        video.volume = 0
        // 设置 音量图标的 margin-left 等于音量的值
        setVolumeImg()
        // log('video.volume', video.volume)
    } else{
        input.value = 50
        video.volume = 0.5
        // 设置 音量图标的 margin-left 等于音量的值
        setVolumeImg()
        // log('else video.volume', video.volume)
    }
}

//全屏函数 谷歌浏览器 webkit
//打开全屏 requestFullscreen()
const fullScreen = function() {
    var video = e('.video')
        //w3c
    if(video.requestFullscreen) {
        video.requestFullscreen()
        //火狐 FireFox
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
        //Google Chrome
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
        //IE11
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
    }
}

//退出全屏函数  exitFullScreen
const exitFullScreen = function() {
    var video = e('.video')
        //w3c
    if(video.exitFullscreen) {
        video.exitFullscreen()
        //火狐 FireFox
    } else if (video.mozExitFullscreen) {
        video.mozExitFullscreen()
        //Google Chrome
    } else if (video.webkitExitFullscreen) {
        video.webkitExitFullscreen()
        //IE11
    } else if (video.msExitFullscreen) {
        video.msExitFullscreen()
    }
}

//获得播放列表函数 并添加至页面
const getVideoList = function(videos) {
    var keys = Object.keys(videos)
    var key = keys.slice(0, keys.length-1)
    for (var i = 0; i < key.length; i++) {
        var k = key[i]
        var value = videos[k]
        var t = `
        <li class="item">${value}</li>
        `
        var ul = e('.videoList_ul')
        appendHtml(ul, t)
    }
}

// 点击列表图标 视频列表 显示隐藏
const toggleVideoList = function() {
    var ul = e('.videoList_ul')
    toggleClass(ul, 'none')
}

// 列表项切换至相应视频 并播放的函数
const  switchoverMovie = function(event) {
    var song = e('.song')
    //切换src
    var t = event.target
    var text = t.innerText
    song.setAttribute('src', text)
    var video = e('.video')
    video.load()
    video.play()
    // 在 load 之后判断播放状态，改变播放图标
    state()
}



// 绑定播放按钮 click
const bindPlayButton = function(){
    var play = e('.button_play')
    bindEvent(play, 'click', togglePlay)
}

//绑定下一个视频按钮 click
const bindNextButton = function(){
    var next = e('.button_next')
    bindEvent(next, 'click', nextButton)
}

//绑定上一个视频按钮 click
const bindLastButton = function() {
    var last = e('.button_last')
    bindEvent(last, 'click', lastButton)
}

//绑定 video 加载后 canplay 事件
const bindCanplay = function() {
    var video = e('.video')
    bindEvent(video, 'canplay', autoPlay)
}

// 绑定 播放完成 后 ended 事件
const bindEnded = function() {
    var video = e('.video')
    bindEvent(video, 'ended', function(){
        //改变播放图标 并自动播放下一个视频
        state()
        nextButton()

    })
}

//绑定 timeupdate 事件 (当播放时间发生变化时)
const bindCurrentTime = function() {
    var video = e('.video')
    bindEvent(video, 'timeupdate', function(){
        currentTime()
        // 视频滑条跟随当前时间
        setInputTime()
        // 小圆点跟随
        setTimeInputDot()
        // 填充条跟随
        setInputFill()
    })
}

// 绑定 video 加载完 显示视频时长 loadedmetadata
const bindDurationTime = function() {
    var video = e('.video')
    bindEvent(video, 'loadedmetadata', function(){
        durationTime()
        // 页面加载完 音量图标的 margin-left 等于音量的值
        setVolumeImg()
    })
}

//绑定 video click 点击暂停/播放
const bindVideoClick = function(){
    var video = e('.video')
    bindEvent(video, 'click', togglePlay)
}


//常用的键盘按键事件包括：
// 按下一个键 keydown   按住 keypress    放开 keyup
//按下空格键 播放或者暂停
// space  keyCode 32 或者 key ' '
const bindKeyDown = function() {
    var video = e('.video')
    // focus() 获得焦点
    video.focus()
    bindEvent(video, 'keyup', function(event) {
        // log('event is',event)
        // document.activeElement 判断video是否为当前活动的元素
        if (video == document.activeElement) {
            if (event.key == ' ') {
                togglePlay()
            }
        }
    })
}

// 全屏 keyup 事件 绑在 video   Enter  keyCode 13
const bindFullScreenKeyup = function() {
    var video = e('.video')
    // focus() 获得焦点
    video.focus()
    bindEvent(video, 'keyup', function(event) {
        // document.activeElement 判断video是否为当前活动的元素
        if (video == document.activeElement) {
            if (event.keyCode == 13) {
                fullScreen()
            }
        }
    })
}

// 当音量滑条 input 的值发生改变后, 绑定 input 事件
// 当 input 的值发生改变时, 绑定 input 事件
// 音量 随即改变
// 并判断是否切换音量静音图标
const bindVolumeChange = function(){
    var input = e('.input_volume')
    bindEvent(input, 'input', function() {
        setInputValue()
        //切换静音图标
        replaceVolumeImg()
    })
}

//绑定 时间跟随视频滑条  input
const bindSetTimeInput = function() {
    var input = e('.time_input')
    bindEvent(input, 'input', function(){
        setTimeInput()
        // 小圆点跟随
        setTimeInputDot()
        // 填充条跟随
        setInputFill()
    })
}


//音量图标 click 事件
//切换音量静音图标
const bindVolumeImg = function(){
    var volumeImg = e('.volume_img')
    bindEvent(volumeImg, 'click', function() {
        volumeMute()
        //切换静音图标
        replaceVolumeImg()
    })
}

// 全屏图标 click 事件
const bindFullScreen = function() {
    var fullscreen_img = e('.fullscreen_img')
    bindEvent(fullscreen_img, 'click', fullScreen)
}


// 绑定  切换列表显示隐藏 click
const bindVideoListImg = function(){
    var img = e('.videoList_img')
    bindEvent(img, 'click', toggleVideoList)
}

// 绑定双击列表项 播放相应视频    dblclick
const bindToggleMovie = function() {
    var ul = e('.videoList_ul')
    bindEvent(ul, 'dblclick', switchoverMovie)
}

// 当 隐藏的音量滑条值改变时  音量图标的 margin-left 等于音量和滑条的值
// input 事件
const bindSetVolumeImg = function() {
    var input = e('.input_volume')
    bindEvent(input, 'input', setVolumeImg)
}


const bindEventAll = function(){
    bindCanplay()
    bindPlayButton()
    bindNextButton()
    bindLastButton()
    bindEnded()
    bindCurrentTime()
    bindDurationTime()
    bindKeyDown()
    bindVideoClick()
    bindVolumeChange()
    bindVolumeImg()
    bindFullScreen()
    bindFullScreenKeyup()
    bindVideoListImg()
    bindToggleMovie()
    bindSetVolumeImg()
    bindSetTimeInput()
}

// 程序主入口
const _mian_ = function(){
    bindEventAll()
    //获得播放列表函数 并添加至页面
    getVideoList(videos)
}

_mian_()
