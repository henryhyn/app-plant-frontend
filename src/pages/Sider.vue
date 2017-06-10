<template lang="pug">
  aside(class='el-menu--dark')
    nav: el-menu(:router='true' :unique-opened='true' theme='dark')
      el-menu-item(index='/') 首页
      el-submenu(index='dishes')
        template(slot='title') 资源管理
        el-menu-item(index='/plants') 植物列表
      el-submenu(index='commons')
        template(slot='title') 常规信息
        el-menu-item(index='/about') 关于
        el-menu-item(index='/contact') 联系
        el-menu-item(index='/help') 帮助
</template>
