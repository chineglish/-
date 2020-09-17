<template>
  <div class="waitQueryPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submitHandler"
      >
      </m-new-form>
    </div>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :actionData="actionData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        @changeDate="changeDate"
        @paywater="paywater"
        @withdraw="withdraw"
        @handleSelectionChange="selectionChangeHandler"
      >
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type, process_state } from '@/assets/js/entity'
import util from '@/libs/util.js'
import { mapMutations } from 'vuex'

export default {
  name: 'myForm',
  data () {
    return {
      msgs: [
        '该功能用于查询本人制单记录。'
      ],
      breadData: ['交易管理', '我的制单'],
      pagesize: 20,
      formModel: {
        startDate: '',
        endDate: '',
        busClass: '2',
        appointmentDate: '',
        appointmentTime: ''
      },
      formConfigJson: {
        formWidth: '100%',
        rules: {
          busClass: [{ required: true, message: '请输入业务类型', trigger: 'submit' }],
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '2' },
                  { 'value': '账务类交易', 'key': '1' },
                  { value: '管理类交易', key: '3' },
                  { 'value': '其他业务', 'key': '0' }
                ],
                'key': 'busClass'
              },
              {
                label: '查询日期',
                type: 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate',
                endRestrictionStart: Date.now()
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      firstColIndex: {
        type: 'selection',
        eventName: '',
        selectable: (row, index) => {
          return ['WCK', 'CK'].includes(row.processState)
        }
      },
      tableHeadData: [
        {
          label: '交易流水',
          prop: 'taskSeq',
          clickEventName: 'paywater',
          checkLink: (value, row) => {
            if (this.noShowList.length !== 0) {
              if (this.noShowList.find(item => item.prdId === row.productId)) {
                return false
              } else {
                return true
              }
            } else {
              return true
            }
          },
          width: '250' },
        { label: '交易金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'processState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue), width: '120' }
      ],
      operateData: {
        btnData: []
      },
      tableData: [],
      noShowList: [],
      actionData: [
        {
          btnText: '撤回',
          class: 'm-submit-btn',
          eventName: 'withdraw'
        }
      ],
      selection: [],
      loading: true
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    changeDate (params) {
      console.log(params)
    },
    selectionChangeHandler (selection) {
      this.selection = selection
    },
    submitHandler (formModel) {
      this.formModel = formModel
      const params = {
        start: formModel.startDate,
        end: formModel.endDate
      }
      if (formModel.busClass === '3') {
        params.mgmtFlag = '2'
      } else {
        params.acFlag = formModel.busClass
      }
      let s = new Date(params.start).getTime()
      let e = new Date(params.end).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      result > 183 ? this.$msg('查询时间间隔不能超过 6 个月') : this.getData(params)
    },
    // 撤回
    withdraw () {
      if (this.selection.length > 0) {
        httpPost('/eweb-setting.CheckPassOrRejForCcNManConfirm.do', {
        }).then(conf => {
          this.$router.push({
            name: 'myFormConfirm',
            params: {
              data: this.selection,
              formModel: conf
            }
          })
        }).catch(conf => {
        })
      } else {
        this.$msg('请进行选择')
      }
    },
    paywater (data) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (data.transCode) {
        case 'eweb-cash.MultistageBookAuthSet': // 多级账簿权限设置
          this.$router.push({
            name: 'setMultLeveLedgerRootsDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq
            }
          })
          break
          case 'eweb-setting.ApproveProcessSet': // 审批流程设置
          this.$router.push({
            name: 'approvalProcessDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq
            }
          })
          break
        case 'eweb-transfer.SocialSecurityContribution': // 社保缴费
          this.$router.push({
            name: 'socialSecurityPaymentDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq,
              type: '3'
            }
          })
          break
        case 'eweb-enterprise.AutDedFeeRel': // 自动签约扣费维护-解约
          this.$router.push({
            name: 'autDedFeeRelDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq,
              type: '3'
            }
          })
          break
        case 'eweb-cash.CollectDateSet': // 归集周期设置
          this.$router.push({
            name: 'collectPerSetDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq,
              type: '3'
            }
          })
          break
        case 'eweb-cash.TimingCollectSet': // 定时归集设置
          this.$router.push({
            name: 'periodicColSetDetail',
            params: {
              detail: data,
              jnlNo: data.taskSeq,
              type: '3'
            }
          })
          break
        default:
          if (this.formModel.busClass === '3') {
            this.$router.push({
              name: 'managementTransDetails',
              params: {
                detail: data,
                jnlNo: data.taskSeq,
                transCode: data.transCode
              }
            })
          } else {
            this.$router.push({
              name: 'transactionManagementDetails',
              params: {
                detail: data,
                transCode: data.transCode,
                type: '3',
                jnlNo: data.taskSeq
              }
            })
          }
          break
      }
    },
    getData (params) {     
      httpPost('eweb-query.SelfAuthQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.tableData.forEach(obj => {
          obj.examineStastus = '待审核'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    let start = new Date()
    let end = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.startDate = util.formatDate(start)
    this.formModel.endDate = util.formatDate(end)
    const params = {
      start: start,
      end: end,
      acFlag: this.formModel.busClass
    }
    this.getData(params)
  }
}
</script>
