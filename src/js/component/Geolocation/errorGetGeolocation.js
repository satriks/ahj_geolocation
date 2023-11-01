import { geolocationValidate } from './geolocationValidate'

export default class ErrorGeolocation {
  // форма запроса геопозиции
  constructor (callback) {
    this.callback = callback
    this.formInput = null
    this.callbackElement = null
    this.callbackData = null
  }

  inputPosition (element, data) {
    // создание формы запроса геопозиции

    this.callbackElement = element
    this.callbackData = data

    const inputGeolocationForm = document.createElement('form')
    inputGeolocationForm.className = 'geolocation__form'

    const geolocationText = document.createElement('div')
    geolocationText.className = 'geolocation__text'

    const text1 = document.createElement('span')
    text1.textContent = ' Что-то пошло не так!'
    const text2 = document.createElement('span')
    text2.textContent = ` К сожалению нам не удалось определить ваше местопложение.
        Пожалуйста, дайте разрешение на использование геолокации,
        либо введите координаты вручную.`
    const text3 = document.createElement('span')
    text3.textContent = ' Широта и долгота через запятую'

    geolocationText.append(text1, text2, text3)

    const geolocationInput = document.createElement('input')
    geolocationInput.className = 'geolocation__input'
    geolocationInput.type = 'text'
    this.formInput = geolocationInput

    const geolocationButtons = document.createElement('div')
    geolocationButtons.className = 'geolocation__buttons'
    const geolocationButtonOk = document.createElement('button')
    geolocationButtonOk.className = 'geolocation__button-ok'
    geolocationButtonOk.textContent = 'OK'
    const geolocationButtonCancel = document.createElement('button')
    geolocationButtonCancel.className = 'geolocation__button-cancel'
    geolocationButtonCancel.textContent = 'Отмена'

    geolocationButtons.append(geolocationButtonCancel, geolocationButtonOk)

    inputGeolocationForm.append(geolocationText, geolocationInput, geolocationButtons)

    document.querySelector('main').append(inputGeolocationForm)

    inputGeolocationForm.addEventListener('submit', this.onSubmit)
    geolocationInput.addEventListener('keydown', this.onEnter)

    geolocationButtonCancel.addEventListener('click', (event) => {
      event.preventDefault()
      inputGeolocationForm.remove()
    })
  }

  onEnter = (event) => {
    // переходник  Enter, почему то не работает автоматически
    if (event.keyCode === 13) {
      this.onSubmit(event)
      return
    }
    const validate = geolocationValidate(this.formInput.value)
    setTimeout(() => {
      if (validate) {
        this.formInput.style.backgroundColor = 'rgb(194, 237, 150)'
      } else {
        this.formInput.style.backgroundColor = 'rgb(255, 194, 194)'
      }
      if (!this.formInput.value.trim()) {
        this.formInput.style.backgroundColor = ''
      }
    }, 500)
  }

  onSubmit = (event) => {
    // валидация
    event.preventDefault()

    const validate = geolocationValidate(this.formInput.value)
    if (validate) {
      this.formInput.value = validate
      this.callback(this.callbackElement, this.callbackData, this.formInput.value)
      event.target.closest('.geolocation__form').remove()
    } else {
      const errorCoord = document.createElement('span')
      errorCoord.className = 'geolocation__error'
      errorCoord.textContent = '  Не верно введены координаты!'

      this.formInput.insertAdjacentElement('beforebegin', errorCoord)
      setTimeout(() => errorCoord.remove(), 2000)
    }
  }
}
