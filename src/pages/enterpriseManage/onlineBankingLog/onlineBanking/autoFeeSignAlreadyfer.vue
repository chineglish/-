<template>
  <div>
    <div class="form-box">
      <d-table
        :tableData="tableData"
        :tableHeadData="tableHeadData"
      >
      </d-table>
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
      >
    </m-new-form>
    </div>
  </div>
</template>
<script>
// import { httpPost } from '@/api/sys/http'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'autoFeeSignAlreadyfer',
  data () {
    return {
      // titleData: ['企业管理台', '网银日志查询', '证书自动扣费解约']
      tableHeadData: [
        {
          label: '操作员号',
          prop: 'userId'
        },
        {
          label: '操作员姓名',
          prop: 'userName'
        },
        {
          label: '证书ID',
          prop: 'keyId'
        },
        {
          label: '签约缴费账号',
          prop: 'feeAcNo'
        },
        {
          label: '扣费提前通知手机号',
          prop: 'mobilePhone'
        },
        {
          label: '收费标准(张/年)',
          prop: 'feeAmount'
        }
      ],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '证书自动扣费解约',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '付款账户',
                'key': 'payerAcName'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '签约手机号',
                'key': 'mobilePhone'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    // 修改签约信息
    // 解约
    // 弹框取消按钮
    // 弹框确认按钮
  },
  created () {
  }
  // created () {
  //   this.AutDedFeeSignQry()
  // }
}
</script>

<style lang="scss">
</style>
