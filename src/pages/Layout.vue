<template lang="pug">
  #app
    header
      #logo: img(src='../assets/logo.png')
      #project-name 丰富化信息
      .fill
      #user-name {{ userName }}
      a#logout(href='/logout') 登出
    #main-body
      sider
      article: transition(name='fade' mode='out-in')
        router-view
</template>

<script>
  import Sider from '@/pages/Sider'

  export default {
    data () {
      return {
        userName: localStorage.getItem('nlpName')
      }
    },

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

    .fill {
      flex: 1;
    }

    > #project-name, > #user-name, > #logout {
      margin-left: 16px;
      margin-right: 16px;
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
