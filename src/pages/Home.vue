<template lang="jade">
  section
    h2 首页

    h4 文本插值
    p 欢迎 {{ msg }}!
    p 也可以这样绑定 <span v-text='msg'/>

    h4 绑定 DOM 元素属性
    p(v-bind:title='message') 鼠标悬停几秒钟查看此处动态绑定的提示信息！
    p(:title='message') 鼠标悬停几秒钟查看此处动态绑定的提示信息！

    h4 条件
    p(v-if='seen') 现在你看到我了
    p(v-show='!seen') 现在你看到我了

    h4 循环
    ol: li(v-for='todo in todos') {{ todo.text }}
</template>

<script>
  export default {
    data () {
      return {
        seen: true,
        todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ],
        msg: 'Henry',
        message: '页面加载于 ' + new Date()
      }
    }
  }
</script>
