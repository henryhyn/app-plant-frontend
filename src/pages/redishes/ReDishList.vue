<template lang="pug">
  section
    h2 商户推荐菜
    el-button(@click='batchHideHandler' type='danger') 批量下线
    el-button(@click='mergeHandler' type='danger') 在线合并
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in list')
        dish-card(:data='item')
    el-dialog(title='批量下线' :visible.sync='batchHideVisible')
      ol: li(v-for='todo in op_list') {{ todo.dishName }}
      div(slot='footer')
        el-button(@click='batchHideVisible=false') 取消
        el-button(@click='batchHide' type='primary') 确定
    el-dialog(title='在线合并' :visible.sync='mergeVisible')
      el-radio(v-model='masterDishId' v-for='todo in op_list' key='todo.id' :label='todo.id') {{ todo.dishName }}
      div(slot='footer')
        el-button(@click='mergeVisible=false') 取消
        el-button(@click='merge' type='primary') 确定
</template>

<script>
  import Hex from '@/utils/Hex'
  import DishCard from '@/pages/dishes/DishCard'

  export default {
    data () {
      return {
        userName: localStorage.getItem('nlpMis'),
        masterDishId: null,
        batchHideVisible: false,
        mergeVisible: false,
        op_list: [],
        list: []
      }
    },

    components: { DishCard },

    methods: {
      loadDataFromServer () {
        const url = '/api/admin/getDishListByShopId/' + this.$route.params.shopId
        Hex.get(url, d => {
          this.list = d.map(i => {
            i.checked = false
            return i
          })
        })
      },

      opListFilter () {
        this.op_list = this.list.filter(i => i.checked)
      },

      merge () {
        const dishDTOs = this.op_list.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const masterDishId = this.masterDishId
        const userName = this.userName
        Hex.post('/api/admin/merge', {dishDTOs, userName, masterDishId, shopId: this.$route.params.shopId, method: 'merge'}, d => {
          this.loadDataFromServer()
          this.mergeVisible = false
        })
      },

      mergeHandler () {
        this.opListFilter()
        this.mergeVisible = true
      },

      batchHide () {
        const dishDTOs = this.op_list.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const userName = this.userName
        Hex.post('/api/admin/batchHideDish', {dishDTOs, userName, method: 'batchHide'}, d => {
          this.loadDataFromServer()
          this.batchHideVisible = false
        })
      },

      batchHideHandler () {
        this.opListFilter()
        this.batchHideVisible = true
      }
    },

    created () {
      this.loadDataFromServer()
    }
  }
</script>
