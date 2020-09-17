<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
        @submit="submit"
        @reset="reset"
        >
        <div slot="otherPanel" class="other-panel">
          <span style="cursor: pointer;" @click="moreConditions">
            {{ moreText }} >>
          </span>
        </div>
      </m-new-form>
    </div>
    <div class="form-box" v-if="showTable">
      <m-new-form
        :formModel="formModelData"
        :componentJson="tableHeader"
        >
      </m-new-form>
      <d-table
        :tableData="tableDataSum"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        :firstColIndex="firstColIndex"
        :pagesize="pagesize"
        @handleSelectionChange="handleSelectionChange"
        @paymentInformation="paymentInformation"
        >
      </d-table>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import util from '@/libs/util'
import { httpPost } from '../../../api/sys/http'
import Vue from 'vue'
/**
     *@name: 社保缴费查询
*/
// import util from '@/libs/util'
export default {
  name: 'socialSecurityPayment',
  data () {
    return {
      titleData: ['转账汇款', '社保缴费'],
      formModel: {
        bhlx: '2',
        jylx: '',
        periodOfPayment: '',
        serialNumber: '',
        amount: ''
      },
      moreText: '更多查询条件',
      formConfigJson: {
        rules: {
          bhlx: [{ required: true, message: '编号类型', trigger: 'submit' }],
          jylx: [{ required: true, message: '编号代码', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            title: '编号信息',
            group: [
              {
                'disable': true,
                'type': 'select',
                options: [
                  { 'value': '社保单位编号', 'key': '2' }
                  // { 'value': '纳税人识别号', 'key': '1' },
                  // { 'value': '业务流水号', 'key': '3' }
                ],
                'label': '编号类型',
                'key': 'bhlx'
              },
              {
                'disable': true,
                'type': 'input',
                'label': '编号代码',
                'key': 'jylx'
              },
              {
                'disable': true,
                'type': 'input',
                'label': '费款所属期',
                'key': 'periodOfPayment',
                show: false
              },
              {
                'disable': true,
                'type': 'input',
                'label': '业务流水号',
                'key': 'serialNumber',
                show: false
              },
              {
                'disable': true,
                'label': '总金额',
                'key': 'amount',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'content': '(元)',
                show: false
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      formModelData: {
        yjje: 0
      },
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
      firstColIndex: {
        type: 'selection'
      },
      pagesize: 20,
      tableHeadData: [
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
      actionData: [
        { btnText: '缴费', class: 'm-submit-btn', eventName: 'paymentInformation' }
      ],
      showTable: false,
      tableDataSum: [],
      selected: [],
      resTable: {}
    }
  },
  methods: {
    // 更多查询条件
    moreConditions () {
      if (!this.isMore) {
        this.moreText = '收起'
        this.formConfigJson.formItems[0].group[2].show = true
        this.formConfigJson.formItems[0].group[3].show = true
        this.formConfigJson.formItems[0].group[4].show = true
        this.isMore = !this.isMore
      } else {
        this.formConfigJson.formItems[0].group[2].show = false
        this.formConfigJson.formItems[0].group[3].show = false
        this.formConfigJson.formItems[0].group[4].show = false
        this.moreText = '更多查询条件'
        this.isMore = !this.isMore
      }
    },
    submit (data) {
      this.formModel = data
      httpPost('eweb-transfer.SocialSecurityPaymentInfoQry.do', {
        periodOfPayment: data.periodOfPayment,
        serialNumber: data.serialNumber,
        amount: data.amount,
        bhlx: data.bhlx,
        jylx: data.jylx
      }).then(res => {
        this.tableDataSum = res.paymentInfoList
        this.resTable = res
        Object.assign(this.formModelData, res)
        res.paymentInfoList.forEach(item => {
          this.formModelData.yjje = parseFloat(item.Sjjehj) + this.formModelData.yjje
        })
        this.showTable = true
      })
    },
    reset () {
      this.showTable = false
      this.tableDataSum = []
      this.formModelData = {}
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    // 处理多选table事件
    handleSelectionChange (selection) {
      this.selection = selection
    },
    paymentInformation (res) {
      if (this.selection.length < 1) {
        Message.warning({
          message: '请勾选至少一条数据'
        })
      } else {
        let amountOfMoney = 0
        const totalNum = this.selection.length
        this.selection.forEach(item => {
          amountOfMoney = Number(item.yhsjje) + amountOfMoney
        })
        Vue.delete(this.resTable, 'paymentInfoList')  
        Vue.delete(this.formModelData, 'paymentInfoList')// 删除多余值
        amountOfMoney = amountOfMoney.toFixed(2)
        this.$router.push({
          name: 'socialSecurityPaymentPer',
          params: {
            tableModel: this.formModel,
            formModel: this.selection,
            amountOfMoney,
            totalNum,
            resTable: this.resTable,
            formModelData: this.formModelData
          }
        })
      }
    }
  },
  created () {
    if (this.$route.params.zpph) {
      this.formModel = this.$route.params.tableModel
      let data = this.formModel
      this.submit(data)
    } else if (this.$route.params.formModel) {
      this.formModel = this.$route.params.tableModel
      let data = this.formModel
      this.submit(data)
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
