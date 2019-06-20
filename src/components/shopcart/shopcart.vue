<template>
  <div class="shopcart" @click="detailsStatus()">
  	<div class="shopcart-fixed-content">
	  	<div class="icon-container">
	  		<span class="icon-background" :class="{highlight:count>0}"><i class="icon-shopping_cart" :class="{highlight:count>0}"></i></span>
	  		<span v-show="count>0" class="icon-count">{{count}}</span>
	  	</div>
	  	<div class="shopcart-info-container">
		  	<span class="totalPrice" :class="{highlight:count>0}">¥{{newTotal}}</span>
		  	<span class="distributionPrice">另需配送费¥{{deliveryPrice}}元</span>
	  	</div>
	  	<div class="startingFare" :class="{highlight:payClass==1}">{{payDesc}}</div>
  	</div>
  	<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" v-for="(ball,ballkey) of balls" :key="ballkey">
  		<div class="shopcart-circle" v-show="ball.ballstatus" ref="circle">
  			<div class="inner-circle"></div>
  		</div>
  	</transition>
  	<transition name="fold">
  		<div class="details" v-show="detailsShowCheck()">
  		<div class="details-top-info"><span class="details-title">购物车</span><span class="details-clearup" @click="clearDetails()">清空</span></div>
  		<div class="details-bottom-info" ref="detailsBottomInfo">
  			<ul>
  				<li class="food-info" v-for="(shopcartfood,id) in shopcartfoods" :key="id" v-show="shopcartfood.count>0">
  					<span class="food-title">{{shopcartfood.name}}</span>
  					<span class="food-right">
  						<span class="food-price"><i class="price-icon">¥</i>{{shopcartfood.price*shopcartfood.count}}</span>
  						<cartcontrol class="food-icon" @selectcircle="selectself" :foodDetails="shopcartfood"></cartcontrol>
  						</span>
  				</li>
  			</ul>
  		</div>
  		</div>
  	</transition>
  	<transition name="fade">
  		<div class="blurbackground" v-show="detailsShowCheck()"></div>
  	</transition>
  </div>
</template>

<script>
import cartcontrol from '@/components/cartControl/cartcontrol'
import BScroll from 'better-scroll'

