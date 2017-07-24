<template lang="pug">
  span(:class='cls')
</template>

<script>
  export default {
    props: ['rank'],

    computed: {
      cls: function () {
        return {
          'hui-star': true,
          'rank0': this.rank === 0,
          'rank10': this.rank === 10,
          'rank20': this.rank === 20,
          'rank30': this.rank === 30,
          'rank35': this.rank === 35,
          'rank40': this.rank === 40,
          'rank45': this.rank === 45,
          'rank50': this.rank === 50
        }
      }
    }
  }
</script>

<style lang="less">
.hui-star {
  background: url("./star.png") no-repeat;
  background-size: 86px auto;
  display: inline-block;
  width: 66px;
  height: 12px;
  vertical-align: middle;
  &.rank0 {
    background-position: 0px -119px;
  }
  &.rank10 {
    background-position: 0px -102px;
  }
  &.rank20 {
    background-position: 0px -85px;
  }
  &.rank30 {
    background-position: 0px -68px;
  }
  &.rank35 {
    background-position: 0px -51px;
  }
  &.rank40 {
    background-position: 0px -34px;
  }
  &.rank45 {
    background-position: 0px -17px;
  }
  &.rank50 {
    background-position: 0px 0px;
  }
}
</style>
