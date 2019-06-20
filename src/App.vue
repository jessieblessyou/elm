<template>
  <div id="app">
    <appHeader :seller='seller'></appHeader>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader/appHeader'

export default {
  name: 'App',
  components: {
    'appHeader': appHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  created: function () {
    this.$http.get('/api/seller').then((response) => {
      this.seller = response.body.data
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -text-align: center;
  color: #2c3e50;
}

.tab{
  display:flex;
  position: relative;
  flex-direction: row;
  justify-content:space-between;
  height: 40px;
  line-height: 40px;
}

.tab:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: rgba(7,17,27,0.1);
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

.tab-item{
  flex:1;
  font-size: 14px;
  text-align: center;
  display: block;
  color:rgb(77,85,93);
}

/*.router-link-active{
  color:red;
}*/

.is-active{
  color:rgb(240,20,20);
}
</style>
