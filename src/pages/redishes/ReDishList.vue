<template lang="pug">
  section
    el-row.vskipp(:gutter=16)
      el-col(:span='9')
        shop-banner(:data='shop')
      el-col(:span='3')
        el-card.hui-count(:body-style='{"text-align": "center"}')
          p.huge <strong>{{dishCount}}</strong> 道
          p 推荐菜
      el-col(:span='12')
        .vskip
          el-button(@click='batchHideVisible=true' type='primary' :disabled='!hasChecked || hasNegtiveChecked') 批量下线
          el-button(@click='mergeVisible=true' type='primary' :disabled='!hasChecked || hasNegtiveChecked') 在线合并
          el-button(@click='batchVerifyVisible=true' type='danger' :disabled='!hasChecked') 恢复并认证
          el-button(@click='batchDishNameVerifyVisible=true' type='danger') 批量认证
          el-button(@click='batchApplyVisible=true' type='danger' :disabled='!hasVerify') 连锁应用
        ul.list-inline
          li(v-for='item in filtByChecked') <el-checkbox v-model='item.checked'/> {{ item.dishName }} <small class='gray'>({{ hex.toString(2+item.type,["下线","子菜","在线","认证"]) }})</small>
    el-row.vskipp(:gutter=16)
      el-col(:span='6')
        el-input(v-model='keyword' placeholder='推荐菜名字')
      el-col(:span='18')
        el-button-group.hskip
          el-button(:type="dishType===100 ? 'primary' : 'default'" @click='dishType=100') 全部
          el-button(:type="dishType===0 ? 'primary' : 'default'" @click='dishType=0') 在线
          el-button(:type="dishType===-1 ? 'primary' : 'default'" @click='dishType=-1') 子菜
          el-button(:type="dishType===-2 ? 'primary' : 'default'" @click='dishType=-2') 下线
          el-button(:type="dishType===1 ? 'primary' : 'default'" @click='dishType=1') 认证
        el-button-group
          el-button(@click='reset') 重置刷新
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in filtByKeyword')
        dish-card(:data='item' :onClick='handleClick.bind(this, item)')
    el-dialog(title='批量下线' :visible.sync='batchHideVisible')
      ol: li(v-for='item in filtByChecked') {{ item.dishName }}
      div(slot='footer')
        el-button(@click='batchHideVisible=false') 取消
        el-button(@click='batchHide' type='primary') 确定
    el-dialog(title='菜品认证' :visible.sync='batchVerifyVisible')
      ol: li(v-for='item in filtByChecked') {{ item.dishName }}
      div(slot='footer')
        el-button(@click='batchVerifyVisible=false') 取消
        el-button(@click='batchVerify' type='primary') 确定
    el-dialog(title='在线合并' :visible.sync='mergeVisible')
      p.gray 请选择主菜品:
      ul.list-unstyled: li(v-for='item in filtByChecked')
        el-radio(v-model='masterDishId' :label='item.id') {{ item.dishName }} ({{item.recommendCount}}人推荐 <span v-if='hex.validNumber(item.price)'>￥{{item.price}}</span>)
      div(slot='footer')
        el-button(@click='mergeVisible=false') 取消
        el-button(@click='merge' type='primary') 确定
    el-dialog(title='菜名批量认证' :visible.sync='batchDishNameVerifyVisible')
      el-input(type='textarea' :rows='5' v-model='dishNames' placeholder='请输入待认证的菜名 (多个菜名用逗号或换行分隔)')
      ol: li(v-for='item in filtByDishNames') {{ item.dishName }} <small class='gray'>({{ hex.toString(2+item.type,["下线","子菜","在线","认证"]) }})</small>
      div(slot='footer')
        el-button(@click='batchDishNameVerifyVisible=false') 取消
        el-button(@click='batchDishNameVerify' type='primary') 确定
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
        dishNames: null,
        dishType: 0,
        masterDishId: null,
        batchHideVisible: false,
        batchVerifyVisible: false,
        batchDishNameVerifyVisible: false,
        batchApplyVisible: false,
        mergeVisible: false,
        splitVisible: false,
        masterDish: {},
        childDishList: [],
        list: []
      }
    },

    components: { DishCard, ShopBanner },

    computed: {
      filtByKeyword () {
        const rs = this.list.filter(i => this.dishType === 100 || (this.dishType === 0 && i.type >= this.dishType) || i.type === this.dishType)
        if (Hex.validString(this.keyword)) {
          const res = rs.filter(i => i.dishName.indexOf(this.keyword) >= 0)
          this.dishCount = res.length
          return res
        }
        this.dishCount = rs.length
        return rs
      },

      filtByDishNames () {
        if (!Hex.validString(this.dishNames)) {
          return []
        }

        const dishNameSet = this.dishNames.replace(/[，、；;\t\r\n]/g, ',').split(',').map(i => i.trim()).filter(i => i.length > 0)
        return this.list.filter(i => dishNameSet.indexOf(i.dishName) >= 0)
      },

      hasVerify () {
        return this.list.filter(i => i.type === 1).length > 0
      },

      filtByChecked () {
        return this.list.filter(i => i.checked)
      },

      hasChecked () {
        return this.filtByChecked.length > 0
      },

      hasNegtiveChecked () {
        return this.filtByChecked.filter(i => i.type < 0).length > 0
      }
    },

    watch: {
      '$route': function (val) {
        this.loadDataFromServer()
        this.loadShopFromServer()
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

      reset () {
        this.keyword = null
        this.dishType = 0
        this.loadDataFromServer()
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

      merge () {
        const dishDTOs = this.filtByChecked.map(i => {
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

      batchHide () {
        const dishDTOs = this.filtByChecked.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const userName = this.userName
        Hex.post('/api/admin/batchHideDish', {dishDTOs, userName, method: 'batchHide'}, d => {
          this.loadDataFromServer()
          this.batchHideVisible = false
        })
      },

      batchDishNameVerify () {
        const dishDTOs = this.filtByDishNames.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const userName = this.userName
        Hex.post('/api/admin/batchVerifyDish', {shopId: this.$route.params.shopId, dishDTOs, userName, method: 'batchVerify'}, d => {
          this.loadDataFromServer()
          this.batchDishNameVerifyVisible = false
        })
      },

      batchVerify () {
        const dishDTOs = this.filtByChecked.map(i => {
          const { id, dishName } = i
          return { id, dishName }
        })
        const userName = this.userName
        Hex.post('/api/admin/batchVerifyDish', {shopId: this.$route.params.shopId, dishDTOs, userName, method: 'batchVerify'}, d => {
          this.loadDataFromServer()
          this.batchVerifyVisible = false
        })
      }
    },

    created () {
      this.loadDataFromServer()
      this.loadShopFromServer()
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
