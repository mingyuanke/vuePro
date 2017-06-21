import * as Types from './types'
export default {
  [Types.SET_DATA_BY_KEY](context, payload){
    context.commit(Types.SET_DATA_BY_KEY, payload)
  }
}
