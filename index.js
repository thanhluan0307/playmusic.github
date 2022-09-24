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
var current = 5

var start = $('.music-start')
var end = $('.music-end')
var audio = $('.audio')
var nameSong = $('.music-title')
var thumb = $('.music-image')
var inputPrecent = $('.range')
var timeStart = $('.music-start')
var timeduration = $('.music-end')
var inputVolume = $('.volume')
var iconMute = $('.music-volum .uil')
var scrollBox = $('.in')



//Btn
var playBtn = $('.btn-toggle')
var nextBtn = $('.btn-next')
var preBtn = $('.btn-pre')
var randomBtn = $('.btn-random')
var repeatBtn = $('.btn-repeat')
var unMuteBtn = $('.unmute')
var timeid = setInterval(displayTimer,1000)

//Xu ly volume bat/tat
function toggleVolume () {
  var isUnmuted = iconMute.classList.contains('uil-volume')
  if(isUnmuted) {
    audio.volume = 0
    inputVolume.value = 0
    iconMute.classList.replace('uil-volume', 'uil-volume-mute')
  }else {
    audio.volume = 0.5
    inputVolume.value = 0.5
    iconMute.classList.replace('uil-volume-mute', 'uil-volume')
  }
}
// Xử lý quay đĩa nhạc
var cdthumb = thumb.animate([
  {transform: 'rotate(360deg)'}
],{
  duration:5000,
  iterations:Infinity
})
cdthumb.pause()
var cdthumb1 = scrollBox.animate([
  {transform: 'rotate(360deg)'}
],{
  duration:5000,
  iterations:Infinity
})
cdthumb1.pause()
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
    timeCurrent = percent
  }
}
//Tua bài hát
inputPrecent.oninput = function () {
  var seek = audio.duration / 100 * inputPrecent.value
  audio.currentTime = seek
  displayTimer()
}
// render veiw
function render () {
  nameSong.innerHTML = songs[current].name
  thumb.src = songs[current].image
}

    // window.setInterval(function() {
    //   scrollBox.scrollTop += scrollBox.clientHeight ;
    // }, 1000);



