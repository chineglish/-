<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <m-form-res :data="data" :form-model="formModel" :btnData="btnData" @back="onBack"></m-form-res>
  </d2-container>
</template>
<script>
import util from '@/libs/util'
import { currency_type, chaohui_flag, acc_status, limit_type, payerRate, handleChannel, drawType, acc_type } from '@/assets/js/entity'
export default {
  name: 'bigDepositQueryDetails',
  data () {
    return {
      formModel: {},
      breadData: ['账户管理', '大额存单查询', '详情页'],
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
            { label: '账户名称', key: 'kehuzhmc' },
            {
              label: '账户种类',
              key: 'accStatus',
              formatter: (value) => util.handleEnums(acc_type, value)
            },
            { label: '账户', key: 'kehuzhao' },
            { label: '子账户序号', key: 'zhhaoxuh' },
            {
              label: '币种',
              key: 'currencyCode',
              formatter: (row) => util.handleEnums(currency_type, row)
            },
            {
              label: '开户金额',
              key: 'kaihjine',
              formatter: (cellValue) => util.formatCurrency(cellValue)
            },
            {
              label: '账户余额',
              key: 'zhanghye',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '剩余额度',
              key: 'keyonedu',
              formatter: (row) => util.formatCurrency(row)
            },
            {
              label: '办理渠道',
              key: 'kaihuqud',
              formatter: (row) => {
                const target = handleChannel.find(item => item.value === row)
                return target ? target.label : '其他'
              }
            },
            {
              label: '付息方式',
              key: 'fuxipinl',
              formatter: (row) => {
                const target = payerRate.find(item => item.value === row)
                return target ? target.label : '其他'
              }
            },
            {
              label: '支取标识',
              key: 'sfyxtqzq',
              formatter: (row) => {
                const target = drawType.find(item => item.value === row)
                return target ? target.label : '其他'
              }
            },
            {
              label: '钞汇标志',
              key: 'chaohubz',
              formatter: (row) => {
                const target = chaohui_flag.find(item => item.value === row)
                return target ? target.label : '未知'
              }
            },
            {
              label: '账户状态',
              key: 'zhhuztai',
              formatter: (row) => {
                const target = acc_status.find(item => item.value === row)
                if (target != null) {
                  return target.label
                } else {
                  return '未知'
                }
              }
            },
            {
              label: '限制类型',
              key: 'xzhileix',
              formatter: (row) => {
                const target = limit_type.find(item => item.value === row)
                return target ? target.label : '正常'
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    onBack (data) {
      this.$router.push({
        name: 'bigDepositQuery'
        // params: this.routeParams
      })
    }
  },
  created () {
    this.formModel = this.$route.params
    // 证书编号
    if (this.$route.params.pngzzlei === '51' || this.$route.params.pngzzlei === '52') {
      this.formModel.pngzphaoPngzxhao = this.formModel.pngzphao + this.formModel.pngzxhao
    }
    // 剩余渠道
    this.formModel.kaihuqud = this.formModel.kaihuqud
    // 剩余额度
    this.formModel.keyonedu = this.formModel.keyonedu
    // 钞汇标志
    this.formModel.chaohubz = this.formModel.chaohubz
    // 限制类型
    this.formModel.xzhileix = this.formModel.xzhileix
  }
}
</script>
