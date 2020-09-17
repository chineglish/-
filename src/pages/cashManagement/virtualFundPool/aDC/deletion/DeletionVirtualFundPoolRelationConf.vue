<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit">
            </m-new-form>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span>您确定要删除该虚拟资金池关系信息吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/**
     *@name: 虚拟资金池关系删除-确认
     * @date: 2020-2-4
     */
export default {
  name: 'DeletionVirtualFundPoolRelationConf',
  data () {
    return {
      centerDialogVisible: false,
      titleData: ['现金管理 ', '虚拟资金池', '虚拟资金池关系删除'],
      formModel: {
        poolAcc: '',
        poolAccCurrency: '',
        subAcc: '',
        subAccCurrency: '',
        lenderInterestRate: '',
        debitRate: ''
      },
      formConfigJson: {
        stepsActive: 1,
        rules: {},
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '50%',
            group: [
              {
                'label': '池账户',
                'type': 'text',
                'key': 'poolAcc'
              },
              {
                'label': '池账户币种',
                'type': 'text',
                'key': 'poolAccCurrency'
              },
              {
                'label': '子账户',
                'type': 'text',
                'key': 'subAcc'
              },
              {
                'label': '子账户币种',
                'type': 'text',
                'key': 'subAccCurrency'
              },
              {
                'label': '借方利率（%）',
                'type': 'text',
                'key': 'debitRate'
              },
              {
                'label': '贷方利率（%）',
                'type': 'text',
                'key': 'lenderInterestRate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '删除', class: 'm-submit-btn', clickEventName: 'submit' }
      ]
    }
  },
  methods: {
    submit (params) {
      this.centerDialogVisible = true
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
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
