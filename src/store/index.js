import Vue from 'vue'
import VueX from 'vuex'
import state from './states'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import {default as modules,type} from './modules'
Vue.use(VueX);
export default new VueX.Store({
  state,
  getters,
  mutations,
  actions,
  modules
});
export const Types=type;
