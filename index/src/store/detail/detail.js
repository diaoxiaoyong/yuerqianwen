import axios from 'axios'
const state = {
    msgList : [],
}

const mutations = {
    DETAIL ( state , res ) {
        state.msgList = res
    }
}

const actions = {
    detail ({ commit }  ,id) {
        console.log(id)
        var qs = require('qs');
        axios.post('/news/article/detail/json/'+id,
        )
        .then(function (response) {
            console.log(response);
            var res = response
            commit( "DETAIL" , res )
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default {
    state,
    mutations,
    actions
}
