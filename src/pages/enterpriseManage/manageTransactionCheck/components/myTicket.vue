ß<template>
	<div class="waitCheckQuery">
		<div class="form-box">
			<m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
			>
			</m-new-form>
		</div>
		<div class="form-box">
			<d-table
        :table-data="tableData"
        :isPagination="true"
        :actionData="actionData"
        :firstColIndex="firstColIndex"
        :tableHeadData="tableHeadData"
        :pagesize = "pagesize"
        @changeDate="changeDate"
        @handleSelectionChange="changeItem"
        @revoke = "revoke"
        @transDetail="transDetail"
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
      firstColIndex: {
        type: 'selection',
        eventName: '',
        selectable: (row, index) => {
          return ['WCK', 'CK'].includes(row.processState)
        }
      },
      tableHeadData: [
        {
          label: '交易流水',
          prop: 'taskSeq',
          clickEventName: 'transDetail',
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
          }
        },
        { label: '交易类型', prop: 'transCode', formatter: (row, column, cellValue, index) => util.handleEnums(business_Type, cellValue) },
        { label: '制单人', prop: 'userName' },
        { label: '制单时间', prop: 'createTime' }
      ],
      operateData: {
        btnData: []
      },
      tableData: [],
      noShowList: [],
      actionData: [
        {
          btnText: '撤回',
          // type: 'info',
          class: 'm-submit-btn',
          eventName: 'revoke'
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
      console.log(params)
    },
    transDetail (obj) {
      this.removeKeepAliveList() // 清除页面缓存
      switch (obj.transCode) {
        case 'eweb-cash.MultistageBookAuthSet': // 多级账簿权限设置
          this.$router.push({
            name: 'setMultLeveLedgerRootsDetail',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq
            }
          })
          break
        case 'eweb-setting.ApproveProcessSet': // 审批流程设置
          this.$router.push({
            name: 'approvalProcessDetail',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq
            }
          })
          break
        default:
          this.$router.push({
            name: 'managementTransDetails',
            params: {
              detail: obj,
              jnlNo: obj.taskSeq,
              transCode: obj.transCode
            }
          })
          break
      }
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
    // 撤回
    revoke () {
      if (this.currentSelect && this.currentSelect.length > 0) {
        httpPost('/eweb-setting.CheckPassOrRejConfirm.do', {
        }).then(conf => {
          this.$router.push({
            name: 'myTicketConf',
            params: {
              data: this.currentSelect,
              formModel: conf
            }
          })
        }).catch(conf => {
        })
      }
    },
    getData (params) {
      httpPost('eweb-query.SelfAuthQuery.do', params).then(res => {
        this.tableData = res.taskInfo
        this.noShowList = res.noShowList
        this.tableData.forEach(obj => {
          obj.examineStastus = '待审核'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    // },
    // accNoListQry () {
    //   httpPost('eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
    //     this.payerAccNoList = res.AcList || []
    //     this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList.map(item => ({ value: item.acNo + '/' + item.acName, key: item.acNo }))
    //     if (this.$route.params.formModel) {
    //       this.formModel = this.$route.params.formModel
    //     } else {
    //       this.formModel.acNo = this.payerAccNoList[0].acNo
    //       const end = new Date()
    //       const start = new Date()
    //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    //       this.formModel.startDate = start
    //       this.formModel.endDate = end
    //     }
    //     this.submit(this.formModel)
    //   }).catch(err => {
    //     console.error(err)
    //   })
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
    // this.accNoListQry()
  }
}
</script>
