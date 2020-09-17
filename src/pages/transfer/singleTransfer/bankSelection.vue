<template>
    <div class="accountSelection">
        <div class="form-box">
            <m-new-form
              ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="inquire"
              @goback="goback"
              @selectProvince="selectProvince"
            ></m-new-form>
        </div>
        <div class="form-box" v-if="tableShow">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :pagesize="pagesize"
              :operate-data="operateData"
              @handleSelect="handleSelect"
            ></d-table>
        </div>
    </div>
</template>

<script>
/**
 *@name: 开户网点查询
 * @author: 梁文彬
 * @date: 2019-12-11
 */
import { httpPost } from '@/api/sys/http'
export default {
  name: 'bankSelection',
  components: {
    // ComPrompt
  },
  data () {
    return {
      where: '',
      status: '',
      tableShow: false,
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
        formWidth: '50%',
        rules: {
          bankCode: [{ required: true, message: '请先选择开户行', trigger: 'submit' }],
          provCd: [{ required: false, message: '请先选择省分', trigger: 'submit' }],
          cityCode: [{ required: false, message: '请先选择城市', trigger: 'submit' }],
          nodeName: [{ required: true, message: '请先选择开户行网点', trigger: 'submit' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '银行',
                'type': 'select',
                'options': [],
                'key': 'bankCode'
              },
              {
                'disabled': false,
                'label': '省份',
                'type': 'select',
                'options': [],
                'changeEventName': 'selectProvince',
                'key': 'provCd'
              },
              {
                'disabled': false,
                'label': '城市',
                'type': 'select',
                'options': [],
                'key': 'cityCode'
              },
              {
                'disabled': false,
                'label': '开户行网点',
                'type': 'input',
                'key': 'nodeName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goback' }
      ],
      firstColIndex: {
        type: 'selection'
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
            eventName: 'handleSelect'
          }
        ]
      },
      bankList: [], // 银行列表
      provinceList: [],
      cityList: []
    }
  },
  methods: {
    /**
     * 通过判断选择的省份，来确定城市的数据
     */
    selectProvince (res) {
      this.cityListQry(res.provCd)
    },
    goback () {
      this.$router.push({
        name: 'add',
        params: {
          msg: this.formModel,
          status: this.status
        }
      })
    },
    handleSelect (index) {
      if (this.where === 'add') {
        const form = this.$refs.mNewForm.$data.form
        this.$router.push({
          name: 'add',
          params: {
            bank: { ...index.data, provinceNo: form.provCd, cityNo: form.cityCode },
            msg: this.formModel,
            status: this.status
          }
        })
      } else {
        this.$router.push({
          name: this.where,
          params: {
            bank: index.data
          }
        })
      }
    },
    /**
     * 发送查询接口
     */
    inquire (res) {
      const params = {
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
    provinceListQry () {
      httpPost('eweb-common.ProvinceQry.do').then(res => {
        if (res && Array.isArray(res.provinceList)) {
          this.provinceList = res.provinceList
          this.formConfigJson.formItems[0].group[1].options = this.provinceList.map(item => ({ value: item.provName, key: item.provCd }))
        }
      }).catch(e => {
        console.error(e)
      })
    },
    cityListQry (provinceId) {
      if (provinceId) {
        this.formConfigJson.rules.cityCode[0].required = true
        this.formConfigJson.rules.nodeName[0].required = false
        httpPost('eweb-common.CityQry.do', { provCd: provinceId }).then(res => {
          if (res && Array.isArray(res.cityList)) {
            this.cityList = res.cityList
            this.formConfigJson.formItems[0].group[2].options = this.cityList.map(item => ({ value: item.cityName, key: item.cityCd }))
          }
        }).catch(e => {
          console.error(e)
        })
      } else {
        this.formConfigJson.rules.cityCode[0].required = false
        this.formConfigJson.rules.nodeName[0].required = true
      }
    },
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[0].group[0].options = this.bankList.map(item => ({ value: item.bankName, key: item.bankNo }))
        }
      }).catch(e => {
        console.error(e)
      })
    }
  },
  created () {
    this.where = this.$route.params.where
    this.formModel = {
      bank: '', // 银行
      provCd: '', // 省份
      cityCode: '', // 城市
      nodeName: '', // 开户行网点
      // bankCode: '', // 收款账号
      payeeName: '', // 收款账户名称
      payeeBankAcc: '' // 开户行
    }
    this.where = this.$route.params.where
    this.breadData = this.$route.params.breadData
    if (this.$route.params.status) {
      this.status = this.$route.params.status
    }
    if (this.$route.params.payeeMsg) {
      Object.assign(this.formModel, this.$route.params.payeeMsg)
      this.formModel.bankCode = this.$route.params.payeeMsg ? this.$route.params.payeeMsg.payeeBankId : this.$route.params.payeeBankCode
    }
    this.bankListQry()
    this.provinceListQry()
  }
}
</script>
