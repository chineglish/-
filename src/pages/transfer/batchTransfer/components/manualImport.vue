<template>
  <div>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        @changeAcount="changeAcount">
      </m-new-form>
    </div>
    <div class="form-box">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :actionData="actionData"
        :firstColIndex="firstColIndex"
        :operate-data="operateData"
        :pagesize="pagesize"
        @handleUpdate="handleUpdate"
        @handleDelect="handleDelect"
        @handleComfirm="handleComfirm"
        @handleAdd="handleAdd">
      </d-table>
    </div>
  </div>
</template>
<script>
/**
 *@name: 手动导入
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'orderDate',
  data () {
    // const isInBank = [
    //   { value: '0', label: '行内' },
    //   { value: '1', label: '行外' }
    // ]
    return {
      payerAccNoList: [], // 付款账号信息列表
      formModel: {
        payerAccont: '',
        availBal: ''
      },
      formConfigJson: {
        rules: {
          payerAccont: [{ required: true, message: '付款账号', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账号',
                'type': 'select',
                'key': 'payerAccont',
                'changeEventName': 'changeAcount',
                'options': [],
                trans: { value: 'payerAccontShow' }
              },
              {
                'disabled': false,
                'label': '可用余额',
                'type': 'text',
                textType: 'shy',
                'key': 'availBal',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      pagesize: 4,
      tableHeadData: [
        // { label: '行内外标志', prop: 'trsType', formatter: (row, column, cellValue, index) => util.handleEnums(isInBank, cellValue) },
        { label: '收款行行号', prop: 'payeeBankId' },
        { label: '收款账户开户行行号', prop: 'payeeDeptId' },
        { label: '收款账号', prop: 'payeeAcNo' },
        { label: '收款账户名称', prop: 'payeeAcName' },
        { label: '交易金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '附言', prop: 'postScript' }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '删除',
            eventName: 'handleDelect'
          }, {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '修改',
            eventName: 'handleUpdate'
          }
        ]
      },
      actionData: [
        {
          btnText: '新增',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'handleAdd'
        },
        {
          btnText: '确认',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'handleComfirm'
        }
      ]
    }
  },
  methods: {
    handleUpdate (data) {
      this.$router.push({
        name: 'addBatch',
        params: data
      })
    },
    handleDelect (index) {
      this.tableData.splice(index, 1)
    },
    handleAdd () {
      this.$router.push('/addBatch')
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'BatchTransfer' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAccontShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.payerAccNoList.length > 0) {
          this.formModel.payerAccont = 0
          this.changeAcount(this.formModel)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    changeAcount (data) {
      this.formModel = data
      const accNo = this.payerAccNoList[data.payerAccont].acNo
      const subAccNo = this.payerAccNoList[data.payerAccont].subAcNo
      const params = {
        payerAcNo: accNo,
        payerSubAcNo: subAccNo
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.availBal = res.availBal
      })
    },
    handleComfirm () {
      // let totalMoney
      // for (let i = 0; i < this.tableData.length; i++) {
      //   totalMoney = totalMoney + Number(this.tableData[i].amount)
      // }
      if (this.formModel.payerAccont !== '') {
        const acNo = this.payerAccNoList[this.formModel.payerAccont].acNo
        const subAccNo = this.payerAccNoList[this.formModel.payerAccont].subAcNo
        const acName = this.payerAccNoList[this.formModel.payerAccont].acName
        const payerAccontShow = this.payerAccNoList[this.formModel.payerAccont].payerAccontShow
        const params = {
          payerAcNo: acNo,
          payerSubAcNo: subAccNo,
          amount: '0',
          totalCount: this.tableData.length,
          list: this.tableData
        }
        // 控制返回时，显示哪个标签
        params.activeName = 'second'
        httpPost('eweb-transfer.BatchTransferAddConfirm.do', params).then(res => {
          this.formModel.postList = res.list
          this.formModel.amount = res.amount
          this.formModel.totalCount = res.totalCount
          this.formModel.activeName = 'second'
          this.formModel.payerAcNo = acNo
          this.formModel.payerSubAcNo = subAccNo
          this.formModel.acNo = acNo
          Object.assign(this.formModel, res)
          this.formModel.payerAccontShow = payerAccontShow
          this.formModel.payerAcName = acName
          if (Number(res.limitDayAmount) > 1000000) {
            this.$confirm('您的日累计转账金额已经超过100万元, 是否继续转账?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({
                name: 'batchTransferConf',
                params: this.formModel
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消转账'
              })
            })
          } else {
            this.$router.push({
              name: 'batchTransferConf',
              params: this.formModel
            })
          }
        })
      }
    }
  },
  created () {
    this.accNoListQry()
    this.tableData = this.$store.state.d2admin.manualImport.transData
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
