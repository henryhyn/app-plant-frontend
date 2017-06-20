<template lang="pug">
  aside.el-menu--dark
    nav: el-menu(:router='true' :unique-opened='true' theme='dark')
      el-menu-item(index='/') <i class='el-icon-date'></i> 首页
      el-submenu(index='dishes')
        template(slot='title') <i class='el-icon-menu'></i> 推荐菜
        el-menu-item(index='/redishes') <i class='el-icon-message'></i> 商户推荐菜
      el-submenu(index='commons')
        template(slot='title') <i class='el-icon-setting'></i> 常规信息
        el-menu-item(index='/about') <i class='el-icon-message'></i> 关于
        el-menu-item(index='/contact') <i class='el-icon-message'></i> 联系
        el-menu-item(index='/help') <i class='el-icon-message'></i> 帮助
</template>
