<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
    >
    </m-new-form>
    <d-table
      :tableData="tableData"
      :tableHeadData="tableHeadData"
      >
    </d-table>
  </div>
</template>

<script>
import util from '@/libs/util'
import { prd_id } from '@/assets/js/entity'
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
  name: 'approveProcessSetfer',
  data () {
    return {
      tableHeadData: [
        { label: '审核级别', prop: 'level' },
        { label: '操作员名', prop: 'userName' },
        { label: '操作员顺序号', prop: 'userId' }
      ],
      // data: ['企业管理台', '审批流程设置']
      formConfigJson: {
        formItems: [
          {
            title: '企业管理台 > 审批流程设置',
            formWidth: '100%',
            group: [
              {
                'label': '账号',
                'key': 'acNo',
                'type': 'text',
                'disabled': true,
                'show': true
              },
              {
                'label': '交易名称',
                'key': 'productId',
                'type': 'text',
                'disabled': true,
                formatter: (value) => util.handleEnums(prd_id, this.formModel.productId ? this.formModel.productId : '')
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    if (!this.formModel.acNo) {
      this.formConfigJson.formItems[0].group[0].show = false
    }
  }
}
</script>
<style  scoped>
</style>
