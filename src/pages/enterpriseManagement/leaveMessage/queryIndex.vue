<template>
  <d2-container class="leave-message-query">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @submit="submit"
        @on-add="addHandler"
      >
      </m-new-form>
      <d-table
        :table-data="tableData"
        :options="options"
        :firstColIndex="firstColIndex"
        :pagesize="20"
        :tableHeadData="tableHeadData"
        :infoTips="infoTips"
        :actionData="actionData"
        :operateData="operateData"
        @handleSelectionChange="tableSelectChange"
        @on-back="backHandler"
        @on-detail="detailHandler"
        @handleTipsClick="handleTipsClick"
      >
      </d-table>
      <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'leave-message-query',
  data () {
    return {
      breadData: ['企业管理台', '留言服务', '留言查询'],
      formModel: {
        name: this.getUser().userName,
        status: '2',
        dateRange: ''
      },
      msgs: [
        '可查询企业用户给银行的留言记录。'
      ],
      formConfigJson: {
        rules: {
          status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
        },
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '30%',
            group: [
              {
                label: '留言人',
                key: 'name',
                type: 'text',
                disabled: true
              },
              {
                label: '留言状态',
                key: 'status',
                type: 'radio',
                options: [
                  { value: '全部', key: '2' },
                  { value: '未回复', key: '0' },
                  { value: '已回复', key: '1' }
                ]
              },
              {
                label: '查询日期',
                type: 'dateArea',
                dateType: 'daterange',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '新增留言', class: 'm-submit-btn', clickEventName: 'on-add' }
      ],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      firstColIndex: {
        type: 'index',
        label: '序号'
      },
      tableHeadData: [
        {
          label: '留言主题',
          prop: 'msgTitle',
          formatter: (row, column, cellValue, index) => cellValue
        },
        {
          label: '留言时间',
          prop: 'submitTime',
          formatter: (row, column, cellValue, index) => cellValue
        },
        {
          label: '留言人',
          prop: 'userName'
        },
        {
          label: '回复状态',
          prop: 'hfFlag',
          formatter: (row, column, cellValue, index) => this.huifuStatus[cellValue]
        }
      ],
      tableData: [],
      actionData: [
        // {
        //   btnText: '新增留言',
        //   type: 'info',
        //   class: 'm-submit-btn',
        //   eventName: 'on-add'
        // }
      ],
      operateData: {
        btnData: [
          {
            type: 'primary',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'on-detail'
          }
        ]
      },
      selectionData: [],
      huifuStatus: {
        '0': '未回复',
        '1': '已回复'
      }
    }
  },
  methods: {
    changeDate (params) {
      console.log(params)
    },
    changeItem (obj) {
      this.currentSelect = obj
    },
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selectionData = selection
    },
    submit (res) {
      // 查询
      this.listQry(res)
    },
    listQry (data) {
      this.tableData = []
      if (data) {
        const params = {
          beginDate: data.startDate,
          endDate: data.endDate,
          HF_FLAG: data.status,
          userName: this.getUser().userName,
          userId: this.getUser().userId
        }
        httpPost('eweb-query.MessageQuery.do', params).then(res => {
          this.tableData = res.list
          this.$forceUpdate()
        }).catch(err => {
          console.error(err)
        })
      } else {
        const params = {
          beginDate: '',
          endDate: '',
          HF_FLAG: '2',
          userName: this.getUser().userName,
          userId: this.getUser().userId
        }
        httpPost('eweb-query.MessageQuery.do', params).then(res => {
          this.tableData = res.list
        }).catch(err => {
          console.error(err)
        })
      }
    },
    addHandler (res) {
      // 新增
      this.$router.push({ name: 'leaveMessagePre' })
    },
    detailHandler (res) {
      this.$router.push({ name: 'queryDetail', params: res })
    },
    backHandler (res) {
      // 返回
      this.$router.back()
    },
    handleTipsClick (res) {
      //  下载失败/成功明细
    }
  },
  created () {
    let start = new Date()
    let end = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.startDate = start
    this.formModel.endDate = end
    const params = {
      startDate: start,
      endDate: end
    }
    this.listQry(params)
  },
  mounted () {
    this.formModel.name = this.getUser().cif.cifName
  }
}
</script>
