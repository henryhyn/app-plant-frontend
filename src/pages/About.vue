<template lang="pug">
  section
    h2 关于我们
    p 我们是一个富有创造力的团队!

    h3 Button 按钮
    h4 基础用法
    el-button 默认按钮
    el-button(type='primary') 主要按钮
    el-button(type='text') 文字按钮

    h4 禁用状态
    el-button(:disabled='true') 默认按钮
    el-button(:disabled='true' type='primary') 主要按钮
    el-button(:disabled='true' type='text') 文字按钮

    h4 有颜色倾向
    el-button(type='success') 成功按钮
    el-button(type='warning') 警告按钮
    el-button(type='danger') 危险按钮
    el-button(type='info') 信息按钮

    h4 hover 显示颜色
    el-button(:plain='true' type='success') 成功按钮
    el-button(:plain='true' type='warning') 警告按钮
    el-button(:plain='true' type='danger') 危险按钮
    el-button(:plain='true' type='info') 信息按钮

    h4 图标按钮
    el-button(type='primary' icon='edit')
    el-button(type='primary' icon='share')
    el-button(type='primary' icon='delete')
    el-button(type='primary' icon='search') 搜索

    h4 按钮组
    el-button-group
      el-button(type='primary' icon='arrow-left') 上一页
      el-button(type='primary') 上一页 <i class="el-icon-arrow-right el-icon--right"></i>

    el-button-group
      el-button(type='primary' icon='edit')
      el-button(type='primary' icon='share')
      el-button(type='primary' icon='delete')
</template>
