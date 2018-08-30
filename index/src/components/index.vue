<template>
  <div>
      <mu-row>
        <mu-col span="12">
          <div>
            <img :src="pic" style="width:100%; height: 110px;"/>
          </div>
        </mu-col>
      </mu-row>
  <div style="border-bottom: 1px solid #FF93DF;padding-bottom: 10px;">
    <mu-tabs  @change="changeTheme" :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
      <mu-tab>孕育期</mu-tab>
      <mu-tab>新生儿</mu-tab>
      <mu-tab>婴儿期</mu-tab>
      <mu-tab>幼儿期</mu-tab>
      <mu-tab>学前期</mu-tab>
    </mu-tabs>
  </div>
  <div v-wechat-title="$route.meta.title"></div>
<leftmenu :active = 'active+1'></leftmenu>

     

  </div>
</template>

<script>
  import leftmenu from '../components/menu.vue'
  import {mapState} from 'vuex'
  import baby1 from '../static/img/baby1.png'
  import baby2 from '../static/img/baby2.png'
  import baby3 from '../static/img/baby3.png'
  import baby4 from '../static/img/baby4.png'
  import baby5 from '../static/img/baby5.png'
  export default {
    name : 'index',
    data (){
      return {
        pic : baby1,
        active: 0,
      }
    },
    components:{
      leftmenu
    },
    methods : {
      changeTheme (value){
        if(value == 0){
          this.pic = baby1
        }else if (value == 1) {
          this.pic = baby2
        }else if (value == 2) {
          this.pic = baby3
        }else if (value == 3) {
          this.pic = baby4
        }else{
          this.pic = baby5
        }
        
        this._data.active = value
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.demo-text {
  background : #fff;
  p {
    margin: 8px 0;
  }
}
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    border-radius: 4px;
    height: 36px;
    background: rgba(255, 255, 255, 0.8);
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell{
  background: rgba(0, 0, 0, 0.54);
}
</style>