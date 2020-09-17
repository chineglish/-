<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div>
      <d-table
        :table-data="tableData"
        :options="options"
        :isPagination="true"
        :tableHeadData="tableHeadData"
        :infoTips="infoTips"
        :pagesize="pagesize"
        :operate-data="operateData"
        @goDetail="goDetail"
      ></d-table>
    </div>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '@/api/sys/http'
export default {
  name: '',
  data: function () {
    return {
      data: ['账户管理', '定期通查询'],
      pagesize: 4,
      // 以下为动态数据
      tableHeadData: [
        { label: '账户名称', prop: 'zhhuzwmc' },
        { label: '账户类型', prop: 'kehuzhlx' },
        { label: '账号', prop: 'kehuzhao' },
        { label: '子账户序号', prop: 'zhhaoxuh' },
        { label: '币种', prop: 'huobdaih' },
        { label: '开户金额', prop: 'kaihjine' },
        { label: '可用余额', prop: 'keyongye' },
        { label: '存入利率（%）', prop: 'zhxililv' },
        { label: '钞汇标志', prop: 'chaohubz' },
        { label: '账户状态', prop: 'zhhuztai' },
        { label: '限制类型', prop: 'xzhileix' }
      ],
      tableData: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'goDetail'
          }
        ]
      },
      struRatesFlag: {
        '1QA21E': '按季付息',
        '1YA1221': '按年付息',
        '3M': '满季付息',
        '6M': '满半年付息',
        '1Y': '满年付息',
        '1MA21': '按月付息',
        '1M': '满月付息',
        '6MA21': '按半年付息',
        '': '利随本清'
      }
    }
  },
  mounted: function () {
    this.getRegularList()
  },
  methods: {
    getRegularList () {
      let vm = this
      httpPost('/eweb-acmgmt.SavProductAcctQry.do').then(res => {
        console.log('000000', res)
        vm.tableData = res
      })
    },
    goDetail (data) {
      this.$router.push({
        name: 'regularDetail',
        params: data.data
      })
    }
  },
  components: {}
}
</script>
