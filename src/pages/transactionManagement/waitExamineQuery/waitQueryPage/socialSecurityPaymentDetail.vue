<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-steps :data="stepsData"></m-steps>
      <d-table
          :table-data="dataDetail"
          :tableHeadData="titleHeadData">
      </d-table>
      <div class="fs22" style="padding: 5px 15px;background: #fff;font-weight: 700">录入详情</div>
      <m-new-form
        :formModel="formModelData"
        :componentJson="tableHeader"
        >
      </m-new-form>
      <d-table
        :tableData="setTableData"
        :tableHeadData="setTableHeadData"
        >
      </d-table>
      <m-new-form
        :componentJson="setFormConfigJson"
        :formModel="setFormModel"
        >
      </m-new-form>
    </div>
    <div style="margin-top: 10px">
      <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @on-idea-change="ideaChangeHandler"
          @back="back"
          @submit="submit"
          @cancel="cancel"
      >
        <div style="width:100%;" slot="formTable">
          <d-table
            :table-data="tableData"
            :tableHeadData="tableHeadData">
            <div slot-scope="data">
              <template v-if="data.scope.userId.split(',').length > 2">
                <el-tooltip class="item" effect="dark" :content="data.scope.userId" placement="top">
                  <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ data.scope.userId }}</p>
                </el-tooltip>
              </template>
              <template v-else>
                <p>{{ data.scope.userId }}</p>
              </template>
            </div>
          </d-table>
        </div>
      </m-new-form>
    </div>
  </div>
</template>

<script>
/**
     *@name: 社保缴费确认
*/
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { approvalStatusList, process_state } from '@/assets/js/entity'

