<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              @reset="reset"
              @submit="submit">
      </m-new-form>
    </div>
    <div class="form-box" v-if="tableShow">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :pagesize="20"
              :actionData="actionData"
              @clickTableLink="clickTableLink"
              @handleBack="handleBack">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 非税缴费历史查询
 * @date: 2019-12-17
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'

const payStats = {
  '0': '未缴费',
  '1': '已缴费',
  '-1': '已退付'
}

export default {
  name: 'historyInquiry',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      tableShow: false,
      breadData: ['转账汇款', '非税缴费历史查询'],
      formModel: {
        payerAcc: '',
        startDate: '',
        endDate: ''
        // balance: ''
      },
      msgs: [
        '1.通过该功能可查询非税缴费业务的历史记录。',
        '2.时间查询跨度最长6个月，时间查询范围最长三年。'
      ],
      formConfigJson: {
        rules: {
          payerAcc: [{ required: true, message: '请选择付款账户', trigger: 'submit' }],
          startDate: [
            { required: true, message: '请选择开始日期', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.formModel.startDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.endDate !== '' && value > this.formModel.endDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.formModel.endDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.startDate !== '' && value < this.formModel.startDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '20%',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                'key': 'payerAcc'
              },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
              //  {
              //   'disabled': false,
              //   'label': '开始日期',
              //   'type': 'date',
              //   'key': 'startDate'
              // }, {
              //   'disabled': false,
              //   'label': '结束日期',
              //   'type': 'date',
              //   'key': 'endDate'
              // }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      tableHeadData: [
        { label: '缴费日期', prop: 'payDate', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '缴费码', prop: 'payCode', clickEventName: 'clickTableLink' },
        { label: '缴费人名称', prop: 'payerName' },
        { label: '缴费金额', prop: 'amt' },
        { label: '收款人名称', prop: 'recName' },
        { label: '执行单位名称', prop: 'chgAgenName' },
        { label: '缴款状态', prop: 'payStats', formatter: (row, column, cellValue, index) => payStats[cellValue] }
      ],
      tableData: [],
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
    clickTableLink (index) {
      this.$router.push({
        name: 'notaxPayDetail',
        params: {
          msg: index,
          query: this.formModel,
          tableData: this.tableData
        }
      })
    },
    reset (res) {
      res.amountcopy = ''
      res.transNumcopy = ''
      this.formModel = res
      this.accNoListQry()
    }, // 重置选项
    /**
     * 发送查询的接口
     */
    submit (res) {
      this.formModel = res
      const [accNo] = (res.payerAcc || '').split('-')
      httpPost('/eweb-transfer.PaymentPayInfoQry.do', {
        startDate: res.startDate.replace(/[-]/g, ''),
        endDate: res.endDate.replace(/[-]/g, ''),
        payerAcNo: accNo
      }).then(res => {
        if (res.voucher === null) {
          this.tableData = []
        } else {
          this.tableData = res.voucher
        }
        this.tableShow = true
      }).catch(err => {
        console.error(err)
      })
    },
    handleBack () {
      this.tableShow = false
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.formModel.payerAcc = res.AcList[0].acNo + '-' + res.AcList[0].subAcNo
      })
      let filterDate = util.filterDate('1')
      this.formModel.startDate = filterDate.startDate
      this.formModel.endDate = filterDate.endDate
    }
    // /**
    //  * 显示选择账户的余额
    //  */
    // selectAcc (data) {
    //   const currentPayerAccNo = this.payerAccNoList.find(item => item.acNo + '-' + item.subAcNo === data.payerAcc)
    //   const params = {
    //     payerAcNo: currentPayerAccNo.acNo,
    //     payerSubAcNo: currentPayerAccNo.subAcNo
    //   }
    //   httpPost('/eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
    //     this.formModel.balance = res.AvailBal
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // }
  },
  created () {
    this.accNoListQry()
    if (this.$route.params.tableData) {
      this.tableShow = true
      this.tableData = this.$route.params.tableData
    }
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
.form-box >>> #m-form .m-el-form .el-range-editor.el-input__inner {
    width: 70%;
}
</style>
