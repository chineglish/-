<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit">
      </m-new-form>
    </div>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pagesize="pagesize"
              :operate-data="operateData"
              @handleSelect="handleSelect"
              @handleCancel="handleCancel">
      </d-table>
    </div>
  </d2-container>
</template>
<script>
/**
 *@name: 定时查询-按制单日期查询
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { trans_type } from '@/assets/js/entity'
export default {
  name: 'timedTransInquiry',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      breadData: ['转账汇款', '定时交易查询'],
      formModel: {
        startDate: '',
        endDate: '',
        transAccount: ''
      },
      formConfigJson: {
        rules: {
          startDate: [{ required: true, message: '请输入开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请输入结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '日期',
                'type': 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                'changeEventName': 'selectDate'
              },
              {
                'disabled': false,
                'label': '交易账户',
                'type': 'select',
                'key': 'transAccount',
                'options': []
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      pagesize: 20,
      tableHeadData: [
        { label: '流水号', prop: 'origchannelserno' },
        { label: '制单日期', prop: 'bankdate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '付款账号', prop: 'payeracc' },
        { label: '收款账号', prop: 'payeeacc' },
        { label: '收款账户名称', prop: 'payeename' },
        { label: '交易金额', prop: 'amount' },
        { label: '执行时间', prop: 'presendtime', formatter: (row, column, cellValue, index) => util.formatTransTime(cellValue) },
        {
          label: '交易状态',
          prop: 'tradebusistep',
          formatter: (row, column, cellValue, index) => {
            const target = trans_type.find(item => item.value === cellValue)
            return target ? target.label : '未知'
          }
        },
        { label: '交易结果', prop: 'pdealmsg' }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            pick: (row) => row.tradebusistep === '1H',
            btnText: '撤销',
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
      actionData: []
    }
  },
  methods: {
    handleSelect (index) {
      this.$router.push({
        name: 'timedDetails',
        params: {
          msg: index,
          formModel: this.formModel
        }
      })
    },
    handleCancel (index) {
      this.$router.push({
        name: 'timedCancel',
        params: {
          msg: index,
          formModel: this.formModel
        }
      })
    },
    /**
     * 发送查询的接口
     */
    submit (formModel) {
      this.formModel = formModel
      httpPost('/eweb-transfer.TimeTransferTrsQry.do', {
        startDate: formModel.startDate,
        endDate: formModel.endDate,
        payerAcNo: formModel.transAccount
      }).then(res => {
        this.tableData = res.result
        this.formModel = { ...this.formModel, ...formModel }
      }).catch(err => {
        this.tableData = []
        console.error(err)
      })
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('/eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[1].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo }))
        this.formModel.transAccount = this.formModel.transAccount ? this.formModel.transAccount : this.payerAccNoList[0].acNo
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      // this.submit(this.$route.params.formModel)
    } else {
      let filterDate = util.filterDate('1')
      this.formModel.startDate = filterDate.startDate
      this.formModel.endDate = filterDate.endDate
    }
    this.accNoListQry()
  }
}
</script>
