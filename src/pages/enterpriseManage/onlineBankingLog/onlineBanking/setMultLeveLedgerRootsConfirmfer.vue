<template>
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
</template>

<script>
// import { httpPost } from '@/api/sys/http'
import { currency_type } from '@/assets/js/entity'
import util from '@/libs/util'
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
  name: 'setMultLeveLedgerRootsConfirmfer',
  data: function () {
    return {
      // data: ['现金管理', '多级账簿', '多级账簿余额调整确认']
      tableHeadData: [
        {
          label: '账簿名',
          prop: 'asAcName'
        },
        {
          label: '账簿号',
          prop: 'asAcNo'
        },
        {
          label: '币种',
          prop: 'currencyCode',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '权限',
          prop: 'power'
        }
      ],
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '多级账簿权限设置',
            group: [
              {
                'disabled': false,
                'label': '操作员编号',
                'type': 'text',
                'key': 'userNo'
              },
              {
                'disabled': false,
                'label': '用户账号',
                'type': 'text',
                'key': 'acNo'
              },
              // {
              //   'disabled': true,
              //   'label': '币种',
              //   'type': 'text',
              //   'key': 'currencyCode',
              //   formatter: (key, value) => util.handleEnums(currency_type, value)
              // },
              {
                'disabled': false,
                'label': '总笔数',
                'type': 'text',
                'key': 'recordNum'
              }
            ]
          }
        ]
      }
    }
  },
  mounted: function () {
  },
  methods: {
  },
  created () {
  },
  components: {}
}
</script>
