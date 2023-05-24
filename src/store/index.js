import { createStore } from 'vuex'

export default createStore({
  state: {
    region: {},
    replaceRegion: {}
  },
  getters: {
    getRegion(state) {
      return state.region
    },  
    getReplaceRegion(state) {
      return state.replaceRegion
    },
    getCity(state) {
      return state.region.country ? state.region.country : state.region.city
      ? state.region.city : state.region.province
    }
  },
  mutations: {
    setQuery(state, query) {
      state.region = query.region
      state.replaceRegion = query.replaceRegion
    }
  },
  actions: {
  },
  modules: {
  }
})
