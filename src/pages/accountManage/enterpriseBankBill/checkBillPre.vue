<template>
  <d2-container class="enterprise-bank-check-bill-pre">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <d2-container>
      <m-new-form :componentJson="formConfigJson" :btnData="btnData" @submit="submitHandler" @on-back="backHandler">
        <div slot="otherPanel">
          <d-table
            :table-data="tableData"
            :options="options"
            :firstColIndex="firstColIndex"
            :pagesize="20"
            :tableHeadData="tableHeadData"
            @handleCurrentChange="CurrentChange"
            @on-back="backHandler"
          >
          <div slot-scope="scope">
            <el-select v-model="scope.scope.ebillResult">
              <el-option
                v-for="biilRes in selectData"
                :key="biilRes.value"
                :label="biilRes.label"
                :value="biilRes.value">
              </el-option>
            </el-select>
          </div>
          </d-table>
        </div>
      </m-new-form>
    </d2-container>

  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { Message } from 'element-ui'
import util from '@/libs/util.js'

export default {
  name: 'enterprise-bank-check-bill-pre',
  data () {
    return {
      selectData: [
        { value: '1', label: '核对相符' },
        { value: '0', label: '核对不符' }
      ],
      breadcrumb: ['账户管理', '银企对账'],
      formConfigJson: {
        stepsActive: 0,
        formItems: [],
        stepsData: ['信息录入', '交易确认', '提交结果']
      },
      btnData: [
        { btnText: '对账', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'on-back' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      firstColIndex: {
        type: 'radio',
        label: '选择',
        eventName: 'CurrentChange'
      },
      tableHeadData: [
        {
          label: '账号',
          prop: 'acNo'
        },
        {
          label: '对账单编号',
          prop: 'voucherNo'
        },
        {
          label: '账单日期',
          prop: 'docDate',
          formatter: (row, cell, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '当期余额',
          prop: 'credit',
          formatter: (row, cell, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '对账结果',
          prop: 'ebillResult',
          soltName: 'ebillResult'
        }
      ],
      tableData: [],
      selectionData: [],
      currentPage4: 4,
      pageSize: null,
      total: 0
    }
  },
  methods: {
    CurrentChange (res) {
      // 监听表格选择事件触发
      this.selectionData[0] = res
    },
    submitHandler () {
      if (this.selectionData.length !== 1) {
        Message.warning({
          message: '请勾选一条数据'
        })
      } else {
        if (this.selectionData[0].ebillResult === '1') {
          const params = {
            ebillResult: '1',
            acNo: this.selectionData[0].acNo,
            voucherNo: this.selectionData[0].voucherNo,
            docDate: this.selectionData[0].docDate,
            credit: this.selectionData[0].credit
          }
          httpPost('eweb-query.BankCheckOutcomeConfirm.do', params).then(res => {
            console.log('银企对账相符确认', res)
            this.$router.push({
              name: 'enterpriseBankCheckBillConf',
              params: {
                res: res,
                data: params,
                acNo: this.$route.params.acNo
              }
            })
          })
        } else {
          this.$router.push({
            name: 'checkBillInconsistentPre',
            params: {
              data: {
                ...this.selectionData[0],
                outAccNum: '1'
              },
              acNo: this.$route.params.acNo
            }
          })
        }
      }
    },
    backHandler () {
      this.$router.push({
        name: 'enterpriseBankBill'
      })
    }
  },
  created () {
    if (this.$route.params.acNo) {
      httpPost('eweb-query.BankCheck.do', { acNo: this.$route.params.acNo }).then(res => {
        res.list.forEach(item => {
          let obj = item
          this.$set(obj, 'acNo', res.acNo)
          this.$set(obj, 'radio', '')
          this.$set(obj, 'ebillResult', '1')
          // obj.docDate = obj.docDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
          this.tableData.push(obj)
        })
      })
    } else {
      this.pageSize = 20
      httpPost('eweb-query.BankCheckAll.do', { pageNo: '1', pageSize: String(this.pageSize) }).then(res => {
        res.list.forEach(item => {
          let obj = item
          this.$set(obj, 'acNo', item.accNo)
          this.$set(obj, 'radio', '')
          this.$set(obj, 'ebillResult', '1')
          // obj.docDate = obj.docDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
          this.tableData.push(obj)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .enterprise-bank-check-bill-pre {}
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
