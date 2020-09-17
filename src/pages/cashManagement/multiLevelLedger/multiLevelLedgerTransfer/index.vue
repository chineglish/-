<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      ref="mNewForm"
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="onSubmit"
      @reset="onreset"
      @changeDisposal="changeDisposal"
      @changeAccountNo="changeAccountNo"
      @changelimitAsAcNo="querylimitAsAcNo"
      @changeFlag="changeFlag"
      @selectTrsType="selectTrsType"
      @selectAcct="selectAcct"
      @changeUp="changeUp"
      @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
      @savePayeeOrNot="savePayeeOrNot"
    >
    <div class="right-slot" slot="selectAct" @click="accountListQry">
      常用往来账户
    </div>
    <div slot="save">
      <el-checkbox v-model="checked" @change="savePayeeOrNot">保存为常用往来账户</el-checkbox>
    </div>
    </m-new-form>
     <el-dialog
          title="选择常用往来账户"
          :visible.sync="showAccountSelection"
          width="80%"
          center>
          <div class="form-box">
            <m-new-form
              :componentJson="accountSelection.formConfigJson"
              :btnData="accountSelection.btnData"
              :formModel="accountSelection.formModel"
              @screenAccounts="screenAccounts"
            >
            </m-new-form>
          </div>
          <div class="form-box">
            <d-table
              :table-data="accountSelection.tableData"
              :isPagination="true"
              :tableHeadData="accountSelection.tableHeadData"
              :operate-data="accountSelection.operateData"
              @handleSelect="accountHandleSelect"
            >
            </d-table>
          </div>
        </el-dialog>
        <el-dialog
          title="选择开户行网点"
          :visible.sync="showBankSelection"
          width="80%"
          center>
          <div class="form-box">
            <m-new-form
              :componentJson="bankSelection.formConfigJson"
              :btnData="bankSelection.btnData"
              :formModel="bankSelection.formModel"
              @bankInquire="bankInquire"
              @reset="bankReset"
              @selectProvince="selectProvince"
            >
            </m-new-form>
          </div>
          <div class="form-box" v-if="bankSelection.tableShow">
            <d-table
              :table-data="bankSelection.tableData"
              :tableHeadData="bankSelection.tableHeadData"
              :pagesize="bankSelection.pagesize"
              :operate-data="bankSelection.operateData"
              @bankHandleSelect="bankHandleSelect"
            >
            </d-table>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
