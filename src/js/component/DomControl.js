import { createDom } from "./items/createDom";
import { timelineItem } from "./items/TimelineItem";
import { getGeolocation } from "./Geolocation/getGeolocation";
import ErrorGeolocation from "./Geolocation/errorGetGeolocation";

export default class DomControl {
  constructor () {
    this.form = new ErrorGeolocation(timelineItem)
    // this.form.inputPosition(document.querySelector('main'))
  }
  init(){
    createDom(document.querySelector('main'))
    this.onEventListeners()
  }


  onText = (event) => {
    // console.log(event.target.value, 'Enter');
    if (event.keyCode === 13 && event.target.value.trim()) {
    getGeolocation((position) => {
      if (position) {
        timelineItem(document.querySelector('.timeline__board'), {text : event.target.value}, position)
        event.target.value = ''
      }
      else {
        this.form.inputPosition(document.querySelector('.timeline__board'), {text : event.target.value})
        event.target.value = ''
      }
    })
    
    }
  }

  onEventListeners(){
    document.querySelector('.timeline__input').addEventListener('keydown', this.onText)
  }
}


  // timelineItem(
        //   document.querySelector('.timeline__board'), 
        //   {video : 'Hello World'},
        //   position
        //   )
    
        // timelineItem(
        //   document.querySelector('.timeline__board'), 
        //   {audio : 'Hello World'},
        //   position
        //   )
