<template lang="pug">
  el-card(:body-style='{display: "flex", padding: 0}')
    .shop-avatar: img(:src='data.defaultPic')
    .shop-info
      h4 {{data.shopName}} <small v-if='hex.validString(data.branchName)'>({{data.branchName}})</small>
      ul.list-inline.gray
        li: star(:rank='45')
        li ￥{{data.avgPrice}}
      ul.list-inline.gray
        li {{data.shopId}}
        li {{data.mainRegionName}}
        li {{data.mainCategoryName}}
      p.gray 地址: {{data.address}} <small v-if='hex.validString(data.crossRoad)'>({{data.crossRoad}})</small>
</template>

<script>
  import Star from '@/components/Star'

  export default {
    props: ['data'],

    components: { Star }
  }
</script>

<style lang="less" scoped>
  .shop-avatar {
    width: 172px;
    height: 129px;

    > img {
      width: 172px;
      height: 129px;
    }

    margin-right: 8px;
  }

  .shop-info {
    flex: 1;
  }
</style>
