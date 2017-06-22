<template lang="pug">
  section
    h4 主菜品
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in filtByMaster')
        dish-card(:data='item')
    .vskip
      el-button(@click='splitHandler' type='danger') 在线拆分
    h4 子菜品
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in filtByChildren')
        dish-card(:data='item')
    el-dialog(title='在线拆分' :visible.sync='splitVisible')
      ol: li(v-for='item in op_list') {{ item.dishName }}
      div(slot='footer')
        el-button(@click='splitVisible=false') 取消
        el-button(@click='split' type='primary') 确定
</template>

<script>
  import Hex from '@/utils/Hex'
  import DishCard from '@/pages/dishes/DishCard'

  export default {
    data () {
      return {
        userName: localStorage.getItem('nlpMis'),
        splitVisible: false,
        op_list: [],
        list: []
      }
    },

    components: { DishCard },

    computed: {
      filtByMaster () {
        return this.list.filter(i => i.id + '' === this.$route.params.dishId)
      },

      filtByChildren () {
        return this.list.filter(i => i.id + '' !== this.$route.params.dishId)
      }
    },

    methods: {
      opListFilter () {
        this.op_list = this.list.filter(i => i.checked)
      },

      loadDataFromServer () {
        const url = '/api/admin/getChildDishByDishId/' + this.$route.params.dishId
        Hex.get(url, d => {
          this.list = d.map(i => {
            i.checked = false
            return i
          })
        })
      },

      split () {
        const dishDTOs = this.list.filter(i => i.checked || i.id + '' === this.$route.params.dishId).map(i => {
          const { id, shopId, dishName } = i
          return { id, shopId, dishName }
        })
        const masterDishId = this.$route.params.dishId
        const userName = this.userName
        Hex.post('/api/admin/split', {dishDTOs, userName, masterDishId, shopId: dishDTOs[0].shopId, method: 'split'}, d => {
          this.loadDataFromServer()
          this.splitVisible = false
        })
      },

      splitHandler () {
        this.opListFilter()
        this.splitVisible = true
      }
    },

    created () {
      this.loadDataFromServer()
    }
  }
</script>
