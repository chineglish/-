<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @changeAcount="changeAcount"
        @isInBank="isInBank"
        @submit="confirm"
        @selectAcct="selectAcct"
        @resetAcct="resetAcct"
        @back="back">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 常用往来账户新增/修改
 * @date: 2019-12-16
 */
import { httpPost } from '@/api/sys/http'
export default {
  name: 'add',
  data () {
    return {
      status: '', // 判断是新增还是修改的标志
      breadData: ['转账汇款', '常用往来账户查询', '新增/修改'],
      formModel: {
        isInBank: '0',
        payeeAccount: '', // 收款账号
        payeeName: '', // 收款账户名称
        payeeBankId: '', // 开户行
        province: '', // 省份
        city: '', // 城市
        bankAccount: '',
        bankAddress: '', // 网点名称
        payeeSeq: ''
      },
      formConfigJson: {
        rules: {
          isInBank: [{ required: true, message: '请选择行内外标志', trigger: 'submit' }],
          payeeAccount: [{ required: true, message: '请输入收款账号', trigger: 'submit' }],
          payeeName: [{ required: true, message: '收款账户名称', trigger: 'submit' }],
          payeeBankId: [{ required: true, message: '请选择开户行', trigger: 'submit' }],
          bankAccount: [{ required: true, message: '请选择开户网点', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '行内外标志',
                'type': 'radio',
                'changeEventName': 'isInBank',
                'options': [
                  { 'value': '行内', 'key': '0' },
                  { 'value': '行外', 'key': '1' }
                ],
                'key': 'isInBank'
              }, {
                'disabled': false,
                'label': '收款账号',
                'type': 'input',
                'key': 'payeeAccount'
              }, {
                'disabled': false,
                'label': '收款账户名称',
                'type': 'input',
                'key': 'payeeName'
              }, {
                'disabled': false,
                'label': '开户行',
                'type': 'select',
                'options': [],
                'changeEventName': 'resetAcct',
                'key': 'payeeBankId'
              }, {
                'disabled': false,
                'label': '开户网点',
                'type': 'link',
                formatter: (value) => value || '请选择开户网点',
                'clickEventName': 'selectAcct',
                'key': 'bankAccount',
                'show': false
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: [],
      bankList: []
    }
  },
  methods: {
    changeAcount (res) {
      this.formModel = res
    },
    resetAcct () {
      this.formModel.bankAccount = ''
    },
    back () {
      this.$router.push('/currentAccInquiry')
    },
    confirm (res) {
      const { bankName: payeeBankName = '', bankNo: payeeBankId = '' } = this.bankList.find(item => item.bankNo === res.payeeBankId) || {}
      if (this.status) {
        let params = {
          payeeAcNo: res.payeeAccount,
          payeeAcName: res.payeeName,
          payeeBankProvinceNo: res.province,
          payeeBankCityNo: res.city,
          payeeBankCode: '313', // 银行id
          payeeBankId: '313',
          payeeBankName: '大连银行',
          payeeBankDeptId: '313222080002',
          payeeBankDeptName: '大连银行',
          transferType: res.isInBank
        }
        if (res.isInBank === '1') {
          params = {
            ...params,
            payeeBankCode: payeeBankId, // 银行id
            payeeBankId: payeeBankId,
            payeeBankName: payeeBankName,
            payeeBankDeptId: res.bankAddress,
            payeeBankDeptName: res.bankAccount
          }
        }
        this.$confirm('确定要新增该账户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          httpPost('/eweb-transfer.PayeeBookAdd.do', params).then(res => {
            this.$router.push('/currentAccInquiry')
          }).catch(err => {
            console.error(err)
          })
        }).catch(() => {})
      } else {
        let params = {
          payeeAcNo: res.payeeAccount,
          payeeAcName: res.payeeName,
          payeeBankProvinceNo: res.province,
          payeeBankCityNo: res.city,
          payeeBankCode: '313', // 银行id
          payeeBankName: '大连银行',
          payeeBankDeptId: '313222080002',
          payeeBankDeptName: '大连银行第一中心支行',
          transferType: res.isInBank,
          payeeSeq: res.payeeSeq
        }
        if (res.isInBank === '1') {
          params = {
            ...params,
            payeeBankName: payeeBankName,
            payeeBankCode: payeeBankId, // 银行id
            payeeBankDeptId: res.bankAddress,
            payeeBankDeptName: res.bankAccount
          }
        }
        this.$confirm('确定要修改该账户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          httpPost('/eweb-transfer.PayeeBookUpdate.do', params).then(res => {
            this.$router.push('/currentAccInquiry')
          }).catch(err => {
            console.error(err)
          })
        })
      }
    },
    isInBank (res) {
      if (res.isInBank === '1') {
        this.formConfigJson.formItems[0].group[4].show = true
        this.formConfigJson.formItems[0].group[3].disabled = false
        res.payeeBankId = this.bankList[0].bankNo || res.payeeBankId
        res.bankAccount = ''
      } else {
        this.formConfigJson.formItems[0].group[4].show = false
        this.formConfigJson.formItems[0].group[3].disabled = true
        res.bankAccount = '313222080002'
        res.payeeBankId = '大连银行'
      }
    },
    selectAcct (formModel) {
      this.$router.push({
        name: 'bankSelection',
        params: {
          where: 'add',
          status: this.status,
          payeeMsg: formModel
        }
      })
    },
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[0].group[3].options = this.bankList.map(item => ({ value: item.bankName, key: item.bankNo }))

          if (this.$route.params.status) {
            this.status = this.$route.params.status
          }
          // 从选择银行网点返回
          if (this.$route.params.msg) {
            Object.assign(this.formModel, this.$route.params.msg)
          }
          if (this.formModel.isInBank === '1') {
            this.formConfigJson.formItems[0].group[4].show = true
            this.formConfigJson.formItems[0].group[3].disabled = false
          } else {
            this.formConfigJson.formItems[0].group[4].show = false
            this.formConfigJson.formItems[0].group[3].disabled = true
            this.formModel.bankAccount = '313222080002'
            this.formModel.payeeBankId = '大连银行'
          }

          /**
           * 接收需要修改的数据
           */
          if (this.$route.params.data) {
            let res = this.$route.params.data
            this.formModel.payeeAccount = res.payeeAccountNo
            this.formModel.payeeName = res.payeeAccountName
            this.formModel.payeeSeq = res.payeeSeq
            this.formModel.province = res.payeeBankProvinceNo
            this.formModel.city = res.payeeBankCityNo
            if (res.lastTrsType === '0') { // 行内 默认大连银行
              this.formModel.isInBank = '0'
              this.formModel.payeeBankId = '313'
              this.formModel.bankAddress = '313222080002'
              this.formModel.bankAccount = '大连银行第一中心支行'
              this.formConfigJson.formItems[0].group[3].disabled = true
            } else {
              this.formModel.isInBank = '1'
              this.formModel.payeeBankId = res.payeeBankCode
              this.formModel.bankAccount = res.payeeBankDeptName
              this.formModel.bankAddress = res.payeeBankDeptId
              this.formConfigJson.formItems[0].group[3].disabled = false
              this.formConfigJson.formItems[0].group[4].show = true
            }
          }
          /**
           * 从开户网点选中网点返回的数据
           */
          if (this.$route.params.bank) {
            const bank = this.$route.params.bank
            this.formModel.isInBank = '1'
            this.formConfigJson.formItems[0].group[4].show = true
            this.formModel.bankAccount = bank.lName
            this.formModel.bankAddress = bank.bankCode
            this.formModel.payeeBankId = bank.clsCode
            this.formModel.province = bank.provinceNo
            this.formModel.city = bank.cityNo
          }
        }
      }).catch(e => {
        console.error(e)
      })
    }
  },
  created () {
    this.bankListQry()
    /**
     * 接收判断是新增还是修改
     */
  }
}
</script>
