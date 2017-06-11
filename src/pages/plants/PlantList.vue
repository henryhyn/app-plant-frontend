<template lang="pug">
  section
    h2 植物列表
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in list')
        plant-card(:data='item')
</template>

<script>
  import Hex from '@/utils/Hex'
  import PlantCard from '@/pages/plants/PlantCard'

  export default {
    data () {
      return {
        list: []
      }
    },

    components: { PlantCard },

    created () {
      Hex.get('/api/plants', {page: 1}, d => {
        this.list = d.list
      })
    }
  }
</script>
