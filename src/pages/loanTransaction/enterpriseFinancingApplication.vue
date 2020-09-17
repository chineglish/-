<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
      <div class="form-box">
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          :msgs="msgs"
          @changeUp="changeUp"
          @submit="submit">
          <span slot="unit">万</span>
        </m-new-form>
      </div>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'enterpriseFinancingApplication',
  data: function () {
    return {
      formModel: {
        enterpriseName: '',
        accountName: '',
        phoneNumber: '',
        telNumber: '',
        applicationAmount: '',
        timeLimit: '6',
        useMode: '流动资产',
        intendedSponsor: ''
      },
      data: ['贷款业务', '企业融资申请'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          enterpriseName: [{ required: true, message: '企业名称不能为空', trigger: 'change' }],
          accountName: [{ required: true, message: '联系人不能为空', trigger: 'change' }],
          phoneNumber: [{ required: true, message: '联系人手机不能为空', trigger: 'change' },
            { validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'blur' }],
          telNumber: [{ required: true, message: '联系电话不能为空', trigger: 'change' },
            { validator: (rule, value, callback) => util.verifyTelePhone(value, callback), trigger: 'blur' }
          ],
          applicationAmount: [{ required: true, message: '申请授信金额不能为空', trigger: 'change' }],
          timeLimit: [{ required: true, message: '期限不能为空', trigger: 'change' }],
          useMode: [{ required: true, message: '用途不能为空', trigger: 'change' }],
          intendedSponsor: [{ required: true, message: '意向申办机构不能为空', trigger: 'change' }]
        },
        formItems: [{
          formWidth: '50%',
          group: [
            {
              'disabled': false,
              'label': '企业名称',
              'type': 'input',
              maxlength: 50,
              'key': 'enterpriseName'
            },
            {
              'disabled': false,
              'label': '联系人',
              'type': 'input',
              maxlength: 50,
              'key': 'accountName'
            },
            {
              'disabled': false,
              'label': '联系人手机',
              'type': 'input',
              maxlength: 11,
              'key': 'phoneNumber'
            },
            {
              'disabled': false,
              'label': '联系电话',
              'type': 'telePhone',
              'key': 'telNumber'
            },
            {
              'disabled': false,
              'label': '申请授信金额',
              'type': 'input',
              'key': 'applicationAmount',
              'appendSlotName': 'unit',
              inputType: 'money',
              keydownEventName: 'limitMoneyInputKeyDown',
              // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
              'inputEventName': 'changeUp'
            },
            {
              'disabled': false,
              'label': '期限',
              'type': 'select',
              'options': [
                { 'value': '6个月', 'key': '6' },
                { 'value': '12个月', 'key': '12' },
                { 'value': '24个月', 'key': '24' },
                { 'value': '36个月', 'key': '36' },
                { 'value': '无限制', 'key': '无限制' }
              ],
              'key': 'timeLimit'
            },
            {
              'disabled': false,
              'label': '用途',
              'type': 'select',
              'options': [
                { 'value': '固定资产', 'key': '固定资产' },
                { 'value': '流动资产', 'key': '流动资产' }
              ],
              'key': 'useMode'
            },
            {
              'disabled': false,
              'label': '意向申办机构',
              'type': 'select',
              'options': [
                // { 'value': '大连银行第一支行', 'key': '大连银行第一支行' },
                // { 'value': '大连银行第二支行', 'key': '大连银行第二支行' },
                // { 'value': '大连银行第三支行', 'key': '大连银行第三支行' },
                // { 'value': '大连银行第四支行', 'key': '大连银行第四支行' },
                // { 'value': '大连银行北京分行', 'key': '大连银行北京分行' },
                // { 'value': '大连银行天津分行', 'key': '大连银行天津分行' },
                // { 'value': '大连银行上海分行', 'key': '大连银行上海分行' },
                // { 'value': '大连银行重庆分行', 'key': '大连银行重庆分行' },
                // { 'value': '大连银行沈阳分行', 'key': '大连银行沈阳分行' },
                // { 'value': '大连银行成都分行', 'key': '大连银行成都分行' },
                // { 'value': '大连银行营口分行', 'key': '大连银行营口分行' },
                // { 'value': '大连银行丹东分行', 'key': '大连银行丹东分行' },
                // { 'value': '小企业经营一部', 'key': '小企业经营一部' },
                // { 'value': '小企业经营二部', 'key': '小企业经营二部' },
                // { 'value': '小企业经营三部', 'key': '小企业经营三部' },
                // { 'value': '小企业经营四部', 'key': '小企业经营四部' }
              ],
              trans: { value: 'deptName', key: 'deptName' },
              'key': 'intendedSponsor'
            }
          ]
        }]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: ['企业融资申请功能，通过输入申请信息进行企业融资申请', '保密承诺：我行郑重声明：您所提交的任何信息、资料，仅供申请审核时参考，保证不对外公开、泄露。']
    }
  },
  methods: {
    // 金额的效验
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.applicationAmount = util.limitInputMoney(res.applicationAmount)
    },
    submit (data) {
      const params = {
        entName: data.enterpriseName,
        contactName: data.accountName,
        cellMobile: data.phoneNumber,
        telephone: data.telNumber,
        applyAmt: data.applicationAmount,
        expire: data.timeLimit,
        purpose: data.useMode,
        appdept: data.intendedSponsor
      }
      httpPost('/eweb-query.EntFinApplyConfirm.do', params).then(res => {
        this.$router.push({
          name: 'enterpriseFinancingConfirm',
          params: { ...data, res }
        })
      })
    }
  },
  created () {
    this.formModel.enterpriseName = this.getUser().cif ? this.getUser().cif.cifName : ''
    httpPost('/eweb-common.DLBankDeptQry.do', {
      deptLevel: '1'
    }).then(res => {
      this.formConfigJson.formItems[0].group[7].options = res.list
      res.list.length > 0 && (this.formModel.intendedSponsor = res.list[0].deptName)
    })
  }
}
</script>
