<template>
  <div>
    <div class='form-box'>
      <m-new-form
        :componentJson='formConfigJson'
        :btnData='btnData'
        :formModel='formModel'
        @bankInquire='bankInquire'
      ></m-new-form>
    </div>
    <div class='form-box' v-if='tableShow'>
      <d-table
        :table-data='tableData'
        :options='options'
        :tableHeadData='tableHeadData'
        :infoTips='infoTips'
        :pagesize='pagesize'
        :operate-data='operateData'
        @bankHandleSelect='bankHandleSelect'
      ></d-table>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  props: {
    eventName: {
      default: '',
      type: String
    },
    trsType: {
      type: String
    }
  },
  data () {
    return {
      where: '',
      status: '',
      tableShow: false,
      breadData: [],
      formModel: {
        bank: '', // 银行
        provCd: '', // 省份
        cityCode: '', // 城市
        nodeName: '', // 开户行网点
        bankCode: '', // 收款账号
        payeeName: '', // 收款账户名称
        payeeBankAcc: '' // 开户行
      },
      formConfigJson: {
        rules: {
          bankCode: [{ required: true, message: '银行', trigger: 'submit' }]
        },
        formWidth: '50%',
        // labelWidth: '50%',
        formItems: [
          {
            // title: '到账通知单',
            group: [
              {
                disabled: false,
                label: '银行名称',
                type: 'select',
                options: [],
                key: 'bankCode'
              },
              {
                disabled: false,
                label: '网点名称',
                type: 'input',
                key: 'nodeName'
              }
            ]
          }
        ]
      },
      btnData: [
        {
          btnText: '查询',
          class: 'm-submit-btn',
          clickEventName: 'bankInquire'
        },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [],
      options: {
        // table属性
        border: true,
        stripe: true
      },
      infoTips: [
        // 信息提示
      ],
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        { label: '开户行', prop: 'lName' },
        { label: '联行号', prop: 'bankCode' }
      ],
      pagesize: 10,
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '选择',
            eventName: 'bankHandleSelect'
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 银行列表查询
     */
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[0].group[0].options = res.bankList.map(item => ({ value: item.bankName, key: item.bankNo }))
          this.tableData = []
          if (this.trsType === '0') {
            let obj = this.bankList.find(item => item.bankNo === '313')
            this.formModel.bankCode = obj.bankNo
            this.bankInquire({ bankCode: obj.bankNo, nodeName: obj.nodeName || '' })
          } else {
            this.formModel.bankCode = ''
            // this.$set(this.formModel, 'bankCode', '')
          }
        }
      })
    },
    // // 省列表查询
    // provinceListQry () {
    //   httpPost('eweb-common.ProvinceQry.do').then(res => {
    //     if (res && Array.isArray(res.provinceList)) {
    //       this.formConfigJson.formItems[0].group[1].options = res.provinceList.map(item => ({ value: item.provName, key: item.provCd }))
    //     }
    //   })
    // },
    // // 市列表查询
    // selectProvince (res) {
    //   this.formModel.cityCode = ''
    //   if (res.provCd) {
    //     httpPost('eweb-common.CityQry.do', { provCd: res.provCd }).then(res => {
    //       if (res && Array.isArray(res.cityList)) {
    //         this.formConfigJson.formItems[0].group[2].options = res.cityList.map(item => ({ value: item.cityName, key: item.cityCd }))
    //         this.formModel.cityCode = res.cityList[0].cityCd
    //       }
    //     })
    //   }
    // },
    bankInquire (res) {
      const params = {
        bankCode: res.bankCode,
        nodeName: res.nodeName.replace(/\s+/g, ',')
      }
      httpPost('eweb-common.ApsNodeQry.do', params).then(res => {
        if (res && Array.isArray(res.list)) {
          this.tableShow = true
          this.tableData = res.list
        }
      })
    },
    bankHandleSelect (data) {
      this.$emit(this.eventName, data.data)
    }
  },
  created () {
    // this.bankListQry()
  }
}
</script>
