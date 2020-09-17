<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @on-idea-change="ideaChangeHandler"
        @back="back"
        @submit="submit"
        >
        <div style="width:100%" slot="formTable">
          <d-table
            :table-data="tableData"
            :tableHeadData="tableHeadData"
            @changeDate="changeDate">
          </d-table>
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'waitQueryDetailPage',
  data () {
    return {
      titleData: ['交易管理', '待审核记录查询'],
      formModel: {
        payName: '',
        makeName: '',
        payAccount: '',
        makeAccount: '',
        payBank: '',
        makeBank: '',
        payMoney: '',
        makeMoneyBig: '',
        payerWater: '',
        payerClass: '',
        useFunction: '',
        add: '',
        operaMan: '',
        submitDate: '',
        idea: '',
        refuse: '',
        dateArea: {}
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          signAccount: [{ required: true, message: '请选择续费签约账户', trigger: 'submit' }],
          idea: [{ required: true, message: '请选择审核意见', trigger: 'submit' }],
          refuse: [{ required: true, message: '请输入拒绝原因', trigger: 'submit' }],
          dateArea: [{ required: true, message: '请选择时间', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '付款人姓名',
                'type': 'text',
                'key': 'payName'
              },
              {
                'disabled': true,
                'label': '收款人姓名',
                'type': 'text',
                'key': 'makeName'
              },
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payAccount'
              },
              {
                'disabled': true,
                'label': '收款人账号',
                'type': 'text',
                'key': 'makeAccount'
              },
              {
                'disabled': true,
                'label': '付款行',
                'type': 'text',
                'key': 'payBank'
              },
              {
                'disabled': true,
                'label': '收款行',
                'type': 'text',
                'key': 'makeBank'
              },
              {
                'disabled': true,
                'label': '转账金额',
                'type': 'text',
                'key': 'payMoney'
              },
              {
                'disabled': true,
                'label': '金额大写',
                'type': 'text',
                'key': 'makeMoneyBig'
              },
              {
                'disabled': true,
                'label': '交易流水号',
                'type': 'text',
                'key': 'payerWater'
              },
              {
                'disabled': true,
                'label': '交易类型',
                'type': 'text',
                'key': 'payerClass'
              },
              {
                'disabled': true,
                'label': '用途',
                'type': 'text',
                'key': 'useFunction'
              },
              {
                'disabled': true,
                'label': '附言',
                'type': 'text',
                'key': 'add'
              },
              {
                'disabled': true,
                'label': '制单人',
                'type': 'text',
                'key': 'operaMan'
              },
              {
                label: '查询日期',
                type: 'dateArea',
                firstKey: 'startDate',
                secondKey: 'endDate',
                changeEventName: 'changeDate'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '审核意见',
                'type': 'radio',
                'options': [{ 'value': '通过', 'key': '0' }, { 'value': '拒绝', 'key': '1' }],
                'key': 'idea',
                'changeEventName': 'on-idea-change'
              },
              {
                'show': false,
                'disabled': false,
                'label': '拒绝原因',
                'type': 'input',
                'key': 'refuse'
              },
              {
                'slotName': 'formTable'
              }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '审核进度', prop: 'progress' },
        { label: '操作员名', prop: 'operaName' },
        { label: '审核时间', prop: 'exTime' },
        { label: '审核意见', prop: 'exIdea' },
        { label: '审核状态', prop: 'exStatus' }
      ],
      tableData: [
        {
          progress: '一级审核',
          operaName: '李四',
          exTime: '2019-09-01',
          exIdea: '审核通过',
          exStatus: '已审核'
        },
        {
          progress: '一级审核',
          operaName: '李四',
          exTime: '2019-09-01',
          exIdea: '审核通过',
          exStatus: '已审核'
        },
        {
          progress: '一级审核',
          operaName: '李四',
          exTime: '2019-09-01',
          exIdea: '审核通过',
          exStatus: '已审核'
        },
        {
          progress: '一级审核',
          operaName: '李四',
          exTime: '2019-09-01',
          exIdea: '审核通过',
          exStatus: '已审核'
        }
      ],
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    changeDate (params) {
      console.log(params)
    },
    ideaChangeHandler (formModel) {
      const { idea, refuse } = formModel
      this.formModel.refuse = idea === '1' ? refuse : ''
      this.formConfigJson.rules.refuse[0].required = idea === '1'
      this.formConfigJson.formItems[1].group[1].show = idea === '1'
    },
    // 确定
    submit (formModel) {
      const params = {}
      httpPost('', params).then(res => {
        const { data } = this.$route.params
        const params = {
          idea: formModel.idea,
          refuse: formModel.refuse,
          data: [data]
        }
        this.$router.push({
          name: 'confirmPage',
          params
        })
      }).catch(e => {
        console.error(e)
      })
    },
    // 返回
    back (res) {
      this.$router.back()
    }
  },
  created () {
    const { data } = this.$route.params
    this.formModel = { ...this.formModel, ...data }
  }
}
</script>

<style scoped>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
</style>
