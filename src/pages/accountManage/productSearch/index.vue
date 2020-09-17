<template>
  <div id="productSearch">
    <div class="form-box2" v-if="activeName === 'exclusive'">
        <span class="fs14">产品代码: </span><el-input v-model="productCode" @change="val => productCode = val"></el-input>
        <button class="search-btn fs14" @click="search()">搜索</button>
    </div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div style="clear: both"></div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通理财产品" name="normal" lazy>
          <normal-page v-if="activeName === 'normal'"></normal-page>
        </el-tab-pane>
        <el-tab-pane label="专属理财产品" name="exclusive" params="11111" lazy>
          <exclusive-page :productCode="productCode" ref="exclusive" v-if="activeName === 'exclusive'"></exclusive-page>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script type="text/javascript">
import normalPage from './component/normalPage'
import exclusivePage from './component/exclusivePage'

export default {
  name: 'productSearch',
  components: { normalPage, exclusivePage },
  data: function () {
    return {
      activeName: 'normal',
      titleData: ['理财服务', '理财产品', '理财产品查询'],
      productCode: '',
      msgs: [
        '用于企业用户查询已委托和已持有理财的明细信息、历史记录信息和购买赎回详情。'
      ]
    }
  },
  mounted: function () {
    if (this.$route.params.productCode) {
      this.productCode = this.$route.params.productCode
    }
    this.activeName = this.$route.params.active || 'normal'
  },
  methods: {
    handleClick () {
      // console.log(4444, this.productCode)
    },
    search () {
      this.$refs.exclusive.getNormalList(this.productCode)
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-box2{
    position: absolute;
    left:60%;
    top: 225px;
    height: 45px;
    line-height: 45px;
    background-color:rgb(253, 242, 243);
    padding-right: 20px;
    z-index: 10;
    .el-input {
			width: 200px;
			margin-right: 10px;
		}
    .search-btn {
			width: 72px;
			height: 26px;
      line-height: 26px;
      background-color: #cc444d;
			background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
			border-radius: 4px;
			color: #fff;
			outline: none;
			border: none;
			cursor: pointer;
		}
		.search-btn:active {
			border: none;
		}
  }
  #productSearch{
    .el-card__body {
      padding: 0;
    }
    .el-tabs__nav{
      height:60px;
      line-height:60px
    }
    .el-tabs__nav-wrap::after{
      height:0
    }
    .el-tabs__nav-wrap{
      background-color:#FDF2F3
    }
    .el-tabs__item:hover,.el-tabs__item.is-active{
      color:#D41618;
    }
    .el-tabs__active-bar{
      background-color:#D41618;
    }
    .el-tabs__nav-scroll{
      padding:0 1.6%;
    }
    .el-tabs__item{
      color:#333;
    }
    .el-tabs__content {
		position: relative;
		overflow: visible;
	}
}
</style>
