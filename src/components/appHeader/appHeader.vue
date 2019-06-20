<template>
  <div class="header">
    <div class="headerContent">
      <div class="avatar"><img :src='seller.avatar'/></div>
      <div class="details">
        <p class="title"><span class="brand"></span><span class="name">{{seller.name}}</span></p>
        <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <p v-if="seller.supports" class="supports"><activityicon :pickup='seller.supports[0].type' :size='1'></activityicon><span class="supportDescription">{{seller.supports[0].description}}</span></p>
      </div>
     <span class="supportsNumber" @click='showSupportDetails'>5个 ></span>
    </div>
    <div class="notice"><span class="bulletinIcon"></span><span class="info">{{seller.bulletin}}</span></div>
    <div class="bgImage"><img :src="seller.avatar"></div>
    <div v-show="showDetails" class="supportDetails">
      <div class="detailsContainer">
        <div class="detailsContent">
          <div class="detailsName">{{seller.name}}</div>
          <div class="detailsRating"><star :score="seller.score" :size="48"></star></div>
          <div class="order">
            <span class="line"></span>
            <span class="txt">优惠信息</span>
            <span class="line"></span>
          </div>
          <div class="detailsDescription">
            <ul v-if="seller.supports">
            <li v-for="item in seller.supports" :key="item.id" class="descriptionContainer">
              <activityicon :pickup='item.type' :size='2'></activityicon><span class="itemDescription">{{item.description}}</span>
            </li>
            </ul>
          </div>
          <div class="order">
            <span class="line"></span>
            <span class="txt">商家公告</span>
            <span class="line"></span>
          </div>
          <div class="detailsBulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detailsFooter"><i class="icon-close" @click="closeSupportDetails"></i></div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import activityicon from '@/components/icon/icon'

export default {
  name: 'appHeader',
  components: {
    'star': star,
    'activityicon': activityicon
  },
  data () {
    return {
      msg: 'header',
      type: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showDetails: false
    }
  },
  methods: {
    showSupportDetails: function () {
      this.showDetails = true
    },
    closeSupportDetails: function () {
      this.showDetails = false
    }
  },
  props: {
    seller: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '../../../static/css/style.css';

.header{
  position: relative;
  width: 100%;
  background-color:rgba(7,17,27,0.5);
  color:white;
  padding-top:24px;
  overflow:hidden;
}

.avatar{
  margin-left: 24px;
  margin-bottom: 18px;
  font-size: 0;
  float:left;
}
.avatar img{
  width: 64px;
  height:64px;
  border-radius:2px;
}
.details{
  float:left;
  padding-top:2px;
  padding-left: 16px;
}
.title{
  margin-bottom: 8px;
  margin-top:2px;
}
.brand{
  @include bg-image('brand');
  display:inline-block;
  width:30px;
  height:18px;
  background-size:30px 18px;
  vertical-align:top;
}
.name{
  margin-left:6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.description{
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: 100;
}
.supports{
  font-size: 10px;
  line-height: 12px;
  font-weight: 100;
}

.supportDescription{
  margin-left:4px;
}
.supportsNumber{
  bottom:46px;
  position: absolute;
  right:0;
  margin-right: 12px;
  font-size: 10px;
  height:24px;
  line-height: 24px;
  background-color:rgba(0,0,0,0.2);
  padding-left:7px;
  padding-right: 7px;
  border-radius: 14px 16px;
  cursor:pointer;
}
.notice{
  clear:both;
  height:28px;
  font-size: 10px;
  padding-left:12px;
  padding-right: 12px;
  line-height: 28px;
  background-color:rgba(7,17,27,0.2);
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow:hidden;
}
.bulletinIcon{
  @include bg-image('bulletin');
  display:inline-block;
  width:22px;
  height:12px;
  background-size:22px 12px;
  vertical-align:top;
  margin-top:8px;
  background-repeat:no-repeat;
}
.info{
  font-size:10px;
  font-weight:200;
  margin-left:2px;
  margin-right:2px;
}
.bgImage{
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  overflow:hidden;
  width:100%;
  height:100%;
  filter:blur(10px);
}
.bgImage img{
  width:100%;
  -height:100%;
}
.supportDetails{
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  background-color:rgba(7,17,27,0.8);
  z-index:100;
  overflow:auto;
}
.detailsContainer{
  margin-left:36px;
  margin-right:36px;
  min-height:100%;
  -backdrop-filter: blur(10px)
}
.detailsContent{
  padding-bottom:64px;
  padding-top:64px;
}
 .order {
   margin-top:28px;
   display:flex;
   align-items:center;
   font-size:0;
}
 .order .line {
  flex:1;
  display: block;
  border-top: 1px solid rgba(255,255,255,0.2);
  height:1px;
}
.order .txt {
   padding-left:12px;
   padding-right:12px;
   font-size:14px;
   text-align:center;
}
.detailsName{
  text-align:center;
  font-size:16px;
  font-weight:700;
  line-height:16px;
  color:rgb(255,255,255);
}
.detailsDescription{
  line-height:16px;
  margin-top:24px;
  margin-bottom:28px;
}
.descriptionContainer{
  line-height:16px;
  margin-bottom:12px;
  font-size:0;
  padding:0 12px;
}
.detailsRating{
  margin-top:16px;
  -line-height:24px;
  text-align:center;
  height:24px;
}
.itemDescription{
  font-size:12px;
  font-weight:100;
  line-height:16px;
  margin-left:6px;
}
.detailsBulletin{
  padding-left:12px;
  padding-right:12px;
  margin-top:24px;
  font-size:12px;
  font-weight:100;
  line-height:24px;
}
.detailsFooter{
  position:relative;
  width:32px;
  height:32px;
  margin:-50px auto 0 auto;
  font-size:32px;
  color:rgba(255,255,255,0.5);
  border-bottom:1px solid rgba(7,17,27,0.1);
}

</style>
