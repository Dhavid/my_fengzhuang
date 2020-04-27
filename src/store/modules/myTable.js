import Cookies from 'js-cookie'
import { getMyHeaderList, getMyBodyList } from "@/api/article.js";

const state = {
  header:[],
  body:{},
  codemap:{}
}

const mutations = {
  SET_HEADER: (state,data) => {
    state.header=data.data
  },
  SET_BODY: (state,data) => {
    state.body=data.data.data,
    state.codemap=data.data.codemap
  }

}

const actions = {
  getHeader({ commit }) {
    getMyHeaderList().then(res => {
        console.log(res,111111);
        commit('SET_HEADER',{data:res.data.pvData.header.data.list})
    });
    
  },
  getBody({ commit }) {
    getMyBodyList().then(res => {
        console.log(res,222222);
        commit('SET_BODY',{data:res.data.pvData.body})
    });
    
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
