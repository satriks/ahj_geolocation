import { createDom } from './items/createDom'
import { timelineItem } from './items/TimelineItem'
import { getGeolocation } from './Geolocation/getGeolocation'
import ErrorGeolocation from './Geolocation/errorGetGeolocation'
import { RecordControl } from './items/createRecordControl'

export default class DomControl {
  constructor () {
    this.form = new ErrorGeolocation(timelineItem)
    this.recordControl = new RecordControl(this.onStop.bind(this))
    this.stream = null
    this.liveStream = null
    this.recorder = null
    this.videoStreamELement = null
    this.allow = true
    this.state = true

    createDom(document.querySelector('main'))

    this.buttonsControl = document.querySelector('.timeline__buttons')
    this.audioBtn = document.querySelector('.timeline__audio')
    this.videoBtn = document.querySelector('.timeline__video')

    this.onEventListeners()
  }

  onEventListeners = () => {
    document.querySelector('.timeline__input').addEventListener('keydown', this.onText)
    this.audioBtn.addEventListener('click', this.onAudio)
    this.videoBtn.addEventListener('click', this.onVideo)
  }

  onText = (event) => {
    // text message
    if (event.keyCode === 13 && event.target.value.trim()) {
      getGeolocation((position) => {
        if (position) {
          timelineItem(document.querySelector('.timeline__board'), { text: event.target.value }, position)
          event.target.value = ''
        } else {
          this.form.inputPosition(document.querySelector('.timeline__board'), { text: event.target.value })
          event.target.value = ''
        }
      })
    }
  }

  onAudio = async (event) => {
    // audio message

    this.allow = true
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
      .catch((err) => {
      // not granted
        this.accessesForm()
        this.allow = false
      })

    this.stream = stream

    const recorder = new MediaRecorder(stream)
    this.recorder = recorder
    const chunks = []

    recorder.addEventListener('start', () => {
      console.log('start record')
      this.audioBtn.classList.add('hidden')
      this.videoBtn.classList.add('hidden')
      this.recordControl.create(this.buttonsControl)
    })

    recorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data)
    })

    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks)
      if (!this.state) return
      getGeolocation((position) => {
        if (position) {
          timelineItem(document.querySelector('.timeline__board'), { audio: blob }, position)
        } else {
          this.form.inputPosition(document.querySelector('.timeline__board'), { audio: blob })
        }
      })
    })

    recorder.start()
  }

  onVideo = async (event) => {
    // video message
    this.allow = true

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).catch((err) => {
      // not granted
      this.accessesForm()
      this.allow = false
    })

    if (!this.allow) return
    this.stream = stream

    // второй поток, на 1м потоке не liveStream  не хотел показываться
    this.liveStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.videoStream()
      this.videoStreamELement.srcObject = stream
      return stream
    }).catch((err) => {
      // not granted
      this.allow = false
      alert(' не настроено подключение!')
    })
    if (!this.allow) return

    const recorder = new MediaRecorder(stream)
    this.recorder = recorder
    const chunks = []

    recorder.addEventListener('start', () => {
      console.log('start record')
      this.audioBtn.classList.add('hidden')
      this.videoBtn.classList.add('hidden')
      this.recordControl.create(this.buttonsControl)
    })

    recorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data)
    })

    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks)
      if (!this.state) return
      getGeolocation((position) => {
        if (position) {
          timelineItem(document.querySelector('.timeline__board'), { video: blob }, position)
        } else {
          this.form.inputPosition(document.querySelector('.timeline__board'), { video: blob })
        }
      })
    })

    recorder.start()
  }

  onStop = (state = true) => {
    // stop recording  snd stream
    this.state = state
    this.recorder.stop()
    this.stream.getTracks().forEach((track) => track.stop())
    if (this.liveStream) {
      this.liveStream.getTracks().forEach((track) => track.stop())
      this.liveStream = null
    }
    if (this.videoStreamELement) {
      this.videoStreamELement.remove()
    }
  }

  videoStream = (stream) => {
    // create video element
    this.videoStreamELement = document.createElement('video')
    this.videoStreamELement.className = 'timeline__stream'
    this.videoStreamELement.muted = true
    this.videoStreamELement.autoplay = true
    document.querySelector('main').appendChild(this.videoStreamELement)
  }

  accessesForm () {
    // accesses form
    const accessesForm = document.createElement('form')
    accessesForm.className = 'accesses__form'

    const accessesText = document.createElement('span')
    accessesText.textContent = 'Нет разрешения на запись видео/аудио! Проверьте настройки браузера и попробуйте еще раз.'

    const accessesBtn = document.createElement('button')
    accessesBtn.textContent = 'ОK'
    accessesBtn.addEventListener('click', () => accessesForm.remove())

    accessesForm.append(accessesText, accessesBtn)
    document.querySelector('main').appendChild(accessesForm)
  }
}
