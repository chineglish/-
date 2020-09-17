<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @back="back"
              @submit="submit"
              @changeOutAccNum="changeOutAccNum"
      >
        <table
          slot="otherPanel"
          class="tableData">
          <tr>
            <th>笔数</th>
            <th>未达账类型</th>
            <th>日期</th>
            <th>凭证号</th>
            <th>金额</th>
          </tr>
          <tr v-for="(item, index) in tableDate" :key="index">
            <td>
              <!-- <el-checkbox v-model="item.checked">{{index + 1}}</el-checkbox> -->
              <!-- <el-input v-model="item.index"></el-input> -->
              {{index + 1}}
            </td>
            <td>
              <el-select v-model="item.ebillType">
                <el-option
                  v-for="biilRes in selectData"
                  :key="biilRes.value"
                  :label="biilRes.label"
                  :value="biilRes.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-date-picker
                v-model="item.strDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              <el-input v-model="item.vchno" maxlength="18" @change="val => item.vchno = val"></el-input>
            </td>
            <td>
              <el-input v-model="item.formatAmount" @change="val =>{
                item.formatAmount = val
                formatAmount(item)
              } " @keydown.native="limitMoneyInputKeyDown" ></el-input>
            </td>
          </tr>
        </table>
      </m-new-form>
    </div>
  </div>
</template>
<script>

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'checkBillInconsistentPre',
  data () {
    return {
      selectData: [
        { value: '0', label: '企业已收,银行未收' },
        { value: '1', label: '企业已付,银行未付' },
        { value: '2', label: '银行已收,企业未收' },
        { value: '3', label: '银行已付,企业未付' }
      ],
      len: 1,
      tableDate: [],
      selection: [],
      titleData: ['账户管理', '银企对账'],
      formModel: {
        // payerAcc: '10000000000000002',
        // checkBillCode: '20000000.00',
        // billDate: '2019.08.08',
        // balance: '1090880.00',
        // checkRes: '不相符',
        // outAccNum: '1'
        // ebillResult: '核对不符'
      },
      formConfigJson: {
        stepsActive: 0,
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '30%',
            group: [
              {
                'disabled': true,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              }, {
                'disabled': true,
                'label': '对账单编号',
                'type': 'text',
                'key': 'voucherNo'
              }, {
                'disabled': true,
                'label': '账单日期',
                'type': 'text',
                'key': 'docDate',
                formatter: (row, value) => util.separationDate(value)
              }, {
                'disabled': true,
                'label': '当期余额',
                textType: 'shy',
                'type': 'text',
                'key': 'credit',
                formatter: (row, value) => util.formatCurrency(value)
              }, {
                'disabled': true,
                'label': '对账结果',
                'type': 'text',
                'key': 'ebillResult'
              }, {
                'disabled': false,
                'label': '未达账笔数',
                'type': 'select',
                changeEventName: 'changeOutAccNum',
                'options': [
                  { 'value': '1', 'key': '1' },
                  { 'value': '2', 'key': '2' },
                  { 'value': '3', 'key': '3' },
                  { 'value': '4', 'key': '4' },
                  { 'value': '5', 'key': '5' },
                  { 'value': '6', 'key': '6' },
                  { 'value': '7', 'key': '7' },
                  { 'value': '8', 'key': '8' },
                  { 'value': '9', 'key': '9' },
                  { 'value': '10', 'key': '10' },
                  { 'value': '15', 'key': '15' },
                  { 'value': '20', 'key': '20' },
                  { 'value': '25', 'key': '25' },
                  { 'value': '30', 'key': '30' }
                ],
                'key': 'outAccNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: []
    }
  },
  methods: {
    formatAmount (obj) {
      obj.amount = obj.formatAmount
      obj.formatAmount = util.formatCurrency(obj.amount)
    },
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeOutAccNum (data) {
      // if (this.$route.params.tableDate) {
      //   this.tableDate = this.$route.params.tableDate
      //   this.len = (Number(data.outAccNum) - this.tableDate.length)
      // } else {
      //   this.tableDate = []
      // }
      // this.tableDate = this.$route.params.tableDate || []
      // console.log(this.tableDate)
      // const len = (Number(data.outAccNum) + this.tableDate.length)
      // console.log(this.len)
      this.tableDate = []
      for (let i = 0; i < data.outAccNum; i++) {
        this.tableDate.push({
          // checked: true,
          ebillType: '0',
          strDate: new Date(),
          vchno: '',
          formatAmount: '',
          amount: ''
        })
      }
    },
    submit (res) {
      // for (let i = 0; i < this.tableDate.length; i++) {
      //   if (this.tableDate[i].checked !== false) {
      //     this.selection.push(this.tableDate[i])
      //   }
      // }
      let flag = true
      for (let i = 0; i < this.tableDate.length; i++) {
        // console.log(this.tableDate[i].date)
        if (this.tableDate[i].strDate === null) {
          flag = false
          this.$msg('日期不能为空')
          break
        }
        if (this.tableDate[i].vchno === '') {
          flag = false
          this.$msg('凭证号不能为空')
          break
        }
        if (this.tableDate[i].formatAmount === '') {
          flag = false
          this.$msg('金额不能为空')
          break
        }
      }
      if (flag) {
        this.tableDate.forEach(item => {
          item.amount = item.formatAmount.replace(/,/g, '')
          item.strDate = util.standardDate(item.strDate)
        })
        const params = {
          ebillResult: '0',
          acNo: res.acNo,
          voucherNo: res.voucherNo,
          docDate: res.docDate,
          credit: res.credit,
          outAccNum: res.outAccNum,
          list: this.tableDate
        }
        httpPost('eweb-query.BankCheckOutcomeConfirm.do', params).then(res1 => {
          console.log('银企对账不符确认', res1)
          this.$router.push({
            name: 'checkBillInconsistentConf',
            params: {
              res1: res1,
              data: params,
              acNo: this.$route.params.acNo
            }
          })
        })
      }
    },
    back () {
      this.$router.push({
        name: 'enterpriseBankCheckBillPre',
        params: {
          acNo: this.$route.params.acNo
        }
      })
    }
  },
  created () {
    this.formModel = this.$route.params.data
    this.formModel.ebillResult = '核对不符'
    // this.tableDate = this.$route.params.tableDate
    // this.tableDate = []
    // console.log(this.formModel)
    this.changeOutAccNum(this.formModel)
    // switch (this.formModel.ebillResult) {
    //   case '1':
    //     this.formModel.ebillResult = '核对相符'
    //     break
    //   case '0':
    //     this.formModel.ebillResult = '核对不符'
    //     break
    // }
  }
}
</script>

<style lang="scss" scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
.tableData{
  margin-top: 28px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  th{
    background: #FDF2F3;
    border: 0.05px solid #eee;
    height: 40px;
  }
  td{
    border: 0.05px solid #eee;
    height: 40px;
  }
}
</style>
