import * as Types from './types'
import Vue from 'vue'
export default {
  [Types.SET_DATA_BY_KEY](state,payload){
    Vue.set(state[Types.LIST_DATA_STORE] ,payload.key,payload.data)
  }
}
