export function timelineItem(element, data, coord) {
    const timelineItem = document.createElement('div')
    timelineItem.classList.add('timeline__item')

    const itemDate = document.createElement('span')
    itemDate.classList.add('item__date')
    itemDate.textContent = new Date(Date.now()).toLocaleString()    

    const { text, video, audio } = data

    console.log(text, video, audio);
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
        content = video;
    }

    const itemData = document.createElement(`${container}`)
    itemData.classList.add('item__data')
    itemData.textContent = content
    if (!text) {
        itemData.controls = true
    }

    const itemCoordinate = document.createElement('span')
    itemCoordinate.classList.add('item__coordinate')
    itemCoordinate.textContent = coord

    timelineItem.append(itemDate, itemData, itemCoordinate)
    element.append(timelineItem)
} 