export default {
  name: 'appSeller',
  components: {
    'cartcontrol': cartcontrol
  },
  props: {
  	shopcartfoods: Array,
  	minPrice: Number,
  	deliveryPrice: Number
  },
  data () {
    return {
    	total: 0,
      detailsShow: false,
      circleposition: {},
      balls: [
      	{ballstatus: false},
      	{ballstatus: false},
      	{ballstatus: false},
      	{ballstatus: false},
      	{ballstatus: false}
      ],
      dropballs: [ ]
    }
  },
 	created: function () {
 		this.$nextTick(() => {
      this.detailsBottomInfo = new BScroll(this.$refs.detailsBottomInfo, {
	      click: true
	    })
 		})
 	},
 	computed: {
 		newTotal: function () {
 			var sum = 0
 			for (var i = 0; i < this.shopcartfoods.length; i++) {
 				sum = sum + (this.shopcartfoods[i].count * this.shopcartfoods[i].price)
 			}
 			return sum
 		},
 		count: function () {
 			let count = 0
 			for (var i = 0; i < this.shopcartfoods.length; i++) {
 				count = count + this.shopcartfoods[i].count
 			}
 			return count
 		},
 		payDesc: function () {
 			let desc = ''
 			let sum = 0
 			if (this.shopcartfoods.length === 0) {
 				desc = `¥${this.minPrice}元起送`
 				return desc
 			}
 			for (var i = 0; i < this.shopcartfoods.length; i++) {
 				sum = sum + this.shopcartfoods[i].count * this.shopcartfoods[i].price
 				if (sum < this.minPrice) {
 					let leftsum = this.minPrice - sum
 					desc = `还差¥${leftsum}元起送`
 					return desc
 				} else {
 					return '去结算'
 				}
 			}
 		},
 		payClass: function () {
 			let sum = 0
 			for (var i = 0; i < this.shopcartfoods.length; i++) {
 				sum = sum + this.shopcartfoods[i].count * this.shopcartfoods[i].price
 				if (sum >= this.minPrice) {
 					return 1
 				} else {
 					return 0
 				}
 			}
 		}
 	},
  methods: {
  	_drop: function (el) {
      let y = window.screen.height - el.getBoundingClientRect().y
      let x = el.getBoundingClientRect().x
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.ballstatus) {
          ball.ballstatus = true
          ball.x = x
          ball.y = y
          this.dropballs.push(ball)
          return
        }
      }
  	},
  	selectself: function (el) {
      this._drop(el)
  	},
  	detailsStatus: function () {
  		this.detailsShow = !this.detailsShow
  	},
  	detailsShowCheck: function () {
  		if (this.newTotal === 0) {
  			return false
  		}
  		if (this.detailsShow === false) {
  			return false
  		}
  		return true
  	},
  	clearDetails: function () {
  		for (var i = 0; i < this.shopcartfoods.length; i++) {
  			this.shopcartfoods[i].count = 0
  		}
  	},
	  beforeEnter: function (el) {
	  	let length = this.balls.length
	  	let inner = el.getElementsByClassName('inner-circle')[0]
	  	while (length--) {
        let ball = this.balls[length]
        let x = ball.x - 30
        let y = -ball.y + 30
        if (ball.ballstatus) {
			  	el.style.display = ''
			  	el.style.transform = `translateY(${y}px)`
			  	inner.style.transform = `translateX(${x}px)`
	      }
	  	}
	  },
	  enter: function (el, done) {
	  	/* eslint-disable no-unused-vars */
      let rf = el.offsetWidth
      let inner = el.getElementsByClassName('inner-circle')[0]
      el.style.transform = `translateY(0px)`
      inner.style.transform = `translateX(0px)`
	    el.style.transition = 'all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
	    inner.style.transition = 'all 0.4s linear'
	    el.addEventListener('transitionend', done)
	  },
	  afterEnter: function (el) {
	  	let ball = this.dropballs.shift()
      if (ball) {
        ball.ballstatus = false
        el.style.display = 'none'
      }
    }
	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopcart{
	position: fixed;
}
.shopcart-fixed-content{
	z-index: 100;
	position: fixed;
	bottom:0;
	height: 46px;
	background-color: #141D27;
	width: 100%;
	color:rgba(255,255,255,0.4);
	line-height: 24px;
	font-weight: 700;
}
.icon-container{
	display: flex;
	align-items: center;
	justify-content:center;
	position: absolute;
	height: 56px;
	width: 56px;
	bottom:0;
	border-radius: 50%;
	background-color: #141D27;
	margin-left: 12px;
	margin-bottom: 2px;
	font-size: 24px;
}
.shopcart-info-container{
	display: flex;
	margin-left: 80px;
	align-items: center;
	height: 46px;
}
.icon-shopping_cart{

	-background-color:#2b343c;
	line-height: 44px;
	-text-align: center;
}
.icon-shopping_cart.highlight{
	color: white;
}
.icon-background{
	width:44px;
	height: 44px;
	border-radius: 50%;
	background-color: #2b343c;
	line-height: 44px;
	text-align: center;
}
.icon-background.highlight{
	background: #00a0dc;
}
.icon-count{
	position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  border-radius: 16px;
  line-height: 16px;
  font-size: 9px;
  text-align: center;
  font-weight: 700;
  color:white;
  background-color: #f01414;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.totalPrice{
	font-size: 16px;
	padding-right: 12px;
	border-right: 1px solid rgba(255,255,255,0.1);
}
.totalPrice.highlight{
	color:white;
}
.distributionPrice{
	margin-left: 12px;
	font-size: 10px;
	margin-right: 12px;
}
.startingFare{
	position: absolute;
	font-size: 12px;
	width: 89px;
	height: 100%;
	line-height: 46px;
	background-color:#2b343c;
	right:0;
	top:0;
	text-align: center;
	padding-left: 8px;
	padding-right: 8px;
}
.startingFare.highlight{
	background: #00b43c;
  color: #fff;
}
.shopcart-circle{
	position: fixed;
	left: 30px;
	bottom:30px;
	width:10px;
	height:10px;
	border-radius: 50%;
	-background-color:rgb(0,160,220);
}
.inner-circle{
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background-color:rgb(0,160,220);
}
.blurbackground{
	position: fixed;
	left:0;
	top:0;
	height: 100%;
	background-color: rgba(7,17,27,0.6);
	width:100%;
	z-index: -2;
}
.details{
	position: fixed;
	-height: 260px;
	bottom:46px;
	width:100%;
	z-index: -1;
	transition: all 0.5s;
}
.details-top-info{
	display: flex;
	justify-content: space-between;
	background-color: #f3f5f7;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	padding-left:18px;
	padding-right: 18px;
	height: 40px;
}
.details-title{
	font-size:14px;
	font-weight: 200;
	color:rgb(7,17,27);
	line-height: 40px;
}
.details-clearup{
	font-size: 12px;
	color:rgb(0,160,220);
	line-height: 40px;
}
.details-bottom-info{
	background-color: white;
	overflow: hidden;
	max-height: 220px;
}
.food-info{
	height: 48px;
	display: flex;
	justify-content: space-between;
	margin-left: 18px;
	margin-right:18px;
	align-items:center;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.food-title{
	color:rgb(7,17,27);
	font-size: 14px;
	line-height: 24px;
}
.food-price{
	color:rgb(240,20,20);
	font-size:14px;
	padding-right:36px;
	font-weight: 700;
	line-height: 24px;
	text-align:center;
}
.food-right{
	display: flex;
	color:rgb(143,157,159);
	justify-content: space-between;
}
.food-icon{
	-display: inline;
}
.price-icon{
	font-size: 10px;
	font-weight: normal;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fold-enter-active{
	transform: translateY(0px);
}
.fold-enter, .fold-leave-to{
  transform: translateY(100%);
}
</style>
