<template>
  <div>
  	<div class="btn">
  		<div class="btn-all" :class="{'active':currentSelectedType===2}" @click="selectType(2)"><span class="all-title">{{typeName[0]}}</span><span class="count">{{data.length}}</span></div>
  		<div class="btn-positive" :class="{'active':currentSelectedType===0}" @click="selectType(0)"><span class="positive-title">{{typeName[1]}}</span><span class="count">{{positiveCount}}</span></div>
  		<div class="btn-negative" :class="{'active':currentSelectedType===1}" @click="selectType(1)"><span class="negative-title">{{typeName[2]}}</span><span class="count">{{negativeCount}}</span></div>
  	</div>
  	<div class="checkbox"><i class="icon-check_circle" @click="checkboxchange()" :class="{on:onlyContent}"></i><span>只看有内容的评价</span></div>
  </div>
</template>

<script>
export default {
  name: 'appSeller',
  data () {
    return {
      typeCount: [],
      currentOnlyContent: this.onlyContent,
      currentSelectedType: this.selectedType
    }
  },
  props: {
    selectedType: {
      type: Number,
      default: 2
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    typeName: {
      type: Array,
      default: function () {
        return ['全部', '推荐', '吐槽']
      }
    }
  },
  computed: {
  	positiveCount: function () {
  		var x = this.data.filter(item => item.rateType === 0)
  		return x.length
  	},
  	negativeCount: function () {
  		var x = this.data.filter(item => item.rateType === 1)
  		return x.length
  	}
  },
  methods: {
  	checkboxchange: function () {
  		this.currentOnlyContent = !this.currentOnlyContent
  		this.$emit('statusChange', this.currentOnlyContent)
  	},
    selectType: function (value) {
      this.currentSelectedType = value
      this.$emit('selectTypeChange', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
	margin:18px 18px 0px 18px;
	padding-bottom: 18px;
	display: flex;
	border-bottom: 1px solid rgb(7,17,27,0.1);
}
.btn div{
	float:left;
	padding:8px 12px 8px 12px;
	border-radius: 2px;
	font-size:12px;
	line-height: 16px;
	margin-right:8px;
}
.count{
	font-size:8px;
	padding-left:2px;
}
.btn-all{
 background-color: rgba(0,160,220,0.2);
}
.btn-all.active{
  background-color: rgb(0,160,220);
  color:rgb(255,255,255);
}
.btn-positive{
	color:rgb(77,85,93);
	background-color: rgba(0,160,220,0.2);
}
.btn-positive.active{
  background-color: rgb(0,160,220);
  color:rgb(255,255,255);
}
.btn-negative{
	color:rgb(77,85,93);
	background-color: rgba(77,85,93,0.2);
}
.btn-negative.active{
  background-color: rgb(77,85,93);
  color:rgb(255,255,255);
}
.checkbox{
	display: flex;
	margin-top:12px;
	padding:0px 18px 12px 18px;
	font-size: 12px;
	border-bottom: 2px solid rgb(7,17,27,0.1);
	clear:both;
	color:rgb(147,153,159);
	line-height: 24px;
}
.icon-check_circle{
	font-size: 24px;
	margin-right:4px;
}
.on{
	color:#00c850;
}
</style>
