<template>
    <d2-container>
        <m-breadcrumb :data="data"></m-breadcrumb>
        <m-new-form
          ref="mNewForm"
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          :msgs="msgs"
          @transWay="transWay"
          @selectAcct="selectAcct"
          @submit="onSubmit"
          @reset="onReset"
          @changeUp="changeUp"
          @payerAccNoChange="payerAccNoChange"
          @formatCurrency="formatCurrency"
          @changelimitAsAcNo="changelimitAsAcNo"
          @selectAsFlag="selectAsFlag"
          @selectTrsType="selectTrsType"
          @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
          @changeAppointmentDate="changeAppointmentDate"
          @selectRemitModel="selectRemitModel">
          <div class="right-slot" slot="rightSlotName" @click="accountInquire">
            常用往来账户
          </div>
          <div class="right-slot" slot="charges" @click="showCharges = true">
            收费标准
          </div>
        </m-new-form>
        <!-- 常用往来账号弹窗 -->
        <el-dialog
          title="选择常用往来账户"
          :visible.sync="showAccountSelection"
          width="1200px"
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
              :currentPage="currentPage"
              :pagesize="20"
              :operate-data="accountSelection.operateData"
              @handleSelect="accountHandleSelect"
            >
            </d-table>
          </div>
        </el-dialog>
        <!-- 开户行网点弹窗 -->
        <el-dialog
          title="选择开户行网点"
          :visible.sync="showBankSelection"
          width="1200px"
          center>
          <div class="form-box">
            <m-new-form
              :componentJson="bankSelection.formConfigJson"
              :btnData="bankSelection.btnData"
              :formModel="bankSelection.formModel"
              @submit="bankInquire"
              @queryFlag='queryFlag'
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
        <!-- 收费标准说明弹窗 -->
        <el-dialog
          title="收费标准说明"
          :visible.sync="showCharges"
          width="1200px"
          center>
          <ul style="textAlign: left; lineHeight: 30px">
            <li>1. 为了保护企业账户和资金安全，请勿向陌生人汇款，谨防电信网络新型违法犯罪。</li>
            <li>2. 为保证资金划付的准确性，请务必将收款账号、收款人名称和转入银行名称填写正确。信息填写错误造成退款的，手续费不予退回。</li>
            <li>3. 企业账户向个人账户转账，单笔金额不能超过5万。</li>
            <li>4. 如果您选择预约转账方式，因大额转账交易时间受节假日影响，建议100万以上金额选择在前一个工作日20:30-17:15交易</li>
            <li>5. 手续费依照收费标准，普通40%收取。
              <div style="paddingLeft: 30px">
                <h3>收费标准：</h3>
                <ul style="paddingLeft: 20px;paddingBottom: 20px;">
                  <li>1万以下（含1万）5元；</li>
                  <li>1万-10万（含10万）10元；</li>
                  <li>10万-50万（含50万）15元；</li>
                  <li>50万-100万（含100万）20元；</li>
                  <li>100万以上每笔转账金额的万分之零点二，最高50元。</li>
                </ul>
              </div>
            </li>
            <li>6. 如果交易出现异常情况，请立即查询 “账户明细”确认交易是否成功。</li>
            <li>7. 该交易转账金额100万元（不含）以上能够实时到账（需要收款人开户银行支持）。该交易转账金额100万元（含）以下支持7×24小时；转账金额100万元（不含）以上时，转账时间正常为工作日8:30至17:15，具体可咨询客服中心。</li>
            <li>8. 如果您选择次日转账方式，系统将在受理存款人的转账申请后，转账金额被冻结，延时到第二个工作日整点汇出。24小时内可通过“预约转账查询”交易进行撤销</li>
          </ul>
        </el-dialog>
    </d2-container>
