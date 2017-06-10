<template lang="pug">
  #app
    header
      #logo: img(src='../assets/logo.png')
      #project-name 项目名称
    #main-body
      sider
      article: transition(name='fade' mode='out-in')
        router-view
</template>

<script>
  import Sider from '@/pages/Sider'

  export default {
    components: { Sider }
  }
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    > header {
      height: 60px;
    }

    > #main-body {
      flex: 1;
      display: flex;

      > aside {
        width: 200px;
      }

      > article {
        flex: 1;
        background-color: lightgray;
        overflow-y: scroll;

        > section {
          background-color: white;
          margin: 8px;
          padding: 8px;
        }
      }
    }
  }

  header {
    display: flex;
    > #logo {
      height: 60px;
      display: inline-block;
      margin-right: 8px;
      > img {
        height: 60px;
      }
    }

    > #project-name {
      height: 60px;
      line-height: 60px;
      display: inline-block;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
