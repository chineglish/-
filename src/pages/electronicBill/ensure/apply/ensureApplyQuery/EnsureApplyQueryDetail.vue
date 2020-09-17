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
                    @onAdd="onAdd"
                    @onChange="onChange"
                    @onDelete="onDelete"
            >
            </d-table>
        </div>
    </div>
</template>
<script>
/**
     *@name: 提示保证申请-详情
     */
export default {
  name: 'EnsureApplyQueryDetail',
  data () {
    return {
      breadData: ['电子商业汇票', '保证', '提示保证申请'],
      options: { // table属性
        stripe: true
      },
      firstColIndex: {
        type: 'selection'
      },
      tableHeadData: [
        { label: '保证申请日期', prop: 'applyDate' },
        { label: '保证申请类型', prop: 'applyType' },
        { label: '被保证人名称', prop: 'assuredName' },
        { label: '被保证人账号', prop: 'assuredAcc' },
        { label: '被保证人开户行号', prop: 'assuredBankAcc' },
        { label: '保证人名称', prop: 'guarantorName' },
        { label: '保证人账号', prop: 'guarantorAcc' },
        { label: '保证人行号', prop: 'guarantorBankAcc' },
        { label: '审核状态', prop: 'approvalStatus' }
      ],
      tableData: [
        {
          applyDate: '2019-08-22',
          applyType: '出票已登记',
          assuredName: '测试公司',
          assuredAcc: '111111111111',
          assuredBankAcc: '102323231023',
          guarantorName: '保证人公司',
          guarantorAcc: '888888888888',
          guarantorBankAcc: '179339713317',
          approvalStatus: '可操作'
        },
        {
          applyDate: '2019-08-22',
          applyType: '出票已登记',
          assuredName: '测试公司',
          assuredAcc: '111111111111',
          assuredBankAcc: '102323231023',
          guarantorName: '保证人公司',
          guarantorAcc: '888888888888',
          guarantorBankAcc: '179339713317',
          approvalStatus: '可操作'
        },
        {
          applyDate: '2019-08-22',
          applyType: '出票已登记',
          assuredName: '测试公司',
          assuredAcc: '111111111111',
          assuredBankAcc: '102323231023',
          guarantorName: '保证人公司',
          guarantorAcc: '888888888888',
          guarantorBankAcc: '179339713317',
          approvalStatus: '可操作'
        }
      ],
      actionData: [
        {
          btnText: '添加',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onAdd'
        },
        {
          btnText: '修改',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onChange'
        },
        {
          btnText: '删除',
          class: 'm-submit-btn',
          type: 'info',
          eventName: 'onDelete'
        }
      ]
    }
  },
  methods: {
    onAdd () {
      this.$router.push({
        name: 'EnsureApplyAddPre'
      })
    },
    onChange () {
      let theDay = new Date()
      this.$router.push({
        name: 'EnsureApplyChangePre',
        params: {
          formModel: {
            ticketNum: '131322106611820110701001476775',
            applyType: '出票已登记',
            applyDate: theDay.getFullYear() + '-' + theDay.getMonth() + '-' + theDay.getDate(),
            assuredName: '被保证人公司',
            assuredOrganizationCode: '3333333333333333',
            assuredBank: '5151515',
            assuredProvince: '辽宁省',
            assuredCity: '大连市',
            assurerName: '保证人测试公司',
            assurerAcc: '666666666666666',
            assurerBank: '313456789098'
          }
        }
      })
    },
    onDelete () {
      let theDay = new Date()
      this.$router.push({
        name: 'EnsureApplyDeleteConf',
        params: {
          formModel: {
            ticketNum: '131322106611820110701001476775',
            applyDate: theDay.getFullYear() + '-' + theDay.getMonth() + '-' + theDay.getDate(),
            assuredName: '被保证人公司',
            assuredOrganizationCode: '3333333333333333',
            assurerName: '保证人测试公司',
            assurerAcc: '666666666666666',
            assurerBank: '313456789098'
          }
        }
      })
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
