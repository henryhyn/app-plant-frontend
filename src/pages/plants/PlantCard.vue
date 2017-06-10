<template lang="pug">
  el-card.card(:body-style='{padding: 0}')
    img(:src='data.avatar')
    .card-body
      router-link(:to='`/plants/${data.id}`') {{ data.name }}
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style lang="less" scoped>
  .card {
    img {
      width: 281px;
      height: 173px;
    }

    .card-body {
      padding: 16px;
    }
  }
</style>
