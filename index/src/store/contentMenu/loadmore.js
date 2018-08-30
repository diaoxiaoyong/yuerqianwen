import axios from 'axios'
const state = {
    msgList : [],
    stageId : 1,
    
}

const mutations = {
    LOADMORE ( state , res ) {
        state.msgList = res
    }
}

const actions = {
    loadmore ({ commit }  ,obj) {
        console.log(obj)
        var qs = require('qs');
        axios.post('/news/article/title',
            qs.stringify({ 'stageId': obj.stageId ,'titleId':obj.titleId,'current': obj.current})
        )
        .then(function (response) {
            console.log(response);
            var res = response
            commit( "LOADMORE" , res )
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
