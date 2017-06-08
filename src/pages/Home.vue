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

    h4 处理用户输入
    input(v-model='msg')
    button(v-on:click='reverseMessage') 逆转消息
    button(@click='reverseMessage') 逆转消息

    h4 组件化应用构建
    card
    ol: todo-item(:todo='item' v-for='item in todos' key='item')

    h4 动态加载数据
    ol: li(v-for='item in list')
      router-link(:to='`/plants/${item.id}`') {{ item.name }}

</template>

<script>
  import Card from '@/components/Card'
  import TodoItem from '@/components/TodoItem'
  import Hex from '@/utils/Hex'

  export default {
    methods: {
      reverseMessage: function () {
        this.msg = this.msg.split('').reverse().join('')
      }
    },
    components: { Card, TodoItem },
    created () {
      Hex.get('/api/plants', {page: 2}, d => {
        this.list = d.list
      })
    },
    data () {
      return {
        list: [],
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
