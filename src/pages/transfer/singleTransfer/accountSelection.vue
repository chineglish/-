<template>
    <div class="accountSelection">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    :msgs="msgs"
                    @inquire="inquire"
            >
            </m-new-form>
        </div>
        <div class="form-box">
            <d-table
                    :table-data="tableData"
                    :options="options"
                    :isPagination="true"
                    :tableHeadData="tableHeadData"
                    :infoTips="infoTips"
                    :actionData="actionData"
                    :operate-data="operateData"
                    @handleSelect="handleSelect"
                    @handleBack="handleBack"
            >
            </d-table>
        </div>
    </div>
</template>

<script>
/**
 *@name: 常用往来账户选择
 * @author: 梁文彬
 * @date: 2019-12-10
 */
import { httpPost } from '@/api/sys/http'

export default {
  name: 'accountSelection',
  components: {
    // ComPrompt
  },
  data () {
    return {
      breadData: ['首页', '转账汇款', '单笔转账', '常用往来账户选择'],
      formModel: {
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankId: ''
      },
      formConfigJson: {
        formWidth: '50%',
        labelWidth: '40%',
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '收款人账号',
                'type': 'input',
                'key': 'payeeAcNo'
              },
              {
                'disabled': false,
                'label': '收款人账户名称',
                'type': 'input',
                'key': 'payeeAcName'
              },
              {
                'disabled': false,
                'label': '收款行',
                'type': 'select',
                'options': [],
                'key': 'payeeBankId'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      msgs: [],
      options: { // table属性
        border: true,
        stripe: true
      },
      infoTips: [ // 信息提示
      ],
      firstColIndex: {
        type: 'selection',
        eventName: ''
      },
      tableHeadData: [
        { label: '行内外标志', prop: 'lastTrsType', formatter: (row, column, cellValue, index) => cellValue === '1' ? '行外' : '行内' },
        { label: '收款账号', prop: 'payeeAccountNo' },
        { label: '收款账户名称', prop: 'payeeAccountName' },
        // { label: '收款账户开户行', prop: 'payeeBankName' },
        { label: '收款账户开户行', prop: 'payeeBankDeptName' }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '选择',
            eventName: 'handleSelect'
          }
        ]
      },
      actionData: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    handleSelect (data) {
      if (this.$route.params.from) {
        this.$router.push({
          name: this.$route.params.from,
          params: {
            payee: data,
            num: 1
          }
        })
      } else {
        this.$router.push({
          name: 'singleTransPre',
          params: {
            payee: data,
            num: 1
          }
        })
      }
    },
    handleBack () {
      if (this.$route.params.from) {
        this.$router.push({ name: this.$route.params.from })
      } else {
        this.$router.push('/singleTransPre')
      }
    },
    bankListQry () {
      httpPost('/eweb-common.BankQry.do').then(res => {
        if (res && Array.isArray(res.bankList)) {
          this.bankList = res.bankList
          this.formConfigJson.formItems[0].group[2].options = this.bankList
            .map(item => ({ value: item.bankName, key: item.bankNo }))
        }
      }).catch(e => {
        console.error(e)
      })
    },
    inquire (res) {
      this.listQry(res)
    },
    listQry (data) {
      const params = {
        payeeAcNo: data ? data.payeeAcNo : '',
        payeeAcName: data ? data.payeeAcName : '',
        payeeBankId: data ? data.payeeBankId : ''
      }
      httpPost('eweb-transfer.PayeeBookQry.do', params).then(res => {
        this.tableData = res.list || []
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this.formModel = {
      payeeAcNo: '',
      payeeAcName: '',
      payeeBankId: ''
    }
    this.bankListQry()
    this.listQry()
    // this.tableData = [
    //   {
    //     payeeAccountNo: '1023240000000002',
    //     payeeAccountName: '王五',
    //     payeeBankCode: '102100022371',
    //     payeeBankName: '工商银行金山支行'
    //   }
    // ]
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
