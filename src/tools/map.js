import {App_config} from '../config'
let readyEventSet = new Set();
export default class Map {
  static isReady = false;

  constructor() {
    if (!window['AMap']) {
      if (document.querySelector('#aMap')) {
        return
      }
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('id', 'aMap');
      script.setAttribute('src', `https://webapi.amap.com/maps?v=${App_config.map.version}&key=${App_config.map.key}`);
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        const doReady=()=>{
          setTimeout(()=>{
            if(window.AMap.Map){
              readyEventSet.forEach(readyEvent => readyEvent.apply());
              Map.isReady = true
            }
            else {
              doReady()
            }
          },50)
        };
        doReady()
      })
    }
  }

  static ready(readyEvent) {
    if (Map.isReady) {
      readyEvent.apply()
    } else {
      readyEventSet.add(readyEvent)
    }
  }
}
