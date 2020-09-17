<template>
    <d2-container>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack" @submit="submit"></m-form-res>
    </d2-container>
</template>
<script>
/**
     *@name: 背书申请-结果页
     */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { bank_type } from '@/assets/js/entity.js'
export default {
  name: 'EndorsementTransferApplyRes',
  data () {
    return {
      formModel: {
        transName: '背书申请'
      },
      titleData: ['电子商业汇票', '背书申请', '背书申请结果'],
      btnData: [
        { btnText: '添加为常用往来账户', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        _JnlStatus: '',
        itemWidth: '4',
        resData: {
          title: '',
          group: [
            { label: '交易名称', key: 'transName' },
            // { label: '交易状态', key: 'status' },
            { label: '金额', key: 'stdPmMoney', formatter: (value) => util.formatCurrency(value) },
            { label: '交易日期', key: 'transTime' },
            { label: '操作员姓名', key: 'operatorName' },
            { label: '操作员号', key: 'operatorId' }
          ]
        }
      },
      status: {
        '0': '失败',
        '1': '待审核'
      }
    }
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'EndorsementTransferApplyPre'
      })
    },
    submit () {
      const params = {
        bankNo: this.formModel.stdEndeBnm // 联行号
      }
      httpPost('eweb-common.ApsNodeQry.do', params).then(res => {
        let param = {
          payeeAcNo: this.formModel.stdEndeAcc,
          payeeAcName: this.formModel.stdEndeNam,
          payeeBankCode: res.list[0].clsCode, // 银行id
          payeeBankId: res.list[0].clsCode,
          payeeBankDeptName: res.list[0].lName,
          payeeBankDeptId: res.list[0].bankCode,
          payeeBankName: util.handleEnums(bank_type, res.list[0].clsCode)
        }
        if (res.list[0].drecCode === '313222080002') {
          param.transferType = '0'
          param.payeeBankName = '大连银行'
        }
        if (res.list[0].drecCode !== '313222080002') {
          param.transferType = '1'
        }
        httpPost('/eweb-transfer.PayeeBookAdd.do', param).then(res => {
        }).catch(err => {
          console.error(err)
        })
      })
    }
  },
  created () {
    const user = this.getUser()
    this.formModel.operatorName = user ? user.userName : ''
    this.formModel.operatorId = user ? user.userId : ''
    if (this.$route.params.formModel) {
      Object.assign(this.formModel, this.$route.params.formModel)
      this.formModel.stdPmMoney = this.formModel.amount
      this.data.resData.group.push({ key: 'sum', label: '总笔数' })
      this.formModel.status = this.$route.params.res._processState
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
    if (this.$route.params.data) {
      Object.assign(this.formModel, this.$route.params.data)
      this.data.resData.group.push({ key: 'stdBillNum', label: '票据号码' })
      this.formModel.status = this.$route.params.res._processState
      this.formModel.transTime = this.$route.params.res._transTime
      this.data.resData._jnlNo = this.$route.params.res._jnlNo
      this.data._JnlStatus = this.$route.params.res._processState
    }
  }
}
</script>
