export class RecordControl{
    // Кнопки во время записи, обработка времени 
    constructor(callback){
        this.callback = callback
        this.elements = []
        this.recordTime = null
        this.myInterval = null
        this.counter = 1
    }

    create(element){
    // Создание и подключение кнопок записи
    const recordStop = document.createElement('span');
    recordStop.classList.add('record__stop');
    recordStop.textContent = "✓"
    recordStop.addEventListener('click',() => {
        this.clear()
        this.callback()})    

    const recordTime = document.createElement('span');
    recordTime.classList.add('record__time');
    recordTime.textContent = "00:00"
    this.recordTime = recordTime

    

    const recordCancel = document.createElement('span');
    recordCancel.classList.add('record__cancel');
    recordCancel.textContent = "х"
    recordCancel.addEventListener('click', () => {
        this.clear()
        this.callback(false)})      
    

    element.append(recordStop, recordTime, recordCancel);
    this.elements.push(recordCancel, recordStop, recordTime);   
    
    this.myInterval = setInterval(() => {
        this.recordTime.textContent = this.getTime(this.counter)
        this.counter++
    }, 1000)
    }

    clear = () =>{
        // Убрать кнопки записи
        this.elements.forEach(element => element.remove())
        document.querySelector('.timeline__audio').classList.remove("hidden")
        document.querySelector('.timeline__video').classList.remove("hidden")
        clearInterval(this.myInterval)
        this.counter = 1
    }

    getTime = (time = 0 ) => {
        // Обработка вывода времени 
        const min = Math.floor(time / 60)
        const sec = time % 60
        return `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`
    }
}



