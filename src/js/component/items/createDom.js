export function createDom (element){
    const  timelineWrapper = document.createElement('div');
    timelineWrapper.classList.add('timeline__wrapper');

    const timeline = document.createElement('div');
    timeline.classList.add('timeline');

    const timelineLine = document.createElement('div');
    timelineLine.classList.add('timeline__line');

    const timelineBoard = document.createElement('div');
    timelineBoard.classList.add('timeline__board');

    const timelineInput = document.createElement('input');
    timelineInput.classList.add('timeline__input');
    timelineInput.setAttribute('type', 'text');
    timelineInput.setAttribute('placeholder', 'Enter your message');

    const timelineAudioBtn = document.createElement('button');
    timelineAudioBtn.classList.add('timeline__audio');
    timelineAudioBtn.textContent = "🎤"

    const timelineVideoBtn = document.createElement('button');
    timelineVideoBtn.classList.add('timeline__video');
    timelineVideoBtn.textContent = "🎥"

    timeline.append(timelineLine, timelineBoard)
    timelineWrapper.append(timeline, timelineInput, timelineAudioBtn, timelineVideoBtn)
    element.append(timelineWrapper);
}   