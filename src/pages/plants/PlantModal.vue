<template lang="pug">
  .plant-modal
    span(@click='modalVisible=true')
      slot
    el-dialog(:title='title' :visible.sync='modalVisible')
      el-form(:model='data' :rules='rules' ref='plantModal' label-width='85px' label-suffix=':')
        el-form-item(prop='name' label='植物名称')
          el-input(v-model='data.name')
        el-form-item(prop='avatar' label='头图')
          el-input(v-model='data.avatar')
      div(slot='footer')
        el-button(@click='modalVisible=false') 取消
        el-button(@click='submitForm()' type='primary') 确定
</template>

<script>
  export default {
    data () {
      return {
        modalVisible: false,
        rules: {
          name: [
            {required: true, message: '请输入植物名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ]
        }
      }
    },

    props: ['title', 'data', 'onSubmit'],

    methods: {
      submitForm () {
        this.$refs['plantModal'].validate(valid => {
          if (valid) {
            this.onSubmit(this.data)
            this.modalVisible = false
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .plant-modal {
    display: inline;
  }
</style>
