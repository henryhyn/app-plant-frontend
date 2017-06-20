<template lang="pug">
  el-card.card(:body-style='{padding: 0}')
    div
      img(:src='data.picUrl')
    .card-body
      h4 {{ data.dishName }}
      footer
        el-checkbox(v-model='data.checked')
        span 推荐次数: {{data.recommendCount}}
</template>

<script>
  export default {
    props: ['data']
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
