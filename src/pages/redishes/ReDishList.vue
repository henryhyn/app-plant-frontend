<template lang="pug">
  section
    el-row.vskipp(:gutter=16)
      el-col(:span='9')
        shop-banner(:data='shop')
      el-col(:span='3')
        el-card.hui-count(:body-style='{"text-align": "center"}')
          p.huge <strong>{{dishCount}}</strong> 道
          p 推荐菜
    .vskip
      el-button(@click='batchHideHandler' type='danger') 批量下线
      el-button(@click='mergeHandler' type='danger') 在线合并
      .pull-right
        el-input(v-model='keyword' placeholder='推荐菜名字')
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in filtByKeyword')
        dish-card(:data='item' :onClick='handleClick.bind(this, item)')
    el-dialog(title='批量下线' :visible.sync='batchHideVisible')
      ol: li(v-for='item in opList') {{ item.dishName }}
      div(slot='footer')
        el-button(@click='batchHideVisible=false') 取消
        el-button(@click='batchHide' type='primary') 确定
    el-dialog(title='在线合并' :visible.sync='mergeVisible')
      p.gray 请选择主菜品:
      ul.list-unstyled: li(v-for='item in opList')
        el-radio(v-model='masterDishId' :label='item.id') {{ item.dishName }} ({{item.recommendCount}}人推荐 <span v-if='hex.validNumber(item.price)'>￥{{item.price}}</span>)
      div(slot='footer')
        el-button(@click='mergeVisible=false') 取消
        el-button(@click='merge' type='primary') 确定
    el-dialog(title='菜品详情' :visible.sync='splitVisible')
      dish-card(:data='masterDish', :onClick='empty')
      h4 子菜品
      el-row
        el-col.vskipp(:span='8' :key='item.id' v-for='item in childDishList')
          dish-card(:data='item', :onClick='empty')
      div(slot='footer')
        el-button(@click='splitVisible=false') 取消
        el-button(@click='split' type='danger') 拆分
</template>

<script>
  import Hex from '@/utils/Hex'
  import DishCard from '@/pages/dishes/DishCard'
  import ShopBanner from '@/pages/shops/ShopBanner'

  export default {
    data () {
      return {
        userName: localStorage.getItem('nlpMis'),
        shop: {},
        dishCount: 0,
        keyword: null,
        masterDishId: null,
        batchHideVisible: false,
        mergeVisible: false,
        splitVisible: false,
        masterDish: {},
        childDishList: [],
        opList: [],
        list: []
      }
    },

    components: { DishCard, ShopBanner },

    computed: {
      filtByKeyword () {
        if (!Hex.validString(this.keyword)) {
          return this.list
        }
        return this.list.filter(i => i.dishName.indexOf(this.keyword) >= 0)
      }
    },

    methods: {
      empty () {

      },

      handleClick (item) {
        if (!Hex.validNumber(item.childCount) || item.childCount <= 1) {
          return
        }
        this.loadChildDishFromServer(item.id)
        this.masterDish = item
        this.splitVisible = true
      },

      split () {
        const dishDTOs = this.childDishList.filter(i => i.checked).map(i => {
          const { id, shopId, dishName } = i
          return { id, shopId, dishName }
        })
        const { id, shopId, dishName } = this.masterDish
        dishDTOs.push({ id, shopId, dishName })
        const userName = this.userName
        Hex.post('/api/admin/split', {dishDTOs, userName, masterDishId: id, shopId, method: 'split'}, d => {
          this.loadDataFromServer()
          this.splitVisible = false
        })
      },

      loadChildDishFromServer (dishId) {
        const url = '/api/admin/getChildDishByDishId/' + dishId
        Hex.get(url, d => {
          this.childDishList = d.filter(i => i.id !== dishId).map(i => {
            i.checked = false
            return i
          })
        })
      },

      loadDataFromServer () {
        const url = '/api/admin/getDishListByShopId/' + this.$route.params.shopId
        Hex.get(url, d => {
          this.list = d.map(i => {
            i.checked = false
            return i
          })
        })
      },

      loadShopFromServer () {
        const url = '/api/shops/' + this.$route.params.shopId
        Hex.get(url, d => {
          this.shop = d
        })
      },

      loadDishCountFromServer () {
        const url = '/api/admin/getDishCountByShopId/' + this.$route.params.shopId
        Hex.get(url, d => {
          this.dishCount = d
        })
      },

      opListFilter () {
        this.opList = this.list.filter(i => i.checked)
      },

      merge () {
        const dishDTOs = this.opList.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const masterDishId = this.masterDishId
        const userName = this.userName
        Hex.post('/api/admin/merge', {dishDTOs, userName, masterDishId, shopId: this.$route.params.shopId, method: 'merge'}, d => {
          this.loadDataFromServer()
          this.loadDishCountFromServer()
          this.mergeVisible = false
        })
      },

      mergeHandler () {
        this.opListFilter()
        this.mergeVisible = true
      },

      batchHide () {
        const dishDTOs = this.opList.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const userName = this.userName
        Hex.post('/api/admin/batchHideDish', {dishDTOs, userName, method: 'batchHide'}, d => {
          this.loadDataFromServer()
          this.loadDishCountFromServer()
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
      this.loadShopFromServer()
      this.loadDishCountFromServer()
    }
  }
</script>

<style lang="less">
  .hui-count {
    height: 129px;

    .huge {
      font-size: 24px;
      margin: 8px;
    }
  }
</style>
