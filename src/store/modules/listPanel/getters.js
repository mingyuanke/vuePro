import * as Types from './types'

export default {
  [Types.GET_LIST_DATA_BY_KEY](state){
    return (key)=>state[Types.LIST_DATA_STORE][key]
  }
}
