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
var $ =document.querySelector.bind((document))
var isplaying = false
var isramdom = false
var current = 0
var audio = $('.audio')
var playBtn = $('.btn-toggle')
var nextBtn = $('.btn-next')
var preBtn = $('.btn-pre')
var randomBtn = $('.btn-random')
var nameSong = $('.music-title')
var repeatBtn = $('.btn-repeat')
var thumb = $('.music-image')
var input = $('.range')
var timeStart = $('.music-start')
var timeduration = $('.music-end')
audio.ontimeupdate = function() {
  input.value = audio.currentTime /audio.duration * 100
  
}
input.oninput = function () {
  
}
function getCurrentSong () {
  audio.src = songs[current].path
}
getCurrentSong()
function render () {
  nameSong.innerHTML = songs[current].name
  thumb.src = songs[current].image
  convent(audio.duration)
}
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

  var cdthumb = thumb.animate([
    {transform: 'rotate(360deg)'}
  ],{
    duration:10000,
    iterations:Infinity
  })
  cdthumb.pause()


function nextSong () {
  current++
  if (current >= songs.length) {
    current = 0
  }
  getCurrentSong()
  render()
  isplaying = false
  playpause()
}
function preSong () {
  current--
  if (current < 0) {
     current = songs.length - 1
  }
  getCurrentSong()
  render()
  isplaying = false
  playpause()
}


playBtn.addEventListener('click',playpause)
nextBtn.addEventListener('click',nextSong)
preBtn.addEventListener('click',preSong)
// randomBtn.addEventListener('click',randomSong)
// repeatBtn.addEventListener('click',repeatSong)


