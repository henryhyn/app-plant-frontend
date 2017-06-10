<template lang="pug">
  section
    h2 {{ plant.name }}

    el-tag(:key='tag' v-for='tag in tags') {{ tag }}

    .hui-content(v-html='plant.content')
</template>

<script>
  import Hex from '@/utils/Hex'

  export default {
    data () {
      return {
        tags: [],
        plant: {}
      }
    },

    created () {
      const url = '/api/plants/' + this.$route.params.id
      Hex.get(url, d => {
        this.tags = (d.tags || '').split(',').filter(Hex.validString)
        this.plant = d
      })
    }
  }
</script>
