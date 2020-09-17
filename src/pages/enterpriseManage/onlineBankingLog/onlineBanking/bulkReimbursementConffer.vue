<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      @select="select"
      >
    </m-new-form>
  </div>
</template>
<script>
import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'bulkReimbursementConffer',
  data () {
    return {
      // breadData: ['财务管理', '财务报销', '批量报销'],
      // 以下为动态数据
      formConfigJson: {
        formItems: [
          {
            title: '批量报销',
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '合同号',
                'type': 'text',
                'key': 'contractNo'
              },
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '报销总笔数',
                'type': 'text',
                'key': 'totalCount'
              },
              {
                'disabled': true,
                'label': '报销总金额',
                'type': 'text',
                'key': 'amount',
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '模板名称',
                'type': 'text',
                'key': 'templateName'
              },
              {
                'disabled': true,
                'label': '文件名称',
                'type': 'link',
                'key': 'sourceFilePath',
                'clickEventName': 'select',
                formatter: (value) => {
                  var sum = 0
                  sum = value ? value.lastIndexOf('/') : 0
                  return value ? value.substring(sum + 1) : ''
                }
              },
              {
                'disabled': true,
                'label': '上传文件类型',
                'type': 'text',
                'key': 'fileType'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    select () {
      const params = {
        filePath: this.formModel.sourceFilePath,
        fileName: this.formModel.fileName
      }
      downloadFile('/eweb-common.DownloadFile.do', params)
    }
  },
  created () {
    this.formModel.payerAcNo = this.formModel.payerAccount.acNo
  }
}
</script>

<style scoped>
</style>
