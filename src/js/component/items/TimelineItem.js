export function timelineItem(element, data, coord) {
    // Создание элемента в таймлайне
    const timelineItem = document.createElement('div')
    timelineItem.classList.add('timeline__item')

    const itemDate = document.createElement('span')
    itemDate.classList.add('item__date')
    itemDate.textContent = new Date(Date.now()).toLocaleString()    

    const { text, video, audio } = data

    let container = null;
    let content = null;

    if (text) {
        container = 'span';
        content = text;
    }
    if (video) {
        container = 'video'
        content = video;
    }
    if (audio) {
        container = 'audio'
        content = audio;
    }

    const itemData = document.createElement(`${container}`)
    itemData.classList.add('item__data')
    if (text) itemData.textContent = content
    if (!text) {
        itemData.controls = true
        itemData.src = URL.createObjectURL(content)
    }

    const itemCoordinate = document.createElement('span')
    itemCoordinate.classList.add('item__coordinate')
    itemCoordinate.textContent = coord

    timelineItem.append(itemDate, itemData, itemCoordinate)
    element.insertAdjacentElement('afterbegin',timelineItem)
  
} 
