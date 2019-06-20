<template>
<transition name="move">
<div class="foodWrapper" ref='foodWrapper' v-show="showFlag">
  <div class="food-container">
  	<div class="food-image-container">
      <i class="icon-arrow_lift" @click="notShow()"></i>
  		<img :src="food.image" class="food-image"/>
  	</div>
  	<div class="food-details-container">
  		<h1 class="food-name">{{food.name}}</h1>
  		<p class="food-sellCount">月售{{food.sellCount}}份<span class="food-rating">好评率{{food.rating}}％</span></p>
  		<p class="food-price"><span class="price-symbol">¥</span>{{food.price}}</p>
  	</div>
  	<div class="food-gap"></div>
  	<div class="food-info-container">
  	<h1 class="food-info-title">商品介绍</h1>
  	<p class="food-info">{{food.info}}</p>
  	</div>
  	<div class="food-gap"></div>
  	<div class="food-comment-container" v-if="food.ratings">
  		<h1 class="food-comment-title">商品评价</h1>
  		<ratingSelect :data='food.ratings' :selectedType="selectType" :onlyContent='onlyContent' @statusChange="changeOnlyContent" @selectTypeChange="changeSelectType"></ratingSelect>
  		<ul v-show="food.ratings">
  			<li v-for="(rating,id) in food.ratings" v-show="showRatings(rating)" :key="id" class="rating-container">
          <div class="rating-left">
            <p class="rating-ratetime">{{rating.rateTime | dateFormat}}</p>
            <p class="rating-text"><i :class="rating.rateType?'icon-thumb_down':'icon-thumb_up'"></i><span>{{rating.text}}</span></p>
          </div>
          <div class="rating-right">
            <span class="rating-username">{{rating.username}}</span>
            <img :src="rating.avatar" width="12" height="12" class="rating-avatar"/>
          </div>
        </li>
  		</ul>
      <div class="no-comment" v-show="!food.ratings">暂无评价</div>
  	</div>
  </div>
</div>
  </transition>
</template>

<script>
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import BScroll from 'better-scroll'
import {dateCount} from '@/assets/date.js'

const All = 2

export default {
  name: 'appSeller',
  components: {
    'ratingSelect': ratingSelect
  },
  data () {
    return {
      showFlag: false,
      selectType: All,
      typeName: ['全部', '推荐', '吐槽'],
      onlyContent: true
    }
  },
  props: {
    food: Object
  },
  filters: {
    dateFormat: function (value) {
      return dateCount(value, 'yyyy-mm-dd hh:mm')
    }
  },
  methods: {
	  show: function () {
	  	this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
	  },
	  showRatings: function (rating) {
      if (this.selectType === 'undefined') {
        return false
      } else if (this.selectType === All && !this.onlyContent) {
	  		return true
	  	} else if (this.selectType === All) {
        return true && rating.text
      } else if (this.onlyContent) {
	  	  return this.selectType === rating.rateType && rating.text
	  	} else {
        return this.selectType === rating.rateType
      }
	  },
	  changeOnlyContent: function (status) {
	  	this.onlyContent = status
	  },
    notShow: function () {
      this.showFlag = false
    },
    changeSelectType: function (status) {
      this.selectType = status
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foodWrapper{
position: absolute;
width: 100%;
z-index: 30;
height:100%;
left: 0;
top:0;
overflow: hidden;
background-color: white;
}
.food-container{
  height:auto;
}
.move-enter-active, .move-leave-active{
transition: left 0.2s linear;
left:0;
}
.move-enter, .move-leave-to{
left:100%;
}
/*.move-leave-active{
  transition: right 2s linear;
  left:0;
}*/
.food-image-container{
position: relative;
width: 100%;
height:0;
padding-top: 100%;
}
.food-image{
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
}
.icon-arrow_lift{
  color:#fff;
  position: absolute;
  left:10px;
  top:10px;
  z-index: 2;
  font-size: 20px;
}
.food-details-container{
padding:18px 18px 18px 18px;
}
.food-name{
font-size: 14px;
line-height: 14px;
font-weight:700;
color:rgb(7,17,27);
margin-bottom: 8px;
}
.food-sellCount{
font-size:10px;
line-height: 1px;
color:rgb(147,153,159);
margin-bottom: 18px;
}
.food-rating{
margin-left: 12px;
}
.food-price{
font-size:12px;
font-weight:700;
color:rgb(240,20,20);
line-height: 24px;
}
.price-symbol{
font-size: 10px;
}
.food-gap{
height:16px;
background-color:#f3f5f7;
border-top:1px solid rgba(7,17,27,0.1);
border-bottom:1px solid rgba(7,17,27,0.1);
}
.food-info-container{
padding:18px 18px 18px 18px;
}
.food-info-title{
line-height: 14px;
margin-bottom: 6px;
font-size: 14px;
color: rgb(7, 17, 27);
}
.food-info{
font-size: 12px;
line-height: 24px;
font-weight:200;
color:rgb(77,85,93);
}
.food-comment-container{
padding:18px 0px 18px 0px;
}
.food-comment-title{
line-height: 14px;
margin-bottom: 6px;
font-size: 14px;
color: rgb(7, 17, 27);
margin-left:18px;
}
.no-comment{
  font-size: 12px;
  line-height: 24px;
  font-weight:200;
  color:rgb(77,85,93);
  padding-left: 18px;
  padding-top: 18px;
}
.rating-container{
  display: flex;
  justify-content:space-between;
  margin:16px 18px 16px 18px;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.rating-ratetime{
  font-size:10px;
  line-height: 12px;
  color:rgb(147,153,159);
}
.icon-thumb_up{
  line-height: 24px;
  color:rgb(147,153,159);
  margin-right: 4px;
}
.rating-text{
  font-size: 12px;
  line-height: 18px;
  color:rgb(7,17,27);
}
.rating-username{
  font-size:10px;
  line-height: 12px;
  color:rgb(147,153,159);
}
.rating-avatar{
  border-radius: 50%;
  margin-left: 6px;
  vertical-align: middle;
}
.icon-thumb_up{
  color:rgb(0,160,220);
}
.icon-thumb_down{
  color:rgb(147,153,159);
}
</style>
