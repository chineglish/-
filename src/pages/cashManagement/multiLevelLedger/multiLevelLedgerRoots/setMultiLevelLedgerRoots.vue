<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @changeNum="changeNum"
      @submit="inquire"
      @reset="reset"
    ></m-new-form>
    <div v-if="showResult">
      <check-tree :data="treeList" :default-show="true" @change="getCheckedNodes" :disabled="false"></check-tree>
      <m-btn :btnData="btnData1" @click="commit"></m-btn>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type_entity } from '@/assets/js/entity'
import util from '@/libs/util'
import checkTree from './common/checkTree'

export default {
  name: 'setMultiLevelLedgerRoots',
  components: {
    checkTree
  },
  data: function () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿权限设置'],
      formConfigJson: {
        rules: {
          acNo: [{ required: true, message: '账户', trigger: 'change' }],
          userId: [{ required: true, message: '用户', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '多级账簿权限设置',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                'trans': { 'value': 'showAcNo', 'key': 'acNo' },
                'changeEventName': 'changeNum',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => currency_type_entity[value]
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'accountName'
              },
              {
                'disabled': false,
                'label': '用户',
                'type': 'input',
                filterOptions: true,
                'options': [],
                'trans': { 'value': 'userShow', 'key': 'userId' },
                'key': 'userId'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      formModel: {
        acNo: '',
        currencyCode: '',
        userId: '',
        accountName: ''
      },
      showResult: false,
      treeList: [],
      defaultProps: {
        children: 'subLevel',
        label: 'showAsAcName'
      },
      btnData1: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'commit' }
      ],
      checkedList: []
    }
  },
  methods: {
    getCheckedNodes (data) {
      this.checkedList = data
    },
    // 确定
    commit () {
      const params = {
        acNo: this.formModel.acNo,
        currencyCode: this.formModel.currencyCode,
        userNo: this.formModel.userId,
        list: this.checkedList
      }
      httpPost('/eweb-cash.MultistageBookAuthSetConfirm.do', params).then(res => {
        this.$router.push({
          name: 'setMultLeveLedgerRootsConfirm',
          params: {
            formModel: this.formModel,
            treeList: this.treeList,
            list: this.checkedList,
            _Data2Sign: res._Data2Sign,
            _dataMapKey: res._dataMapKey,
            _authenticateType: res._authenticateType
          }
        })
      })
    },
    OperatorListQuery () {
      httpPost('/eweb-operator.OperatorListQuery.do').then(res => {
        res.list.forEach(item => {
          if (item.userState === 'N') {
            item.userShow = `${item.userId} | ${item.userName}`
            this.formConfigJson.formItems[0].group[3].options.push(item)
          }
        })
        // this.formModel.userId = res.list[0].userId
      })
    },
    actListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.actList = res.acList
        this.actList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.actList
        this.formModel.acNo = this.actList[0].acNo
        this.changeNum(this.formModel, res.acList[0])
      })
    },
    inquire (res) {
      // 发送接口重新查询
      let params = {
        acNo: res.acNo,
        currencyCode: res.currencyCode,
        userNo: res.userId
      }
      httpPost('/eweb-cash.MultistageBookInfoQry.do', params).then(res => {
        this.showResult = true
        this.changeTreeList(res.levelList)
        this.treeList = res.levelList
      })
    },
    changeTreeList (arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(item => {
          item.showAsAcName = `${item.asAcNo} - ${item.asAcName}`
          if (item.subLevel && item.subLevel.length > 0) {
            this.changeTreeList(item.subLevel)
          }
        })
      }
    },
    reset (res) {
      this.showResult = false
      this.formModel = res
      this.actListQry()
      res.userId = this.formConfigJson.formItems[0].group[3].options[0].userId
    },
    changeNum (res, obj) {
      res.currencyCode = obj.currencyCode
      res.accountName = obj.acName
    }
  },
  created () {
    this.actListQry()
    this.OperatorListQuery()
  }
}
</script>
<style scoped>
  .main{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
    margin-top: 20px;
  }
  .main >>> .cell{
    text-align: center;
  }
  .title{
    background: #ffffff;
    color: #333333;
    line-height: 60px;
    padding-left: 30px;
    margin: 0;
  }
  .title-separate{
    background: #D41618;
    width: 6px;
    height: 28px;
  }
	.check-tree {
		padding: 20px;
	}
</style>
