<template lang="pug">
  section
    h2 植物列表
    ol: li(v-for='item in list')
      router-link(:to='`/plants/${item.id}`') {{ item.name }}
</template>

<script>
  import Hex from '@/utils/Hex'

  export default {
    data () {
      return {
        list: []
      }
    },

    created () {
      Hex.get('/api/plants', {page: 2}, d => {
        this.list = d.list
      })
    }
  }
</script>
