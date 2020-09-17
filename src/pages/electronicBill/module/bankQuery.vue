<template>
  <div>
    <div class='form-box'>
      <m-new-form
        :componentJson='formConfigJson'
        :btnData='btnData'
        :formModel='formModel'
        @queryFlag='queryFlag'
        @bankInquire='bankInquire'
        @selectProvince='selectProvince'
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
        bankCode: '',
        payeeName: '',
        payeeBankAcc: '', // 开户行
        bankNo: '', // 联行号
        queryFlag: '0'
      },
      formConfigJson: {
        rules: {
          bankCode: [{ required: true, message: '银行', trigger: 'submit' }],
          bankNo: [{ required: false, message: '联行号', trigger: 'submit' }]
        },
        formWidth: '50%',
        // labelWidth: '50%',
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '查询方式',
                'type': 'radio',
                'options': [ { 'value': '模糊查询', 'key': '0' }, { 'value': '联行号查询', 'key': '1' } ],
                'key': 'queryFlag',
                'changeEventName': 'queryFlag'
              }
            ]
          },
          {
            // title: '到账通知单',
            group: [
              {
                disabled: false,
                label: '银行',
                type: 'select',
                options: [],
                key: 'bankCode'
              },
              {
                disabled: false,
                label: '省份',
                type: 'select',
                options: [],
                changeEventName: 'selectProvince',
                key: 'provCd'
              },
              {
                disabled: false,
                label: '城市',
                type: 'select',
                options: [],
                key: 'cityCode'
              },
              {
                disabled: false,
                label: '开户行网点',
                type: 'input',
                key: 'nodeName'
              },
              {
                disabled: false,
                label: '联行号',
                type: 'input',
                show: false,
                key: 'bankNo'
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
     * 改变查询方式
     */
    queryFlag (data) {
      if (data.queryFlag === '0') {
        data.bankNo = ''
        this.formConfigJson.formItems[1].group[0].show = true
        this.formConfigJson.formItems[1].group[1].show = true
        this.formConfigJson.formItems[1].group[2].show = true
        this.formConfigJson.formItems[1].group[3].show = true
        this.formConfigJson.formItems[1].group[4].show = false
        this.formConfigJson.rules.bankCode[0].required = true
        this.formConfigJson.rules.bankNo[0].required = false
      }
      if (data.queryFlag === '1') {
        data.bankCode = ''
        data.provCd = ''
        data.cityCode = ''
        data.nodeName = ''
        this.formConfigJson.formItems[1].group[0].show = false
        this.formConfigJson.formItems[1].group[1].show = false
        this.formConfigJson.formItems[1].group[2].show = false
        this.formConfigJson.formItems[1].group[3].show = false
        this.formConfigJson.formItems[1].group[4].show = true
        this.formConfigJson.rules.bankCode[0].required = false
        this.formConfigJson.rules.bankNo[0].required = true
      }
    },
    /**
     * 银行列表查询
     */
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[1].group[0].options = res.bankList
            .map(item => ({ value: item.bankName, key: item.bankNo }))
        }
      })
    },
    // 省列表查询
    provinceListQry () {
      httpPost('eweb-common.ProvinceQry.do').then(res => {
        if (res && Array.isArray(res.provinceList)) {
          this.formConfigJson.formItems[1].group[1].options = res.provinceList.map(item => ({ value: item.provName, key: item.provCd }))
        }
      })
    },
    // 市列表查询
    selectProvince (res) {
      this.formModel.cityCode = ''
      if (res.provCd) {
        httpPost('eweb-common.CityQry.do', { provCd: res.provCd }).then(res => {
          if (res && Array.isArray(res.cityList)) {
            this.formConfigJson.formItems[1].group[2].options = res.cityList.map(item => ({ value: item.cityName, key: item.cityCd }))
            this.formModel.cityCode = res.cityList[0].cityCd
          }
        })
      }
    },
    bankInquire (res) {
      const params = {
        bankNo: res.bankNo, // 联行号
        bankCode: res.bankCode,
        provCd: res.provCd,
        cityCode: res.cityCode,
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
    this.bankListQry()
    this.provinceListQry()
  }
}
</script>
