<template>
    <div>
        <div class="main">
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit"
            >
            </m-new-form>
        </div>
        <div class="checkQuery">
            <d-table
              :pagesize="pagesize"
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :operateData="operateData"
              @handleSee="handleSee"
              @changeDate="changeDate"
              @onBack="onBack"
            >
            </d-table>
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
  name: 'checkQuery',
  data () {
    return {
      pagesize: 20,
      formModel: {
        dateArea: {},
        busClass: '1',
        exStatus: '1',
        start: '',
        end: ''
      },
      formConfigJson: {
        rules: {
          start: [{ required: true, message: '请选择日期', trigger: 'submit' }],
          end: [{ required: true, message: '请选择日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                label: '查询时间',
                type: 'dateArea',
                firstKey: 'start',
                secondKey: 'end',
                changeEventName: 'changeDate',
                endRestrictionStart: Date.now()
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      tableHeadData: [
        { label: '交易流水', prop: 'jnlno', width: '240' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime', width: '200' },
        { label: '审核日期', prop: 'actCheckTime', width: '200' },
        { label: '审核状态', prop: 'authProcessStateVal', style: (value) => value === '通过' ? 'color: #03AF3A;' : 'color: #D70110;' }
      ],
      operateData: {
        width: '80px',
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
            eventName: 'handleSee'
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
          // type: 'info',
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
      // console.log(params)
    },
    // 查询
    submit (obj) {
      const params = {
        start: util.formatDate(obj.start),
        end: util.formatDate(obj.end),
        mgmtFlag: '2'
      }
      let s = new Date(params.start).getTime()
      let e = new Date(params.end).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      result > 183 ? this.$msg('查询时间间隔不能超过 6 个月') : this.getData(params)
    },
    // 查看
    handleSee (obj) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (obj.data.transCode) {
        case 'eweb-cash.MultistageBookAuthSet': // 多级账簿权限设置
          this.$router.push({
            name: 'setMultLeveLedgerRootsDetail',
            params: {
              detail: obj.data,
              jnlNo: obj.data.jnlno,
              type: '2'
            }
          })
          break
        case 'eweb-setting.ApproveProcessSet': // 审批流程设置
          this.$router.push({
            name: 'approvalProcessDetail',
            params: {
              detail: obj.data,
              jnlNo: obj.data.jnlno,
              type: '2'
            }
          })
          break
        default:
          this.$router.push({
            name: 'managementTransDetails',
            params: {
              detail: obj.data,
              jnlNo: obj.data.jnlno,
              transCode: obj.data.transCode,
              type: '2'
            }
          })
          break
      }
    },
    confirm () {
      this.$router.push({
        name: 'checkQuery'
      })
    },
    onBack () {
      this.$router.push({
        name: 'index'
      })
    },
    getData (params) {
      httpPost('eweb-query.WaitAuthedQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.tableData.forEach(item => {
          this.$set(item, 'authProcessStateVal', item.authProcessState === 'AG' ? '通过' : '拒绝')
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList.map(item => ({ value: item.acNo + '/' + item.acName, key: item.acNo }))
        if (this.$route.params.formModel) {
          this.formModel = this.$route.params.formModel
        } else {
          this.formModel.acNo = this.payerAccNoList[0].acNo
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          this.formModel.start = start
          this.formModel.end = end
        }
        this.submit(this.formModel)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () { // eweb-query.WaitAuthedQuery.do
    let start = new Date()
    let end = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.start = start
    this.formModel.end = end
    const params = {
      start: start,
      end: end,
      mgmtFlag: '2'
    }
    this.getData(params)
    // this.accNoListQry()
  }
}
</script>
<style scoped>
.checkQuery >>> .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  background-color: #FFF !important;
  border-color: #FFF !important;
  color: #C0C4CC !important;
}
</style>
