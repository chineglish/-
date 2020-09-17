<template>
<div>
  <d2-mng-page>
    <template slot="header">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
    </template>
    <d-trading-res :tableData="tableData"
                   :showOne="false"
                   :h="h"
                   :detail="detail"
    ></d-trading-res>
  </d2-mng-page>
  </div>
</template>
<script>
export default {
  name: 'tradingRes',
  data () {
    return {
      breadData: ['财务管理', '企业融资申请'],
      tableData: [
        { key: '', label: '证实书（存单）编号', value: '123456789' },
        { key: '', label: '账号', value: '1000000000000' },
        { key: '', label: '子账户序号', value: '子账户序号' },
        { key: '', label: '户名', value: '大连香喷喷渔业有限公司' },
        { key: '', label: '币种', value: '人民币' },
        { key: '', label: '当前金额', value: '100.00' },
        { key: '', label: '年利率(%)', value: '3.87' },
        { key: '', label: '存期', value: '三个月' },
        { key: '', label: '自动转存标志', value: '自动转存' },
        { key: '', label: '开户日期', value: '2016-05-19' },
        { key: '', label: '到期日期', value: '2017-05-19' },
        { key: '', label: '状态', value: '正常' }
      ],
      h: {
        who: '批次号',
        number: '1241312312312',
        words: '请等待审核员审核！',
        showHint: true,
        showNumber: false
      },
      detail: {
        isShow: false
      }
    }
  }
}
</script>
