<template>
    <div class="waitQueryPage">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
          <div class="form-box">
            <m-steps :data="{stepsActive: 0}"></m-steps>
            <d-table
              :table-data="tableData"
              :options = "options"
              :tableHeadData="tableHeadData"
              @paywater = "paywater"
            >
            </d-table>
            <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @submit="submit"
                @bank="onBack"
            >
            </m-new-form>
          </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import { mapMutations } from 'vuex'
import util from '@/libs/util'

export default {
  name: 'checkRefuseInner',
  data () {
    return {
      breadData: ['交易管理', '管理类交易审核', '待审核记录查询'],
      formModel: {
        refuseBecause: ''
      },
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      btnData: [
        { btnText: '拒绝', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'bank' }
      ],
      formConfigJson: {
        rules: {
          refuseBecause: [{ required: true, message: '请输入', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '拒绝原因',
                'type': 'input',
                'key': 'refuseBecause'
              }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '交易流水', prop: 'taskSeq', width: '240px', clickEventName: 'paywater' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
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
    // 拒绝按钮
    submit (res) {
      httpPost('/eweb-setting.CheckPassOrRejConfirm.do', {
      }).then(conf => {
        this.$router.push({
          name: 'checkRefuseConfirm',
          params: {
            res,
            tableData: this.tableData,
            formModel: conf
          }
        })
      }).catch(conf => {
      })
    },
    paywater (obj) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (obj.transCode) {
        case 'eweb-cash.MultistageBookAuthSet': // 多级账簿权限设置
          this.$router.push({
            name: 'setMultLeveLedgerRootsDetail',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-setting.ApproveProcessSet': // 审批流程设置
          this.$router.push({
            name: 'approvalProcessDetail',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq,
              type: '1'
            }
          })
          break
        default:
          this.$router.push({
            name: 'managementTransDetails',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq,
              transCode: obj.transCode,
              type: '1'
            }
          })
          break
      }
    },
    onBack () {
      this.$router.push({
        name: 'manageTransactionCheck'
      })
    }
  },
  created () {
    this.tableData = this.$route.params.data
    this.tableData.forEach(item => {
      item.examineStastus = '待审核'
    })
    this.formModel.refuseBecause = this.$route.params.hasOwnProperty('refuseBecause') ? this.$route.params.refuseBecause : ''
  }
}
</script>

<style lang="scss"  scoped>
.d-table{
  box-shadow: none !important;
}
</style>
