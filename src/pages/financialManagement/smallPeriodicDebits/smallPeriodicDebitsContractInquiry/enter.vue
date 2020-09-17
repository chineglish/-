<template>
    <d2-container>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              ref="mNewForm"
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @selectBusiness="selectBusiness"
              @limitMoneyInputKeyDown="limitMoneyInputKeyDown"
              @changeUp="changeUp"
              @submit="onSubmit"
              @reset="reset"
            >
              <div class="appslot fs14" slot="comment">（范围0~5天）</div>
            </m-new-form>
        </div>
        <div class="m-tips">
          <p class="hint-title fs16">
            <img class="hint-title-img" src="../../../../components/m-hint-box/prompt.png">
            温馨提示</p>
          <ul class="hint-box">
            <li class="m-pclass fs14">
              1.小额定期借记业务可办理定期批量扣款业务，如收款单位委托其开户银行收取的水、电、煤气、通讯、保险等公用事业费用。如果您需要向缴费企业主动扣收费用，必须先向开户行申请开通“定期借贷记”功能，依据当事各方签订的合同(协议)，定期向指定的收款账户开户银行发起的批量收款业务。
            </li>
            <li class="m-pclass fs14">
              2.在一个批量文件里只能设置一个收款账号，收款账号必须是加挂至网上银行的账户，付款卡号必须是已签订协议的缴费客户指定的账号。
            </li>
            <li class="m-pclass fs14">
              3.上传的批量文件，我们为您提供模板下载，点击<a ref="template" href='/resources/debitTemplate.xls' download="大连银行小额定期借记模板.xls">模板下载</a>请按照模板样式编辑。一个批量文件可录入2000笔收费指令。
            </li>
            <li class="m-pclass fs14">
              4.回执天数为第三方签约客户的账户开户行，对交易进行确认的最长有效天数。
            </li>
            <li class="m-pclass fs14">
              5.交易结果可通过“小额定期借记查询”。
            </li>
          </ul>
        </div>
    </d2-container>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
/**
 * @name 小额定期借记业务签约录入
 * @date 2019-12-23
 * @auther 邓焕
 */
