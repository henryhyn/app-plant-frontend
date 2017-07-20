<template lang="pug">
  section
    h2 文章列表
    el-row
      el-col.vskip(:key='item.id' v-for='item in list')
        article-card(:data='item')
</template>

<script>
  import Hex from '@/utils/Hex'
  import ArticleCard from '@/pages/articles/ArticleCard'

  export default {
    data () {
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        list: []
      }
    },

    components: { ArticleCard },

    methods: {
      loadDataFromServer () {
        Hex.get('/api/articles', {}, d => {
          const { page, pageSize, total, list } = d.data
          this.total = total
          this.pageSize = pageSize
          this.currentPage = page
          this.list = list
        })
      }
    },

    created () {
      this.loadDataFromServer()
    }
  }
</script>
