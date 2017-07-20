<template lang="pug">
  el-card.card(:body-style='{padding: 0}')
    div(@click='onClick')
      img(:src='data.picUrl')
    .card-body
      h4 <el-checkbox v-model='data.checked'></el-checkbox> <el-badge :value='hex.toString(2+data.type,["下","子","正","认"])' class='item'>{{ data.dishName }}</el-badge>
      ul.list-inline.small.gray
        li ID: {{data.id}}
        li {{data.dishType}}
      ul.list-inline.small.gray
        li {{data.recommendCount}}人推荐
        li(v-if='hex.validNumber(data.childCount) && data.childCount>1') {{data.childCount-1}} 子菜品
        li(v-if='hex.validNumber(data.price)') ￥{{data.price}}
      ul.list-inline.small.gray
        li 创建: {{ hex.fromNow(data.addTime) }}
        li 修改: {{ hex.fromNow(data.modifyTime) }}
</template>

<script>
  export default {
    props: ['data', 'onClick']
  }
</script>

<style lang="less" scoped>
  .card {
    width: 250px;

    img {
      width: 250px;
      height: 154px;
    }

    .card-body {
      padding: 10px;
    }
  }

  .operation {
    padding: 3px;
  }
</style>
