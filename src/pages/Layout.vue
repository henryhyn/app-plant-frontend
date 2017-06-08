<template lang="jade">
  #app
    header
    #main-body
      aside
        ul
          li
            router-link(to='/') 首页
          li
            router-link(to='/about') 关于
          li
            router-link(to='/contact') 联系
          li
            router-link(to='/help') 帮助
      article
        router-view
</template>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    > header {
      height: 60px;
    }

    > #main-body {
      flex: 1;
      display: flex;

      > aside {
        width: 200px;
        background-color: gray;
      }

      > article {
        flex: 1;
        background-color: lightgray;

        > section {
          background-color: white;
          margin: 8px;
          padding: 8px;
        }
      }
    }
  }
</style>
