<template>
  <div class="table-demo">
    <vue-file-upload
      ref="fileUpload"
      url="http://localhost:8080/eecseweb/eweb-transfer.PaySalaryUploadFile.do"
      name="uploadFile"
      :max="1"
    ></vue-file-upload>
    <button @click="clickBtn">点击</button>
    <!-- <template slot="header">
      <m-breadcrumb :data="breadData"></m-breadcrumb>
    </template>
    <d-vertical-table
      :tabledata="tableData"
      :action-data="actionData"
      :tableTitle="tableTitle"
      :showOne="showOne"
      :tableStyle="{ width:'800px' }"
      @handleBack="handleBack"
    >
    </d-vertical-table> -->
  </div>
</template>

<script>
export default {
  name: 'tableDemo',
  data () {
    return {
      breadData: ['贷款业务', '贷款信息查询'],
      tableTitle: {
        title: '贷款业务'
        // isBorder: true
      },
      showOne: false,
      // showOne: true,
      tableData: [
        { key: '', label: '贷款账号', value: '489234893101291' },
        { key: '', label: '贷款户名', value: '测试公司' },
        { key: '', label: '贷款金额', value: '670000.00' },
        { key: '', label: '年利率(%)', value: '6.045' },
        { key: '', label: '计息方式', value: '按月浮动' },
        { key: '', label: '预期利率(%)', value: '9.0675' },
        { key: '', label: '发放日期', value: '2019-01-01' },
        { key: '', label: '贷款日期', value: '一年' },
        { key: '', label: '贷款还款账号', value: '482438162387896' },
        { key: '', label: '贷款借据号', value: '48393829' },
        { key: '', label: '开户行', value: '金州支行' },
        { key: '', label: '币种', value: '人民币' },
        { key: '', label: '利率浮动方式', value: '按百分比' },
        { key: '', label: '状态', value: '逾期' },
        { key: '', label: '欠息金额', value: '0.00' },
        { key: '', label: '到期日期', value: '2019-12-31' },
        { key: '', label: '贷款入账账号', value: '5294425672378978989' },
        { key: '', label: '还款账户余额', value: '12000000.00' }
      ],
      actionData: [
        {
          btnText: '返回',
          type: 'info',
          eventName: 'handleBack'
        },
        {
          btnText: '哈哈',
          type: 'info',
          eventName: 'handleBack'
        }
        // {
        //   btnText: '拉拉',
        //   type: 'info',
        //   eventName: 'handleBack'
        // },
        // {
        //   btnText: '打印',
        //   type: 'info',
        //   eventName: 'handleBack'
        // }
      ]
    }
  },
  methods: {
    handleBack (data) {
    },
    clickBtn () {
      console.log(this.$refs.fileUpload)
      this.$refs.fileUpload.requestOptions.formData = {
        sdf: 111
      }
      this.$refs.fileUpload.uploadAll()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
