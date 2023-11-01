export function createDom (element) {
  // create dom
  const timelineWrapper = document.createElement('div')
  timelineWrapper.classList.add('timeline__wrapper')

  const timeline = document.createElement('div')
  timeline.classList.add('timeline')

  const timelineLine = document.createElement('div')
  timelineLine.classList.add('timeline__line')

  const timelineBoard = document.createElement('div')
  timelineBoard.classList.add('timeline__board')

  const timelineInput = document.createElement('input')
  timelineInput.classList.add('timeline__input')
  timelineInput.setAttribute('type', 'text')
  timelineInput.setAttribute('placeholder', 'Enter your message')

  const timelineButtons = document.createElement('div')
  timelineButtons.classList.add('timeline__buttons')

  const timelineAudioBtn = document.createElement('button')
  timelineAudioBtn.classList.add('timeline__audio')
  timelineAudioBtn.textContent = '🎤'

  const timelineVideoBtn = document.createElement('button')
  timelineVideoBtn.classList.add('timeline__video')
  timelineVideoBtn.textContent = '🎥'
  timelineButtons.append(timelineAudioBtn, timelineVideoBtn)

  timeline.append(timelineLine, timelineBoard)
  timelineWrapper.append(timeline, timelineInput, timelineButtons)
  element.append(timelineWrapper)
}
