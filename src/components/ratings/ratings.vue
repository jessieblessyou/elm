<template>
	<div ref="ratings" class="ratings">
	  <div>
	  	<div class="ratings-up">
	  		<div class="up-left">
	  			<div class="number">{{seller.score}}</div>
	  			<div class="number-desc">综合评分</div>
	  			<div class="number-compare">高于其它商家{{seller.rankRate}}%</div>
	  		</div>
	  		<div class="up-right">
	  			<div class="rating-star"><span class="star-text">服务态度</span><star :size="36" :score="seller.serviceScore"></star><span class="star-number">{{seller.serviceScore}}</span></div>
	  			<div class="rating-star"><span class="star-text">商品评分</span><star :size="36" :score="seller.foodScore"></star><span class="star-number">{{seller.foodScore}}</span></div>
	  			<div class="rating-star"><span class="star-text">送达时间</span><span class="star-time">{{seller.deliveryTime}}分钟</span></div>
	  		</div>
	  	</div>
	  	<div class="gap"></div>
	  	<div class="ratings-down">
	  		<ratingSelect :data='rating' :selectedType="selectType" :onlyContent='onlyContent' :typeName='typeName' @statusChange="changeOnlyContent" @selectTypeChange="changeSelectType"></ratingSelect>
	  		<div class="comment" v-for="(item,itemkey) in rating" :key="itemkey" v-show="showRatings(item)">
	  			<div><img :src="item.avatar" class="avatar"></div>
	  			<div class="comment-right">
	  				<div class="person-container">
	  					<div class="person-info">
	  						<span class="person-name">{{item.username}}</span>
	  						<div class="person-star"><star :size='24' :score='item.score'></star><span class="person-deliveryTime" v-show="item.deliveryTime>0">{{item.deliveryTime}}分钟送达</span></div>
	  					</div>
	  					<div class="person-time">{{item.rateTime | dateFormat}}</div>
	  				</div>
	  				<div class="comment-text">{{item.text}}</div>
	  				<div class="recommend">
	  					<i class="icon-thumb_up" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></i>
	  					<span class="recommend-item" v-for="(recommend,keyid) in item.recommend" :key="keyid">{{recommend}}</span>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
import BScroll from 'better-scroll'
import {dateCount} from '@/assets/date.js'

export default {
  name: 'appRatings',
  components: {
    'star': star,
    'ratingSelect': ratingSelect
  },
  props: {
  	seller: Object
  },
  data () {
    return {
      msg: 'ratings',
      onlyContent: true,
      selectType: 2,
      rating: [],
      typeName: ['全部', '满意', '不满意']
    }
  },
  created: function () {
  	 this.$http.get('/api/ratings').then((response) => {
  	 		this.rating = response.body.data
  	 })
  	 this.$nextTick(function () {
		  	this.scroll = new BScroll(this.$refs.ratings, {
		        click: true
		    })
  	 })
  },
  methods: {
  	changeOnlyContent: function (value) {
  		this.onlyContent = value
  		console.log(this.onlyContent)
  	},
  	changeSelectType: function (value) {
  		this.selectType = value
  		console.log(this.selectType)
  	},
  	showRatings: function (item) {
  		if (this.onlyContent && !item.text) {
  			return false
  		}
  		if (this.selectType === 2) {
  			return true
  		} else {
  			return item.rateType === this.selectType
  		}
  	}
  },
  filters: {
    dateFormat: function (value) {
      return dateCount(value, 'yyyy-mm-dd hh:mm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ratings{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  -height: 100%;
}
.ratings-up{
	display: flex;
}
.up-left{
	display: flex;
	width:36%;
	align-items: center;
	flex-direction:column;
	margin-top: 18px;
	margin-bottom: 18px;
	border-right:1px solid rgba(7,17,27,0.1);
}
.number{
	font-size: 24px;
	line-height: 28px;
	color:rgb(255,153,0);
	padding-bottom: 6px;
}
.number-desc{
	font-size: 12px;
	color:rgb(7,17,27);
	line-height: 12px;
	padding-bottom: 8px;
}
.number-compare{
	font-size: 10px;
	line-height: 10px;
	color:#93999f;
	padding-bottom: 6px;
}
.up-right{
	display: flex;
	width: 64%;
	flex-direction:column;
	margin-top: 18px;
	margin-bottom: 18px;
	margin-left: 24px;
	margin-right: 24px;
}
.gap{
height:16px;
background-color:#f3f5f7;
border-top:1px solid rgba(7,17,27,0.1);
border-bottom:1px solid rgba(7,17,27,0.1);
}
.rating-star{
	display: flex;
	padding-bottom: 8px;
}
.star-text{
	padding-right:12px;
	font-size:12px;
	line-height: 18px;
	color:rgb(7,17,27);
}
.star-number{
	color:rgb(255,153,0);
	padding-left:12px;
	font-size:12px;
	line-height: 18px;
}
.star-time{
	font-size:12px;
	line-height: 18px;
	color:rgb(143,157,159);
}
.avatar{
	width:28px;
	height:28px;
	border-radius: 50%;
	margin-right:12px;
}
.comment{
	margin:18px;
	display: flex;
}
.comment-right{
	width:100%;
}
.person-container{
	display: flex;
	justify-content: space-between;
	font-size:0px;
}
.person-name{
	font-size:10px;
	line-height: 12px;
	color:rgb(7,17,27);
	padding-bottom: 4px;
}
.person-star{
	display: flex;
}
.person-deliveryTime{
	font-size: 10px;
	line-height: 12px;
	color:rgb(143,157,159);
	padding-left:6px;
	font-weight: 200;
}
.person-time{
	font-size: 10px;
	line-height: 12px;
	color:rgb(143,157,159);
	padding-left:6px;
	font-weight: 200;
}
.comment-text{
	font-size: 12px;
	line-height: 18px;
	color:rgb(7,17,27);
	padding-top:6px;
	padding-bottom: 8px;
}
.recommend{
	font-size: 0;
}
.icon-thumb_up{
	font-size:9px;
	line-height: 18px;
	color:rgb(0,160,220);
}
.icon-thumb_down{
	font-size:9px;
	line-height: 18px;
  color:rgb(147,153,159);
}
.recommend-item{
	display: inline-block;
	font-size:9px;
	color:rgb(143,157,159);
	line-height: 16px;
	border:1px solid rgb(7,17,27,0.1);
	border-radius: 1px;
	background-color: rgb(255,255,255);
	padding-left: 6px;
	padding-right: 6px;
	margin-left:8px;
	margin-bottom:4px;
}
</style>
