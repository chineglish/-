<template>
  <div class="rootsQuery">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div style="clear: both"></div>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @changeNum="changeNum"
      @inquire="inquire"
      @reset="reset"
    >
      <d-form-previewer
        :form-struction="formStruction"
        :form-model="formModel2"
      ></d-form-previewer>
    </m-new-form>
    <div class="form-box" v-if="showResult">
		<check-tree :data="multistageBookList" :default-show="true" :disabled="true"></check-tree>
		<!--<el-tree-->
				<!--:data="multistageBookList"-->
				<!--node-key="asAcNo"-->
				<!--:props="defaultProps"-->
				<!--show-checkbox-->
				<!--:default-expand-all="true"-->
				<!--:default-checked-keys="defaultCheckedList"-->
		<!--&gt;</el-tree>-->
    </div>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import { currency_type_entity } from '@/assets/js/entity'
import util from '@/libs/util'
import checkTree from './common/checkTree'

export default {
  name: 'rootsQuery',
  components: {
    checkTree
  },
  data: function () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿权限查询'],
      showResult: false,
      actList: [],
      formModel: {
        acNo: '',
        currencyCode: '',
        acName: '',
        userId: ''
      },
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
            title: '多级账簿权限查询',
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
                'key': 'acName'
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
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      formStruction: {
        groups: [
          {
            formItems: [
              { label: '操作员编号', fieldName: 'operatorNum' },
              { label: '操作员姓名', fieldName: 'operatorName' }
            ]
          }
        ]
      },
      formModel2: {},
      multistageBookList: [],
      defaultProps: {
        children: 'subLevel',
        label: 'showAsAcName'
      },
      defaultCheckedList: []
    }
  },
  methods: {
    reset (res) {
      this.showResult = false
      this.formModel = res
      this.actListQry()
      res.userId = this.formConfigJson.formItems[0].group[3].options[0].userId
    },
    inquire (obj) {
      // 发送接口重新查询
      this.showResult = false
      let params = {
        acNo: obj.acNo,
        currencyCode: obj.currencyCode,
        userNo: obj.userId
      }
      this.defaultCheckedList = []
      httpPost('/eweb-cash.MultistageBookInfoQry.do', params).then(res1 => {
        httpPost('/eweb-cash.MultistageBookRightQry.do', {
          acNo: obj.acNo,
          currencyCode: obj.currencyCode,
          userNo: obj.userId
        }).then(res => {
          res.list.forEach(item => {
            this.defaultCheckedList.push(item.limitAsAcNo)
          })
          this.showResult = true
          this.changeTreeList(res1.levelList)
          this.multistageBookList = res1.levelList
        }).catch(() => {
          this.showResult = false
        })
      }).catch(() => {
        this.showResult = false
      })
    },
    changeTreeList (arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(item => {
          this.$set(item, 'disabled', this.defaultCheckedList.includes(item.asAcNo))
          this.$set(item, 'showAsAcName', `${item.asAcNo} - ${item.asAcName}`)
          if (item.subLevel && item.subLevel.length > 0) {
            this.changeTreeList(item.subLevel)
          }
        })
      }
    },
    actListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.actList = res.acList
        this.actList.forEach(item => {
          item.showAcNo = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.actList
        this.formModel.acNo = this.actList[0].acNo
        this.changeNum(this.formModel)
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
    changeNum (res) {
      let obj = this.actList.find(item => item.acNo === res.acNo)
      this.formModel.acName = obj.acName
      this.formModel.currencyCode = obj.currencyCode
    }
  },
  created () {
    // 多级账簿账户列表查询
    this.actListQry()
    this.OperatorListQuery()
  }
}
</script>

<style lang="scss" scoped>
	.rootsQuery {
		.form-box {
			padding: 20px;
			.el-tree {
				min-height: 300px;
			}
		}
	}
</style>
