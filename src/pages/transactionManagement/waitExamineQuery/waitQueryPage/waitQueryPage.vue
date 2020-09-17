<template>
  <div class="waitQueryPage">
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @on-submit="submitHandler"
      >
      </m-new-form>
    </div>
    <div class="form-box" v-if="showTable">
      <d-table
        :loading="loading"
        :table-data="tableData"
        :actionData="actionData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        @paywater="paywater"
        @agree="agree"
        @refuse="refuse"
        @changeDate="changeDate"
        @handleSelectionChange="selectionChangeHandler"
      >
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import { mapMutations } from 'vuex'

export default {
  name: 'waitQueryPage',
  data () {
    return {
      msgs: [
        '具有业务类交易审核权限的企业用户使用该功能进行查询需要审核的记录，并进入审核流程。'
      ],
      pagesize: 20,
      showTable: false,
      formModel: {
        startDate: '',
        endDate: '',
        busClass: '2'
      },
      formConfigJson: {
        formWidth: '50%',
        rules: {
          busClass: [{ required: true, message: '请选择业务类型', trigger: 'submit' }],
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            group: [
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '2' },
                  { 'value': '账务类交易', 'key': '1' },
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
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'on-submit' }
      ],
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        {
          label: '交易流水',
          prop: 'taskSeq',
          clickEventName: 'paywater',
          width: '220',
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
          }
        },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '付款人账户', width: '150', prop: 'payerAcNo' },
        { label: '收款人账号', width: '150', prop: 'payeeAcNo' },
        { label: '交易金额', prop: 'actAmount', width: '130', formatter: (row, column, cellValue, index) => cellValue > 0 ? util.formatCurrency(cellValue) : '' },
        { label: '制单人', prop: 'userName', width: '110' },
        { label: '制单时间', prop: 'createTime', width: '170' },
        { label: '审核状态', width: '80', prop: 'processState', formatter: () => '待审核' }
      ],
      operateData: {
        btnData: []
      },
      tableData: [],
      noShowList: [],
      actionData: [
        {
          btnText: '通过',
          class: 'm-submit-btn',
          eventName: 'agree'
        },
        {
          btnText: '拒绝',
          class: 'm-cancel-btn',
          eventName: 'refuse'
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
      const params = {
        acFlag: formModel.busClass,
        start: formModel.startDate,
        end: formModel.endDate
      }
      let s = new Date(params.start).getTime()
      let e = new Date(params.end).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      result > 183 ? this.$msg('查询时间间隔不能超过 6 个月') : this.getData(params)
    },
    agree () {
      if (this.selection.length > 0) {
        httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do', {
        }).then(conf => {
          this.$router.push({
            name: 'confirmPage',
            params: {
              idea: '0',
              refuse: '',
              data: this.selection,
              formModel: conf
            }
          })
        }).catch(conf => {})
      } else {
        this.$msg('请进行选择')
      }
    },
    refuse () {
      this.removeKeepAliveList() // 清除页面缓存
      if (this.selection.length > 0) {
        const params = {
          idea: '1',
          data: this.selection
        }
        this.$router.push({
          name: 'refusePage',
          params
        })
      } else {
        this.$msg('请进行选择')
      }
    },
    paywater (formModel) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (formModel.transCode) {
        case 'eweb-transfer.SocialSecurityContribution': // 社保缴费
          this.$router.push({
            name: 'socialSecurityPaymentDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-enterprise.AutDedFeeRel': // 自动签约扣费维护-解约
          this.$router.push({
            name: 'autDedFeeRelDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.CollectDateSet': // 归集周期设置
          this.$router.push({
            name: 'collectPerSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.TimingCollectSet': // 定时归集设置
          this.$router.push({
            name: 'periodicColSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        default:
          this.$router.push({
            name: 'transactionManagementDetails',
            params: {
              detail: formModel,
              transCode: formModel.transCode,
              type: '1',
              jnlNo: formModel.taskSeq
            }
          })
          break
      }
    },
    getData (params) {
      httpPost('eweb-query.WaitAuthQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.tableData.forEach(obj => {
          obj.examineStastus = '待审核'
        })
        this.showTable = true
        this.loading = false
      }).catch(() => {
        this.showTable = false
        this.loading = false
      })
    }
  },
  created () {
    let start = new Date()
    let end = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.startDate = start
    this.formModel.endDate = end
    const params = {
      start: start,
      end: end,
      acFlag: this.formModel.busClass
    }
    this.getData(params)
  }
}
</script>
