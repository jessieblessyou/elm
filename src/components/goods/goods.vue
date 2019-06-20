<template>
<div>
  <div class="goods" ref="goods">
    <div class="menu-container" ref="menuScroll">
      <ul ref='menu' class="xx">
        <li v-for="(good,goodkey) in goods" :key="goodkey" @click='menuColorChange(goodkey)' class="menu" :class="{'active':newActive==goodkey}"><span class="menu-item" :class="{borderNone:newActive==goodkey}"><activityicon v-if="good.type>-1" :pickup='good.type' :size='1'></activityicon>{{good.name}}</span></li>
      </ul>
    </div>
    <div class="goods-container" ref="goodsScroll">
        <div class="yy" ref="goodScrollDiv">
          <div class="goods-category" v-for="(good,key) in goods" :key="key" ref="goodScroll" >
            <div class="goods-title">{{good.name}}</div>
            <div class="goods-details">
              <ul ref="rightScroll">
                <li v-for="(food,id) in good.foods" :key="id" class="details-item" @click="showFood(food,$event)">
                  <img :src="food.icon" class="food-icon"  width="57" height="57"/>
                  <div class="food-content">
                    <p class="food-name">{{food.name}}</p>
                    <p class="food-description food-txt">{{food.description}}</p>
                    <p class="food-sellCount food-txt">月销{{food.sellCount}}份<span class="food-rating">好评率{{food.rating}}%</span></p>
                    <p class="food-price">¥{{food.price}}</p>
                  </div>
                  <cartcontrol class="food-cartcontrol" @selectcircle="selectcircle" :foodDetails="food" ref="cartcontrol"></cartcontrol>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
  <foodDialog :food='selectedFood' ref="food"></foodDialog>
  <shopcart ref="shopcart" :shopcartfoods='shopcartfoods' :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
</div>
</template>

<script>
import activityicon from '@/components/icon/icon'
import food from '@/components/food/food'
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartControl/cartcontrol'
import shopcart from '@/components/shopcart/shopcart'

export default {
  name: 'appGoods',
  components: {
    'activityicon': activityicon,
    'foodDialog': food,
    'cartcontrol': cartcontrol,
    'shopcart': shopcart
  },
  data () {
    return {
      goods: '',
      active: 0,
      selectedFood: {},
      rightHeightArr: [],
      scrollY: 0,
      shopcartfoods: []
    }
  },
  props: {
    seller: Object
  },
  created: function () {
    let _this = this
    this.$http.get('/api/goods').then((response) => {
      this.goods = response.body.data
      this.$nextTick(function () {
        this._calFoodHeight()
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.goodsScroll, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', function (pos) {
          _this.scrollY = Math.abs(Math.round(pos.y))
        })
      })
    })
  },
  computed: {
    newActive: function () {
      for (var i = 0; i < this.rightHeightArr.length; i++) {
        if (this.scrollY === 0) {
          return 0
        }
        if (!this.rightHeightArr[i + 1] || (this.scrollY >= this.rightHeightArr[i] && this.scrollY < this.rightHeightArr[i + 1])) {
          return i
        }
      }
    }
  },
  methods: {
    menuColorChange: function (id) {
      let arr = this.$refs.goodScrollDiv.getElementsByClassName('goods-category')
      let el = arr[id]
      this.foodsScroll.scrollToElement(el, 300)
    },
    showFood: function (food, event) {
      this.selectedFood = food
      this.$refs.food.show()
    },
    _calFoodHeight: function () {
      let arr = this.$refs.goodScrollDiv.getElementsByClassName('goods-category')
      for (var i = 0; i < arr.length; i++) {
        this.rightHeightArr.push(arr[i].offsetTop)
      }
    },
    shopcartFoods: function () {
      let arr = []
      for (var i = 0; i < this.goods.length; i++) {
        let good = this.goods[i].foods
        for (var j = 0; j < good.length; j++) {
          let food = good[j]
          if (food.count) {
            arr.push(food)
          }
        }
      }
      this.shopcartfoods = arr
    },
    selectcircle: function (el) {
      this.shopcartFoods()
      this.$nextTick(function () {
        this.$refs.shopcart._drop(el)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.xx{
  -top:-55px;
  position: relative;
}
.goods{
  position: absolute;
  top:174px;
  bottom: 46px;
  overflow: hidden;
  display: flex;
  width: 100%;
}
.menu-container{
  flex:0 0 80px;
  background-color: #f3f5f7;
}
.goods-container{
  flex:1;
  font-size: 0px;
  position: relative;
}
.yy{
  top:0px;
  position: relative;
}
.menu{
padding-left:12px;
}
.menu-item{
display: table-cell;
height:54px;
vertical-align: middle;
font-size: 12px;
width:56px;
border-bottom: 1px solid rgb(7,17,27,0.1);
}
.active{
background-color: white;
}
.borderNone{
  border-bottom:1px solid white;
}
.goods-title{
  background-color: #f3f5f7;
  font-size:12px;
  line-height: 28px;
  color:rgb(147,153,159);
  padding-left: 14px;
  border-left:1px solid #d9dde1;
}
.goods-details{
  padding:18px;
  padding-top: 0px;
}
.details-item{
  padding-bottom: 18px;
  padding-top: 18px;
  display: flex;
  position: relative;
  border-bottom:1px solid rgba(7,17,27,0.1);
  overflow: hidden;
}
.food-icon{
  vertical-align: top;
}
.food-content{
  display: inline-block;
  padding-left: 10px;
}
.food-name{
  font-size: 14px;
  line-height: 14px;
  color:rgb(7,17,27);
  padding-top:2px;
}
.food-description{
  padding-top:8px;
}
.food-sellCount{
  padding-top:8px;
}
.food-rating{
  padding-left: 12px;
}
.food-price{
  padding-top:8px;
  font-size: 10px;
  line-height: 24px;
  color:rgb(240,20,20);
}
.food-txt{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 10px;
}
.food-cartcontrol{
  position: absolute;
  right:0;
  -margin-right: 18px;
  margin-bottom: 18px;
  bottom:0;

}
</style>
