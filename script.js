const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['human', 'shape']

// by default
let songIndex = 1;

// update song details
const loadSong = (song) => {
    // console.log(song)
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.png`
}


// initialy load songf in dom
loadSong(songs[songIndex])

const playSong = () => {
    // add class play 
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

const pauseSong = () => {
    // remove class play
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause') 
    audio.pause()
}

const prevSong = () => {
    songIndex--

    if(songIndex < 0) {
      songIndex = songs.length - 1
    }
    
    loadSong(songs[songIndex])
    playSong()
}

const nextSong = () => {
    songIndex++
    if(songIndex > songs.length - 1) {
      songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

const updateProgress = (e) => {
    // destructurization
   const {duration, currentTime} = e.srcElement
    // get the percent of songs duration 
   const progressPercent = (currentTime / duration) * 100
   progress.style.width = `${progressPercent}%`
}

const setProgress = (e) => {
    const width = progressContainer.clientWidth
    // check x direction
    const clickX = e.offsetX
    const duration = audio.duration
    // get current time of song
    audio.currentTime = (clickX / width) * duration
    // console.log(clickX)
}

// Event 
// play
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// change songs event
prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)