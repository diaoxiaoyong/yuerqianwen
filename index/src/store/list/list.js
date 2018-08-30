import axios from 'axios'
const state = {
    msgList : [],
    stageId : 1,
    
}

const mutations = {
    LEFTMENU ( state , res ) {
        state.msgList = res
    }
}

const actions = {
    leftmenu ({ commit }  ,stageId) {
        var qs = require('qs');
        axios.post('/news/article/stage',
            qs.stringify({ 'stageId': stageId })
        )
        .then(function (response) {
            console.log(response.data.data);
            var res = response.data.data
            commit( "LEFTMENU" , res )
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
