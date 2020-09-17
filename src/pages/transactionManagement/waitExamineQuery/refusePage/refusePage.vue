<template>
  <div class="waitQueryPage">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="main">
      <div class="form-box">
        <m-steps :data="stepsData"></m-steps>
        <d-table
          :table-data="tableData"
          :options = "options"
          :tableHeadData="tableHeadData"
          @paywater="paywater"
        >
        </d-table>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @submit = "submit"
          @on-back="backHandler"
        ></m-new-form>
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import util from '@/libs/util'
import { mapMutations } from 'vuex'

export default {
  name: 'refusePage',
  data () {
    return {
      breadData: ['交易管理', '业务类交易审核', '待审核记录查询'],
      stepsData: {
        stepsActive: 0
      },
      formModel: {
        refuse: ''
      },
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      btnData: [
        { btnText: '拒绝', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'on-back' }
      ],
      formConfigJson: {
        formWidth: '100%',
        rules: {
          refuse: [{ required: true, message: '拒绝原因', trigger: 'change' }]
        },
        formItems: [{
          group: [
            {
              'disabled': false,
              'label': '拒绝原因',
              'type': 'input',
              'changeEventName': 'changeAccount',
              'key': 'refuse'
            }
          ]
        }]
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px', clickEventName: 'paywater' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        {
          label: '交易账户',
          prop: 'payerAcNo',
          formatter: (row, column, cellValue, index) => {
            let val = ''
            val = cellValue || row.payeeAcNo
            return val
          }
        },
        { label: '交易金额', prop: 'actAmount', formatter: (row, column, cellValue, index) => cellValue > 0 ? util.formatCurrency(cellValue) : '' },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      tableData: []
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    tableSelectChange (selection) {
      // 监听表格选择事件触发
    },
    submit (formModel) {
      httpPost('/eweb-setting.CheckPassOrRejForNManConfirm.do', {
      }).then(conf => {
        this.$router.push({
          name: 'refuseConfirmPage',
          params: {
            idea: this.$route.params.idea,
            refuse: formModel.refuse,
            data: this.tableData,
            tableData: this.tableData,
            formModel: conf
          }
        })
      }).catch(conf => {
      })
    },
    paywater (formModel) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (formModel.transCode) {
        case 'eweb-transfer.SocialSecurityContribution': // 社保缴费
          this.$router.push({
            name: 'socialSecurityPaymentDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-enterprise.AutDedFeeRel': // 自动签约扣费维护-解约
          this.$router.push({
            name: 'autDedFeeRelDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.CollectDateSet': // 归集周期设置
          this.$router.push({
            name: 'collectPerSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.TimingCollectSet': // 定时归集设置
          this.$router.push({
            name: 'periodicColSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        default:
          this.$router.push({
            name: 'transactionManagementDetails',
            params: {
              detail: formModel,
              transCode: formModel.transCode,
              type: '1',
              jnlNo: formModel.taskSeq
            }
          })
          break
      }
    },
    backHandler () {
      this.$router.push({ name: 'waitQPage' })
    }
  },
  created () {
    if (this.$route.params.idea === '1') {
      const { data } = this.$route.params
      if (data && Array.isArray(data)) {
        this.tableData = data
        this.tableData.forEach(item => {
          item.examineStastus = '待审核'
        })
      }
    } else {
      const { data, refuse } = this.$route.params
      this.tableData = data
      this.formModel.refuse = refuse
      this.tableData.forEach(item => {
        item.examineStastus = '待审核'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
</style>
