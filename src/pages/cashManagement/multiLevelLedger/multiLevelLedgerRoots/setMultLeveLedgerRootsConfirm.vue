<template>
  <div class="setMultLeveLedgerRootsConfirm">
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @commit="commit"
      @goBack="goBack"
    >
      <check-tree :data="treeList" :default-show="true" :disabled="true" slot="power"></check-tree>
    </m-new-form>
  </div>

</template>
<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type_entity } from '@/assets/js/entity'
import checkTree from './common/checkTree'

export default {
  name: 'setMultLeveLedgerRootsConfirm',
  components: {
    checkTree
  },
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿权限设置确认'],
      btnData1: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'commit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }
      ],
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            title: '多级账簿权限设置',
            showSeparate: true,
            group: [
              {
                'label': '账户',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => currency_type_entity[value]
              },
              {
                'label': '户名',
                'type': 'text',
                'key': 'accountName'
              },
              {
                'label': '用户',
                'type': 'text',
                'key': 'userId'
              },
              {
                'label': '权限',
                'type': 'blank',
                formWidth: '100%',
                'blankSlotName': 'power'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'commit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }
      ],
      formModel: {
        acNo: '',
        currencyCode: '',
        userId: '',
        accountName: ''
      },
      treeList: [],
      checkedList: [],
      list: []
    }
  },
  methods: {
    goBack () {
      this.$router.push('/setmultiLevelLedgerRoots')
    },
    // 提交确认
    commit (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        let singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        let params = {
          acNo: this.$route.params.formModel.acNo,
          currencyCode: this.$route.params.formModel.currencyCode,
          userNo: this.$route.params.formModel.userNo,
          _tokenName: token._tokenName,
          _dataMapKey: this.$route.params._dataMapKey,
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          list: this.list
        }
        // 没考虑children 需要递归
        for (var i = 0; i < this.btnData1.length; i++) {
          if (this.btnData1[i].queryPermission === true) {
            params.list.push(this.btnData1[i])
          }
        }
        httpPost('/eweb-cash.MultistageBookAuthSet.do', params).then(res => {
          this.$router.push({
            name: 'multiLevelLedgerRootsSetRes',
            params: { ...this.$route.params, res }
          })
        })
      })
    },
    handleTreeList (arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(item => {
          this.$set(item, 'disabled', this.checkedList.includes(item.asAcNo))
          if (item.subLevel && item.subLevel.length > 0) {
            this.handleTreeList(item.subLevel)
          }
        })
      }
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    }
    this.treeList = this.$route.params.treeList
    this.list = this.$route.params.list
    this.list.forEach(item => {
      this.checkedList.push(item.asAcNo)
    })
    this.handleTreeList(this.treeList)
  }
}
</script>

<style lang="scss" scoped>
	.setMultLeveLedgerRootsConfirm {
		.box {
			padding: 20px;
			margin: 20px;
		}
	}
</style>
