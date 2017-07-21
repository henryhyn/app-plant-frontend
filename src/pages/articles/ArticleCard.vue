<template lang="pug">
  el-card
    div(slot='header') {{data.title}}
    div(v-html='data.htmlContent')
    router-link(:to='`/articles/${data.id}/edit`') 编辑
</template>

<script>
  export default {
    props: ['data', 'onClick']
  }
</script>
