<template lang="pug">
  section
    h2 植物列表
    plant-modal(title='新增植物' :data='plant' :onSubmit='createHandler')
      el-button(type='primary') 新增植物
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in list')
        plant-card(:data='item' :onEdit='editHandler' :onDelete='deleteHandler')
    el-pagination(:total='total' :page-size='pageSize' @current-change='handleCurrentChange' @size-change='handleSizeChange' layout='total, sizes, prev, pager, next, jumper')
</template>

<script>
  import Hex from '@/utils/Hex'
  import PlantCard from '@/pages/plants/PlantCard'
  import PlantModal from '@/pages/plants/PlantModal'

  export default {
    data () {
      return {
        plant: {},
        total: 0,
        pageSize: 10,
        currentPage: 1,
        list: []
      }
    },

    components: { PlantCard, PlantModal },

    methods: {
      loadDataFromServer () {
        Hex.get('/api/plants', {page: this.currentPage, pageSize: this.pageSize}, d => {
          this.total = d.total
          this.pageSize = d.pageSize
          this.currentPage = d.pageNum
          this.list = d.list
        })
      },

      handleCurrentChange (currentPage) {
        this.currentPage = currentPage
        this.loadDataFromServer()
      },

      handleSizeChange (size) {
        this.pageSize = size
        this.loadDataFromServer()
      },

      createHandler (data) {
        Hex.post('/api/plants', data, this.loadDataFromServer.bind(this))
      },

      editHandler (data) {
        Hex.put(`/api/plants/${data.id}`, data, this.loadDataFromServer.bind(this))
      },

      deleteHandler (id) {
        Hex.delete(`/api/plants/${id}`, this.loadDataFromServer.bind(this))
      }
    },

    created () {
      this.loadDataFromServer()
    }
  }
</script>
