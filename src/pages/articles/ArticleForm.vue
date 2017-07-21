<template lang="pug">
  section
    h2 编辑文章
    el-button(@click='save') 保存
    .vskip
    el-input(v-model='title')
    .vskip
    .hui-md-editor
      textarea.hui-md-input(:value='input' @input='update')
      .hui-md-output(v-html='compiledMarkdown')
</template>

<script>
  import _ from 'lodash'
  import marked from 'marked'
  import Hex from '@/utils/Hex'

  export default {
    data () {
      return {
        title: '',
        input: ''
      }
    },

    created () {
      if (Hex.validNumber(this.$route.params.articleId)) {
        this.loadDataFromServer()
      }
    },

    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },

    methods: {
      loadDataFromServer () {
        const url = '/api/articles/' + this.$route.params.articleId
        Hex.get(url, d => {
          this.title = d.data.title || ''
          this.input = d.data.mdContent || ''
        })
      },

      save () {
        const title = this.title
        const mdContent = this.input
        const htmlContent = this.compiledMarkdown
        const id = this.$route.params.articleId
        const params = {title, mdContent, htmlContent}
        if (Hex.validNumber(id)) {
          const url = '/api/articles/' + id
          Hex.put(url, params, d => {
            window.history.go(-1)
          })
        } else {
          const url = '/api/articles'
          Hex.post(url, params, d => {
            window.history.go(-1)
          })
        }
      },

      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }
</script>

<style lang="less" scoped>
  .hui-md-editor {
    display: flex;
    height: 500px;

    textarea.hui-md-input {
      flex: 1;
      margin-right: 16px;
      border: none;
      resize: none;
      outline: none;
    }

    .hui-md-output {
      flex: 1;
      background-color: lightgrey;
      padding: 8px;
      overflow-y: scroll;
    }
  }
</style>
