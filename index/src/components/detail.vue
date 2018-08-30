<template>
  <div>
    <div v-wechat-title="title"></div>
        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
            <mu-card-title :title="title"></mu-card-title>
            <mu-card-text ref='nodes' v-html="wapContent" style="padding-top:0px;"></mu-card-text>
            <div>
                <img :src="app == 1 ? qrcodetree : qrcode" style="width:100%;"/>
            </div>
        </mu-card> 
  </div>
</template>
<script>
//2是育上娃 1是两棵树
import qrcode from '../static/img/qrcode.gif'
import qrcodetree from '../static/img/qrcode-2tree.gif'
import {mapState} from 'vuex'
import {initPage} from '../static/js/wx_share.js'
export default {
    data () {
        return {
            coverImg:'',
            app:'',
            title : '',
            wapContent : '',
            qrcodetree:qrcodetree,
            qrcode:qrcode,
            id : this.$route.query.id,
            imgurl:'http://file.jinger.com.cn/',
            imageUrl:'',
            desc :''
        }
    },
    computed:{
        ...mapState({
            detail : state => state.detail.msgList,
        }),
    },
    mounted () {
        this.$store.dispatch('detail',this.id)
    },
    created () {
        
    },
    watch : {
        '$route' (to, from) {
            if(to.query.id) {
                this.$store.dispatch('detail',to.query.id)
            }
        },
        detail (val) {
            //let text = document.querySelectorAll('p')[2].innerText;
            
            //initPage(this.title, window.location.href, document.querySelector('img').src, text)
            this.app = val.data.data.app
            this.coverImg = val.data.data.news.coverImg
            this.title = val.data.data.news.title
            this.wapContent = val.data.data.news.wapContent.replace(/9pt/g,'16px')
            this.$nextTick(() => {
                //图片
                window.setTimeout(() => {
                    let imageUrl = this.$refs.nodes.getElementsByTagName('img')[0].src
                    let desc = this.$refs.nodes.getElementsByTagName('p')[2].innerText
                    //介绍
                    this.imageUrl = imageUrl
                    this.desc = desc 
                    initPage(this.title, window.location.href , this.imageUrl , this.desc)
                }, 500)
            })
           
        },
    }
}
</script>
<style>
img{
    width:100%;
}
</style>

