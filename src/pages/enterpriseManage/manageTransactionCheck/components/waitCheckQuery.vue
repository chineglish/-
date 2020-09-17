<template>
    <div class="waitCheckQuery">
        <div class="form-box">
            <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @changeDate="changeDate"
                @submit="submit"
            >
            </m-new-form>
        </div>
        <div class="form-box">
            <d-table
                :table-data="tableData"
                :options="options"
                :isPagination="true"
                :actionData="actionData"
                :firstColIndex="firstColIndex"
                :tableHeadData="tableHeadData"
                :pagesize = "pagesize"
                @changeDate="changeDate"
                @handleSelectionChange="changeItem"
                @paywater = "paywater"
                @agree = "agree"
                @refuse="refuse"
            >
            </d-table>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type } from '@/assets/js/entity'
import { mapMutations } from 'vuex'
import util from '@/libs/util'

export default {
  name: 'waitCheckQuery',
  data () {
    return {
      pagesize: 20,
      formModel: {
        startDate: '',
        endDate: ''
      },
      formConfigJson: {
        dateArea: {},
        rules: {
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
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
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        {
          label: '交易流水',
          prop: 'taskSeq',
          clickEventName: 'paywater',
          checkLink: (value, row) => {
            if (this.noShowList.length !== 0) {
              if (this.noShowList.find(item => item.prdId === row.productId)) {
                return false
              } else {
                return true
              }
            } else {
              return true
            }
          },
          width: '240px;' },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' },
        { label: '审核状态', prop: 'examineStastus' }
      ],
      operateData: {
        btnData: []
      },
      tableData: [],
      noShowList: [],
      actionData: [
        {
          btnText: '通过',
          class: 'm-submit-btn',
          eventName: 'agree'
        },
        {
          btnText: '拒绝',
          class: 'm-cancel-btn',
          eventName: 'refuse'
        }
      ],
      currentSelect: null,
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
    changeItem (obj) {
      this.currentSelect = obj
    },
    submit (obj) {
      let params = {
        start: obj.startDate,
        end: obj.endDate,
        mgmtFlag: '2'
      }
      let s = new Date(params.start).getTime()
      let e = new Date(params.end).getTime()
      let result = (e - s) / 1000 / 60 / 60 / 24
      result > 183 ? this.$msg('查询时间间隔不能超过 6 个月') : this.getData(params)
    },
    // 通过
    agree () {
      // AG：通过  RJ：拒绝   CC：撤销
      if (this.currentSelect && this.currentSelect.length > 0) {
        httpPost('/eweb-setting.CheckPassOrRejConfirm.do', {
        }).then(conf => {
          this.$router.push({
            name: 'waitCheckConfirm',
            params: {
              data: this.currentSelect,
              formModel: conf
            }
          })
        })
      } else {
        this.$msg('请进行选择')
      }
    },
    // 拒绝
    refuse () {
      this.removeKeepAliveList() // 清除页面缓存
      if (this.currentSelect && this.currentSelect.length > 0) {
        this.$router.push({
          name: 'checkRefuseInner',
          params: { data: this.currentSelect }
        })
      } else {
        this.$msg('请进行选择')
      }
    },
    paywater (obj) {
      this.removeKeepAliveList() // 清除页面缓存
      console.log(obj.transCode)
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
    getData (params) {
      httpPost('eweb-query.WaitAuthQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.tableData.forEach(obj => {
          obj.examineStastus = '待审核'
        })
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
      mgmtFlag: '2'
    }
    this.getData(params)
  }
}
</script>
