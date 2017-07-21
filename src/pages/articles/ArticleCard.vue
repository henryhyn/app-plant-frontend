<template lang="pug">
  el-card
    div(slot='header') {{data.title}}
    div(v-html='data.htmlContent')
    ul.list-inline
      li(v-if='hex.validAny(data.createTime)') 创建: {{ data.createTime | format }}
      li(v-if='hex.validAny(data.updateTime)') 更新: {{ data.updateTime | fromNow }}
    router-link(:to='`/articles/${data.id}/edit`') 编辑
</template>

<script>
  export default {
    props: ['data', 'onClick']
  }
</script>
