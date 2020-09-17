<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
<!--        <div style="clear: both;"></div>-->
        <div class="title">
            <span class="title-separate">&nbsp;</span>
            公司总额度信息
        </div>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
            >
            </m-new-form>
        </div>
        <div class="title fs16">
          <span class="title-separate">&nbsp;</span>
          公司名下信用卡账户信息
        </div>
        <div class="form-box">
          <d-table
            :table-data="tableData"
            :pagesize="20"
            :tableHeadData="tableHeadData"
            :operateData="operateData"
            @Repayment="Repayment"
          >
          </d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
 * @name: 信用卡还款
 * @author: 邓焕
 * @date: 2019-12-16
 */

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'creditCardPayments',
  data () {
    return {
      breadData: ['财务管理', '信用卡', '信用卡还款'],
      promptList: [
        '1.信用卡交易查询目前只支持查询近6个月的交易明细。'
      ],
      formModel: {
        credit: '',
        availableCredit: '',
        unallocatedCredit: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '33.3%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '公司信用额度',
                'type': 'text',
                'key': 'credit',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '公司可用额度',
                'type': 'text',
                'key': 'availableCredit',
                formatter: (name, value) => util.formatCurrency(value)
              },
              {
                'disabled': false,
                'label': '公司未分配额度',
                'type': 'text',
                'key': 'unallocatedCredit',
                formatter: (name, value) => util.formatCurrency(value)
              }
            ]
          }
        ]
      },
      tableHeadData: [
        { label: '信用卡卡号', prop: 'acNo' },
        { label: '持卡人姓名', prop: 'acName' }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            btnText: '还款',
            eventName: 'Repayment'
          }
        ]
      },
      tableData: []
    }
  },
  methods: {
    Repayment (data) {
      console.log('data===', data)
      // 点击还款
      this.$router.push({
        name: 'creditCardPaymentsPre',
        params: {
          formModel: data.data,
          data: {
            currentLimit: this.formModel.availableCredit,
            creditLimit: this.formModel.credit,
            credUnasn: this.formModel.unallocatedCredit
          }
        }
      })
    },
    init () {
      httpPost('/eweb-transfer.CompanyNoQuery.do').then(CompanyNo => {
        var companyNo = CompanyNo.list[0].companyNo
        httpPost('/eweb-transfer.CreditCartListQuery.do', { companyNo: companyNo }).then(res => {
          this.formModel.credit = res.creditLimit
          this.formModel.availableCredit = res.currentLimit
          this.formModel.unallocatedCredit = res.credUnasn
          this.tableData = res.creditCardList
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
    .form-box{
        background: #FFFFFF;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
    .title{
        background: #FDF2F3;
        color: #333333;
        line-height: 40px;
        margin: 30px 0px;

        .title-separate{
            margin-left: 20px;
            background: #D41618;
            width: 6px;
            height: 28px;
        }
    }
</style>
