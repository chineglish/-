<template>
  <div>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @changeDate="changeDate"
              @selectAsFlag="selectAsFlag"
              @submit="submit"
              >
      </m-new-form>
    </div>
    <div class="form-box" v-if="tableShow">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        :pagesize="pagesize"
        :operateData="operateData"
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
 *@name: 次日查询
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { trans_type, pdeal_msg } from '@/assets/js/entity'
export default {
  name: 'orderDate',
  data () {
    // let trsState = [
    //   { value: 'C', label: '成功' },
    //   { value: 'F', label: '失败' },
    //   { value: 'I', label: '初始化' },
    //   { value: 'R', label: '撤销' }
    // ]
    return {
      payerAccNoList: [], // 付款账户信息列表
      tableShow: false,
      formModel: {
        transDate: [],
        transAccount: '',
        asFlag: '0'
      },
      msgs: [
        '1.用户可以点击单笔交易查看明细和进行撤销操作',
        '2.点击查看链接查看定时交易明细信息；点击撤销链接进入定时交易撤销确认页，确认后完成定时交易撤销。'
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
                'disabled': false,
                'label': '是否使用账簿',
                'type': 'radio',
                'options': [ { 'value': '否', 'key': '0' }, { 'value': '是', 'key': '1' } ],
                'key': 'asFlag',
                'changeEventName': 'selectAsFlag'
              }
              // {
              //   type: 'dateArea',
              //   label: '查询日期',
              //   changeEventName: 'changeDate',
              //   firstKey: 'startDate',
              //   secondKey: 'endDate'
              // }
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
        { label: '流水号', prop: 'origchannelserno' },
        { label: '制单日期', prop: 'plworkdate', width: '120', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        { label: '付款账号', prop: 'payeracc' },
        { label: '收款账号', prop: 'payeeacc' },
        { label: '收款账户名称', prop: 'payeename', width: '150' },
        { label: '交易金额', prop: 'amount' },
        { label: '预约时间', prop: 'presendtime', width: '120', formatter: (row, column, cellValue, index) => util.formatTransTime(cellValue) },
        { label: '交易状态', prop: 'tradebusistep', formatter: (row, column, cellValue, index) => util.handleEnums(trans_type, cellValue) },
        { label: '交易结果',
          prop: 'pdealmsg',
          formatter: (row, column, cellValue, index) => {
            let value = pdeal_msg.find(item => {
              return item.value === cellValue
            })
            return value ? value.label : cellValue
          }
        }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            pick: (row) => row.tradebusistep === '1H' || (row.tradebusistep === '0' && row.pdealmsg === 'C'),
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
    selectAsFlag (res) {
      this.formModel = res
      this.tableData = []
    },
    changeDate (params) {
      // console.log(params)
    },
    handleSelect (index) {
      this.$router.push({
        name: 'timedDetails',
        params: {
          formModel: this.formModel,
          msg: index,
          activeName: 'first'
        }
      })
    },
    handleCancel (index) {
      this.$router.push({
        name: 'timedCancel',
        params: {
          formModel: this.formModel,
          msg: index,
          activeName: 'first'
        }
      })
    },
    handleBack () {
      this.$router.push('/index')
    },
    /**
     * 发送查询的接口
     */
    submit (formModel) {
      this.formModel = formModel
      const [accNo, subAccNo] = (formModel.transAccount || '').split('-')
      httpPost('/eweb-transfer.TimeTransferTrsQry.do', {
        startDate: util.separationStr(formModel.startDate),
        endDate: util.separationStr(formModel.endDate),
        payerAcNo: accNo,
        subAcNo: subAccNo,
        asFlag: formModel.asFlag
      }).then(res => {
        this.tableShow = true
        this.tableData = res.result
        this.formModel = { ...this.formModel, ...formModel }
        if (this.formModel.asFlag === '1') {
          this.tableData.forEach(item => {
            item.presendtime = item.presenddate + item.presendtime
          })
        }
      }).catch(err => {
        this.tableData = []
        console.error(err)
      })
    },
    /**
     * 交易账户获取
     */
    getAcNo () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: util.getPayerAccount(item), key: item.acNo + '-' + item.subAcNo }))
        this.formModel.transAccount = this.formConfigJson.formItems[0].group[0].options[0].key
      })
    }
  },
  created () {
    this.getAcNo()
    if (this.$route.params.formModel && this.$route.params.activeName === 'first') {
      this.formModel = this.$route.params.formModel
      this.submit(this.formModel)
    } else {
      let dateArea = util.filterDate('1')
      this.formModel.startDate = dateArea.startDate
      // let endDate = new Date(dateArea.endDate).getTime()
      // endDate += 1000 * 24 * 60 * 60
      // endDate = new Date(endDate)
      // let month = endDate.getMonth() + 1
      // month = month > 10 || `0${month}`
      // let day = endDate.getDate()
      // day = day > 10 || `0${day}`
      // console.log(`${endDate.getFullYear()}-${month}-${day}`)
      // this.formModel.endDate = `${endDate.getFullYear()}-${month}-${day}`
        this.formModel.endDate = util.filterNextDate('0').startDate
    }
  }
}
</script>
