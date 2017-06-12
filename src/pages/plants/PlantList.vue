<template lang="pug">
  section
    h2 植物列表
    plant-modal(title='新增植物' :data='plant' :onSubmit='createHandler')
      el-button(type='primary') 新增植物
    el-row
      el-col.vskipp(:xs='24' :sm='12' :md='8' :lg='6' :key='item.id' v-for='item in list')
        plant-card(:data='item' :onEdit='editHandler')
</template>

<script>
  import Hex from '@/utils/Hex'
  import PlantCard from '@/pages/plants/PlantCard'
  import PlantModal from '@/pages/plants/PlantModal'

  export default {
    data () {
      return {
        plant: {},
        list: []
      }
    },

    components: { PlantCard, PlantModal },

    methods: {
      loadDataFromServer () {
        Hex.get('/api/plants', {page: 1}, d => {
          this.list = d.list
        })
      },

      createHandler (data) {
        Hex.post('/api/plants', data, this.loadDataFromServer.bind(this))
      },

      editHandler (data) {
        Hex.put(`/api/plants/${data.id}`, data, this.loadDataFromServer.bind(this))
      }
    },

    created () {
      this.loadDataFromServer()
    }
  }
</script>
