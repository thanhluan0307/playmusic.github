var songs = [
    {
        name : 'OneRepublic',
        image : 'image/onerepublic.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/Wild_Life_OneRepublic.mp3'
    },
    {
        name : 'OneRepublic',
        image : 'image/onerepublic.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_Vietsub_Lyrics_Someday_OneRepublic.mp3'
    },
    {
        name : 'Maroon 5',
        image : 'image/suger.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_Maroon_5_Sugar_Lyrics_Maroon_5_Animals_Lyrics_mix.mp3'
    },
    {
        name : 'Imagine Dragons',
        image : 'image/Birds.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_Imagine_Dragons_Birds_Audio_ft_Elisa.mp3'
    },
    {
        name : 'ZAYN - Feat. Sia',
        image : 'image/Dusk_till_dwan.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_ZAYN_Dusk_Till_Dawn_Lyrics_Feat_Sia.mp3'
    }, 
    {
        name : 'Linkin Park',
        image : 'image/Linkin_park.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_BURN_IT_DOWN_Official_Music_Video_Linkin_Park.mp3'
    }, 
    {
        name : 'Linkin Park',
        image : 'image/Linkin_park2.jfif',
        singer: "Raftaar x Fortnite",
        path : 'songs/y2mate.com_Leave_Out_All_The_Rest.mp3'
    }
]
var $ = document.querySelector.bind((document))
var isplaying = false
var isRamdom = false
var isrepeat = false
var current = 0
var minutes = 0

var start = $('.music-start')
var end = $('.music-end')
console.log(start,end)
var audio = $('.audio')
var nameSong = $('.music-title')
var thumb = $('.music-image')
var inputPrecent = $('.range')
var timeStart = $('.music-start')
var timeduration = $('.music-end')
var inputVolume = $('.volume')
//Btn
var playBtn = $('.btn-toggle')
var nextBtn = $('.btn-next')
var preBtn = $('.btn-pre')
var randomBtn = $('.btn-random')
var repeatBtn = $('.btn-repeat')

// Xử lý quay đĩa nhạc
var cdthumb = thumb.animate([
  {transform: 'rotate(360deg)'}
],{
  duration:10000,
  iterations:Infinity
})
cdthumb.pause()
//lấy bài hát hiện tại
function getCurrentSong () {
  audio.src = songs[current].path
}
getCurrentSong()
//Thay đổi âm lượng
inputVolume.oninput = function () {
  audio.volume = inputVolume.value
}
//tiến độ bài hát
audio.ontimeupdate = function() {
  if(audio.duration) {
    var percent = Math.floor(audio.currentTime / audio.duration * 100)
    inputPrecent.value = percent
  }
  start.innerHTML = Math.floor(audio.currentTime)
}
//Tua bài hát
inputPrecent.oninput = function () {
  var seek = audio.duration / 100 * inputPrecent.value
  audio.currentTime = seek
}
// rendẻ veiw
function render () {
  nameSong.innerHTML = songs[current].name
  thumb.src = songs[current].image
}
//play end pause
function playpause () {
  if(isplaying) {
    isplaying = false
    playBtn.classList.remove('playing')
    audio.pause()
    cdthumb.pause()
  }else {
    isplaying = true
    playBtn.classList.add('playing')
    audio.play()
    cdthumb.play()
  }
}
// Xử lý next bài
function nextSong () {
  if (isRamdom) {
    current = Math.floor(Math.random() * songs.length)
    getCurrentSong()
    render()
    isplaying = false
    playpause()
  }else {
    current++
    if (current >= songs.length) {
      current = 0
    }
    getCurrentSong()
    render()
    isplaying = false
    playpause()
  }
}
//Xử lý back bài
function preSong () {
  if (isRamdom) {
    current = Math.floor(Math.random() * songs.length)
    getCurrentSong()
    render()
    isplaying = false
    playpause()
  }else {
    current--
    if (current < 0) {
       current = songs.length - 1
    }
    getCurrentSong()
    render()
    isplaying = false
    playpause()
  }
}
// Xử lý khi hết bài
audio.onended = function () {
  if (isrepeat) {
    getCurrentSong()
    audio.play()
  }else {
    nextSong()
  }
}
// active Random 
function randomSong () {
  if (isRamdom) {
    isRamdom = false
    randomBtn.classList.remove('active')
  }else {
    isRamdom =true
    randomBtn.classList.add('active')
  }
}
// active repeat
function repeatSong () {
  if (isrepeat) {
    isrepeat = false
    repeatBtn.classList.remove('active')
  }else {
    isrepeat =true
    repeatBtn.classList.add('active')
  }
}
repeatBtn.addEventListener('click',repeatSong)
randomBtn.addEventListener('click',randomSong)
playBtn.addEventListener('click',playpause)
nextBtn.addEventListener('click',nextSong)
preBtn.addEventListener('click',preSong)


