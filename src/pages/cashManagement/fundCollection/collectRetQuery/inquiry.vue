<template>
  <div class="assets-debt">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @inquire="inquire"
      @reset="reset"
      @selectAcc="selectAcc"
    ></m-new-form>
    <div class="search-result" v-if="showResult">
      <div class="search-result-title fs20">
          <span>查询结果</span>
      </div>
      <div class="search-result-content">
        <el-tree
          :data="tableDate"
          :props="defaultProps"
          node-key="acNo"
          :expand-on-click-node="false"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </div>
    <m-hint-box :msgs="msgs" />
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { gatherMode_entity, currency_type_entity, gather_entity } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'collectRetQuery',
  data () {
    return {
      formModel: {
        topAcc: '',
        currency: '',
        topAccName: ''
      },
      formConfigJson: {
        rules: {
          accountNo: [{ required: false, message: '', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集关系查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow', key: 'acNo' },
                'key': 'topAcc',
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (key, value) => currency_type_entity[value]
              },
              {
                'disabled': false,
                'label': '账户名',
                'type': 'text',
                'key': 'topAccName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      payerAccNoList: [], // 付款账户信息列表
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集关系查询'],
      msgs: ['在查询结果中,点击账户查看归集详情'],
      showResult: false,
      tableDate: [],
      defaultProps: {
        children: 'subLevel',
        label: 'acNameValue'
      },
      defaultExpandedKeys: []
    }
  },
  methods: {
    handleNodeClick (data, node, com) {
      if (data.acNoLevel === '1') {
        this.$router.push({
          name: 'topAccountProperties',
          params: data
        })
      } else {
        this.$router.push({
          name: 'collectRetQueryDetail',
          params: data
        })
      }
    },
    inquire (data) {
      const params = {
        acNo: data.topAcc,
        currencyCode: data.currency
      }
      this.tableDate = []
      this.defaultExpandedKeys = []
      httpPost('/eweb-cash.CollectRelationQry.do', params).then(res => {
        this.tableDate.push(res.LevelTree)

        // 归集方式
        this.tableDate.forEach(item => {
          item.acNameValue = `${item.acNo} - ${currency_type_entity[item.currencyCode]} - ${item.acName} ${item.gatherType ? ('【' + gather_entity[item.gatherType] + '】') : ''}`
          item.gatherModeVal = gatherMode_entity[item.gatherMode]
          item.currencyCodeVal = currency_type_entity[item.currencyCode]
          this.defaultExpandedKeys.push(item.acNo)
          if (item.subLevel) {
            this.handleData(item.subLevel)
            item.subLevel.forEach(obj => {
              this.defaultExpandedKeys.push(obj.acNo)
            })
          }
        })
        this.showResult = true
      })
    },
    handleData (arr) {
      if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array') {
        arr.forEach(item => {
          item.acNameValue = `${item.acNo} - ${currency_type_entity[item.currencyCode]} - ${item.acName}【${gather_entity[item.gatherType]}】`
          item.subLevel && this.handleData(item.subLevel)
        })
      }
    },
    getDetail (index) {
      this.$router.push({
        name: 'collectRetQueryDetail',
        params: this.tableDate[index]
      })
    },
    reset (res) {
      this.showResult = false
      res.topAcc = this.payerAccNoList[0].acNo
      res.topAccName = this.payerAccNoList[0].acName
      res.currency = this.payerAccNoList[0].currency
    },
    /**
     * 显示选择账户的余额与账户名称
     */
    selectAcc (data) {
      const currentPayerAccNo = this.payerAccNoList.find(item => data.topAcc === item.acNo)
      // 回显账户名
      this.$set(this.formModel, 'topAcc', currentPayerAccNo.acNo)
      this.$set(this.formModel, 'topAccName', currentPayerAccNo.acName)
      this.$set(this.formModel, 'currency', currentPayerAccNo.currency)
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.$set(this.formModel, 'topAcc', this.payerAccNoList[0].acNo)
        this.selectAcc(this.formModel)
      })
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style lang="scss" scoped>
	.search-result{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		margin: 20px 0px;
		.search-result-title{
			padding-left: 30px;
			line-height: 60px;
			font-weight: bold;
			color: #333333;
			span{
				margin-left: 10px;
				padding-left: 5px;
				border-left: #d41618 8px solid;
			}
		}
		.search-result-content{
			margin-left: 50px;
			min-height: 300px;
		}
	}
  .accColor{
    color:blue;
  }
</style>

<style lang="scss">
	.el-tree-node__label {
		font-size: 16px;
		color: #333;
	}
</style>
