<template>
  <div>
    <div class="main">
      <div class="form-box">
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @on-submit="submitHandler"
        >
        </m-new-form>
      </div>
      <div class="queryPage">
        <d-table
          :table-data="tableData"
          :options="options"
          :pagesize="pagesize"
          :tableHeadData="tableHeadData"
          :actionData="actionData"
          :operateData="operateData"
          @on-review="reviewHandler"
          @changeDate="changeDate"
          @onBack="onBack"
        >
        </d-table>
      </div>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import { mapMutations } from 'vuex'
import util from '../../../../libs/util'

export default {
  name: 'queryPage',
  data () {
    return {
      msgs: [
        '该功能用于查询本人制单或审核过的业务类交易审核记录。'
      ],
      backI: false,
      cancelData: null,
      pagesize: 20,
      formModel: {
        startDate: '',
        endDate: '',
        busClass: '2',
        exStatus: '2'
      },
      formConfigJson: {
        formWidth: '100%',
        rules: {
          busClass: [{ required: true, message: '请选择', trigger: 'submit' }],
          exStatus: [{ required: true, message: '请选择', trigger: 'submit' }],
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '2' },
                  { 'value': '账务类交易', 'key': '1' },
                  { 'value': '其他业务', 'key': '0' }
                ],
                'key': 'busClass'
              },
              {
                'disabled': false,
                'label': '审核状态',
                'type': 'select',
                'options': [
                  { 'value': '全部', 'key': '2' },
                  { 'value': '通过', 'key': 'AG' },
                  { 'value': '拒绝', 'key': 'RJ' },
                  { 'value': '落地', 'key': 'WAP' }
                ],
                'key': 'exStatus'
              },
              {
                label: '查询日期',
                type: 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate',
                endRestrictionStart: Date.now()
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'on-submit' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      // firstColIndex: {
      //   type: 'selection',
      //   eventName: ''
      // },
      tableHeadData: [
        { label: '交易流水', prop: 'jnlno', width: '240' },
        { label: '交易类型', prop: 'transCode', width: '125', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '交易金额', prop: 'amount', width: '145', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime', width: '200' },
        { label: '审核日期', prop: 'actCheckTime', width: '200' },
        { label: '审核状态', prop: 'authProcessState', style: (value) => value === 'AG' ? 'color: #03AF3A;' : 'color: #D70110;', formatter: (row, column, cellValue, index) => cellValue === 'AG' ? '通过' : '拒绝' }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            pick: (row) => {
              if (this.noShowList.length !== 0) {
                if (this.noShowList.find(item => item.prdId !== row.productId)) {
                  return true
                } else {
                  return false
                }
              } else {
                return true
              }
            },
            btnText: '查看',
            eventName: 'on-review'
          },
          {
            type: 'text',
            size: 'mini',
            plain: true,
            pick: (row) => {
              if (this.noShowList.length !== 0) {
                if (this.noShowList.find(item => item.prdId !== row.productId)) {
                  return false
                } else {
                  return true
                }
              } else {
                return false
              }
            },
            btnText: '查看',
            disabled: true
          }
        ]
      },
      tableData: [],
      noShowList: [],
      actionData: [
        {
          btnText: '返回首页',
          class: 'm-cancel-btn',
          eventName: 'onBack'
        }
      ],
      loading: true
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    changeDate (params) {
      console.log(params)
    },
    // 查询
    submitHandler (formModel) {
      const params = {
        acFlag: formModel.busClass,
        processState: formModel.exStatus,
        start: formModel.startDate,
        end: formModel.endDate
      }
      let s = new Date(params.start).getTime()
      let e = new Date(params.end).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      result > 183 ? this.$msg('查询时间间隔不能超过 6 个月') : this.getData(params)
    },
    // 查看
    reviewHandler (row) {
      const { data } = row
      this.removeKeepAliveList() // 清除页面缓存
      console.log(data.transCode)
      switch (data.transCode) {
        case 'eweb-transfer.SocialSecurityContribution': // 社保缴费
          this.$router.push({
            name: 'socialSecurityPaymentDetail',
            params: {
              detail: row.data,
              jnlNo: data.jnlno,
              type: '2'
            }
          })
          break
        case 'eweb-enterprise.AutDedFeeRel': // 自动签约扣费维护-解约
          this.$router.push({
            name: 'autDedFeeRelDetail',
            params: {
              detail: row.data,
              jnlNo: data.jnlno,
              type: '2'
            }
          })
          break
        case 'eweb-cash.CollectDateSet': // 归集周期设置
          this.$router.push({
            name: 'collectPerSetDetail',
            params: {
              detail: row.data,
              jnlNo: data.jnlno,
              type: '2'
            }
          })
          break
        case 'eweb-cash.TimingCollectSet': // 定时归集设置
          this.$router.push({
            name: 'periodicColSetDetail',
            params: {
              detail: row.data,
              jnlNo: data.jnlno,
              type: '2'
            }
          })
          break
        default:
          this.$router.push({
            name: 'transactionManagementDetails',
            params: {
              detail: row.data,
              transCode: data.transCode,
              jnlNo: data.jnlno,
              type: '2'
            }
          })
          break
      }
    },
    onBack () {
      this.$router.push({ name: 'index' })
    },
    getData (params) {
      httpPost('eweb-query.WaitAuthedQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    let start = new Date()
    let end = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.startDate = start
    this.formModel.endDate = end
    const params = {
      start: start,
      end: end,
      acFlag: this.formModel.busClass,
      processState: this.formModel.exStatus
    }
    this.getData(params)
  }
}
</script>
<style scoped>
.queryPage >>> .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  background-color: #FFF !important;
  border-color: #FFF !important;
  color: #C0C4CC !important;
}
</style>
