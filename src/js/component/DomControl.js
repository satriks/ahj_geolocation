import { createDom } from "./items/createDom";
import { timelineItem } from "./items/TimelineItem";

export default class DomControl {
  constructor () {

  }
  init (){
    createDom(document.querySelector('main'))
    timelineItem(
      document.querySelector('.timeline__board'), 
      {text : 'Hello World'},
      "[55.25 37.48]"
      )

    timelineItem(
      document.querySelector('.timeline__board'), 
      {video : 'Hello World'},
      "[55.25 37.48]"
      )

    timelineItem(
      document.querySelector('.timeline__board'), 
      {audio : 'Hello World'},
      "[55.25 37.48]"
      )
    
  }
}
