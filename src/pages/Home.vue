<template lang="jade">
  section#home
    h2 {{ message }}
</template>

<script>
  export default {
    data () {
      return {
        message: 'Hello Vue!'
      }
    }
  }
</script>

<style lang='less' scoped>
  h2 {
    background-color: red;

    &:before {
      content: '§1.2 '
    }
  }
</style>
