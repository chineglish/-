<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @changeDate="changeDate"
        @submit="submit">
      </m-new-form>
    </div>
    <div class="form-box" v-if="tableShow">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        :actionData="actionData"
        :operate-data="operateData"
        @handleSelect="handleSelect"
        @handleCancel="handleCancel"
        @handleBack="handleBack">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 预约查询
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { timer_state, process_state } from '@/assets/js/entity'
export default {
  name: 'executionDate',
  data () {
    return {
      tableShow: false,
      formModel: {
        transDate: [],
        transAccount: '',
        queryType: '1'
      },
      msgs: [
        '1.用户可以点击单笔交易查看明细和进行撤销操作。',
        '2.点击查看链接查看预约交易明细信息；点击撤销链接进入预约交易撤销确认页，确认后完成预约交易撤销。'
      ],
      formConfigJson: {
        rules: {
          startDate: [{ required: true, message: '开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '交易账户',
                'type': 'select',
                'key': 'transAccount',
                'options': []
              },
              {
                label: '查询类型',
                'type': 'radio',
                options: [{ value: '按制单日期查询', key: '1' }, { value: '按执行日期查询', key: '2' }],
                key: 'queryType'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      firstColIndex: {
        type: 'selection'
      },
      pagesize: 20,
      tableHeadData: [
        { label: '流水号', prop: 'globalJnlNo' },
        { label: '制单日期', prop: 'createTime' },
        { label: '付款账户名称', prop: 'payerAcName', width: '110' },
        { label: '付款账号', prop: 'payerAcNo' },
        { label: '收款账户名称', prop: 'payeeAcName', width: '110' },
        { label: '收款账号', prop: 'payeeAcNo' },
        { label: '交易金额', prop: 'amount', formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '执行时间', prop: 'scheduleBeginTime' },
        { label: '交易状态', prop: 'timerState', formatter: (row, column, cellValue, index) => util.handleEnums(timer_state, cellValue) },
        { label: '交易结果', prop: 'processState', formatter: (row, column, cellValue, index) => util.handleEnums(process_state, cellValue) }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '撤销',
            pick: (row) => row.timerState === 'U',
            eventName: 'handleCancel'
          }, {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '查看',
            eventName: 'handleSelect'
          }
        ]
      },
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    changeDate (params) {
      // console.log(params)
    },
    handleSelect (index) {
      this.$router.push({
        name: 'transDetails',
        params: {
          formModel: this.formModel,
          msg: index,
          activeName: 'second'
        }
      })
    },
    handleCancel (index) {
      this.$router.push({
        name: 'transCancel',
        params: {
          formModel: this.formModel,
          msg: index,
          activeName: 'first'
        }
      })
    },
    handleBack () {
      this.$router.push('index')
    },
    submit (data) {
      const [accNo, subAccNo] = (data.transAccount || '').split('-')
      const params = {
        queryType: data.queryType,
        beginDate: data.startDate,
        endDate: data.endDate,
        payerAcNo: accNo,
        subAcNo: subAccNo
      }
      httpPost('/eweb-transfer.AppointTransQuery.do', params).then(res => {
        this.tableData = res.list
        this.tableShow = true
      })
    },
    getAcNo () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'DemandNotification' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.formModel.transAccount = this.formConfigJson.formItems[0].group[0].options[0].key
      })
    }
  },
  created () {
    this.getAcNo()
    if (this.$route.params.formModel && this.$route.params.activeName === 'second') {
      this.formModel = this.$route.params.formModel
      this.submit(this.formModel)
    } else {
      let dateArea = util.filterDate('1')
      this.formModel.startDate = dateArea.startDate
      this.formModel.endDate = dateArea.endDate
    }
  }
}
</script>
