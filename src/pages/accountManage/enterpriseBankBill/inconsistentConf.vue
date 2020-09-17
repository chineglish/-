<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @back="back"
          @submit="submit">
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
            <td>{{index + 1}}</td>
            <td>{{item.ebillType}}</td>
            <td>{{item.strDate | filterDate}}</td>
            <td>{{item.vchno}}</td>
            <td>{{item.formatAmount}}</td>
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
      tableDate: [],
      titleData: ['账户管理', '银企对账'],
      formModel: {
        // acNo: '',
        // checkBillCode: '',
        // billDate: '',
        // balance: '',
        // checkRes: '不相符',
        // outAccNum: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
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
                'disabled': true,
                'label': '未达账笔数',
                'type': 'text',
                'key': 'outAccNum'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
      // msgs: []
    }
  },
  filters: {
    filterDate (item) {
      return util.separationDate(item)
    }
  },
  methods: {
    submit () {
      httpPost('eweb-common.GenToken.do').then(res => {
        // switch (this.$route.params.msg.ebillResult) {
        //   case '核对相符':
        //     this.$route.params.msg.ebillResult = '1'
        //     break
        //   case '核对不符':
        //     this.$route.params.msg.ebillResult = '0'
        //     break
        // }
        // for (let i = 0; i < this.tableDate.length; i++) {
        //   this.tableDate[i].date = util.separationStr(this.tableDate[i].date)
        // }
        const params = {
          // ...this.$route.params,
          ebillResult: '0',
          acNo: this.$route.params.data.acNo,
          voucherno: this.$route.params.data.voucherNo,
          docDate: this.$route.params.data.docDate,
          credit: this.$route.params.data.credit,
          _dataMapKey: this.$route.params.res1._dataMapKey,
          list: this.$route.params.data.list,
          _tokenName: res._tokenName
        }
        // console.log(2222222, params)
        httpPost('eweb-query.BankCheckOutcome.do', params).then(res => {
          this.$router.push({
            name: 'enterpriseBankCheckBillRes',
            params: ({
              // jnl: res._jnlNo
              _JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              _transTime: res._transTime
            })
          })
        })
      })
    },
    back (res) {
      this.$router.push({
        name: 'checkBillInconsistentPre',
        params: {
          data: res,
          // tableDate: this.$route.params.data,
          acNo: this.$route.params.acNo
        }
      })
    }
  },
  created () {
    // console.log(this.$route.params)
    Object.assign(this.formModel, this.$route.params.data)
    this.formModel.ebillResult = '核对不符'
    this.tableDate = this.$route.params.data.list
    for (let i = 0; i < this.tableDate.length; i++) {
      // this.tableDate[i].date = util.formatDate(this.tableDate[i].date)
      switch (this.tableDate[i].ebillType) {
        case '0':
          this.tableDate[i].ebillType = '企业已收,银行未收'
          break
        case '1':
          this.tableDate[i].ebillType = '企业已付,银行未付'
          break
        case '2':
          this.tableDate[i].ebillType = '银行已收,企业未收'
          break
        case '3':
          this.tableDate[i].ebillType = '银行已付,企业未付'
          break
      }
    }
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
    background: #f0f0f0;
    border: 0.05px solid #999999;
    height: 40px;
  }
  td{
    border: 0.05px solid #999999;
    height: 40px;
  }
}
</style>
