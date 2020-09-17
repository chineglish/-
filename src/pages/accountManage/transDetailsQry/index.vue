<template>
  <d2-mng-page :filename="filename" :page="page" @qry-data="qryData">
    <template slot="header">
      <m-breadcrumb :data="data"></m-breadcrumb>
    </template>

    <div slot="search-inner-box">
      <m-form :componentJson="formConfigJson"
              :formModel="formModel"
              @submit="onSubmit">
      </m-form>
    </div>

    <m-table
      :border="border"
      :tableData="tableData"
      :tableHeadData="tableHeadData"
      :operateConfig="operateConfig"
    >
    </m-table>

  </d2-mng-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'transaction-details',
  data () {
    return {
      filename: __filename,
      page: {
        records: [],
        total: 0,
        size: this.$store.state.d2admin.page.defSize,
        current: this.$store.state.d2admin.page.defCurrent
      },
      data: ['转账汇款', '转账明细'],
      formModel: {
        minAmt: '0.00',
        maxAmt: '1.00',
        qryOrd: '1',
        dCFlag: '0',
        acNo: ''
      },
      formConfigJson: {
        rules: {
          acNo: [
            { required: true, message: '请选择主账户', trigger: 'blur' }
          ],
          qryOrd: [
            { required: true, message: '请选择账户归属', trigger: 'blur' }
          ],
          partnerAcInfo: [
            { required: true, validator: (rule, value, callback) => { if ((/^\S{5,48}$/).test(value)) { callback() } else { callback(new Error('请填入正确的账户')) } }, trigger: 'blur' }
          ],
          dCFlag: [{ required: true, message: '请选择收付标志', trigger: 'change' }],
          minAmt: [{ required: true, message: '请选择输入起始金额', trigger: 'change' }],
          maxAmt: [{ required: true, message: '请选择输入最大金额', trigger: 'change' }],
          date: [{ required: true, message: '请选择查询日期', trigger: 'blur' }]
        },
        formItems: [
          {
            class: 'm-el-form-long',
            formWidth: '25%',
            group: [
              {
                label: '账户',
                key: 'acNo',
                type: 'select',
                changeEventName: 'selectAcnoItem',
                options: [
                  { value: '1234567887654321', key: 'acNo01' },
                  { value: '1234567887654322', key: 'acNo02' },
                  { value: '1234567887654323', key: 'acNo03' }
                ]
              },
              {
                label: '账户归属',
                type: 'select',
                key: 'qryOrd',
                options: [
                  { key: '1', value: '本单位账户' },
                  { key: '2', value: '所属集团账户' }
                ]
              },
              {
                label: '对方账户',
                type: 'input',
                key: 'partnerAcInfo'
              },
              {
                label: '日期',
                type: 'date',
                dateType: 'daterange',
                key: 'date',
                format: 'yyyy-MM-dd',
                valueFormat: 'yyyy-MM-dd',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期'
              },
              {
                label: '收付标志',
                type: 'select',
                key: 'dCFlag',
                options: [
                  { key: '0', value: '全部' },
                  { key: '1', value: '收入' },
                  { key: '2', value: '支出' }
                ]
              },
              {
                label: '起始金额',
                type: 'input',
                key: 'minAmt'
              },
              {
                label: '最大金额',
                type: 'input',
                key: 'maxAmt'
              },
              {
                label: ' ',
                type: 'button'
              }
            ]
          }
        ]
      },
      border: true,
      tableData: [
        // {
        //   transDate: '20190424',
        //   aMount: '+25000',
        //   balance: '95872.13',
        //   partnerAcName: '张三',
        //   payeeAcNo: '6227855600024156'
        // }
      ],
      tableHeadData: [
        { label: '交易日期', prop: 'transDate' },
        { label: '交易金额', prop: 'aMount' },
        { label: '账户余额(元)', prop: 'balance' },
        { label: '对方户名', prop: 'partnerAcName' },
        { label: '对方账户', prop: 'payeeAcNo' }
      ],
      operateConfig: {
        fixed: 'right',
        width: 182,
        btnData: [
          { btnText: '详情', eventName: 'handleClickDetil' },
          { btnText: '电子回单', eventName: 'handleClickReceipt' }
        ]
      }
    }
  },
  methods: {
    qryData () {
    },
    onSubmit (data) {
      let _this = this
      axios({
        method: 'post',
        url: '/app/wiremock/D5419E20385D4A469B1383CF9183B6FD/accountList'
      }).then(res => {
        _this.tableData = res.data.data.list
      }
      )
    }
  }
}
</script>

<style scoped>

</style>
