<template>
  <div class="cartcontrol" @click.stop>
  <transition name="roll">
    <span class="roll-outer" v-show="foodDetails.count>0"><i class="icon-remove_circle_outline icon" @click="reduceClick()"></i></span>
  </transition>
    <span  class="sum" v-show="foodDetails.count>0">{{foodDetails.count}}</span>
    <i class="icon-add_circle icon" @click="addClick()" ref="addCircle"></i>
  </div>
</template>

<script>
export default {
	 data () {
    return {
      count: 0,
      currentfoodDetails: this.foodDetails
    }
  },
  props: {
  	foodDetails: Object
  },
  computed: {
  },
  methods: {
  	addClick: function () {
  		if (!this.foodDetails.count) {
  			this.$set(this.foodDetails, 'count', 0)
  		}
  		let newData = this.foodDetails.count + 1
  		this.$set(this.foodDetails, 'count', newData)
  		let el = this.$refs.addCircle
  		this.$emit('selectcircle', el)
  	},
  	reduceClick: function () {
  		this.foodDetails.count = this.foodDetails.count - 1
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.roll-outer{
  position: absolute;
  -left:24px;
  transform: translateX(-24px);
}
.cartcontrol{
	display: flex;
}
.icon{
	font-size:24px;
	color:rgb(0,160,220);
	line-height: 24px;
	-vertical-align: middle;
}
.sum{
	display: inline-block;
	width:24px;
	font-size:10px;
	line-height: 24px;
	text-align: center;
	font-weight: 700;
}
.roll-enter-active, .roll-leave-active{
  transition: all 0.4s;
}
.roll-enter, .roll-leave-to{
  -transform:translateX(24px);
  transform:rotate(-180deg);
}
</style>
