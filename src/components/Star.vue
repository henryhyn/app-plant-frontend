<template lang="pug">
  span(:class="['hui-star', 'rank'+rank]")
</template>

<script>
  export default {
    props: ['rank']
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