//play end pause
function playpause () {
  if(isplaying) {
    isplaying = false
    playBtn.classList.remove('playing')
    audio.pause()
    cdthumb.pause()
    clearInterval(timeid)
    clearInterval(clearID)
  }else {
    isplaying = true
    playBtn.classList.add('playing')
    audio.play()
    cdthumb.play() 
    setInterval(displayTimer,1000) 
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
function displayTimer () {
  var { duration, currentTime} = audio
  start.textContent = formartTime(currentTime)
  if (duration) {
      end.textContent = formartTime(duration)
  }else {
    end.textContent = '00:00'
  }
}
displayTimer()
function formartTime (number) {
  var minutes = Math.floor(number / 60)
  var seconds = Math.floor(number - minutes * 60)
  return `0${minutes}:${seconds > 9 ? seconds: '0'+seconds}`
}
//karaoke
function karaoke(current) {
  var subtitles =document.getElementById("subtitles");
  var songs =    [
      {start:"00.37",end :"10.98",text:"Burn It Down"},
      {start:"10.98",end :"43.25",text:"Artist: LINKIN PARK"},
      {start:"43.25",end :"47.71",text:"The cycle repeated"},
      {start:"47.71",end :"52.09",text:"As explosions broke in the sky"},
      {start:"52.09",end :"56.55",text:"All that I needed"},
      {start:"56.55",end :"60.89",text:"Was the one thing I couldn't find"},
      {start:"60.89",end :"63.84",text:"And you were there at the turn"},
      {start:"63.84",end :"69.52",text:"Waiting to let me know"},
      {start:"69.52",end :"73.00",text:"We're building it up"},
      {start:"73.00",end :"78.26",text:"To break it back down"},
      {start:"78.26",end :"82.63",text:"We're building it up"},
      {start:"82.63",end :"84.36",text:"To burn it down"},
      {start:"84.36",end :"85.90",text:"We can't wait"},
      {start:"85.90",end :"96.14",text:"To burn it to the ground"},
      {start:"96.14",end :"100.07",text:"The colors conflicted"},
      {start:"100.07",end :"104.59",text:"As the flames climbed into the clouds"},
      {start:"104.59",end :"108.94",text:"I wanted to fix this"},
      {start:"108.94",end :"110.55",text:"But couldn't stop"},
      {start:"110.55",end :"113.20",text:"From tearing it down"},
      {start:"113.20",end :"116.57",text:"And you were caught at the turn"},
      {start:"116.57",end :"122.11",text:"Caught in the burning glow"},
      {start:"122.11",end :"125.16",text:"And I was there at the turn"},
      {start:"125.16",end :"130.69",text:"Waiting to let you know"},
      {start:"130.69",end :"135.04",text:"We're building it up"},
      {start:"135.04",end :"139.36",text:"To break it back down"},
      {start:"139.36",end :"143.73",text:"We're building it up"},
      {start:"143.73",end :"145.44",text:"To burn it down"},
      {start:"145.44",end :"147.07",text:"We can't wait"},
      {start:"147.07",end :"148.94",text:"To burn it to the ground"},
      {start:"148.94",end :"150.12",text:"You told me yes"},
      {start:"150.12",end :"151.18",text:"You held me high"},
      {start:"151.18",end :"153.26",text:"And I believed when you told that lie"},
      {start:"153.26",end :"154.46",text:"I played that soldier"},
      {start:"154.46",end :"155.53",text:"You played king"},
      {start:"155.53",end :"156.53",text:"And struck me down"},
      {start:"156.53",end :"157.81",text:"When I kissed that ring"},
      {start:"157.81",end :"158.81",text:"You lost that right"},
      {start:"158.81",end :"159.87",text:"To hold that crown"},
      {start:"159.87",end :"160.93",text:"I built you up"},
      {start:"160.93",end :"162.02",text:"But you let me down"},
      {start:"162.02",end :"163.13",text:"So when you fall"},
      {start:"163.13",end :"164.25",text:"I'll take my turn"},
      {start:"164.25",end :"165.16",text:"And fan the flames"},
      {start:"165.16",end :"165.98",text:"As your blazes burn"},
      {start:"165.98",end :"168.76",text:"And you were there at the turn"},
      {start:"168.76",end :"174.26",text:"Waiting to let me know"},
      {start:"174.26",end :"178.66",text:"We're building it up"},
      {start:"178.66",end :"183.00",text:"To break it back down"},
      {start:"183.00",end :"187.36",text:"We're building it up"},
      {start:"187.36",end :"189.01",text:"To burn it down"},
      {start:"189.01",end :"190.62",text:"We can't wait"},
      {start:"190.62",end :"192.57",text:"To burn it to the ground"},
      {start:"192.57",end :"193.79",text:"When you fall"},
      {start:"193.79",end :"194.77",text:"I'll take my turn"},
      {start:"194.77",end :"195.71",text:"And fan the flames"},
      {start:"195.71",end :"197.98",text:"As your blazes burn"},
      {start:"197.98",end :"199.46",text:"We can't wait"},
      {start:"199.46",end :"201.59",text:"To burn it to the ground"},
      {start:"201.59",end :"202.50",text:"When you fall"},
      {start:"202.50",end :"203.50",text:"I'll take my turn"},
      {start:"203.50",end :"204.43",text:"And fan the flames"},
      {start:"204.43",end :"206.60",text:"As your blazes burn"},
      {start:"206.60",end :"208.10",text:"We can't wait"},
      {start:"208.10",end :"212.25",text:"To burn it to the ground"},
      {start:"212.25",end :"212.26",text:"End"},
  ]
  createSubtitle();
  function createSubtitle()
  {
      var element;
      for (var i = 0; i < songs.length; i++) {
          element = document.createElement('p');
          element.innerText = songs[i].text + " ";
          element.setAttribute('id',`c_${i}`)
          subtitles.appendChild(element);
      }
      
  }
  audio.addEventListener("timeupdate", function(e){
      songs.forEach(function(element, index, array){
          if( audio.currentTime >= element.start && audio.currentTime <= element.end ) {
            subtitles.children[index].style.background = 'rgba(75, 211, 33, 0.6)'
          }
      });
  });
}
karaoke(current)

repeatBtn.addEventListener('click',repeatSong)
randomBtn.addEventListener('click',randomSong)
playBtn.addEventListener('click',playpause)
nextBtn.addEventListener('click',nextSong)
preBtn.addEventListener('click',preSong)
unMuteBtn.addEventListener('click',toggleVolume)



 