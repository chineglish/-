<template>
  <m-new-form
    :componentJson="formConfigJson"
    :formModel="formModel"
    >
  </m-new-form>
</template>

<script>
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'commonCurrentAccountConf',
  data () {
    return {
      formConfigJson: {
        formItems: [
          {
            title: '常用往来账户管理',
            formWidth: '100%',
            group: [
              {
                'disbale': true,
                'type': 'text',
                'label': '收款账号',
                'key': 'payeeAcNo'
              },
              {
                'disbale': true,
                'type': 'text',
                'label': '收款账户名称',
                'key': 'payeeAcName'
              },
              {
                'disbale': true,
                'type': 'text',
                'label': '收款账户开户行',
                'key': 'payeeBankName'
              },
              {
                'disbale': true,
                'type': 'text',
                'label': '开户网点',
                'key': 'payeeBankDeptName'
              },
              {
                'disbale': true,
                'type': 'text',
                'label': '开户网点ID',
                'key': 'payeeBankDeptId'
              },
              {
                'disbale': true,
                'type': 'text',
                'label': '行内外标识',
                'key': 'transferType',
                formatter: (key, value) => value === '0' ? '行内' : '跨行'
              }
            ]
          }
        ]
      }
    }
  },
  created () {
  }
}
</script>
