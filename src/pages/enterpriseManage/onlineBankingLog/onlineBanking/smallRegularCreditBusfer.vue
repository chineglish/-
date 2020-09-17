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
<script>/**
     * @name 小额定期贷记业务
     * @date 2019-12-21
     * @auther 陈天浩
     */

// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { downloadFile } from '@/api/sys/http'
import { busi_type, busi_kind } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'smallRatedCreditBusfer',
  data () {
    return {
      // breadData: ['财务管理', '小额定期贷记业务'],
      // 以下为动态数据
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '小额定期贷记业务',
            group: [
              {
                'disabled': true,
                'label': '付款账号',
                'type': 'text',
                'key': 'payerAcNo'
              },
              {
                'disabled': true,
                'label': '付款账户',
                'type': 'text',
                'key': 'payerAcName'
              },
              {
                'disabled': true,
                'label': '业务类型',
                'type': 'text',
                'key': 'businessType',
                formatter: (key, value) => util.handleEnums(busi_type, value)
              },
              {
                'disabled': true,
                'label': '业务种类',
                'type': 'text',
                'key': 'businessKind',
                formatter: (key, value) => util.handleEnums(busi_kind, value)
              },
              {
                'disabled': true,
                'label': '合同(协议)号',
                'type': 'text',
                'key': 'protocalNo'
              },
              {
                'disabled': true,
                'label': '单笔手续费',
                'type': 'text',
                'key': 'singleFee',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': true,
                'label': '手续费',
                'type': 'text',
                'key': 'feeAmount',
                formatter: (name, value) => util.formatCurrency(value)
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
  },
  created () {
    // if (this.$route.params.formModel) {
    //   Object.assign(this.formModel, this.$route.params.formModel)
    //   this.formModel.feeAmt = util.formatCurrency(this.formModel.feeamount)
    //   this.formModel.payerAmtShow = util.formatCurrency(this.formModel.payerAmt)
    // }
  }
}
</script>
