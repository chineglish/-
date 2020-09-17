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
    <div style="clear: both"></div>
    <div v-if="showDataTable">
      <enterpriseOnline-Banking v-if="this.userList.cif.epflag !== true"
        :resultList="resultList"
        :pageInformation="pageInformation"
        >
      </enterpriseOnline-Banking>
    </div>
    <div v-if="showTable">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
        :pageNation="pageNation"
        :operateData="operateData"
        @clickLink="clickLink"
        @goToDetailDaYin="goToDetailDaYin"
        @backHandler="backHandler"
      ></d-table>
    </div>
  </div>
</template>

<script>
/**
   * @name: 老网银日志查询
   */
import enterpriseOnlineBanking from './oldjnlqry/enterpriseOnlineBanking'
import { httpPost } from '@/api/sys/http'
import { trsEntity, jnlTrsStatus } from '@/assets/js/entity'
import PageNation from '../../../components/d-table/PageNation'
import util from '../../../libs/util'
export default {
  name: 'oldjnlqry',
  components: {
    enterpriseOnlineBanking
  },
  data: function () {
    return {
      formModel: {
        jnlNo: '',
        acNo: 'all',
        acNo2: '',
        beginDate: '',
        jnlTrsStatus: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          beginDate: [{ required: true, message: '请选择开始日期', trigger: 'submit' }],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '付款账号',
                'type': 'select',
                options: [],
                'key': 'payerAcList',
                'show': true
              },
              {
                'disabled': false,
                'label': '收款账号',
                'type': 'input',
                'key': 'acNo2',
                'show': true
              },
              {
                'disabled': false,
                'label': '交易流水号',
                'type': 'input',
                'key': 'jnlNo',
                'show': true
              },
              {
                'disabled': false,
                'label': '交易状态',
                'type': 'select',
                options: [
                  { value: '全部状态', key: 'AL' },
                  { value: '状态未明', key: '-1' },
                  { value: '待审核', key: 'NU' },
                  { value: '审核退回', key: 'TR' },
                  { value: '审核拒绝', key: 'CX' },
                  { value: '审核完成', key: 'TS' },
                  { value: '定时待处理', key: 'AT' },
                  { value: '审核完成（交易失败）', key: 'AC' },
                  { value: '交易失败，主机拒绝', key: 'TF' },
                  { value: '退回后被删除状态', key: 'TD' },
                  { value: '修改完毕，流程结束', key: 'XB' },
                  { value: '已录入待审核', key: '00' },
                  { value: '定时交易已撤销', key: 'CT' }
                ],
                'key': 'jnlTrsStatus',
                'show': true
              },
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'beginDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      data: ['企业管理台', '老网银日志查询'],
      pageNation: '',
      currentPage: 1,
      // 以下为动态数据
      tableHeadData: [
        {
          width: 220,
          label: '交易流水号',
          prop: 'jnlNo',
          clickEventName: 'clickLink'
        },
        {
          label: '交易日期',
          prop: 'date',
          formatter: (row, column, cellValue, index) => util.separationStrDateWithLine(cellValue)
        },
        {
          label: '交易时间',
          prop: 'dateTime',
          formatter: (row, column, cellValue, index) => util.separationStrTimeWithLine(cellValue)
        },
        {
          label: '交易类型',
          prop: 'transName',
          formatter: (row, column, cellValue, index) => util.handleEnums(trsEntity, cellValue)
        },
        {
          label: '交易状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => util.handleEnums(jnlTrsStatus, cellValue)
        }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '回单打印',
            pick: (obj) => this.getPick(obj),
            // obj.transName === 'EE0112' || obj.transName === 'EE0122' || obj.transName === 'EP012002' || obj.transName === 'EP013002' ，
            eventName: 'goToDetailDaYin'
          }
        ]
      },
      options: { // table属性
        border: true,
        stripe: true
      },
      showTable: false,
      // 判断用户类型（老网银，小企业）
      showDataTable: false,
      resultList: {}, // 结果信息
      userList: [], // 用户信息
      pageInformation: {} // 页面信息
    }
  },
  methods: {
    getPick (obj) {
      const value = obj.transName
      const arr = ['EE0112', 'EE011201', 'EE0122', 'EE0162', 'EE040203']
      const statusValue = obj.status
      const statusArr = [
        '0',
        'TS'
      ]
      return arr.filter(item => item === value).length > 0 && statusArr.filter(item => item === statusValue).length > 0 
    },
    goToDetailDaYin (obj) {
      let params = {
        date: util.separationStrDateWithLine(obj.data.date),
        jnlNo: obj.data.jnlNo
      }
      if (this.showTable) {
        params.tableName = obj.data.tableName
      }
      httpPost('/eweb-operator.QryOldJnlDetail.do', params).then(res => {
        // console.log(66666666666, res)
        this.$router.push({
            name: 'oldDaYin',
            params: {
              data: res,
              formModel: this.formModel
            }
          })
        // EE0112 行内
        // EE011201 行内定时
        // if (obj.data.transName === 'EE0112' || obj.data.transName === 'EE011201') {
        //   this.$router.push({
        //     name: 'oldDaYinXiao1',
        //     params: {
        //       data: res,
        //       formModel: this.formModel
        //     }
        //   })
        // } else {
        //   this.$router.push({
        //     name: 'oldDaYinXiao',
        //     params: {
        //       data: res,
        //       formModel: this.formModel
        //     }
        //   })
        // }
        // EE0122 跨行
        // EE040203 跨行定时  没测试
        // EE0162 上海同城
      })
    },
    changeDate (res) {
      this.formModel.beginDate = res.beginDate
      this.formModel.endDate = res.endDate
      this.formModel.jnlTrsStatus = res.jnlTrsStatus
      this.formModel.jnlNo = res.jnlNo
      this.formModel.acNo2 = res.acNo2
      this.formModel.payerAcList = res.payerAcList
    },
    pageChangeHandler (currentPage, params, size) {
      // this.currentPage = currentPage
      params.currentPage = currentPage
      // if (size) { params.pageSize = size }
      httpPost('/eweb-operator.QryOldJnlList.do', params).then(result => {
        // this.pageNation = new PageNation(result.pageSize, currentPage, result.totalCount, (currentPage) => {
        //   this.pageChangeHandler(currentPage, params)
        // })
        this.tableData = result.list
        this.showTable = true
      }).catch(() => {
        this.showTable = false
      })
    },
    inquire (res) {
      this.showTable = false
      this.showDataTable = false
      if (this.userList.cif.epflag !== false) {
        res = {
          beginDate: res.beginDate,
          endDate: res.endDate
        }
      } else {
        this.formModel = res
      }
      let params = {
        ...res,
        pageSize: 20,
        currentPage: this.currentPage
      }
      httpPost('/eweb-operator.QryOldJnlList.do', params).then(result => {
        this.pageNation = new PageNation(result.pageSize, result.currentPage, result.totalCount, (currentPage, size) => {
          if (size) { params.pageSize = size }
          this.pageChangeHandler(currentPage, params, size)
        })
        if (this.userList.cif.epflag !== true) {
          this.tableData = result.list
          this.pageInformation = this.formModel
          this.resultList = result
          this.showTable = false
          this.showDataTable = true
        } else {
          this.tableData = result.list
          this.showTable = true
          this.showDataTable = false
        }
      }).catch(() => {
        this.showTable = false
      })
    },
    clickLink (res) {
      // 跳转详情页
      this.$router.push({
        name: 'smallBusinessOnlineBanking',
        params: {
          condition: this.formModel,
          formModel: res,
          currentPage: this.currentPage
        }
      })
    },
    backHandler () {
      this.showTable = false
    },
    onReset (res) {
      const dateArea = util.filterDate('1')
      res.beginDate = dateArea.startDate
      res.endDate = dateArea.endDate
      res.jnlNo = ''
      this.showTable = false
      this.showDataTable = false
    }
  },
  created () {
    const user = this.getUser()
    this.userList = user
    if (user.cif.epflag !== false) {
      this.formConfigJson.formItems[0].group[0].show = false
      this.formConfigJson.formItems[0].group[1].show = false
      this.formConfigJson.formItems[0].group[2].show = false
      this.formConfigJson.formItems[0].group[3].show = false
    }
    this.formConfigJson.formItems[0].group[0].options = user.acList.map(item => ({ value: item.acNo + '/' + item.acName, key: item.acNo + '-' + item.subAcNo }))
    this.currentPage = this.$route.params.currentPage ? this.$route.params.currentPage : 1
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.condition
      this.inquire(this.formModel)
    } else {
      this.onReset(this.formModel)
    }
  }
}
</script>
