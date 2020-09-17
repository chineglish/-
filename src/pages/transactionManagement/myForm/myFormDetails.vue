<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        @submit="submit"
        >
        <div style="width:100%" slot="formTable">
          <d-table
            :table-data="tableData"
            :tableHeadData="tableHeadData">
          </d-table>
        </div>
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'

export default {
  name: 'myFormDetails',
  data () {
    return {
      titleData: ['交易管理', '我的制单'],
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
        submitDate: ''
      },
      formConfigJson: {
        rules: {},
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
                'disabled': true,
                'label': '制单日期',
                'type': 'text',
                'key': 'submitDate'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
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
        { btnText: '撤回', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (formModel) {
      const params = {
        ...formModel
      }
      httpPost('', params).then(res => {
        this.$router.back()
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
