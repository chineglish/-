<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      @clickTableLink="clickTableLink"
    >
    </m-new-form>
  </div>
</template>
<script>
/**
 * @name 小额定期借记业务签约确认
 * @date 2019-12-23
 * @auther 陈天浩
 */
import { downloadFile } from '@/api/sys/http'
import { borrow_busi_type, borrow_busi_kind } from '@/assets/js/entity'
// import { httpPost } from '@/api/sys/http'
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
  name: 'smallLimitBorrowfer',
  data () {
    return {
      // breadData: ['财务管理', '小额定期借记业务签约']
      formConfigJson: {
        formWidth: '100%',
        formItems: [
          {
            title: '小额定期借记业务签约',
            group: [
              {
                'disabled': true,
                'label': '收款账户',
                'type': 'text',
                'key': 'payeeAcName'
              },
              {
                'disabled': true,
                'label': '收款账号',
                'type': 'text',
                'key': 'payeeAcNo'
              },
              {
                'disabled': true,
                'label': '业务类型',
                'type': 'text',
                'key': 'businessType',
                formatter: (key, value) => util.handleEnums(borrow_busi_type, value)
              },
              {
                'disabled': true,
                'label': '业务种类',
                'type': 'text',
                'key': 'businessKind',
                formatter: (key, value) => util.handleEnums(borrow_busi_kind, value)
              },
              {
                'disabled': true,
                'label': '支付金额',
                'type': 'text',
                'key': 'amount',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '明细笔数',
                'type': 'text',
                'key': 'totalCount'
              },
              {
                'disabled': true,
                'label': '回执天数',
                'type': 'text',
                'key': 'receiptLimit'
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'feeAmount',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disable': true,
                'label': '上传附件',
                'key': 'filePath',
                'type': 'link',
                clickEventName: 'clickTableLink',
                formatter: (value) => {
                  var sum = 0
                  sum = value ? value.lastIndexOf('/') : 0
                  return value ? value.substring(sum + 1) : ''
                }
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
    // formatter (object, key) {
    //   if (Array.isArray(object)) {
    //     let arr = object.find(item => item.value === key)
    //     return arr.label
    //   } else {
    //     return object[key]
    //   }
    // }
  },
  created () {
  }
}
</script>
