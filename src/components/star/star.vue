<template>
  <div>
      <span :class="[data,newSize]" v-for="data in newArr" :key="data.id"></span>
  </div>
</template>

<script>
export default {
  name: 'appSeller',
  data () {
    return {
      arr: ['off', 'off', 'off', 'off', 'off']
    }
  },
  computed: {
    newArr: function () {
      var starCount = parseInt(this.score)
      var freshArr = ['off', 'off', 'off', 'off', 'off']
      for (var i = 0; i < starCount; i++) {
        this.$set(freshArr, i, 'on')
      }
      if (this.score - starCount > 0.4) {
        this.$set(freshArr, starCount, 'half')
      }
      return freshArr
    },
    newSize: function () {
      return 'star-' + this.size
    }
  },
  props: {
    size: Number,
    score: Number
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div{
  line-height:0;
}
span{
  display:inline-block;
}
span:last-child{
  margin-right:0;
}
.star-24{
  background-size:10px 10px;
  width:10px;
  height:10px;
  margin-right:3px;
}
.star-36{
  background-size:15px 15px;
  width:15px;
  height:15px;
  margin-right:6px;
}
.star-48{
  background-size:22px 22px;
  width:22px;
  height:22px;
  margin-right:22px;
}
.on.star-24{
 @include bg-image('star24_on');
}
.off.star-24{
 @include bg-image('star24_off');
}
.half.star-24{
 @include bg-image('star24_half');
}
.on.star-36{
 @include bg-image('star36_on');
}
.off.star-36{
 @include bg-image('star36_off');
}
.half.star-24{
 @include bg-image('star24_half');
}
.on.star-48{
 @include bg-image('star48_on');
}
.off.star-48{
 @include bg-image('star48_off');
}
.half.star-48{
 @include bg-image('star48_half');
}
</style>
