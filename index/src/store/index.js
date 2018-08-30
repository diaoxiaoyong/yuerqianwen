import Vue from 'vue'
import Vuex from 'vuex'
import list from './list/list'
import contentMenu from './contentMenu/list'
import loadmore from './contentMenu/loadmore'
import detail from './detail/detail'
Vue.use(Vuex)
import axios from 'axios'
axios.defaults.baseURL = 'http://web01.jinger.com.cn'
export default new Vuex.Store({
    modules :{
        contentMenu,
        list,
        detail,
        loadmore
    }
})