export default {
  name: 'smallPeriodicDebitsContractPre',
  data () {
    return {
      formModel: {
        payerAccNoList: [], // 付款账户信息列表
        collectionAct: '',
        businessType: 'E102',
        businessKind: '00100',
        payerAmt: '',
        receiptDays: '',
        detailsNum: '',
        uploadFile: []
      },
      business: [
        {
          businessType: 'E102',
          businessKind: [
            { 'key': '00100', 'value': '电费' },
            { 'key': '00101', 'value': '家用电费' },
            { 'key': '00102', 'value': '生产用电费' },
            { 'key': '00200', 'value': '水暖费' },
            { 'key': '00201', 'value': '用水费' },
            { 'key': '00202', 'value': '排水费' },
            { 'key': '00203', 'value': '直饮水费' },
            { 'key': '00204', 'value': '污水处理费' },
            { 'key': '00205', 'value': '暖气费' },
            { 'key': '00300', 'value': '煤气费' },
            { 'key': '00301', 'value': '管道煤气费' },
            { 'key': '00400', 'value': '电话费' },
            { 'key': '00401', 'value': '市内电话费' },
            { 'key': '00402', 'value': '长途电话费' },
            { 'key': '00403', 'value': '移动电话费' },
            { 'key': '00404', 'value': '电话初装费' },
            { 'key': '00405', 'value': 'IP电话费' },
            { 'key': '00500', 'value': '通讯费' },
            { 'key': '00501', 'value': '数据通讯费' },
            { 'key': '00502', 'value': '线路月租费' },
            { 'key': '00503', 'value': '代维费' },
            { 'key': '00504', 'value': '网络使用费' },
            { 'key': '00505', 'value': '信息服务费' },
            { 'key': '00506', 'value': '移动电子商务费' },
            { 'key': '00507', 'value': '网关业务费' },
            { 'key': '00508', 'value': '手机话费' },
            { 'key': '00600', 'value': '保险费' },
            { 'key': '00601', 'value': '续期寿险费' },
            { 'key': '00602', 'value': '社会保险费' },
            { 'key': '00603', 'value': '养老保险费' },
            { 'key': '00604', 'value': '医疗保险费' },
            { 'key': '00605', 'value': '车辆保险费' },
            { 'key': '00700', 'value': '房屋管理费' },
            { 'key': '00701', 'value': '房屋租赁费' },
            { 'key': '00702', 'value': '租赁服务费' },
            { 'key': '00703', 'value': '物业管理费' },
            { 'key': '00704', 'value': '清洁费' },
            { 'key': '00705', 'value': '保安服务费' },
            { 'key': '00706', 'value': '电梯维护保养费' },
            { 'key': '00707', 'value': '绿化费' },
            { 'key': '00708', 'value': '停车费' },
            { 'key': '00800', 'value': '代理服务费' },
            { 'key': '00801', 'value': '押运服务费' },
            { 'key': '00802', 'value': '票据传递费' },
            { 'key': '00803', 'value': '代理记账服务费' },
            { 'key': '00900', 'value': '学教费' },
            { 'key': '00901', 'value': '报考费' },
            { 'key': '00902', 'value': '学杂费' },
            { 'key': '00903', 'value': '保教费' },
            { 'key': '01000', 'value': '有线电视费' },
            { 'key': '01001', 'value': '有线电视租赁费' },
            { 'key': '01002', 'value': '移动电视费' },
            { 'key': '01100', 'value': '企业管理费用' },
            { 'key': '01101', 'value': '工商行政管理费' },
            { 'key': '01102', 'value': '商检费' },
            { 'key': '01201', 'value': '土地使用费' },
            { 'key': '04900', 'value': '其他费用' },
            { 'key': '04902', 'value': '加油卡费' },
            { 'key': '04903', 'value': '消费贷款' },
            { 'key': '05100', 'value': '薪金报酬' },
            { 'key': '05103', 'value': '养老金' },
            { 'key': '05104', 'value': '工资' },
            { 'key': '05105', 'value': '奖金' },
            { 'key': '05106', 'value': '企业年金' },
            { 'key': '09900', 'value': '其他代付费用' },
            { 'key': '09901', 'value': '付福利彩票奖金' }
          ]
        }, {
          businessType: 'F100',
          businessKind: [
            { 'key': '01600', 'value': '公积金' }
          ]
        }
      ],
      breadData: ['财务管理', '小额定期借记业务签约'],
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        rules: {
          payerAmt: [{ required: true, message: '请输入支付金额', trigger: 'submit' }],
          receiptDays: [{ required: true, message: '请输入回执天数', trigger: 'submit' }, { validator: (rule, value, callback) => {
            if (Number(value) > 5) {
              this.$refs.mNewForm.$data.form.receiptDays = 5
              callback(new Error('回执天数需小于5天'))
            } else if (Number(value) < 0) {
              this.$refs.mNewForm.$data.form.receiptDays = 0
              callback(new Error('回执天数需大于或等于0天'))
            } else { callback() }
          },
          trigger: 'change' }],
          uploadFile: [{ required: true, message: '请选择要上传的文件', trigger: 'submit' }],
          detailsNum: [{ required: true, message: '请输入明细笔数', trigger: 'submit' }, { validator: (rule, value, callback) => {
            if (Number(value) > 2000) {
              this.$refs.mNewForm.$data.form.detailsNum = 2000
              callback(new Error('明细笔数需小于2000条'))
            } else if (Number(value) <= 0) {
              this.$refs.mNewForm.$data.form.detailsNum = 1
              callback(new Error('明细笔数需大于0条'))
            } else { callback() }
          },
          trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '收款账户',
                'type': 'select',
                'options': [],
                trans: { value: 'paymentActShow' },
                'key': 'collectionAct'
              },
              {
                'disabled': false,
                'label': '业务类型',
                'type': 'select',
                'options': [
                  { 'value': '普通定期借记', 'key': 'E102' },
                  { 'value': '定期代收', 'key': 'F100' }
                ],
                'key': 'businessType',
                'changeEventName': 'selectBusiness'
              },
              {
                'disabled': false,
                'label': '业务种类',
                'type': 'select',
                'options': [],
                'key': 'businessKind'
              },
              {
                'disabled': false,
                'label': '支付金额',
                'type': 'input',
                inputType: 'money',
                // oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'payerAmt'
              },
              {
                'disabled': false,
                'label': '明细笔数',
                'type': 'input',
                oninput: 'value=value.replace(/^((![1-9][0-9]*)|((![0].d{1,2}|[1-9][0-9]*.d{1,2})))$/g,"")',
                keydownEventName: 'limitMoneyInputKeyDown',
                'inputEventName': 'changeUp',
                'key': 'detailsNum',
                maxlength: 4
              },
              {
                'disabled': false,
                'label': '回执天数',
                'type': 'input',
                'key': 'receiptDays',
                appendSlotName: 'comment',
                inputType: 'Number',
                max: 5,
                min: 0
              },
              {
                'disabled': false,
                'label': '上传附件',
                'type': 'upload',
                'key': 'uploadFile',
                width: '100%',
                inputWidth: '65%'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: []
    }
  },
  methods: {
    limitMoneyInputKeyDown (e) {
      util.limitMoneyInputKeyDown(e)
    },
    changeUp (res) {
      res.payerAmt = util.limitInputMoney(res.payerAmt)
    },
    getAccountList () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: 'SmallLimitBorrow' }).then(res => {
        this.formModel.payerAccNoList = res.AcList || []
        this.formModel.payerAccNoList.forEach(item => {
          item.paymentActShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAccNoList
        if (this.formModel.payerAccNoList.length > 0) {
          this.formModel.collectionAct = 0
        }
        // 设置业务类型和种类
        const typeKind = this.business.find(item => item.businessType === this.formModel.businessType)
        this.formConfigJson.formItems[0].group[2].options = typeKind.businessKind
        this.formModel.businessKind = typeKind.businessKind[0].key
      })
    },
    selectBusiness (res) {
      const typeKind = this.business.find(item => item.businessType === res.businessType)
      this.formConfigJson.formItems[0].group[2].options = typeKind.businessKind
      this.formModel.businessKind = typeKind.businessKind[0].key
    },
    onSubmit (data) {
      let _params = data
      _params.paymentActShow = data.payerAccNoList[data.collectionAct].paymentActShow
      // let uploadData = new window.FormData()
      // uploadData.append('type', 'borrow')
      // uploadData.append('acNo', this.formModel.payerAccNoList[data.collectionAct].acNo)
      // uploadData.append('amount', data.payerAmt)
      // uploadData.append('count', data.detailsNum)
      // uploadData.append('uploadFile', data.uploadFile[0])
      httpPost('/eweb-transfer.SmallLimitBorrowUploadFile.do', {
        type: 'borrow',
        acNo: this.formModel.payerAccNoList[data.collectionAct].acNo,
        subAcNo: this.formModel.payerAccNoList[data.collectionAct].subAcNo,
        amount: data.payerAmt,
        count: data.detailsNum,
        uploadFile: data.uploadFile[0]
      }, { formData: true }).then(res => {
        _params.filePath = res.bodyMap.filePath
        _params.fileName = res.bodyMap.fileName
        _params.feeAmt = res.bodyMap.fee
        httpPost('/eweb-transfer.SmallLimitBorrowConfirm.do', {
          type: 'borrow',
          acNo: this.formModel.payerAccNoList[data.collectionAct].acNo,
          subAcNo: this.formModel.payerAccNoList[data.collectionAct].subAcNo,
          amount: data.payerAmt,
          count: data.detailsNum,
          filePath: res.filePath,
          fee: res.bodyMap.fee,
          receiptLimit: data.receiptDays,
          businessKind: data.businessKind,
          businessType: data.businessType
        }).then(confirm => {
          Object.assign(confirm, _params)
          this.$router.push({
            name: 'smallPeriodicDebitsContractConf',
            params: confirm
          })
        })
      })
    },
    reset (res) {
      res.payerAmtcopy = ''
      res.businessType = this.formModel.businessType
      res.businessKind = this.formModel.businessKind
      res.collectionAct = this.formModel.collectionAct
      this.formModel = res
      // if (this.formModel.payerAccNoList.length > 0) {
      //   this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAccNoList
      //   res.collectionAct = 0
      // }
    }
  },
  mounted () {
    this.$refs.template.href = util.getUrl() + 'resources/debitTemplate.xls'
  },
  created () {
    if (this.$route.params.businessType) {
      Object.assign(this.formModel, this.$route.params)
      const backKind = this.business.find(item => item.businessType === this.$route.params.businessType)
      this.formConfigJson.formItems[0].group[2].options = backKind.businessKind
      this.formModel.businessKind = this.$route.params.businessKind
      this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAccNoList
    } else {
      this.getAccountList()
    }
  }
}
</script>

<style lang="scss">
.el-input-group__append{
    color: #333333;
    padding: 0;
}
.appslot {
  line-height: 30px !important;
  height: 30px;
}
</style>
