<template>
  <div class="main" id="onlineBankingLog">
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @reset="onReset"
      @changeDate="changeDate"
      @submit="inquire"
    >
    </m-new-form>
    <div v-if="showTable">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pageNation="pageNation"
        :action-data="actionData"
        @clickLink="clickLink"
        @downLoadData="downLoadData"
        @backHandler="backHandler"
      ></d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script>
/**
 * @name: 网银日志查询
 */
import { httpPost, downloadFile } from '@/api/sys/http'
import { prd_id, operator_state } from '@/assets/js/entity'
import PageNation from '@/components/d-table/PageNation'
import util from '@/libs/util'
export default {
  name: 'onlineBankingLog',
  data: function () {
    return {
      formModel: {
        jnlNo: '',
        mgmtPrdFlag: '',
        flag: true,
        startDate: '',
        endDate: '',
        processState: ''
      },
      msgs: [
        '用户选择企业管理台-网银日志查询，用于企业用户查询网银日志信息。'
      ],
      formConfigJson: {
        rules: {
          startDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '交易流水号',
                'type': 'input',
                'key': 'jnlNo'
              },
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                options: [
                  { value: '全部', key: '' },
                  { value: '账务类交易', key: '1' },
                  { value: '管理类交易', key: '2' },
                  { value: '非账务类交易', key: '0' },
                  { value: '登录退出', key: 'login' }
                ],
                'key': 'mgmtPrdFlag'
              },
              // {
              //   'disabled': false,
              //   'label': '操作状态',
              //   'type': 'select',
              //   options: [
              //     { value: '全部', key: '' }
              //     // { value: '审核通过', key: 'OK' },
              //     // { value: '审核退回', key: 'RC' }
              //   ],
              //   'key': 'processState'
              // },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              },
              {
                label: '排序类型',
                'type': 'radio',
                options: [{ value: '按时间正序排列', key: false }, { value: '按时间倒序排列', key: true }],
                'key': 'flag'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      searchModel: {},
      data: ['企业管理台', '网银日志查询'],
      pageNation: '',
      pageIndex: 1,
      // 以下为动态数据
      tableHeadData: [
        { label: '交易时间',
          prop: 'transTime',
          width: '200px'
        },
        { width: 220,
          label: '交易流水号',
          prop: 'jnlNo',
          clickEventName: 'clickLink'
        },
        {
          width: 200,
          label: '业务类型',
          prop: 'prdName',
          formatter: (row, column, cellValue, index) => cellValue || util.handleEnums(prd_id, row.prdId)
        },
        // { label: '金额', prop: 'amount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '操作状态',
          prop: 'jnlState',
          formatter: (row, column, cellValue, index) => util.handleEnums(operator_state, cellValue)
        },
        { label: '失败原因',
          prop: 'returnMsg',
          formatter: (row, column, cellValue, index) => row.jnlState === 'C' ? '' : cellValue
        }
      ],
      tableData: [
      ],
      actionData: [
        { btnText: '下载', class: 'm-submit-btn', eventName: 'downLoadData' },
        { btnText: '返回', class: 'm-cancel-btn', eventName: 'backHandler' }
      ],
      showTable: false
    }
  },
  methods: {
    changeDate (params) {
      // console.log(params)
    },
    pageChangeHandler (pageIndex, params) {
      // this.pageIndex = pageIndex
      params.pageIndex = pageIndex
      httpPost('/eweb-operator.QueryJnlList.do', params).then(result => {
        this.tableData = result.mcJnls
        this.showTable = true
      }).catch(() => {
        this.showTable = false
      })
    },
    inquire (res) {
      // 根据选择，后端传值需求改变
      this.showTable = false
      if (res.mgmtPrdFlag === '0' || res.mgmtPrdFlag === '1') {
        res.acFlag = res.mgmtPrdFlag
        delete res.mgmtPrdFlag
        this.formModel = res
      } else {
        this.formModel.mgmtPrdFlag = res.mgmtPrdFlag
        this.formModel = res
      }
      let params = {
        ...res,
        oneTime: res.startDate,
        pageSize: 20,
        pageIndex: this.pageIndex,
        stopTime: res.endDate,
        processState: res.processState
      }
      httpPost('/eweb-operator.QueryJnlList.do', params).then(result => {
        this.pageNation = new PageNation(result.pageSize, result.pageIndex, result.recordNumber, (pageIndex, size) => {
          if (size) { params.pageSize = size }
          this.pageChangeHandler(pageIndex, params)
        })
        if (this.tableHeadData.length > '5') {
          this.tableHeadData.splice(3, 1)
        }
        if (res.mgmtPrdFlag !== 'login') {
          this.tableHeadData.splice(3, 0, {
            label: '金额',
            prop: 'amount',
            width: 200,
            formatter: (row, column, cellValue, index) => util.formatCurrencyForm(cellValue)
          })
        } else {
          this.tableHeadData.splice(3, 0, {
            label: '操作员名',
            width: 200,
            prop: 'userName'
          })
        }
        this.tableData = result.mcJnls
        this.showTable = true
      })
      // 页面显示问题
      if (this.formModel.acFlag === '1' || this.formModel.acFlag === '0') {
        this.formModel.mgmtPrdFlag = this.formModel.acFlag
        delete this.formModel.acFlag
      } else {
        this.formModel.mgmtPrdFlag = this.formModel.mgmtPrdFlag
      }
    },
    clickLink (res) {
      // 跳转详情页
      this.$router.push({
        name: 'onlineBankingLogDetail',
        params: {
          condition: this.formModel,
          formModel: res,
          mgmtPrdFlag: this.formModel.mgmtPrdFlag,
          startDate: this.formModel.startDate,
          endDate: this.formModel.endDate,
          flag: this.formModel.flag,
          pageIndex: this.pageIndex,
          prdId: this.prdId
        }
      })
    },
    downLoadData () {
      const res = this.formModel
      downloadFile('/eweb-operator.JnlListDownload.do', {
        _Download: 'xls',
        jnlNo: res.jnlNo,
        oneTime: res.startDate,
        stopTime: res.endDate,
        flag: res.flag,
        // jnlState: this.formModel.jnlState,
        mgmtPrdFlag: res.mgmtPrdFlag === '2' || res.mgmtPrdFlag === 'login' ? res.mgmtPrdFlag : '',
        acFlag: res.mgmtPrdFlag === '0' || res.mgmtPrdFlag === '1' ? res.mgmtPrdFlag : '',
        processState: res.processState
      })
    },
    backHandler () {
      this.$router.push({
        name: 'index'
      })
    },
    onReset (res) {
      const dateArea = util.filterDate('1')
      res.startDate = dateArea.startDate
      res.endDate = dateArea.endDate
      res.mgmtPrdFlag = ''
      res.jnlNo = ''
      res.processState = ''
      this.showTable = false
    }
  },
  created () {
    this.pageIndex = this.$route.params.pageIndex ? this.$route.params.pageIndex : 1
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params
      this.inquire(this.formModel)
    } else {
      this.onReset(this.formModel)
    }
  }
}
</script>
