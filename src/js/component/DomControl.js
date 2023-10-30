import { createDom } from "./items/createDom";
import { timelineItem } from "./items/TimelineItem";
import { getGeolocation } from "./Geolocation/getGeolocation";

export default class DomControl {
  constructor () {

  }
  init(){
    createDom(document.querySelector('main'))
    this.onEventListeners()
  }


  onText = (event) => {
    console.log(event.target.value, 'Enter');
    if (event.keyCode === 13 && event.target.value.trim()) {
    getGeolocation((position) => {
      if (position) {
        timelineItem(document.querySelector('.timeline__board'), {text : event.target.value},position)
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
