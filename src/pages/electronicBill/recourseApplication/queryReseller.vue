<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <d-table
              :table-data="tableData"
              :options="options"
              :isPagination="true"
              :firstColIndex="firstColIndex"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :pagesize="6"
              @comfirm="comfirm"
              @handleCurrentChange="handleSelectionChange"
      >
      </d-table>
    </div>
  </div>
</template>
<script>
/**
 *@name: 追索申请-可被追索对象查询
 * @author: 梁文彬
 * @date: 2019-12-24
 */
export default {
  name: 'queryReseller',
  data () {
    return {
      formModel: {},
      selectedReseller: {},
      breadData: ['电子商业汇票 ', '追索', '追索通知申请', '可被追索对象查询'],
      options: { // table属性
        border: true,
        stripe: true
      },
      firstColIndex: {
        type: 'radio',
        label: '选择'
      },
      tableHeadData: [
        { label: '被追索人名称', prop: 'stdRcvgNme' },
        { label: '被追索人行号', prop: 'stdRcvgBnm' },
        { label: '被追索人账号', prop: 'stdRcvgAcc' },
        { label: '被追索人组织机构代码', prop: 'stdRecrCod' }
      ],
      tableData: [
      ],
      actionData: [
        {
          btnText: '确定',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'comfirm'
        }
      ]
    }
  },
  methods: {
    comfirm (index) {
      this.$router.push({
        name: 'raConf',
        params: {
          selectedReseller: this.selectedReseller,
          data: this.$route.params.formModel,
          flag: '1',
          pageNation: this.$route.params.pageNation, // 分页信息
          params: this.$route.params.params // 查询条件
        }
      })
    },
    handleSelectionChange (res) {
      this.selectedReseller = res
    }
  },
  created () {
    if (this.$route.params) {
      this.tableData = this.$route.params.res.list
    }
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
