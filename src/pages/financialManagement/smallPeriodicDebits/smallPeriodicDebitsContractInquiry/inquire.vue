<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
          <m-new-form
            :componentJson="formConfigJson"
            :btnData="btnData"
            :formModel="formModel"
            @submit="inquire"
          >
          </m-new-form>
        </div>
        <div v-if="showResult" class="form-box">
          <d-table
            :table-data="tableData"
            :options="options"
            :tableHeadData="tableHeadData"
            :firstColIndex="firstColIndex"
            :pagesize="6"
            @gotoPre="gotoPre"
          >
          </d-table>
        </div>
    </div>
</template>

<script>
/**
 * @name: 小额定期借记业务查询 废弃,无用页面
 * @author: 邓焕
 * @date: 2019-12-23
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
export default {
  name: 'smallPeriodicDebitsContractInquiry',
  data () {
    return {
      payerAccNoList: [], // 付款账户信息列表
      showResult: false,
      filename: __filename,
      breadData: ['财务管理', '小额定期借记业务'],
      formModel: {
        collectionAct: ''
      },
      formConfigJson: {
        rules: {
          collectionAct: [{ required: true, message: '请选择收款账户', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'select',
                'options': [],
                'key': 'collectionAct'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      tableHeadData: [
        { label: '合同(协议)号', prop: 'contractNo', clickEventName: 'gotoPre' },
        { label: '单笔手续费金额',
          prop: 'singleFeeAmt',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        { label: '业务种类', prop: 'businessKind' },
        { label: '业务类型', prop: 'businessType' },
        { label: '签约日期/生效日期', prop: 'signingDate' },
        { label: '解约日期/失效日期', prop: 'terminationDate' }
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      operateData: {
        btnData: []
      },
      tableData: []
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
    },
    getAccountList () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'DemandNotification' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
          .map(item => ({ value: item.acNo, key: item.acNo }))
      })
    },
    inquire (res) {
      this.formModel.paymentAct = res.paymentAct
      // 发送接口重新查询
      this.showResult = false
      httpPost('/eweb-transfer.CreditCartListQuery.do').then(res => {
      }).catch(res => {
        this.showResult = true
      })
    },
    gotoPre (data) {
      // 点击批次号
      data.collectionAct = this.formConfigJson.formItems[0].group[0].options[this.formModel.collectionAct].value
      this.$router.push({
        name: 'smallPeriodicDebitsContractContract',
        params: data
      })
    }
  },
  created () {
    this.getAccountList()
  }
}
</script>

<style lang="scss" scoped>
    .form-box{
        width :100%;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;

        .d-table{
            box-shadow: 0 0 0px #ddd;
        }
    }
</style>
