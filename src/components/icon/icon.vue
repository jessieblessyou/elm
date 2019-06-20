<template>
  <span :class="[icon+size,ok[pickup]+size]"></span>
</template>

<script>
export default {
  name: 'icons',
  data () {
    return {
      ok: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      icon: 'icon'
    }
  },
  props: {
    pickup: Number,
    size: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon1{
display:inline-block;
width:12px;
height:12px;
background-size:12px 12px;
background-repeat:no-repeat;
vertical-align:top;
}
.icon2{
  display:inline-block;
  width:16px;
  height:16px;
  background-size:16px 16px;
  background-repeat:no-repeat;
  vertical-align:top;
}
.decrease1{
  @include bg-image('decrease_1');
}
.guarantee1{
  @include bg-image('guarantee_1');
}
.invoice1{
  @include bg-image('invoice_1');
}
.discount1{
  @include bg-image('discount_1');
}
.special1{
  @include bg-image('special_1');
}
.decrease2{
  @include bg-image('decrease_2');
}
.guarantee2{
  @include bg-image('guarantee_2');
}
.invoice2{
  @include bg-image('invoice_2');
}
.discount2{
  @include bg-image('discount_2');
}
.special2{
  @include bg-image('special_2');
}
</style>
