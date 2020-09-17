<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="submit"
              @back="onBack"
            >
            </m-new-form>
        </div>
    </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
export default {
  name: 'PayApplyRecallComfirmPre',
  components: {
  },
  data () {
    return {
      input: '',
      titleData: ['电子商业汇票 ', '票据追索', '同意清偿撤回'],
      formModel: {
        stdBillNum: '',
        stdAppAcct: '',
        stdRcvAcct: '',
        stdPmMoney: '',
        stdAgrrAmt: '',
        stdDrwrAcc: '',
        agreePayDate: ''
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      formConfigJson: {
        stepsActive: 0,
        rules: {
        },
        formItems: [
          {
            formTitle: '票据信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '票据号码',
                'type': 'text',
                'key': 'stdBillNum'
              },
              {
                'disabled': false,
                'label': '追索人账号',
                'type': 'text',
                'key': 'stdRcvAcct'
              },
              {
                'disabled': false,
                'label': '被追索人账号',
                'type': 'text',
                'key': 'stdAppAcct'
              },
              {
                'disabled': false,
                'label': '票面金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdPmMoney'
              }, {
                'disabled': false,
                'label': '同意清偿金额',
                'type': 'text',
                formatter: (key, value) => util.formatCurrency(value),
                'key': 'stdAgrrAmt'
              }, {
                'disabled': true,
                'label': '同意清偿日期',
                'type': 'text',
                formatter: (key, value) => util.separationDate(value),
                'key': 'agreePayDate'
              }
            ]
          },
          {
            formTitle: '申请人信息',
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '客户账号',
                'type': 'text',
                'key': 'stdAppAcct'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    submit (data) {
      let params = {
        stdBillNum: data.stdBillNum, // 票号
        stdPmMoney: data.stdPmMoney, // 票面金额
        stdTranDat: data.stdTranDat, // 交易日期
        stdTranNum: data.stdTranNum, // 交易流水号
        stdRvkrTyp: data.stdAppType, // 撤销人类型
        stdRvkrCod: data.stdAppCode, // 撤销人组织机构代码
        stdRvkrAcc: data.stdAppAcct, // 撤销人账号
        stdBillTyp: data.stdBillTyp, // 票据类型
        stdIssDate: data.stdIssDate, // 出票日期
        stdDueDate: data.stdDueDate, // 到期日期
        stdRcvAcct: data.stdRcvAcct, // 追索人账号
        stdAgrrAmt: data.stdAgrrAmt, // 同意清偿金额
        stdAgrrDat: data.stdAgrrDat, // 同意清偿日期
        stdRvkrBnm: data.stdAppBnm // 撤销人开户行行号
        // stdColtSgn: data.stdColtSgn, // 出质人电子签名
      }
      httpPost('eweb-edraft.QcRevokeReqConfirm.do', params).then(res => {
        this.$router.push({
          name: 'PayApplyRecallComfirm',
          params: {
            formModel: this.formModel,
            res,
            data,
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    onBack () {
      if (this.$route.params.pageNation) {
        this.$router.push({
          name: 'PayApplyRecallComfirmPre',
          params: {
            pageNation: this.$route.params.pageNation, // 分页信息
            params: this.$route.params.params // 查询条件
          }
        })
      }
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formModel.agreePayDate = util.standardDate(new Date())
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
.set{
    background-color: #cc444d;
    color: #fff;
    border-radius: 3px;
  }
  .divBtn{
    margin-left: 3%;
  }
</style>
