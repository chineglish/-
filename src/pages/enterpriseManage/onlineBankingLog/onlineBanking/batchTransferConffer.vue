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
/**
 *@name: 批量转账确认页
 * @author: yuzq
 * @date: 2019-12-9
 */
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { downloadFile } from '@/api/sys/http'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'batchTransferConffer',
  data () {
    return {
      // titleData: ['企业管理台', '网银日志查询', '批量转账确认']
      formConfigJson: {
        formItems: [{
          formWidth: '100%',
          title: '批量转账',
          group: [
            {
              'disabled': true,
              'label': '付款账号',
              'type': 'text',
              'key': 'payerAcNo'
            },
            {
              'disabled': true,
              'label': '总笔数',
              'type': 'text',
              'key': 'totalCount'
            },
            {
              'disabled': false,
              'label': '总金额',
              'type': 'text',
              'key': 'amount',
              formatter: (key, value) => util.formatCurrency(value) + '元'
            },
            {
              'disabled': false,
              'label': '手续费',
              'type': 'text',
              'key': 'feeAmount',
              formatter: (key, value) => util.formatCurrency(value) + '元'
            },
            {
              'disabled': true,
              'label': '下载附件',
              'type': 'link',
              'key': 'filePath',
              'clickEventName': 'select',
              formatter: (value) => {
                var sum = 0
                sum = value ? value.lastIndexOf('/') : ''
                return value ? value.substring(sum + 1) : ''
              }
            }
          ]
        }]
      }
    }
  },
  methods: {
    select (downData) {
      const params = {
        filePath: this.formModel.filePath,
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
