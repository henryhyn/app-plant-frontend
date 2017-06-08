<template lang="jade">
  section
    h2 首页

    h4 文中插值
    p 欢迎 {{ msg }}!
    p
      | 也可以这样绑定
      span(v-text='msg')
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Henry',
        message: 'Hello Vue!'
      }
    }
  }
</script>