export default {
  name: 'transferQuery',
  // 废弃，转至单笔转账
  data: function () {
    return {
      data: ['现金管理', '多级账簿', '多级账簿转账'],
      bankList: [], // 银行列表
      checked: '',
      showAccountSelection: false,
      showBankSelection: false,
      accountSelection: {
        formModel: {
          payeeAcNo: '',
          payeeAcName: '',
          payeeBankId: ''
        },
        formConfigJson: {
          stepsActive: 0,
          formItems: [
            {
              // title: '到账通知单',
              formWidth: '50%',
              group: [
                {
                  'disabled': false,
                  'label': '收款账户',
                  'type': 'input',
                  'key': 'payeeAcNo',
                  'inputEventName': 'screenAccounts'
                },
                {
                  'disabled': false,
                  'label': '收款账户名称',
                  'type': 'input',
                  'key': 'payeeAcName',
                  'inputEventName': 'screenAccounts'
                },
                {
                  'disabled': false,
                  'label': '收款账户开户行',
                  'type': 'input',
                  'key': 'payeeBankId',
                  'inputEventName': 'screenAccounts'
                },
                {
                  'disabled': false,
                  'label': '开户网点',
                  'type': 'input',
                  'key': 'payeeBankDeptName',
                  'inputEventName': 'screenAccounts'
                }
              ]
            }
          ]
        },
        btnData: [
          { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
        ],
        firstColIndex: {
          type: 'selection'
        },
        tableHeadData: [
          { label: '行内外标志',
            prop: 'lastTrsType',
            formatter: (row, column, cellValue, index) => {
              return cellValue === '0' ? '行内' : '行外'
            } },
          { label: '收款账户', prop: 'payeeAccountNo' },
          { label: '收款账户名称', prop: 'payeeAccountName' },
          // { label: '收款账户开户行', prop: 'payeeBankName' },
          { label: '收款账户开户行', prop: 'payeeBankDeptName' }
        ],
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
        }
      },
      bankSelection: {
        where: '',
        status: '',
        tableShow: false,
        breadData: [],
        formModel: {
          bank: '', // 银行
          provCd: '', // 省份
          cityCode: '', // 城市
          nodeName: '', // 开户行网点
          incomeAccBankName: '' // 开户行
        },
        formConfigJson: {
          formWidth: '50%',
          labelWidth: '40%',
          rules: {
            incomeAccBankName: [{ required: true, message: '请先选择开户行', trigger: 'submit' }],
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
                  'label': '收款账户开户行',
                  'type': 'select',
                  trans: { value: 'bankName', key: 'bankNo' },
                  options: [],
                  'key': 'incomeAccBankName'
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
          { btnText: '查询', class: 'm-submit-btn', clickEventName: 'bankInquire' },
          { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
        ],
        firstColIndex: {
          type: 'selection'
        },
        tableHeadData: [
          { label: '开户行', prop: 'lName' },
          { label: '联行号', prop: 'bankCode' }
        ],
        pagesize: 20,
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
      },
      formModel: {
        payerAccount: '',
        currencyCode: '',
        payerAccName: '',
        useLedger: '1',
        ledgerNum: '',
        ledgerName: '',
        payerAddress: '',
        bankSigns: '0',
        bankFlag: '',
        urgentFlag: '',
        incomeAcc: '',
        incomeAccName: '',
        incomeAccBankName: '',
        openBankNetwork: '',
        payeeBankDeptId: '',
        incomePhoneNum: '',
        transAmt: '',
        bigNum: '',
        disposal: '',
        // remark: '',
        postScript: '',
        appointmentDate: '',
        appointmentTime: '',
        virAcNo: '',
        virAcName: '',
        savePayee: false
      },
      acList: [],
      formConfigJson: {
        rules: {
          payerAccount: [{ required: true, message: '付款账户', trigger: 'submit' }],
          useLedger: [{ required: true, message: '是否使用账簿', trigger: 'submit' }],
          ledgerNum: [{ required: true, message: '账簿号', trigger: 'submit' }],
          ledgerName: [{ required: false, message: '账簿名', trigger: 'submit' }],
          bankSigns: [{ required: true, message: '行内外标志', trigger: 'submit' }],
          // bankFlag: [{ required: true, message: '同城异地标志', trigger: 'submit' }],
          // urgentFlag: [{ required: true, message: '加急标志', trigger: 'submit' }],
          incomeAcc: [{ required: true, message: '收款账户', trigger: 'submit' }],
          incomeAccName: [{ required: true, message: '收款账户名称', trigger: 'submit' }],
          incomeAccBankName: [{ required: true, message: '收款账户开户行', trigger: 'submit' }],
          openBankNetwork: [{ required: true, message: '开户行网点', trigger: 'submit' }],
          transAmt: [{ required: true, message: '交易金额', trigger: 'submit' }],
          disposal: [{ required: true, message: '处理方式', trigger: 'submit' }],
          postScript: [{ required: true, message: '附言', trigger: 'submit' }],
          appointmentDate: [{ required: true, message: '预约日期', trigger: 'submit' }],
          appointmentTime: [{ required: true, message: '预约时间', trigger: 'submit' }],
          incomePhoneNum: [{ required: false, message: '手机号', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '付款人信息',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'changeEventName': 'changeAccountNo',
                'key': 'payerAccount'
              },
              {
                'disabled': false,
                'label': '付款币种',
                'type': 'text',
                'key': 'currencyShow'
              },
              {
                'disabled': true,
                'label': '付款户名',
                'type': 'text',
                'key': 'payerAccName'
              },
              {
                'disabled': false,
                'label': '是否使用账簿',
                'type': 'radio',
                'options': [
                  { value: '是', key: '1' },
                  { value: '否', key: '0' }
                ],
                'changeEventName': 'changeFlag',
                'key': 'useLedger'
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'select',
                'options': [],
                trans: { value: 'limitAsAcNo' },
                'changeEventName': 'changelimitAsAcNo',
                'key': 'ledgerNum',
                'show': true
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'input',
                'key': 'ledgerName',
                'show': true
              },
              {
                'disabled': false,
                'label': '付款地址',
                'type': 'input',
                'key': 'payerAddress'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '收款人信息',
            group: [
              {
                'disabled': false,
                'label': '行内外标志',
                'type': 'radio',
                'key': 'bankSigns',
                'changeEventName': 'selectTrsType',
                'options': [
                  { value: '行内', key: '0' },
                  { value: '跨行', key: '1' }
                ]
              },
              {
                'disabled': false,
                'label': '同城异地标志',
                'type': 'radio',
                'key': 'bankFlag',
                'show': false,
                'options': [
                  { value: '同城', key: '0' },
                  { value: '异地', key: '1' }
                ]
              },
              {
                'disabled': false,
                'label': '加急标志',
                'type': 'radio',
                'key': 'urgentFlag',
                'show': false,
                'options': [
                  { value: '加急', key: '1' },
                  { value: '不加急', key: '0' }
                ]
              },
              {
                'disabled': false,
                'label': '收款账户',
                maxlength: 50,
                rightSlotName: 'selectAct',
                'type': 'input',
                'key': 'incomeAcc'
              },
              {
                'disabled': false,
                'label': '收款账户名称',
                'type': 'input',
                maxlength: 70,
                'key': 'incomeAccName'
              },
              {
                'disabled': true,
                'label': '收款账户开户行',
                'type': 'select',
                'options': [],
                'filterable': true,
                show: true,
                'key': 'incomeAccBankName'
              },
              {
                'disabled': false,
                'label': '开户行网点',
                'type': 'link',
                'clickEventName': 'selectAcct',
                'key': 'openBankNetwork',
                formatter: (value) => {
                  return value === '' ? '请选择开户行网点' : value
                },
                'show': false
              },
              {
                'disabled': false,
                'label': '收款人手机',
                'type': 'input',
                'key': 'incomePhoneNum'
              },
              {
                slotName: 'save'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '交易金额',
            group: [
              {
                'disabled': false,
                'label': '交易金额',
                'type': 'input',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                inputType: 'money',
                'content': '(元)',
                'inputEventName': 'changeUp',
                'key': 'transAmt'
              },
              {
                'disabled': true,
                'label': '金额大写',
                'type': 'text',
                'key': 'bigNum'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '30%',
            title: '附加信息',
            group: [
              {
                'disabled': false,
                'label': '处理方式',
                'type': 'radio',
                'key': 'disposal',
                'options': [
                  { value: '实时', key: '0' },
                  { value: '次日', key: '3' },
                  { value: '预约', key: '1' }
                ],
                changeEventName: 'changeDisposal'
              },
              {
                'disabled': false,
                'label': '预约日期',
                'type': 'date',
                pickerOptions: {
                  disabledDate: time => time.getTime() < new Date().getTime()
                },
                'key': 'appointmentDate',
                'show': false
              },
              {
                'disabled': false,
                'label': '预约时间',
                'type': 'time',
                'key': 'appointmentTime',
                pickerOptions: {
                  start: '09:00',
                  step: '01:00',
                  end: '17:00'
                },
                'show': false
              },
              // {
              //   'disabled': false,
              //   'label': '附言',
              //   'type': 'input',
              //   'key': 'remark'
              // },
              {
                'disabled': false,
                'label': '附言',
                'type': 'input',
                maxlength: 70,
                'key': 'postScript',
                'options': [
                  { value: '办公', key: '办公' },
                  { value: '租金', key: '租金' }
                ]
              },
              {
                'disabled': false,
                'label': '虚拟款项账户',
                'type': 'input',
                'key': 'virAcno'
              },
              {
                'disabled': false,
                'label': '虚拟款项户名',
                'type': 'input',
                'key': 'virAcName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  created () {
    this.getAccountList()
    this.provinceListQry()
    let cachedPageData = null
    try {
      cachedPageData = JSON.parse(window.decodeURIComponent(sessionStorage.getItem('cached_page_data')))
    } catch (e) {
      console.error(e)
    }

    if (cachedPageData) {
      const { name = '', data = {} } = cachedPageData
      if (name === 'transferQuery') {
        Object.keys(data).forEach(propName => {
          if (this[propName] !== undefined && this[propName] !== null) {
            this[propName] = data[propName]
          }
        })
      }
    }
    if (!(Array.isArray(this.bankList) && this.bankList.length > 0)) {
      this.bankListQry()
    }
    const { bank, payee } = this.$route.params
    if (bank) {
      const { lName, bankCode } = bank
      this.formModel.payeeBankDeptId = bankCode
      this.formModel.openBankNetwork = lName
    }
    if (payee) {
      const data = payee.data
      this.formModel.incomeAcc = data.payeeAccountNo
      this.formModel.bankSigns = data.lastTrsType
      this.formModel.incomeAccName = data.payeeAccountName
      this.formModel.incomeAccBankName = data.payeeBankCode
      this.formModel.payeeBankDeptId = data.payeeBankDeptId
      this.formModel.openBankNetwork = data.payeeBankDeptName
    }
    this.formConfigJson.rules.appointmentDate = [{ required: false, message: '预约日期不可为空', trigger: 'change' }]
    this.formConfigJson.rules.appointmentTime = [{ required: false, message: '预约时间不可为空', trigger: 'change' }]
    if (this.formModel.bankSigns === '0') {
      this.formModel.incomeAccBankName = '大连银行'
      this.formModel.disposal = '0'
      this.formConfigJson.formItems[1].group[6].show = false
      this.formConfigJson.rules.openBankNetwork = [{ required: false, message: '开户行网点不可为空', trigger: 'change' }]
      this.formConfigJson.formItems[1].group[5].disabled = true
    } else {
      this.bankSelection.formModel.incomeAccBankName = this.bankList[0].bankNo
      this.formModel.openBankNetwork = this.bankList[0].bankName
      this.formModel.openBankNetwork = ''
      this.formConfigJson.formItems[1].group[6].show = true
      this.formConfigJson.formItems[3].group[0].show = true
    }
  },
  methods: {
    // 筛选常用联系人
    screenAccounts (res) {
      setTimeout(() => {
        this.accountSelection.tableData = []
        this.accountSelection.allData.forEach(item => {
          if (
            (item.payeeBankName && item.payeeBankName.indexOf(res.payeeBankId) !== -1) &&
            (item.payeeAccountNo && item.payeeAccountNo.indexOf(res.payeeAcNo) !== -1) &&
            (item.payeeAccountName && item.payeeAccountName.indexOf(res.payeeAcName) !== -1) &&
            (item.payeeBankDeptName && item.payeeBankDeptName.indexOf(res.payeeBankDeptName) !== -1)
          ) {
            this.accountSelection.tableData.push(item)
          }
        })
      }, 50)
    },
    savePayeeOrNot () {
      if (this.checked === true) {
        this.formModel.savePayee = true
      } else {
        this.formModel.savePayee = false
      }
    },
    // 获取签约账户列表
    getAccountList () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.acList = res.acList
        this.acList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = res.acList
        this.formModel.payerAccount = 0
        if (this.acList.length > 0 || this.acList.length === '') {
          this.changeAccountNo(this.formModel)
        } else {
          this.formModel.payerAccount = ''
          this.formModel.currency = ''
          this.formModel.payerAccName = ''
        }
      })
    },
    // 省列表查询
    provinceListQry () {
      httpPost('eweb-common.ProvinceQry.do').then(res => {
        if (res && Array.isArray(res.provinceList)) {
          this.bankSelection.formConfigJson.formItems[0].group[1].options = res.provinceList.map(item => ({ value: item.provName, key: item.provCd }))
          this.bankSelection.formConfigJson.formItems[0].group[1].options.unshift({ value: '请选择省', key: '' })
        }
      })
    },
    // 市列表查询
    selectProvince (res) {
      this.bankSelection.formModel.cityCode = ''
      if (res.provCd) {
        this.bankSelection.formConfigJson.rules.cityCode[0].required = true
        this.bankSelection.formConfigJson.rules.nodeName[0].required = false
        httpPost('eweb-common.CityQry.do', { provCd: res.provCd }).then(res => {
          if (res && Array.isArray(res.cityList)) {
            this.bankSelection.formConfigJson.formItems[0].group[2].options = res.cityList.map(item => ({ value: item.cityName, key: item.cityCd }))
            this.bankSelection.formConfigJson.formItems[0].group[2].options.unshift({ value: '请选择城市', key: '' })
          }
        })
      } else {
        this.bankSelection.formConfigJson.rules.cityCode[0].required = false
        this.bankSelection.formConfigJson.rules.nodeName[0].required = true
      }
    },
    // 银行查询
    bankInquire (res) {
      const params = {
        bankCode: res.incomeAccBankName,
        provCd: res.provCd,
        cityCode: res.cityCode,
        nodeName: res.nodeName.replace(/\s+/g, ',')
      }
      httpPost('eweb-common.ApsNodeQry.do', params).then(res => {
        if (res && Array.isArray(res.list)) {
          this.bankSelection.tableShow = true
          this.bankSelection.tableData = res.list
        }
      })
    },
    // 银行选择
    bankHandleSelect (data) {
      this.formModel.openBankNetwork = data.data.lName
      this.formModel.incomeAccBankName = data.data.clsCode
      this.formModel.payeeBankName = this.bankList.find(item => item.bankNo === data.data.clsCode).bankName
      this.formModel.payeeBankDeptId = data.data.bankCode
      this.showBankSelection = false
    },
    accountHandleSelect (data) {
      this.$refs.mNewForm.$data.form.incomeAcc = data.data.payeeAccountNo
      this.$refs.mNewForm.$data.form.bankSigns = data.data.lastTrsType
      this.$refs.mNewForm.$data.form.incomeAccName = data.data.payeeAccountName
      this.$refs.mNewForm.$data.form.incomeAccBankName = data.data.lastTrsType === '1' ? data.data.payeeBankCode : '大连银行'
      this.$refs.mNewForm.$data.form.payeeBankName = data.data.payeeBankName
      this.$refs.mNewForm.$data.form.payeeBankDeptId = data.data.payeeBankDeptId
      this.$refs.mNewForm.$data.form.openBankNetwork = data.data.payeeBankDeptName
      if (data.data.lastTrsType === '0') {
        this.formConfigJson.formItems[1].group[5].show = true
        this.formConfigJson.formItems[1].group[6].show = false
      } else {
        this.formConfigJson.formItems[1].group[5].show = false
        this.formConfigJson.formItems[1].group[6].show = true
      }
      this.showAccountSelection = false
    },
    accountHandleBack () {
      this.$router.push('/transferQuery')
    },
    accountListQry () {
      const params = {
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankId: ''
      }
      httpPost('eweb-transfer.PayeeBookQry.do', params).then(res => {
        this.accountSelection.allData = this.accountSelection.tableData = res.list || []
        this.showAccountSelection = true
      })
    },
    changeAccountNo (data) {
      this.formModel.currencyCode = this.acList[data.payerAccount].currencyCode
      data.currencyShow = util.handleEnums(currency_type, this.acList[data.payerAccount].currencyCode)
      data.payerAccName = this.acList[data.payerAccount].acName
      this.querylimitAsAcNo(data)
    },
    querylimitAsAcNo (data) {
      httpPost('/eweb-cash.MultistageBookRightQry.do', {
        acNo: this.acList[data.payerAccount].acNo,
        currencyCode: this.acList[data.payerAccount].currencyCode,
        asAcNo: this.acList[data.payerAccount].asAcno,
        userNo: this.getUser().userId
      }).then(res => {
        this.formConfigJson.formItems[0].group[4].options = res.list
        this.list = res.list
        httpPost('/eweb-cash.MultistageBookInfoQry.do', {
          acNo: this.acList[data.payerAccount].acNo,
          currencyCode: this.acList[data.payerAccount].currencyCode,
          asAcNo: this.list[data.ledgerNum].limitAsAcNo
        }).then(qres => {
          this.formModel.ledgerName = qres.list[0].asAcName
        })
      }).catch(() => {
        this.formModel.ledgerNum = ''
      })
    },
    changeFlag (res) {
      switch (res.useLedger) {
        case '0':
          this.formConfigJson.formItems[0].group[4].show = false
          this.formConfigJson.formItems[0].group[5].show = false
          this.formConfigJson.rules.ledgerNum = [{ required: false, message: '账簿号', trigger: 'change' }]
          this.formConfigJson.rules.ledgerName = [{ required: false, message: '账簿名', trigger: 'change' }]
          break
        case '1':
          this.formConfigJson.formItems[0].group[4].show = true
          this.formConfigJson.formItems[0].group[5].show = true
          this.formConfigJson.rules.ledgerNum = [{ required: true, message: '账簿号', trigger: 'change' }]
          break
      }
    },
    selectTrsType (res) {
      switch (res.bankSigns) {
        case '0':
          res.incomeAccBankName = '大连银行'
          res.openBankNetwork = '大连银行第一中心支行'
          res.disposal = '0'
          this.formConfigJson.formItems[1].group[6].show = false
          this.formConfigJson.formItems[1].group[5].show = true
          this.formConfigJson.rules.openBankNetwork = [{ required: false, message: '开户行网点', trigger: 'change' }]
          break
        case '1':
          res.incomeAccBankName = this.bankList[0].bankNo
          // res.openBankNetwork = this.bankList[0].bankName
          res.openBankNetwork = ''
          this.formConfigJson.rules.openBankNetwork = [{ required: true, message: '开户行网点', trigger: 'change' }]
          this.formConfigJson.formItems[1].group[5].show = false
          this.formConfigJson.formItems[1].group[6].show = true
          break
      }
    },
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.bankSelection.formConfigJson.formItems[0].group[0].options =
          this.formConfigJson.formItems[1].group[5].options = res.bankList
        }
      })
    },
    selectAcct (data) {
      this.formModel = data
      this.showBankSelection = true
    },

    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      if (res.transAmt) {
        res.bigNum = util.getMoneyHanzi(res.transAmt)
      }
    },
    onSubmit (res) {
      this.formModel = res
      // const [accNo, subAccNo] = (res.payerAcNo || '').split('-')
      if (res.bankSigns === '0') {
        res.payeeBankDeptId = '313222080002'
        res.incomeAccBankName = '大连银行'
        res.openBankNetwork = '大连银行第一中心支行'
      }
      let params = {
        payerAcNo: this.acList[res.payerAccount].acNo,
        payerCurrencyCode: res.currencyCode,
        payerAcName: res.payerAccName,
        asFlag: res.useLedger,
        asAcName: res.ledgerName,
        payerAcAddr: res.payerAddress,
        payeeAcNo: res.incomeAcc,
        payeeAcName: res.incomeAccName,
        payeeBankNo: res.payeeBankDeptId,
        rcvBankName: res.openBankNetwork,
        bankFlag: res.bankSigns,
        urgencyFlag: '0',
        areaFlag: '0',
        amount: res.transAmt,
        bigNum: res.bigNum,
        payeeCurrencyCode: 'CNY',
        mobiles: res.incomePhoneNum,
        purpose: res.postScript,
        postscript: res.postScript,
        bookingFlag: res.disposal,
        bookingDate: res.appointmentDate,
        bookingtime: res.appointmentTime,
        virAcNo: res.virAcno,
        virAcName: res.virAcName
      }
      // 使用账簿
      if (res.useLedger === '1') {
        params.asAcNo = this.list[res.ledgerNum].limitAsAcNo
      }
      if (res.disposal === '1') {
        params.bookingDate = util.separationStr(res.appointmentDate)
        params.bookingtime = res.appointmentTime.replace(/[^0-9]*/g, '') + '00'
      }
      httpPost('eweb-cash.MultistageBookTransferConfirm.do', params).then(subRes => {
        if (Number(subRes.limitDayAmount) > 1000000) {
          this.$confirm('您的日累计转账金额已经超过100万元, 是否继续转账?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.checked === true) {
              httpPost('/eweb-transfer.PayeeBookQry.do', {
                payeeAcNo: this.$refs.mNewForm.$data.form.incomeAcc,
                payeeAcName: this.$refs.mNewForm.$data.form.incomeAccName,
                payeeBankId: this.$refs.mNewForm.$data.form.bankSigns === '1' ? this.$refs.mNewForm.$data.form.incomeAccBankName : '313'
              }).then(res => {
                if (res.list.length !== 0) {
                  this.$message({
                    message: '该收款账户是常用往来账户',
                    type: 'error',
                    showClose: true
                  })
                } else {
                  this.$router.push({
                    name: 'multiLevelLedgerTransferConfirm',
                    params: { ...this.formModel, ...params, _Data2Sign: subRes._Data2Sign, _dataMapKey: subRes._dataMapKey, _authenticateType: subRes._authenticateType, feeAmount: subRes.feeAmount, capitalMoney: res.capitalMoney, bankList: this.bankList, fuyan: this.fuyan }
                  })
                }
              })
            } else {
              this.formModel.savePayee = false
              this.$router.push({
                name: 'multiLevelLedgerTransferConfirm',
                params: {
                  ...this.formModel,
                  ...params,
                  _Data2Sign: subRes._Data2Sign,
                  _dataMapKey: subRes._dataMapKey,
                  _authenticateType: subRes._authenticateType,
                  feeAmount: subRes.feeAmount,
                  capitalMoney: res.capitalMoney,
                  savePayee: this.checked,
                  bankList: this.bankList,
                  fuyan: this.fuyan }
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消转账'
            })
          })
        } else {
          if (this.checked === true) {
            httpPost('/eweb-transfer.PayeeBookQry.do', {
              payeeAcNo: this.$refs.mNewForm.$data.form.incomeAcc,
              payeeAcName: this.$refs.mNewForm.$data.form.incomeAccName,
              payeeBankId: this.$refs.mNewForm.$data.form.bankSigns === '1' ? this.$refs.mNewForm.$data.form.incomeAccBankName : '313'
            }).then(res => {
              if (res.list.length !== 0) {
                this.$message({
                  message: '该收款账户是常用往来账户',
                  type: 'error',
                  showClose: true
                })
              } else {
                this.$router.push({
                  name: 'multiLevelLedgerTransferConfirm',
                  params: { ...this.formModel, ...params, _Data2Sign: subRes._Data2Sign, _dataMapKey: subRes._dataMapKey, _authenticateType: subRes._authenticateType, feeAmount: subRes.feeAmount, capitalMoney: res.capitalMoney, bankList: this.bankList, fuyan: this.fuyan }
                })
              }
            })
          } else {
            this.formModel.savePayee = false
            this.$router.push({
              name: 'multiLevelLedgerTransferConfirm',
              params: {
                ...this.formModel,
                ...params,
                _Data2Sign: subRes._Data2Sign,
                _dataMapKey: subRes._dataMapKey,
                _authenticateType: subRes._authenticateType,
                feeAmount: subRes.feeAmount,
                capitalMoney: res.capitalMoney,
                savePayee: this.checked,
                bankList: this.bankList,
                fuyan: this.fuyan }
            })
          }
        }
      }).catch(err => {
        console.error(err)
      })
    },
    onreset (res) {
      this.getAccountList()
      this.selectTrsType(res)
    },
    bankReset (res) {
      this.selectProvince(res)
    },
    changeDisposal (res) {
      switch (res.disposal) {
        case '0':
          this.formConfigJson.formItems[3].group[1].show = false
          this.formConfigJson.formItems[3].group[2].show = false
          this.formConfigJson.rules.appointmentDate = [{ required: false, message: '预约日期', trigger: 'change' }]
          this.formConfigJson.rules.appointmentTime = [{ required: false, message: '预约时间', trigger: 'change' }]
          break
        case '1':
          this.formConfigJson.formItems[3].group[1].show = true
          this.formConfigJson.formItems[3].group[2].show = true
          this.formConfigJson.rules.appointmentDate = [{ required: true, message: '预约日期', trigger: 'change' }]
          this.formConfigJson.rules.appointmentTime = [{ required: true, message: '预约时间', trigger: 'change' }]
          break
      }
    }
  },
  components: {}
}
</script>
