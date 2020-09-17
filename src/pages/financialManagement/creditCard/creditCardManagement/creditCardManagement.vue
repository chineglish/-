<template>
    <div class="payrollRecordQuery">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          :formModel="formModel"
          @inquire="inquire"
          @reset="reset"
        >
        </m-new-form>
        <div class="form-box">
          <d-table
            :table-data="tableData"
            :pagesize="20"
            :tableHeadData="tableHeadData"
            :operateData="operateData"
            :actionData="actionData"
            @unlinkCreditCard="unlinkCreditCard"
            @linkCreditCard="linkCreditCard"
          >
          </d-table>
        </div>
        <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
/**
   *@name: 信用卡管理
   * @author: 邓焕
   */
import { httpPost } from '@/api/sys/http'

export default {
  name: 'creditCardManagement',

  data () {
    return {
      creditCartsMap: '',
      breadData: ['财务管理', '信用卡', '信用卡管理'],
      formModel: {
        startAndendDate: '',
        contractNo: ''
      },
      msgs: [
        '1.此功能用于企业操作员查询企业名下加挂信用卡信息，并进行加挂、解挂操作。'
      ],
      formConfigJson: {
        rules: {
          creditCardNum: [{ required: false, message: '请输入信用卡卡号', trigger: 'submit' }],
          cardHolderName: [{ required: false, message: '请输入持卡人姓名', trigger: 'submit' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '信用卡卡号',
                'type': 'input',
                'key': 'creditCardNum'
              },
              {
                'disabled': false,
                'label': '持卡人姓名',
                'type': 'input',
                'key': 'cardHolderName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      firstColIndex: {
        type: 'selection'
      },
      tableHeadData: [
        { label: '信用卡卡号', prop: 'acNo' },
        { label: '持卡人姓名', prop: 'acName' }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            btnText: '解挂',
            eventName: 'unlinkCreditCard'
          }
        ]
      },
      actionData: [
        {
          btnText: '信用卡加挂',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'linkCreditCard'
        }
      ],
      tableData: []
    }
  },
  methods: {
    inquire (res) {
      this.tableData = []
      let result = []
      result = this.creditCartsMap.map(item => {
        if ((res.creditCardNum === undefined || item.acNo.indexOf(res.creditCardNum) >= 0) && (res.cardHolderName === undefined || item.acName.indexOf(res.cardHolderName) >= 0)) {
          return item
        }
      })
      this.tableData = result.filter(a => a !== undefined)
    },
    reset (res) {
      // 重置
      this.tableData = this.creditCartsMap
    },
    unlinkCreditCard (res) {
      this.$router.push({
        name: 'unlinkCreditCard',
        params: res.data
      })
    },
    linkCreditCard () {
      this.$router.push({
        name: 'linkCreditCard'
      })
    },
    getListQuery () {
      // 初始化数据
      httpPost('/eweb-transfer.CompanyNoQuery.do').then(CompanyNo => {
        var companyNo = CompanyNo.list[0].companyNo
        httpPost('/eweb-transfer.CreditCartListQuery.do', { companyNo: companyNo }).then(res => {
          this.creditCartsMap = res.creditCardList
          this.tableData = res.creditCardList
        })
      })
    }
  },
  created () {
    this.getListQuery()
  }
}
</script>

<style lang="scss" scoped>
    .form-box {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);
        margin-top: 20px;
    }
    .my-button {
        margin: 20px;
        width: 100%;
        text-align: center;
    }
</style>
