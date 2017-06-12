<template lang="pug">
  el-card.card(:body-style='{padding: 0}')
    router-link(:to='`/plants/${data.id}`')
      img(:src='data.avatar')
    .card-body
      h4 {{ data.name }}
      footer
        time.small.gray {{ hex.fromNow(data.createTime) }}
        plant-modal(title='编辑植物' :data='data' :onSubmit='onEdit')
          el-button.operation(type='text') 编辑
</template>

<script>
  import PlantModal from '@/pages/plants/PlantModal'

  export default {
    props: ['data', 'onEdit'],

    components: { PlantModal }
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