export default {
  name: 'socialSecurityPaymentDetail',
  data () {
    return {
      stepsData: {
        stepsActive: 0
      },
      titleData: [],
      setFormModel: {
        acNo: '',
        acName: '',
        amount: ''
      },
      activeName: '',
      dataDetail: [],
      titleHeadData: [
        { label: '流水号', prop: 'taskSeq' },
        { label: '制单人', prop: 'userName' },
        { label: '交易状态', prop: 'trsProcessState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      setTableData: [],
      formModelData: {},
      tableHeader: {
        formItems: [
          {
            formWidth: '100%',
            title: '社保信息',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位名称',
                'key': 'socSecurUnitName'
              }
            ]
          },
          {
            formWidth: '50%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '社保单位编号',
                'key': 'socSecurUnitCode'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '纳税人识别号',
                'key': 'taxPayerId'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '征收账号',
                'key': 'collectAcNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '开户机构名称',
                'key': 'operBranchName'
              }
            ]
          }
        ]
      },
      setTableHeadData: [
        {
          label: '费款所属期',
          prop: 'fkssq',
          formatter: (row, column, cellValue, index) => util.separationTimeSlot(cellValue)
        },
        {
          label: '实缴金额',
          prop: 'yhsjje',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '社保实缴序号',
          prop: 'sbsjxh'
        },
        {
          label: '业务流水号',
          prop: 'sbywlsh'
        },
        {
          label: '纳税人流水号',
          prop: 'nsrlsh'
        },
        {
          label: '单位缴费类型',
          prop: 'dwjflx'
        }
      ],
      setFormConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账号',
                'key': 'acNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户名称',
                'key': 'acName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '总金额',
                'key': 'amount',
                formatter: (key, value) => {
                  return util.formatCurrency(value)
                }
              }
            ]
          }
        ]
      },
      formModel: {
        idea: '',
        refuse: ''
      },
      formConfigJson: {
        rules: {
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuse: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            slotName: 'formTable',
            group: [
              { disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
              { show: false, disabled: false, label: '拒绝原因', type: 'input', key: 'refuse' }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '审核进度', prop: 'progress' },
        { label: '操作员号', prop: 'userId', width: '370px', soltName: 'userId' },
        { label: '审核时间', prop: 'checkTime', width: '170px' },
        { label: '审核意见', prop: 'opinion' },
        { label: '审核状态', prop: 'authProcessState', formatter: (row, column, cellValue, index) => approvalStatusList[row.processState] }
      ],
      tableData: [],
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '撤回', class: 'm-submit-btn', clickEventName: 'cancel' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    ideaChangeHandler (formModel) {
      const { idea, refuse } = formModel
      this.formModel.refuse = idea === '1' ? refuse : ''
      this.formConfigJson.rules.refuse[0].required = idea === '1'
      this.formConfigJson.formItems[0].group[1].show = idea === '1'
    },
    submit (data) {
      if (data.idea === '0') {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'confirmPage',
            params: {
              data: this.dataDetail,
              formModel: res
            }
          })
        })
      } else {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do').then(res => {
          this.$router.push({
            name: 'refuseConfirmPage',
            params: {
              data: this.dataDetail,
              refuse: data.refuse,
              formModel: res
            }
          })
        })
      }
    },
    cancel () {
      httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do', {}).then(res => {
        this.$router.push({
          name: 'myFormConfirm',
          params: {
            data: this.dataDetail,
            formModel: res,
            type: '3'
          }
        })
      })
    },
    back () {
      if (this.activeName === 'third') {
        this.$router.push({
          name: 'myForm'
        }) 
      } else {
        this.$router.push({
          name: 'waitQPage',
          params: {
            activeName: this.activeName
          }
        }) 
      }
    },
    handleTableData (res) {
      this.tableData = res.taskInfo
      let arr = []
      let list1 = []
      let list = []
      for (let i = 0; i < this.tableData.length; i++) {
        arr.push(this.tableData[i].userId)
        this.tableData[i].progress = this.tableData[i].message.split(',')[0]
        this.tableData[i].opinion = this.tableData[i].message.split(',')[1]
      }
      res.authList && res.authList.forEach(item => {
        !arr.includes(item.userId) && list1.push(item)
      })
      list1.forEach(item => {
        if (list[item.level - 1] === undefined) {
          item['progress'] = `${item.level}级审核`
          this.$set(list, item.level - 1, item)
        } else {
          list[item.level - 1].userId += ', ' + item.userId
        }
      })
      list.forEach(item => {
        item.processState = 'WCK'
      })
      this.tableData = [ ...this.tableData, ...list ]
    }
  },
  created () {
    let { type, jnlNo, detail } = this.$route.params
    if (this.$route.params.detail) {
      this.dataDetail.push(this.$route.params.detail)
    }
    let params = {
      jnlNo: jnlNo,
      productId: detail.productId,
      acSeq: detail.acSeq ? detail.acSeq : '',
      mgmtFlag: '0'
    }
    if (type === '1') {
      this.activeName = 'first'
      this.btnData[1].show = false
      httpPost('eweb-query.WaitAuthQryJnl.do', params).then(res => {
        this.formModelData = res.bodyMap
        this.setFormModel = res.bodyMap
        this.setFormModel.acNo = res.bodyMap.payerAccount.acNo
        this.setFormModel.acName = res.bodyMap.payerAccount.acName
        this.setTableData = res.bodyMap.list
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else if (type === '2') {
      this.activeName = 'second'
      delete this.stepsData.stepsActive
      this.titleHeadData[0].prop = 'jnlno'
      this.btnData[0].show = false
      this.btnData[1].show = false
      this.formConfigJson.formItems[0].group[0].disabled = true
      this.formConfigJson.formItems[0].group[1].disabled = true
      httpPost('eweb-query.WaitAuthedQryJnl.do', params).then(res => {
        this.formModelData = res.bodyMap
        this.setFormModel = res.bodyMap
        this.setFormModel.acNo = res.bodyMap.payerAccount.acNo
        this.setFormModel.acName = res.bodyMap.payerAccount.acName
        this.setTableData = res.bodyMap.list
        switch (this.$route.params.detail.authProcessState) {
          case 'AG':
            this.formModel.idea = '0'
            this.formConfigJson.formItems[0].group[1].show = false
            break
          case 'RJ':
            this.formModel.idea = '1'
            this.formConfigJson.formItems[0].group[1].show = true
            break
        }
        if (this.formModel.idea === '1') {
          for (let i = 0; i < res.taskInfo.length; i++) {
            if (res.taskInfo[i].processState === 'RJ') {
              this.formModel.refuse = res.taskInfo[i].remark
              break
            }
          }
        }
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    } else {
      this.activeName = 'third'
      this.btnData[0].show = false
      this.formConfigJson.formItems[0].group[0].show = false
      if (!(this.$route.params.detail.processState === 'WCK' || this.$route.params.detail.processState === 'CK')) {
        this.btnData[1].show = false
        delete this.stepsData.stepsActive
      }
      httpPost('eweb-query.SelfAuthDetailQuery.do', params).then(res => {
        this.formModelData = res.bodyMap
        this.setFormModel = res.bodyMap
        this.setFormModel.acNo = res.bodyMap.payerAccount.acNo
        this.setFormModel.acName = res.bodyMap.payerAccount.acName
        this.setTableData = res.bodyMap.list
        this.dataDetail[0].trsProcessState = res.trsProcessState
        this.handleTableData(res)
      })
    }
    switch (this.activeName) {
      case 'first':
        this.titleData = ['交易管理', '业务类交易审核', '待审核记录查询']
        break
      case 'second':
        this.titleData = ['交易管理', '业务类交易审核', '审核记录查询']
        break
      case 'third':
        this.titleData = ['交易管理', '业务类交易审核', '我的制单']
        break
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
