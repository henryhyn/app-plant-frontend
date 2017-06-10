<template lang="pug">
  section
    h2 {{ plant.name }}

    div(v-html='plant.content')
</template>

<script>
  import Hex from '@/utils/Hex'

  export default {
    data () {
      return {
        plant: {}
      }
    },

    created () {
      const url = '/api/plants/' + this.$route.params.id
      Hex.get(url, d => {
        this.plant = d
      })
    }
  }
</script>
