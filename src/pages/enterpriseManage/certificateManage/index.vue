<template>
  <div id="enterpriseManage">
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="CertFeesQry"
    ></m-new-form>
    <div>
      <d-table
        :table-data="tableData"
        :options="options"
        :isPagination="true"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        @gopayment="gopayment"
      ></d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
export default {
  name: 'enterpriseManage',
  data: function () {
    return {
      searchModel: {
        productName: ''
      },
      pagesize: 10,
      data: ['企业管理', '证书管理'],
      msgs: [
        '可实现对操作员到期日前45天内的证书进行查询、续费操作。'
      ],
      formModel: {
        operaNum: ''
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      formConfigJson: {
        rules: {
          // operaNum: [{ required: true, message: '操作员号', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '操作员号',
                'type': 'input',
                // 'options': [{ 'value': '123456', 'key': '0' }, { 'value': '1234567', 'key': '1' }, { 'value': '12345678', 'key': '3' }],
                'key': 'operaNum'
              }
            ]
          }
        ]
      },
      // 以下为动态数据
      tableHeadData: [
        { label: '操作员号', prop: 'feesUserId' },
        { label: '操作员姓名', prop: 'feesUserName' },
        { label: '应续费日期', prop: 'nextFeeDate' },
        { label: '上次缴费日期', prop: 'feeDate' },
        { label: '上次缴费渠道',
          prop: 'feeType',
          formatter: (row, column, cellValue, index) => cellValue === '0' ? '网银' : '柜面' },
        { label: '缴费状态',
          prop: 'feeState',
          clickEventName: 'gopayment',
          checkLink: value => value === '2',
          formatter: (row, column, cellValue, index) => {
            let value = ''
            switch (cellValue) {
              case '0':
                value = '正常'
                break
              case '1':
                value = '已提交,待审核'
                break
              case '2':
                value = '待缴费'
                break
              default:
                value = '未知'
            }
            return value
          } }
      ],
      tableData: [],
      options: { // table属性
        border: true,
        stripe: true
      }
    }
  },
  mounted: function () {
  },
  methods: {
    CertFeesQry (data) {
      httpPost('/eweb-enterprise.CertFeesQry.do', {
        userId: data.operaNum
      }).then(res => {
        this.tableData = res.list
      })
    },
    isNull (value) {
      if (!value && typeof (value) !== 'undefined' && value !== 0) {
        return ''
      } else {
        return value
      }
    },
    gopayment (data) {
      this.$router.push({
        name: 'certificateRenewal',
        params: {
          formModel: data
        }
      })
    },
    // 重置
    clearForm () {
      this.searchModel.productName = ''
      this.getCertificateList()
    }
  },
  created () {
    this.CertFeesQry(this.data)
  },
  components: {}
}
</script>
<style lang="scss">
  #enterpriseManage{
    .el-button--primary{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--primary:hover{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--default:hover{
      color:#D41618;
      background-color:#fff;
      border-color:#D41618
    }
    .el-form-item{
      justify-content: left !important;
    }
    .listStyle{
      p{
        line-height:30px;
        margin-bottom:20px;
        margin-top:20px;
      }
    }
  }
</style>