</template>
<script>
/**
 *@name: 单笔转账录入页
 * @author: 梁文彬
 * @date: 2019-12-10
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'singleTransPre',
  data () {
    return {
      fuyan: [], // 附言
      bankList: [], // 银行列表
      payerAccNoList: [], // 付款账户信息列表
      currentPage: 1,
      checked: '',
      showBankSelection: false,
      showCharges: false,
      centerDialogVisible: '',
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
          bankCode: '', // 收款账号
          payeeName: '', // 收款账户名称
          payeeBankAcc: '', // 开户行
          payeeBankCode: '',
          bankNo: '',
          queryFlag: '0'
        },
        formConfigJson: {
          formWidth: '50%',
          rules: {
            payeeBankCode: [{ required: true, message: '请先选择开户行', trigger: 'submit' }],
            provCd: [{ required: false, message: '请先选择省分', trigger: 'submit' }],
            cityCode: [{ required: false, message: '请先选择城市', trigger: 'submit' }],
            nodeName: [{ required: true, message: '请先选择开户行网点', trigger: 'submit' }],
            bankNo: [{ required: false, message: '联行号', trigger: 'submit' }]
          },
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
                  'disabled': false,
                  'label': '开户行',
                  'type': 'select',
                  'options': [],
                  'filterable': true,
                  'key': 'payeeBankCode'
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
          { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' },
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
          width: '100',
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
        payerAcNo: '',
        payerAcName: '',
        payerBankAcc: '',
        payeeAcNo: '',
        trsType: '0',
        payeeAcName: '',
        payeeBankCode: '',
        amount: '',
        capitalMoney: '',
        pubDayAmount: '',
        priDayAmount: '',
        processFlag: '',
        remitModel: '',
        appointmentDate: '',
        appointmentTime: '09:00',
        // remark: '单笔转账',
        postscript: '',
        balance: '',
        payeeBankDeptId: '',
        payeeBankDeptName: '',
        asFlag: '0', // 是否使用账簿
        ledgerNum: '', // 账簿号
        ledgerName: '' // 账簿名
      },
      data: ['转账汇款', '单笔转账'],
      msgs: [
        '1.为了保护企业账户和资金安全，请勿向陌生人汇款，谨防电信网络新型违法犯罪。',
        '2.如果交易出现异常情况，请立即查询 “账户明细”确认交易是否成功。',
        '3.如果您选择次日转账方式，系统将与下一工作日整点发起转账，在此期间转账金额将被控制，您可通过“定时交易查询”发起撤销。',
        '4.为保证资金划付的准确性，请务必将收款账号、收款人名称和转入银行名称填写正确。信息填写错误造成退款的，手续费不予退回。',
        '5.企业账户向个人账户转账，单笔金额不能超过5万，日累计金额不超过20万。',
        '6.此交易若选择定时转账，定时时间必须设置为正常工作日银行营业时间20:30-17:15，该交易转账金额100万元（含）以下支持7×24小时；转账金额100万元（不含）以上时，转账时间正常为工作日8:30至17:15，具体可咨询客服中心。',
        '7.手续费依照收费标准的40%收取。',
        '收费标准：',
        '1万以下（含1万）5元；',
        '1万-10万（含10万）10元；',
        '10万-50万（含50万）15元；',
        '50万-100万（含100万）20元，100万以上每笔转账金额的万分之零点二，最高50元。',
        '8. 如果您选择预约转账方式，系统将与约定时间发起交易，请确保账户余额充足并及时查询转账结果，请选择银行工作时间预约。 '
      ],
      formConfigJson: {
        stepsActive: 0,
        formWidth: '50%',
        rules: {
          payeeAcNo: [{ required: true, message: '请输入收款账号', trigger: 'submit' }],
          trsType: [{ required: true, message: '请选择行内行外标志', trigger: 'submit' }],
          payeeAcName: [{ required: true, message: '请输入收款户名', trigger: 'submit' }],
          payeeBankCode: [{ required: true, message: '请选择收款账户开户行', trigger: 'submit' }],
          payeeBankDeptName: [{ required: true, message: '请选择收款账户开户行网点', trigger: 'submit' }],
          amount: [
            { required: true, message: '请输入交易金额', trigger: 'submit' },
            { validator: (rule, value, callback) => util.verifyAmount(value, callback), trigger: 'submit' },
            { validator: (rule, value, callback) => {
              if (Number(value) <= 0) {
                callback(new Error('输入金额应大于0!'))
              } else if (Number(value) > Number(this.$refs.mNewForm.$data.form.balance)) {
                callback(new Error('可用余额不足!'))
              } else {
                callback()
              }
            },
            trigger: 'submit' }
          ],
          remitModel: [{ required: true, message: '请选择到账模式', trigger: 'submit' }],
          postscript: [{ required: false, message: '请输入附言', trigger: 'submit' }],
          ledgerNum: [{ required: false, message: '请选择账簿', trigger: 'submit' }]
        },
        formItems: [
          {
            title: '付款信息',
            group: [
              {
                'disabled': false,
                'label': '付款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow' },
                'key': 'payerAcNo',
                'changeEventName': 'payerAccNoChange'
              },
              { 'disabled': false,
                'label': '可用余额',
                'type': 'text',
                'key': 'balance',
                textType: 'shy',
                mousedown: false,
                formatter: (key, value) => util.formatCurrency(value)
              },
              // { 'disabled': false, 'label': '账号名', 'type': 'text', 'key': 'payerAcName' },
              {
                'disabled': false,
                'label': '付款账户开户行',
                'type': 'text',
                'key': 'payerBankAcc'
              },
              {
                'disabled': false,
                'label': '账户余额',
                'type': 'text',
                'key': 'zhanghye',
                textType: 'shy',
                mousedown: false,
                formatter: (key, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '是否使用账簿',
                'type': 'radio',
                'options': [{ 'value': '是', 'key': '1' }, { 'value': '否', 'key': '0' }],
                'key': 'asFlag',
                'changeEventName': 'selectAsFlag'
              },
              {
                'disabled': false,
                'label': '账簿号',
                'type': 'input',
                filterOptions: true,
                'options': [],
                trans: { value: 'showName', key: 'limitAsAcNo' },
                'changeEventName': 'changelimitAsAcNo',
                'key': 'ledgerNum',
                'show': false
              },
              {
                'disabled': true,
                'label': '账簿名',
                'type': 'text',
                'key': 'ledgerName',
                'show': false
              }
            ]
          },
          {
            title: '收款信息',
            single: true,
            group: [
              {
                'disabled': false,
                'label': '收款账号',
                'type': 'input',
                maxlength: 50,
                'key': 'payeeAcNo',
                'rightSlotName': 'rightSlotName'
              },
              {
                'disabled': false,
                'label': '行内行外标志',
                'type': 'radio',
                'options': [ { 'value': '行内', 'key': '0' }, { 'value': '行外', 'key': '1' } ],
                'key': 'trsType',
                'changeEventName': 'selectTrsType'
              },
              {
                'disabled': false,
                'label': '收款户名',
                'type': 'input',
                maxlength: 70,
                'key': 'payeeAcName'
              },
              {
                'disabled': false,
                'label': '收款账户开户行',
                'type': 'select',
                'options': [],
                'filterable': true,
                'key': 'payeeBankCode'
              },
              {
                'disabled': false,
                'label': '收款账户开户网点',
                'type': 'link',
                formatter: (value) => value || '请选择收款账户开户网点',
                'clickEventName': 'selectAcct',
                'key': 'payeeBankDeptName',
                'show': true
              },
              // {
              //   'disabled': false,
              //   'label': '开户网点号',
              //   'type': 'input',
              //   'key': 'payeeBankDeptId',
              //   'show': false
              // },
              {
                'disabled': false,
                'label': '保存为常用往来账户',
                'type': 'singerCheck',
                value: '',
                key: 'savePayee'
                // noBorder: true,
                // 'blankSlotName': 'save'
              }
            ]
          },
          {
            title: '交易金额',
            group: [
              {
                'disabled': false,
                'label': '交易金额',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                blurEventName: 'formatCurrency',
                'key': 'amount',
                'content': '(元)',
                'inputEventName': 'changeUp',
                'rightSlotName': 'charges'
              }, {
                'label': '可用对公日累计限额',
                'type': 'text',
                'key': 'pubDayAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }, {
                'label': '金额大写',
                'type': 'text',
                'key': 'capitalMoney'
              }, {
                'label': '可用对私日累计限额',
                'type': 'text',
                'key': 'priDayAmount',
                formatter: (key, value) => util.formatCurrency(value)
              }
            ]
          }, {
            title: '附件信息',
            group: [/* {
              'disabled': false,
              'label': '处理方式',
              'type': 'radio',
              'changeEventName': 'transWay',
              'options': [
                { 'value': '普通', 'key': '0' },
                { 'value': '实时', 'key': '1' },
                { 'value': '次日', 'key': '2' },
                { 'value': '预约', 'key': '3' }
              ],
              'key': 'processFlag'
            }, {
              'disabled': false,
              'label': '预约日期',
              'type': 'date',
              'key': 'appointmentDate',
              'show': false
            }, {
              'disabled': false,
              'label': '预约时间',
              'type': 'time',
              'key': 'appointmentTime',
              'show': false
            }, */ {
                'disabled': false,
                'label': '到账模式',
                'type': 'radio',
                'options': [
                  // { 'value': '普通（2-3小时后发送）', 'key': '1' },
                  { 'value': '实时', 'key': '0' },
                  { 'value': '次日', 'key': '2' },
                  { 'value': '预约', 'key': '3' }
                ],
                'key': 'remitModel',
                'changeEventName': 'selectRemitModel',
                'show': true
              },
              {
                'disabled': false,
                'label': '附言',
                'type': 'input',
                maxlength: 70,
                'options': [],
                'key': 'postscript'
              },
              {
                'disabled': false,
                'label': '预约日期',
                'type': 'date',
                'key': 'appointmentDate',
                changeEventName: 'changeAppointmentDate',
                pickerOptions: {
                  disabledDate: time => {
                    const theDate = new Date()
                    if (theDate.getHours() >= 16) {
                      return time.getTime() < theDate.getTime()
                    } else { return time.getTime() < (theDate.getTime() - 3600 * 24 * 1000) }
                  }
                },
                'show': false
              }, {
                'disabled': false,
                'label': '预约时间',
                'type': 'time',
                pickerOptions: {
                  start: '09:00',
                  step: '01:00',
                  end: '17:00'
                },
                'key': 'appointmentTime',
                'show': false
              }
              // {
              //   'disabled': true,
              //   'label': '摘要',
              //   'type': 'input'
              //   'key': 'remark'
              // },

            ]
          }
        ]
      },
      btnData: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      mresList: [],
      mNewForm: ''
    }
  },
  methods: {
    // 预约日期修改
    changeAppointmentDate (res) {
      const appointmentDate = res.appointmentDate ? new Date(res.appointmentDate).getDate() : ''
      const theDate = new Date()
      if (appointmentDate === theDate.getDate()) {
        if (theDate.getMinutes() > 0) {
          this.formModel.appointmentTime = (theDate.getHours() + 2) + ':00'
          this.formConfigJson.formItems[3].group[3].pickerOptions = {
            start: (theDate.getHours() + 2) + ':00',
            step: '01:00',
            end: '17:00'
          }
        } else {
          this.formModel.appointmentTime = (theDate.getHours() + 1) + ':00'
          this.formConfigJson.formItems[3].group[3].pickerOptions = {
            start: (theDate.getHours() + 1) + ':00',
            step: '01:00',
            end: '17:00'
          }
        }
      }
    },
    // 金额转汉字
    formatCurrency (value) {
      this.formModel.capitalMoney = util.getMoneyHanzi(value)
      // this.formModel.amount = util.formatCurrency(value)
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
    // 重置页面
    onReset (res) {
      res.amountcopy = ''
      this.formModel = res
      if (this.payerAccNoList.length > 0) {
        if (this.$route.params.item) {
          this.payerAccNoList.forEach((item, index) => {
            if (item.acNo === this.$route.params.item.acNo) {
              res.payerAcNo = index
            }
          })
        } else { res.payerAcNo = 0 }
      }
      this.payerAccNoChange(res, this.payerAccNoList[0])
      this.selectTrsType(res)
      this.transWay(res)
    },
    // 提交
    onSubmit (res) {
      this.formModel = res
      // const [accNo, subAccNo] = (res.payerAcNo || '').split('-')
      const accNo = this.payerAccNoList[res.payerAcNo].acNo
      const subAccNo = this.payerAccNoList[res.payerAcNo].subAcNo
      let payeeBankName
      if (res.trsType === '0') {
        res.payeeBankDeptId = '313222080002'
        payeeBankName = '大连银行'
        res.payeeBankDeptName = '大连银行'
      } else {
        payeeBankName = res.payeeBankName
      }
      let params = {
        payerAcNo: accNo,
        payerAcName: res.payerAcName,
        payerSubAcNo: subAccNo,
        payeeAcNo: res.payeeAcNo,
        openBank: res.openBank,
        payeeAcName: res.payeeAcName,
        amount: res.amount,
        payeeBankName: payeeBankName,
        payeeBankCode: res.payeeBankCode,
        // remark: res.remark,
        postscript: res.postscript,
        remitModel: res.remitModel,
        trsType: res.trsType,
        asFlag: res.asFlag,
        asAcNo: res.asFlag === '1' ? res.ledgerNum : '',
        asAcName: res.asFlag === '1' ? res.ledgerName : '',
        payeeBankDeptId: res.payeeBankDeptId,
        payeeBankDeptName: res.payeeBankDeptName
      }
      if (res.remitModel === '3') {
        params = {
          ...params,
          scheduleBeginDate: res.appointmentDate,
          scheduleBeginTime: res.appointmentDate + ' ' + res.appointmentTime + ':00',
          scheduleFlag: res.remitModel === '3' ? 'Y' : null, // 预约规则标识
          scheduleFreq: res.remitModel === '3' ? '1' : null, // 预约执行频率
          scheduleType: res.remitModel === '3' ? '0' : null, // 预约方式-次数
          schedule: res.remitModel === '3' ? 'true' : null // 预约方式-次数
        }
      }
      httpPost('eweb-transfer.TransferConfirm.do', params).then(subRes => {
        if (Number(subRes.limitDayAmount) > 1000000) {
          this.$confirm('您的日累计转账金额已经超过100万元, 是否继续转账?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (res.savePayee === true) {
              httpPost('/eweb-transfer.PayeeBookQry.do', {
                payeeAcNo: res.payeeAcNo,
                payeeAcName: res.payeeAcName,
                payeeBankId: res.trsType === '1' ? res.payeeBankCode : '313'
              }).then(payeeList => {
                if (payeeList.list.length !== 0) {
                  this.$message({
                    message: '该收款账户是常用往来账户',
                    type: 'error',
                    showClose: true
                  })
                  res.savePayee = false
                } else {
                  this.$router.push({
                    name: 'singleTransConf',
                    params: {
                      ...this.formModel,
                      ...params,
                      subRes,
                      _Data2Sign: subRes._Data2Sign,
                      _dataMapKey: subRes._dataMapKey,
                      _authenticateType: subRes._authenticateType,
                      feeAmount: subRes.feeAmount,
                      capitalMoney: res.capitalMoney,
                      bankList: this.bankList,
                      fuyan: this.fuyan
                    }
                  })
                }
              })
            } else {
              this.$router.push({
                name: 'singleTransConf',
                params: {
                  ...this.formModel,
                  ...params,
                  subRes,
                  _Data2Sign: subRes._Data2Sign,
                  _dataMapKey: subRes._dataMapKey,
                  _authenticateType: subRes._authenticateType,
                  feeAmount: subRes.feeAmount,
                  capitalMoney: res.capitalMoney,
                  savePayee: this.checked,
                  bankList: this.bankList,
                  fuyan: this.fuyan
                }
              })
            }
          }).catch(() => {
            this.$msg('已取消转账')
          })
        } else if (res.savePayee === true) {
          httpPost('/eweb-transfer.PayeeBookQry.do', {
            payeeAcNo: res.payeeAcNo,
            payeeAcName: res.payeeAcName,
            payeeBankId: res.trsType === '1' ? res.payeeBankCode : '313'
          }).then(payeeList => {
            if (payeeList.list.length !== 0) {
              this.$message({
                message: '该收款账户是常用往来账户',
                type: 'error',
                showClose: true
              })
              res.savePayee = false
            } else {
              this.$router.push({
                name: 'singleTransConf',
                params: {
                  ...this.formModel,
                  ...params,
                  subRes,
                  _Data2Sign: subRes._Data2Sign,
                  _dataMapKey: subRes._dataMapKey,
                  _authenticateType: subRes._authenticateType,
                  feeAmount: subRes.feeAmount,
                  capitalMoney: res.capitalMoney,
                  bankList: this.bankList,
                  fuyan: this.fuyan
                }
              })
            }
          })
        } else {
          this.$router.push({
            name: 'singleTransConf',
            params: {
              ...this.formModel,
              ...params,
              subRes,
              _Data2Sign: subRes._Data2Sign,
              _dataMapKey: subRes._dataMapKey,
              _authenticateType: subRes._authenticateType,
              feeAmount: subRes.feeAmount,
              capitalMoney: res.capitalMoney,
              savePayee: this.checked,
              bankList: this.bankList,
              fuyan: this.fuyan
            }
          })
        }
      })
    },
    // 点击选择开户行网点,打开银行网点查询弹窗
    selectAcct (data) {
      this.formModel = data
      this.showBankSelection = true
    },
    // 改变到账模式
    selectRemitModel (res) {
      if (res.remitModel === '3') {
        this.formConfigJson.formItems[3].group[2].show = true
        this.formConfigJson.formItems[3].group[3].show = true
        let theDay = new Date().getTime() + 60 * 60 * 24 * 1000
        res.appointmentDate = util.formatDate(theDay)
      } else {
        this.formConfigJson.formItems[3].group[2].show = false
        this.formConfigJson.formItems[3].group[3].show = false
      }
    },
    // 改变账簿号
    changelimitAsAcNo (res) {
      this.$set(this.formModel, 'ledgerName', res.asAcName)
    },
    // 是否使用账簿
    selectAsFlag (res) {
      res.ledgerNum = ''
      res.ledgerName = ''
      this.formConfigJson.formItems[0].group[5].options = []
      if (res.asFlag === '1') {
        this.formConfigJson.rules.ledgerNum[0].required = true
        httpPost('/eweb-cash.MultistageBookRightQry.do', {
          acNo: this.payerAccNoList[res.payerAcNo].acNo,
          currencyCode: this.payerAccNoList[res.payerAcNo].currency,
          asAcNo: this.payerAccNoList[res.payerAcNo].asAcno,
          userNo: this.getUser().userId
        }).then(mres => {
          if (mres.list.length > 0) {
            this.formConfigJson.formItems[0].group[5].options = mres.list
            mres.list.forEach(item => {
              item['showName'] = `${item.limitAsAcNo} | ${item.asAcName}`
            })
            this.mresList = mres.list
            if (this.$route.params.item && this.$route.params.item.asAcNo) {
              const asAc = mres.list.find(item => item.limitAsAcNo === this.$route.params.item.asAcNo)
              res.ledgerNum = asAc.limitAsAcNo
              res.ledgerName = asAc.asAcName
            }
          }
        })
        this.formConfigJson.formItems[0].group[5].show = true
        this.formConfigJson.formItems[0].group[6].show = true
      } else {
        this.formConfigJson.rules.ledgerNum[0].required = false
        this.formConfigJson.formItems[0].group[5].show = false
        this.formConfigJson.formItems[0].group[6].show = false
      }
    },
    // 改变行内外标志
    selectTrsType (res) {
      this.formModel = res
      switch (res.trsType) {
        case '0':
          res.payeeBankCode = '大连银行'
          res.payeeBankDeptName = '大连银行'
          res.remitModel = '0'
          this.formConfigJson.formItems[1].group[4].show = false
          // this.formConfigJson.formItems[3].group[0].show = true
          this.formConfigJson.formItems[1].group[3].show = true
          this.formConfigJson.formItems[1].group[3].disabled = true
          break
        case '1':
          res.payeeBankCode = this.bankList[0].bankNo
          // res.payeeBankDeptName = this.bankList[0].bankName
          res.payeeBankDeptName = ''
          this.formConfigJson.formItems[1].group[4].show = true
          // this.formConfigJson.formItems[3].group[0].show = true
          this.formConfigJson.formItems[1].group[3].show = false
          break
      }
      this.selectRemitModel(res)
      this.$forceUpdate()
    },
    /**
     * 当选中预约转账时，出现选择时间的选择框
     */
    transWay (res) {
      if (res.processFlag === '3') {
        this.formConfigJson.formItems[3].group[2].show = true
        this.formConfigJson.formItems[3].group[3].show = true
      } else {
        this.formConfigJson.formItems[3].group[2].show = false
        this.formConfigJson.formItems[3].group[3].show = false
      }
    },
    /**
     * 改变查询方式
     */
    queryFlag (data) {
      if (data.queryFlag === '0') {
        data.bankNo = ''
        this.bankSelection.formConfigJson.formItems[1].group[0].show = true
        this.bankSelection.formConfigJson.formItems[1].group[1].show = true
        this.bankSelection.formConfigJson.formItems[1].group[2].show = true
        this.bankSelection.formConfigJson.formItems[1].group[3].show = true
        this.bankSelection.formConfigJson.formItems[1].group[4].show = false
        this.bankSelection.formConfigJson.rules.payeeBankCode[0].required = true
        this.bankSelection.formConfigJson.rules.nodeName[0].required = true
        this.bankSelection.formConfigJson.rules.bankNo[0].required = false
      }
      if (data.queryFlag === '1') {
        data.payeeBankCode = ''
        data.provCd = ''
        data.cityCode = ''
        data.nodeName = ''
        this.bankSelection.formConfigJson.formItems[1].group[0].show = false
        this.bankSelection.formConfigJson.formItems[1].group[1].show = false
        this.bankSelection.formConfigJson.formItems[1].group[2].show = false
        this.bankSelection.formConfigJson.formItems[1].group[3].show = false
        this.bankSelection.formConfigJson.formItems[1].group[4].show = true
        this.bankSelection.formConfigJson.rules.payeeBankCode[0].required = false
        this.bankSelection.formConfigJson.rules.nodeName[0].required = false
        this.bankSelection.formConfigJson.rules.provCd[0].required = false
        this.bankSelection.formConfigJson.rules.cityCode[0].required = false
        this.bankSelection.formConfigJson.rules.bankNo[0].required = true
      }
    },
    /**
     * 银行列表查询
     */
    bankListQry () {
      httpPost('eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.bankSelection.formConfigJson.formItems[1].group[0].options = res.bankList
            .map(item => ({ value: item.bankName, key: item.bankNo }))
          this.bankSelection.formModel.payeeBankId = res.bankList[0].bankNo
        }
      })
    },
    // 省列表查询
    provinceListQry () {
      httpPost('eweb-common.ProvinceQry.do').then(res => {
        if (res && Array.isArray(res.provinceList)) {
          this.bankSelection.formConfigJson.formItems[1].group[1].options = res.provinceList.map(item => ({ value: item.provName, key: item.provCd }))
          this.bankSelection.formConfigJson.formItems[1].group[1].options.unshift({ value: '请选择省', key: '' })
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
            this.bankSelection.formConfigJson.formItems[1].group[2].options = res.cityList.map(item => ({ value: item.cityName, key: item.cityCd }))
            this.bankSelection.formConfigJson.formItems[1].group[2].options.unshift({ value: '请选择城市', key: '' })
          }
        })
      } else {
        this.bankSelection.formConfigJson.rules.cityCode[0].required = false
        this.bankSelection.formConfigJson.rules.nodeName[0].required = true
      }
    },
    // 银行选择重置
    bankReset (res) {
      this.selectProvince(res)
    },
    // 银行网点查询
    bankInquire (res) {
      this.formModel.payeeBankCode = res.payeeBankCode
      const params = {
        bankNo: res.bankNo, // 联行号
        bankCode: res.payeeBankCode,
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
      this.formModel.payeeBankDeptName = data.data.lName
      this.formModel.payeeBankCode = data.data.clsCode
      this.formModel.payeeBankDeptId = data.data.bankCode
      this.formModel.payeeBankName = this.bankList.find(item => data.data.clsCode === item.bankNo).bankName
      this.showBankSelection = false
    },
    /**
     * 付款账号列表查询
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'Transfer' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.payerAccNoList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        if (this.$route.params.item) {
          this.payerAccNoList.forEach((item, index) => {
            if (this.$route.params.item.acNo === item.acNo) {
              this.formModel.payerAcNo = index
            }
          })
        } else {
          this.formModel.payerAcNo = this.payerAccNoList.length > 0 ? 0 : ''
        }
        this.formModel.payerAcName = res.AcList[0].acName
        this.formModel.payerBankAcc = res.AcList[0].openBank
        // 判断是否是由多级账簿查询跳转过来
        if (this.$route.params.item && this.$route.params.item.asAcNo) {
          this.formModel.asFlag = '1'
        }
        this.payerAccNoChange(this.formModel, this.payerAccNoList[0])
      })
    },
    /**
     * 根据选择的付款账号 反显 付款账号姓名，付款账号开户行
     * @param data
     */
    payerAccNoChange (data, obj) {
      data.payerAcName = obj.acName
      data.payerBankAcc = obj.openBank
      data.perCardFlag = obj.perCardFlag
      const params = {
        payerAcNo: obj.acNo,
        payerSubAcNo: obj.subAcNo
      }
      if (data.asFlag === '1') {
        this.selectAsFlag(data)
      }
      httpPost('eweb-acmgmt.AccountInfoQuery.do', params).then(res => {
        this.formModel.balance = res.availBal
        this.formModel.zhanghye = res.balance
      })
      httpPost('eweb-common.AvailableLimitQuery.do', {
        transTypeCode: 'E2E',
        payerAcNo: obj.acNo,
        productId: 'ent.MCTransfer'
      }).then(availableLimit => {
        data.pubDayAmount = availableLimit.limitAmount
        httpPost('eweb-common.AvailableLimitQuery.do', {
          transTypeCode: 'E2P',
          payerAcNo: obj.acNo,
          productId: 'ent.MCTransfer'
        }).then(availableLimit => {
          data.priDayAmount = availableLimit.limitAmount
        })
      })
    },
    // 附言查询
    getPostscript () {
      // httpPost('/eweb-transfer.TransferRemarkManage.do', {
      //   trsFlag: '0',
      //   remarkName: ''
      // }).then(res => {
      //   const post = res.remrkNameList.map((item, index) => ({ value: item.remarkName, key: index }))
      //   for (let i = 0; i < post.length; i++) {
      //     this.formConfigJson.formItems[3].group[1].options.push(post[i])
      //   }
      //   this.fuyan = this.formConfigJson.formItems[3].group[1].options
      // })
      this.formConfigJson.formItems[3].group[1].options = util.getPostscript()
    },
    // 常用往来账号确认选择
    accountHandleSelect (account) {
      const data = account.data
      this.formModel.payeeAcNo = data.payeeAccountNo
      this.formModel.trsType = data.lastTrsType
      this.formModel.payeeAcName = data.payeeAccountName
      this.formModel.payeeBankCode = data.lastTrsType === '1' ? data.payeeBankCode : '大连银行'
      this.formModel.payeeBankDeptId = data.payeeBankDeptId
      this.formModel.payeeBankDeptName = data.payeeBankDeptName
      this.formModel.payeeBankName = data.payeeBankName
      this.showAccountSelection = false
      switch (this.formModel.trsType) {
        case '0':
          this.formModel.payeeBankDeptName = '大连银行'
          this.formModel.remitModel = '0'
          this.formConfigJson.formItems[1].group[4].show = false
          this.formConfigJson.formItems[1].group[3].disabled = true
          this.formConfigJson.formItems[1].group[3].show = true
          break
        case '1':
          this.formConfigJson.formItems[1].group[4].show = true
          this.formConfigJson.formItems[1].group[3].show = false
          break
      }
      this.selectRemitModel(this.formModel)
    },
    // 点击常用联系人, 打开常用联系人选择弹出框
    accountInquire (res) {
      this.showAccountSelection = true
      this.accountListQry(res)
    },
    // 初始查询常用联系人
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
    // 筛选符合条件常用联系人
    screenAccounts (res) {
      setTimeout(() => {
        this.accountSelection.tableData = this.accountSelection.allData.filter(item => {
          if (
            ((item.payeeBankName && item.payeeBankName.indexOf(res.payeeBank) !== -1) || (!item.payeeBankName && !res.payeeBank)) &&
            ((item.payeeAccountNo && item.payeeAccountNo.indexOf(res.payeeAccont) !== -1) || (!item.payeeAccountNo && !res.payeeAccont)) &&
            ((item.payeeAccountName && item.payeeAccountName.indexOf(res.payeeName) !== -1) || (!item.payeeAccountName && !res.payeeName)) &&
            ((item.payeeBankDeptName && item.payeeBankDeptName.indexOf(res.payeeBankDeptName) !== -1) || (!item.payeeBankDeptName && !res.payeeBankDeptName))
          ) {
            return true
          } else {
            return false
          }
        })
        this.currentPage = 1
      }, 100)
    }
  },
  created () {
    // 附言查询
    this.getPostscript()
    // 省份列表查询
    this.provinceListQry()
    if (!(Array.isArray(this.payerAccNoList) && this.payerAccNoList.length > 0)) {
      this.accNoListQry()
    }
    if (!(Array.isArray(this.bankList) && this.bankList.length > 0)) {
      this.bankListQry()
    }

    // 判断行内外标志
    if (this.formModel.trsType === '0') {
      this.formModel.payeeBankCode = '大连银行'
      this.formModel.payeeBankDeptName = '大连银行'
      this.formModel.remitModel = '0'
      this.formConfigJson.formItems[1].group[4].show = false
      this.formConfigJson.formItems[1].group[3].disabled = true
    } else if (this.formModel.trsType === '1') {
      this.formConfigJson.formItems[1].group[4].show = true
      this.formConfigJson.formItems[1].group[3].disabled = false
    }
  }
}
</script>
