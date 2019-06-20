<template>
  <div>
  	<div>
  		<div class="seller-summary">
  			<div class="seller-summary-up">
  				<div class="seller-summary-up-left">
  					<div class="seller-maintitle">{{seller.name}}</div>
  					<div class="seller-rating">
  						<star :size="36" :score="5"></star>
  						<span class="seller-ratingCount">({{seller.ratingCount}})</span>
  						<span class="seller-sellCount">月销{{seller.sellCount}}单</span>
  					</div>
  				</div>
  				<div class="seller-summary-up-right">
  				<i class="icon-favorite"></i>
  				<span>收藏</span>
  				</div>
  			</div>
  			<div class="seller-summary-down">
  				<div class="seller-expense">
  					<div class="expense-name">起送价</div>
  					<div class="expense-price"><span class="price-number">{{seller.minPrice}}</span>元</div>
  				</div>
  				<div class="seller-expense">
  					<div class="expense-name">商家配送</div>
  					<div class="expense-price"><span class="price-number">{{seller.deliveryPrice}}</span>元</div>
  				</div>
  				<div class="seller-expense">
  					<div class="expense-name">平均配送时间</div>
  					<div class="expense-price"><span class="price-number">{{seller.deliveryTime}}</span>元</div>
  				</div>
  			</div>
  		</div>
  		<div class="gap"></div>
  		<div class="seller-notice">
  			<h1 class="seller-maintitle">公告和活动</h1>
  			<div class="seller-bulletin">{{seller.bulletin}}</div>
  			<ul>
  				<li v-for="(item,itemkey) in seller.supports" :key="itemkey" class="seller-supports"><activityicon :size="2" :pickup="item.type" class="supports-icon"></activityicon>{{item.description}}</li>
  			</ul>
  		</div>
  		<div class="gap"></div>
  		<div class="seller-view">
  			<h1 class="seller-maintitle">商家实景</h1>
  			<div ref="sellerView" class="view-container">
	  			<ul class="view-scroll">
	  				<li v-for="(item,keyid) in seller.pics" class="view-image" :key="keyid"><img :src="item"></li>
	  			</ul>
  			</div>
  		</div>
  		<div class="gap"></div>
  		<div class="seller-infos">
  			<h1 class="seller-maintitle">商家信息</h1>
  			<ul>
  				<li v-for="(item,itemkey) in seller.infos" class="seller-info" :key="itemkey">{{item}}</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import activityicon from '@/components/icon/icon'
import BScroll from 'better-scroll'

export default {
  name: 'appSeller',
  components: {
    'star': star,
    'activityicon': activityicon
  },
  data () {
    return {
      msg: 'seller'
    }
  },
  props: {
  	seller: Object
  },
  created: function () {
  	this.$nextTick(function () {
  		this.scroll = new BScroll(this.$refs.sellerView, {
		    scrollX: true,
		    eventPassthrough: 'vertical'
		  })
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view-scroll{
	width:500px;
}
.gap{
	height:16px;
	background-color:#f3f5f7;
	border-top:1px solid rgba(7,17,27,0.1);
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.seller-summary-up{
	display: flex;
	justify-content: space-between;
	margin-top: 18px;
	margin-left: 18px;
	margin-right: 18px;
	border-bottom:1px solid rgb(7,17,27,0.1);
}
.seller-summary-up-left{

}
.seller-maintitle{
	font-size:14px;
	line-height: 14px;
	color:rgb(7,17,27);
	padding-bottom: 8px;
}
.seller-rating{
	display: flex;
	padding-bottom:18px;
}
.seller-ratingCount{
	padding-left:8px;
	font-size:10px;
	line-height: 18px;
	color:rgb(77,85,93);
}
.seller-sellCount{
	padding-left: 12px;
	font-size:10px;
	line-height: 18px;
	color:rgb(77,85,93);
}
.seller-summary-down{
	display: flex;
	-justify-content: space-around;
}
.seller-expense{
	text-align: center;
	margin-top:18px;
	margin-bottom:18px;
	font-size:10px;
	line-height: 10px;
	color:rgb(143,157,159);
	border-right: 1px solid rgb(7,17,27,0.1);
	flex:1 1 auto;
}
.seller-expense:last-child{
	border-right: 0px;
}
.expense-name{
	padding-bottom:4px;
}
.expense-price{
	color:rgb(7,17,27);
}
.price-number{
	font-size: 24px;
	font-weight:200;
	color:rgb(7,17,27);
	line-height: 24px;
}
.seller-notice{
	margin:18px;
}
.seller-bulletin{
	margin-left:12px;
	margin-right:12px;
	font-size:12px;
	font-weight:200;
	color:rgb(240,20,20);
	line-height: 24px;
	padding-bottom:16px;
}
.seller-supports{
	border-top:1px solid rgb(7,17,27,0.1);
	padding-top:16px;
	padding-bottom:16px;
	padding-left:12px;
	padding-right:12px;
	font-size:12px;
	line-height: 16px;
	font-weight: 200;
	color:rgb(7,17,27);
}
.supports-icon{
	padding-right:6px;
}
.seller-view{
	margin:18px;
}
.view-scroll{
	width:500px;
}
.view-container{
	width:100%;
	height:90px;
	white-space: nowrap;
	overflow: hidden;
}
.view-image{
	display: inline-block;
  margin-right: 6px;
  width: 120px;
  height: 90px;
}
.seller-infos{
	margin:18px;
}
.seller-info{
	border-top:1px solid rgb(7,17,27,0.1);
	padding-left:12px;
	padding-right:12px;
	padding-top:16px;
	padding-bottom:16px;
	font-size: 12px;
	font-weight: 200;
	line-height: 16px;
	color:rgb(7,17,27);
}
</style>
