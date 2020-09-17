<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @submit="onSubmit"
          @close="close"
          @changeUp="changeUp"
          @selectBank="selectBank">
          <div class="right-slot" slot="rightSlotName" @click="accountInquire">
            常用往来账户
          </div>
          <div class="right-slot" slot="queryBank" @click="queryBank">
            银行信息查询
          </div>
        </m-new-form>
        <!-- 银行信息查询弹窗 -->
        <el-dialog
          title="银行信息查询"
          :visible.sync="showBankSelection"
          width="950px"
          center>
          <bank-select :trsType.sync="formModel.trsType" eventName="bankSelect" ref="bankSelect" @bankSelect="bankSelect"/>
        </el-dialog>
        <!-- 常用往来账户弹窗 -->
        <el-dialog
          title="选择常用往来账户"
          :visible.sync="showAccountSelection"
          width="950px"
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
              :tableHeadData="accountSelection.tableHeadData"
              :pageSize="20"
              :operate-data="accountSelection.operateData"
              @handleSelect="accountHandleSelect"
            >
            </d-table>
          </div>
        </el-dialog>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
import BankSelect from './components/bankSelect'
export default {
  name: 'addBatch',
  components: {
    BankSelect
  },
  data () {
    return {
      index: '',
      formModel: {
        trsType: '0',
        payeeAcName: '',
        payeeAcNo: '',
        payeeBankId: '',
        payeeDeptId: '',
        amount: '',
        capitalMoney: '',
        postScript: ''
      },
      data: ['转账汇款', '批量转账手工录入'],
      showBankSelection: false,
      showAccountSelection: false,
      accountSelection: {
        formModel: {
          payeeAccont: '',
          payeeName: '',
          payeeBank: '',
          payeeBankDeptName: ''
        },
        formConfigJson: {
          formWidth: '50%',
          formItems: [
            {
              // title: '到账通知单',
              group: [
                {
                  'disabled': false,
                  'label': '收款账号',
                  'type': 'input',
                  'key': 'payeeAccont',
                  'inputEventName': 'screenAccounts'
                },
                {
                  'disabled': false,
                  'label': '收款账户名称',
                  'type': 'input',
                  'key': 'payeeName',
                  'inputEventName': 'screenAccounts'
                },
                {
                  'disabled': false,
                  'label': '收款账户开户行',
                  'type': 'input',
                  'key': 'payeeBank',
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
          { label: '收款账号', prop: 'payeeAccountNo' },
          { label: '收款账户名称', prop: 'payeeAccountName' },
          { label: '收款账户开户行', prop: 'payeeBankName' },
          { label: '开户网点',
            prop: 'payeeBankDeptName',
            width: '280',
            formatter: (row, column, cellValue, index) =>
              row.lastTrsType === '0' ? '' : cellValue
          }
        ],
        tableData: [],
        allData: [],
        operateData: {
          width: '100',
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
      formConfigJson: {
        rules: {
          trsType: [{ required: true, message: '是否为大连银行', trigger: 'submit' }],
          payeeAcName: [{ required: true, message: '收款账户名称', trigger: 'submit' }],
          payeeAcNo: [{ required: true, message: '收款账号', trigger: 'submit' }],
          payeeBankId: [{ required: true, message: '收款行行号', trigger: 'submit' }],
          amount: [
            { required: true, message: '交易金额', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) <= 0) {
                callback(new Error('输入金额应大于0'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ],
          payeeDeptId: [{ required: true, message: '收款开户行', trigger: 'submit' }]
        },
        formItems: [{
          formWidth: '50%',
          title: '收款人信息',
          group: [{
            'disabled': false,
            'label': '是否为大连银行',
            'type': 'radio',
            'options': [
              { 'value': '是', 'key': '0' },
              { 'value': '否', 'key': '1' }
            ],
            'key': 'trsType',
            'changeEventName': 'selectBank'
          }, {
            'disabled': false,
            'label': '收款账户名称',
            'type': 'input',
            'key': 'payeeAcName',
            maxlength: 70
          }, {
            'disabled': false,
            'label': '收款账号',
            'type': 'input',
            'key': 'payeeAcNo',
            'rightSlotName': 'rightSlotName'
          }, {
            'disabled': false,
            'label': '收款行行号',
            'type': 'input',
            'key': 'payeeBankId',
            'rightSlotName': 'queryBank',
            maxlength: 12,
            'show': true
          }, {
            'disabled': false,
            'label': '收款账户开户行行号',
            'type': 'input',
            'key': 'payeeDeptId',
            'show': false
          }]
        }, {
          formWidth: '50%',
          title: '交易金额',
          group: [{
            'disabled': false,
            'label': '交易金额',
            'type': 'input',
            'key': 'amount',
            inputType: 'money',
            // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
            keydownEventName: 'limitMoneyInputKeyDown',
            'inputEventName': 'changeUp'
          }, {
            'disabled': true,
            'label': '金额大写',
            'type': 'text',
            'key': 'capitalMoney'
          }]
        }, {
          formWidth: '50%',
          title: '附加信息',
          group: [{
            'disabled': false,
            'label': '附言',
            'type': 'input',
            maxlength: 70,
            options: [],
            'key': 'postScript'
          }]
        }]
      },
      btnData: [
        { btnText: '保存', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '关闭', class: 'm-cancel-btn', clickEventName: 'close' }
      ],
      bank: {
        '行内': '0',
        '行外': '1'
      }
    }
  },
  methods: {
    // 查询银行
    queryBank () {
      this.showBankSelection = true
      this.$nextTick(() => {
        this.$refs.bankSelect.bankListQry()
      })
    },
    bankSelect (data) {
      this.showBankSelection = false
      this.formModel.payeeBankId = data.bankCode
      this.formModel.payeeDeptId = data.bankCode
    },
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    /**
     * 将金额数据转换成大写
     */
    changeUp (res) {
      res.amount = util.limitInputMoney(res.amount)
      res.capitalMoney = util.getMoneyHanzi(res.amount)
    },
    onSubmit (params) {
      params.payeeDeptId = params.payeeBankId
      if (this.index === '') {
        this.$store.state.d2admin.manualImport.transData.push(params)
      } else {
        Object.assign(this.$store.state.d2admin.manualImport.transData[this.index], params)
      }
      this.$router.push({
        name: 'batchTransfer',
        params: {
          activeName: 'second'
        }
      })
    },
    // 常用联系人点击
    accountInquire (res) {
      this.showAccountSelection = true
      this.accountListQry(res)
    },
    // 获取常用联系人
    accountListQry (data) {
      const params = {
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankId: ''
      }
      httpPost('eweb-transfer.PayeeBookQry.do', params).then(res => {
        this.accountSelection.tableData = res.list
        this.accountSelection.allData = res.list
      })
    },
    // 筛选常用联系人
    screenAccounts (res) {
      setTimeout(() => {
        this.accountSelection.tableData = []
        this.accountSelection.allData.forEach(item => {
          if (
            (item.payeeBankName && item.payeeBankName.indexOf(res.payeeBank) !== -1) &&
            (item.payeeAccountNo && item.payeeAccountNo.indexOf(res.payeeAccont) !== -1) &&
            (item.payeeAccountName && item.payeeAccountName.indexOf(res.payeeName) !== -1) &&
            (item.payeeBankDeptName && item.payeeBankDeptName.indexOf(res.payeeBankDeptName) !== -1)
          ) {
            this.accountSelection.tableData.push(item)
          }
        })
      }, 50)
    },
    // 选择常用联系人
    accountHandleSelect (data) {
      this.formModel.payeeAcNo = data.data.payeeAccountNo
      this.formModel.trsType = data.data.lastTrsType
      this.formModel.payeeAcName = data.data.payeeAccountName
      this.formModel.payeeBankId = data.data.payeeBankDeptId
      this.formModel.payeeDeptId = data.data.payeeBankDeptId
      this.showAccountSelection = false
    },
    selectBank (res) {
      this.$set(this.formModel, 'trsType', res.trsType)
      if (res.trsType === '0') {
        // this.formConfigJson.formItems[0].group[3].show = false
        // this.formConfigJson.formItems[0].group[4].show = false
        // 需要找业务确认是否反显
        // this.formModel.payeeDeptId = '313222080002'
        // this.formModel.payeeBankId = '313222080002'
        this.formModel.payeeBankId = ''
      } else {
        // this.formConfigJson.formItems[0].group[3].show = true
        // this.formConfigJson.formItems[0].group[4].show = true
        this.formModel.payeeBankId = this.$route.params.data ? this.$route.params.data.payeeBankId : ''
        this.formModel.payeeDeptId = this.$route.params.data ? this.$route.params.data.payeeDeptId : ''
      }
    },
    close () {
      this.$router.push({
        name: 'batchTransfer',
        params: {
          activeName: 'second'
        }
      })
    },
    queryRemark () {
      // httpPost('/eweb-transfer.TransferRemarkManage.do', {
      //   trsFlag: '0',
      //   remarkName: ''
      // }).then(res => {
      //   const post = res.remrkNameList.map((item, index) => ({ value: item.remarkName, key: index }))
      //   for (let i = 0; i < post.length; i++) {
      //     this.formConfigJson.formItems[2].group[0].options.push(post[i])
      //   }
      // })
      this.formConfigJson.formItems[2].group[0].options = util.getPostscript()
    }
  },
  created () {
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      this.index = this.$route.params.index
    }
    this.selectBank(this.formModel)
    this.queryRemark()
  }
}
</script>
