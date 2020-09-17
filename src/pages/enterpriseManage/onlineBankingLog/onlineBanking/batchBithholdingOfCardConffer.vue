<template>
  <div>
      <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        @clickTableLink="clickTableLink"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
const holdingType = {
  '1': '借记卡代扣',
  '2': '信用卡代扣'
}
const itemType = {
  '2001': '批量代扣'
}
const asFlagType = {
  '1': '需要',
  '2': '不需要'
}
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'batchBithholdingOfCardConffer',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '批量代扣',
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'type': 'text',
                'label': '代扣类型',
                'key': 'withholdingType',
                formatter: (key, value) => holdingType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款账号',
                'key': 'rcvAcNo'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款户名',
                'key': 'rcvAcName'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿号',
                'key': 'asAcNo',
                'show': true
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '账簿名',
                'key': 'asAcName',
                'show': true
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '币种',
                'key': 'rcvCurCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总金额',
                'key': 'totalAmount'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总笔数',
                'key': 'count'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '总条数',
                'key': 'recordNum'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '摘要',
                'key': 'purpose'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '附言',
                'key': 'postscript'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '是否使用账簿',
                'key': 'asFlag',
                formatter: (key, value) => asFlagType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款地址',
                'key': 'rcvAccaddr'
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '收款类型',
                'key': 'itemNo',
                formatter: (key, value) => itemType[value]
              },
              {
                'disabled': true,
                'type': 'text',
                'label': '字段数',
                'key': 'fieldNum'
              },
              {
                'disable': true,
                'label': '上传附件',
                'key': 'uploadFile',
                'type': 'text',
                clickEventName: 'clickTableLink'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    clickTableLink () {
      const params = {
        filePath: this.formModel.filePath,
        fileName: this.formModel.fileName
      }
      downloadFile('eweb-common.DownloadFile.do', params)
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
