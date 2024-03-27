const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const audio = $('#audio')
const cdThumb = $('.cd-thumb')
const currentName = $('.current-name')
const togglePlay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.next-btn')
const prevBtn = $('.prev-btn')
const randomBtn = $('.rand-btn')
const repeatBtn = $('.redo-btn')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Easy On Me',
            img: '../assets/images/img1.jpg',
            path: '../assets/musics/song1.mp3',
            singer: 'Adele'
        },
        {
            name: 'Love In The Dark',
            img: '../assets/images/img2.jpg',
            path: '../assets/musics/song2.mp3',
            singer: 'Adele'
        },
        {
            name: 'Send My Love',
            img: '../assets/images/img3.jpg',
            path: '../assets/musics/song3.mp3',
            singer: 'Adele'
        },
        {
            name: 'Hello',
            img: '../assets/images/img4.jpg',
            path: '../assets/musics/song4.mp3',
            singer: 'Adele'
        },
        {
            name: 'Shape Of You',
            img: '../assets/images/img5.jpg',
            path: '../assets/musics/song5.mp3',
            singer: 'Ed Sheeran'
        },
        {
            name: 'Thinking Out Loud',
            img: '../assets/images/img6.jpg',
            path: '../assets/musics/song6.mp3',
            singer: 'Ed Sheeran'
        },
        {
            name: 'Bad Habits',
            img: '../assets/images/img7.jpg',
            path: '../assets/musics/song7.mp3',
            singer: 'Ed Sheeran'
        }
    ],
    defineProperties () {
        Object.defineProperty(this , 'currentSong' , {
            get () {
                return this.songs[this.currentIndex]
            }
        })
    },
    render () {
        const htmls = this.songs.map((song , index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}">
                    <div class="right">
                        <div class="thumbnail" style="background-image: url(${song.img});">
                        </div>
                        <div class="detail">
                            <h2 class="name">${song.name}</h2>
                            <p class="singer">${song.singer}</p>
                        </div>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.play-list').innerHTML = htmls.join(' ')
    },
    handleEvents () {
        const _this = this
        // cd thumbnail rotate effect 
        const cdThumbEffect = cdThumb.animate([
            {
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbEffect.pause()

        // cd scale effect
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop
            cd.style.width = newWidth > 0 ? `${newWidth}px` : 0
            cd.style.opacity = `${newWidth / cdWidth}`
        }

        // handle play & pause
        togglePlay.onclick = () => {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        
        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbEffect.play()
        }
        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbEffect.pause()
        }
        
        // handle progress bar
        audio.ontimeupdate = () => {
            if(audio.duration) {
                const value = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = value
            }
        }

        progress.onchange = () => {
            const currentTime = audio.duration / 100 * progress.value
            audio.currentTime = currentTime
        }

        // handle next and previous
        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()  
                _this.nextSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            this.render()
            this.scrollSongInToView()
        }
        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
                _this.prevSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            this.render()
            this.scrollSongInToView()
        }

        // handle random song 
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom
            randomBtn.parentElement.classList.toggle('active' , _this.isRandom)
            _this.playRandomSong()                   
        }

        // handle the song ended
        audio.onended = () => {
            nextBtn.click()
        }

        // handle repeat the song
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.parentElement.classList.toggle('active' , _this.isRepeat)
            _this.repeatSong()
        }
        
        // click to play 
        
    },

    //// play next song
    nextSong () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0 
        } 
        this.loadCurrentSong()
    },

    //// play previous song
    prevSong () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    //// turn on | off random song
    playRandomSong () {
        let newIndex = 0 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
    },

    //// turn on | off repeat song
    repeatSong () {
        this.isRepeat ? audio.loop = true 
        : audio.loop = false
    },

    //// scroll active song in to user's view
    scrollSongInToView () {
        const dashboard = $('.dashboard')
        const activeSong = $('.song.active')
        const activeRect = activeSong.getBoundingClientRect()

        // when active song under view
        if (activeRect.top >= window.innerHeight) {
            window.scroll({
                top: activeRect.top - window.innerHeight + activeRect.height * this.currentIndex,
                behavior: "smooth"
            })
        }

        // when active song under the dashboard
        if (activeRect.top <= dashboard.offsetHeight) {
            window.scroll({
                top: -(activeRect.height + dashboard.offsetHeight),
                behavior: "smooth"
            })            
        }
    },

    //// click to play 
    clickToPlay () {
        const songs = $$('.song')
        songs.forEach((song , index) => {
            song.addEventListener( 'click' , () => {
                $('.song.active').classList.remove('active')

                this.currentIndex = index
                this.loadCurrentSong()
                audio.play()

                song.classList.add('active')
            })
        });
    },

    //// render current song
    loadCurrentSong () {
        audio.src = `${this.currentSong.path}`
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
        currentName.innerText = `${this.currentSong.name}`
    },
    start () {
        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        this.clickToPlay()
    }
}
app.start()
