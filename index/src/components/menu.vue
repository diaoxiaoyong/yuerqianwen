<template>

  <div  ref="heights" :style="overheight">
        <vue-drawer-layout  style="z-index : 999;" ref="drawer" :toggle="true"
        :drawer-width="100"
        :enable="true"
        :animatable="true"
        :z-index="818"
        :drawable-distance="Math.floor(800/3)"
        :content-drawable="true"
        :backdrop="false"
        :backdrop-opacity-range="[0,0.4]">
            <div class="drawer-content" slot="drawer">
                <mu-row style="position: absolute;width:100%;">
                    <mu-col span="3" :style="styleObject">
                        
                        <div v-for = '(item ,index) in lists' :key = 'index' style="margin-bottom: 10px;" @click="menu(item.titleId,index)" :data-titleId='item.index'>
                            <mu-ripple class="mu-ripple-demo demo-1"><img :src='imgurl+item.categoryImg' style="width: 42%;"/>
                                <div :style="index == selectNum ?'color:#FF93DF':'color:#444'">{{item.title}}</div></mu-ripple>
                        </div>
                    </mu-col>
                </mu-row>  
            </div>
            <div slot="content">
                <mu-paper :z-depth="1" class="demo-loadmore-wrap" :style="heightwrap">           
                    <mu-container ref="container" class="demo-loadmore-content" >                
                        <mu-load-more :loading="loading" :loaded-all = "loadedAll" @load="load" >
                        <mu-list textline="two-line">
                            <div v-for="(item,index) in content" :key='index'>
                            <mu-row  button :ripple="false">
                                <mu-list-item-content style="width: 78%;margin-top:10px;margin-bottom:10px;">
                                    <mu-list-item-title>{{item.title}}</mu-list-item-title>
                                    <mu-list-item-sub-title @click="detail(item.id)">{{item.subTitle}}</mu-list-item-sub-title>
                                </mu-list-item-content>
                                <mu-list-item-action style="padding-top: 11px;">
                                    <mu-avatar>
                                        <img :src="imgurl + JSON.parse(item.coverImg).mini"/>
                                    </mu-avatar>
                                </mu-list-item-action>                                
                            </mu-row>
                            <mu-divider />
                            </div>
                            <div v-if='isComplete' style="text-align: center;padding: 3%;color: #c1c1c1;">已全部加载</div>
                        </mu-list>            
                        </mu-load-more>   
                    </mu-container>       
                </mu-paper>    
            </div>
        </vue-drawer-layout>            
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name : 'index',
    props : ['active'],
    data (){
      return {
        overheight : {overflowY: 'scroll',width:' 100%',height: '100%',position: 'absolute'},
        heightwrap : {height:'500px'},
        styleObject :{position: 'absolute',left:' 0px',top: '0px',overflowY: 'scroll', height:'500px',textAlign: 'center',    maxWidth: '100%', paddingtop: '10px',borderRight: '1px solid rgb(255, 147, 223)'},
        isComplete:false,
        stageId : 1,
        lists : [],//左侧菜单
        content:[],//右侧list
        activea : this.active,
        imgurl:'http://file.jinger.com.cn/',
        current:1,
        titleId:'',
        num: 10,
        refreshing: false,
        loading: false,
        loadedAll : false,
        activenum:1, //大菜单
        selectNum:0,
        text:'',//加载更多
        currentnum:2
      }
    },
    computed:{
        ...mapState({
            leftmenu : state => state.list.msgList,
            contentMenu : state => state.contentMenu.msgList,
            loadmore : state => state.loadmore.msgList
        }),
        
    },
    mounted () {
        let obj = {
            stageId :this.activea, //大菜单
            titleId : 107,//左侧小菜单
            current : this.current //页数
        }
        this.$store.dispatch('leftmenu',this.activea)
        this.$store.dispatch('contentMenu',obj)
        this.$refs.drawer.toggle(true)
        this.isComplete = false;
    },
    watch:{ 
        leftmenu(val){
            this.lists = val
            console.log(this.lists[0].titleId)
            let obj = {
                stageId :this.activenum, //大菜单
                titleId : this.lists[0].titleId,//左侧小菜单
                current : this.current //页数
            }
            this.titleId = this.lists[0].titleId
            this.$store.dispatch('contentMenu',obj)
            this.isComplete = false;
        },
        contentMenu(val){
            this.content = val.data.data.results;
            console.log(this.content)
            this.currentnum = 2
        },
        active(val){
            
            this.selectNum = 0
            this.activenum = val
            this.$store.dispatch('leftmenu',val)
            this.currentnum = 2
            this.loadedAll = false 
            this.isComplete = false;
        },
        loadmore (val) {
            console.log(this.content)
            var content = this.content
            console.log(content.length)
            this.content = content.concat(val.data.data.results)
            if(val.data.data.results.length < 9 ){
                this.loadedAll = true
                this.isComplete = true;
            }
            console.log(val.data.data.results.length)
            this.loading = false;
            this.currentnum++
        },
        titleId (val) {
             let obj = {
                stageId :this.activenum, //大菜单
                titleId : val,//左侧小菜单
                current : this.current //页数
            }
            this.$store.dispatch('contentMenu',obj)
            
            this.$nextTick(() => {
                
                window.setTimeout(() => {
                    // this.heightwrap.height = this.$refs.heights.offsetHeight +'px'
                    // this.styleObject.height = this.$refs.heights.offsetHeight +'px'
                    this.heightwrap.height = window.screen.height-170 +'px'
                    this.styleObject.height = window.screen.height-170 +'px'
                    this.overheight.height = window.screen.height-170 +'px'
                    //initPage(this.title, window.location.href , this.imageUrl , this.desc)
                }, 500)
            })
        },
    },
    methods: {
        detail (id) {
            this.$router.push({ name: 'detail',query :{id:id}})
        },
        menu (titleId,index) {
            this.titleId = titleId
            this.selectNum = index
            this.currentnum = 2
            this.loadedAll = false 
            this.isComplete = false;
        },
        //刷新
        refresh () {
            this.refreshing = true;
            this.$refs.container.scrollTop = 0;
            setTimeout(() => {
                this.refreshing = false;
            }, 1000)
        },
        //上拉加载
        load () {
            this.loading = true;
            let obj = {
                stageId : this.activenum, //大菜单
                titleId : this.titleId,//左侧小菜单
                current : this.currentnum //页数
            }
            this.$store.dispatch('loadmore',obj)

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.demo-loadmore-wrap {
    position: absolute;
    width: 100%;
    right: 0px;
    height: 420px;
    display: flex;
    flex-direction: column;

  .mu-appbar {
    width: 100%;
  }
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.mu-ripple-demo {
  position: relative;
  justify-content: center;
}
</style>