<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { currency_type, acc_type, acc_status, limit_type, saveDate, deposit_flag, chaohui_flag } from '@/assets/js/entity'
export default {
  name: 'resultAccountQuery',
  data () {
    return {
      formModel: {},
      breadData: ['账户管理', '定期账户查询', '详情页'],
      routeParams: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {
        itemWidth: '4',
        resData: {
          // title: '转账申请已提交，请等待审核员审查！',
          group: [
            { label: '证实书（存单）编号', key: 'pngzphaoPngzxhao' },
            { label: '账户名称', key: 'zhhuzwmc' },
            {
              label: '账户类型',
              key: 'kehuzhlx',
              formatter: (cellValue) => {
                return util.handleEnums(acc_type, cellValue)
              }
            },
            { label: '账户', key: 'kehuzhao' },
            { label: '子账户序号', key: 'zhhaoxuh' },
            {
              label: '币种',
              key: 'currencyCode',
              formatter: (cellValue) => {
                return util.handleEnums(currency_type, cellValue)
              }
            },
            {
              label: '开户金额',
              key: 'kaihjine',
              formatter: (cellValue) => util.formatCurrency(cellValue)
            },
            {
              label: '账户余额',
              key: 'zhanghye',
              formatter: (cellValue) => util.formatCurrency(cellValue)
            },
            { label: '存入利率（%）', key: 'zhxililv' },
            {
              label: '自动转存标志',
              key: 'zhcunfsh',
              formatter: (cellValue) => {
                return util.handleEnums(deposit_flag, cellValue)
              }
            },
            {
              label: '开户日期',
              key: 'kaihriqi',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            {
              label: '到期日期',
              key: 'doqiriqi',
              formatter: (cellValue) => util.separationDate(cellValue)
            },
            {
              label: '存期',
              key: 'cunqiiii',
              formatter: (cellValue) => {
                return util.handleEnums(saveDate, cellValue)
              }
            },
            {
              label: '钞汇标志',
              key: 'chaohubz',
              formatter: (cellValue) => {
                return util.handleEnums(chaohui_flag, cellValue)
              }
            },
            {
              label: '账户状态',
              key: 'zhhuztai',
              formatter: (cellValue) => {
                return util.handleEnums(acc_status, cellValue)
              }
            },
            {
              label: '限制类型',
              key: 'xzhileix',
              formatter: (row) => {
                const target = limit_type.find(item => item.value === row)
                return target ? target.label : '正常'
              }
              // formatter: (cellValue) => {
              //   return util.handleEnums(limit_type, cellValue)
              // }
            }
          ]
        }
      }
    }
  },
  methods: {
    onSubmit () {},
    onBack (data) {
      this.$router.push({
        name: 'regularAccountQuery',
        params: {
          formModel: this.$route.params.formModel
        }
        // params: this.routeParams
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    // 证书编号
    this.formModel.pngzphaoPngzxhao = this.formModel.pngzphao + this.formModel.pngzxhao
    this.formModel.acState = this.$route.params.acState
  }
}
</script>
