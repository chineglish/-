<template>
  <div id="myFinancial">
    <div class="form-box1" v-if="activeName === 'history'">
      <el-date-picker
        v-model="formModel.startDate"
        type="date"
        placeholder="起始日期">
      </el-date-picker>
      -
      <el-date-picker
        v-model="formModel.endDate"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
      <button class="search-btn fs14" @click="search()">搜索</button>
      <!-- <el-button type="primary" size="mini" class="search-btn fs14" @click="search">搜索</el-button> -->
    </div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已持有" name="financialPosition" lazy>
          <financial-position v-if="activeName === 'financialPosition'" :isFromPrdSearch="isFromPrdSearch"></financial-position>
        </el-tab-pane>
        <el-tab-pane label="已委托" name="agencyTransaction" lazy>
          <agency-trans v-if="activeName === 'agencyTransaction'" :isFromPrdSearch="isFromPrdSearch"></agency-trans>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="history" lazy>
          <history v-if="activeName === 'history'" :formModel="formModel" :isFromPrdSearch="isFromPrdSearch" ref="history"></history>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <m-btn :btnData="btnData" @click="back"></m-btn>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script type="text/javascript">
import financialPosition from './components/financialPosition.vue' // 已持有
import agencyTrans from './components/agencyTrans.vue' // 已委托
import History from './components/history.vue' // 历史记录

export default {
  name: 'myFinancial',
  components: { financialPosition, agencyTrans, History },
  data: function () {
    return {
      formModel: {
        startDate: '',
        endDate: ''
      },
      titleData: ['账户管理', '我的理财'],
      msgs: ['1.用于企业用户查询已委托和已持有理财的明细信息、历史记录信息和购买赎回详情。'],
      btnData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'back'
        }
      ],
      activeName: 'financialPosition',
      isFromPrdSearch: false
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    } else {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.formModel.startDate = start
      this.formModel.endDate = end
    }
    this.activeName = this.$route.params.activeName || 'financialPosition'
    if (this.$route.params.isFromPrdSearch === true || this.$route.params.isFromPrdSearch === 'true') {
      this.isFromPrdSearch = true
      this.titleData[0] = '理财服务'
      this.titleData[1] = '理财产品'
      this.titleData[2] = '我的理财查询'
    }
  },
  methods: {
    back () {
      this.$router.push('/index')
    },
    handleClick () {
    //   console.log(99999999, this.formModel)
    },
    search () {
      // console.log(6666666666, this.formModel)
      this.$refs.history.getHistoryList(this.formModel)
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-box1{
    position: absolute;
    left:50%;
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
  #myFinancial{
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
