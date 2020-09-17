<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel"
              :btnData="btnData"
              @screenAccounts="screenAccounts"
              @handleAdd="handleAdd"
              @reset="reset">
      </m-new-form>
    </div>
    <div class="form-box" v-if="tableShow">
      <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :actionData="actionData"
              :operate-data="operateData"
              :pagesize="pagesize"
              :currentPage="currentPage"
              @handleUpdate="handleUpdate"
              @handleDelect="handleDelect"
              @handleBack="handleBack"
              @handleAdd="handleAdd">
      </d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>
<script>
/**
 *@name: 常用往来账户查询
 * @date: 2019-12-14
 */
import { httpPost } from '@/api/sys/http'
// import _ from 'lodash'
export default {
  name: 'currentAccInquiry',
  data () {
    return {
      tableShow: true,
      breadData: ['转账汇款', '常用往来账户查询'],
      msgs: [
        '1.通过该功能可查询、删除、修改已添加到常用往来账户中的收款人账号，以及新增常用往来账户。'
      ],
      currentPage: 1,
      formModel: {
        payeeAccont: '',
        payeeName: '',
        payeeBank: '',
        payeeBankDeptName: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '收款账号',
                'type': 'input',
                'key': 'payeeAccont',
                'inputEventName': 'screenAccounts'
              }, {
                'disabled': false,
                'label': '收款账户名称',
                'type': 'input',
                'key': 'payeeName',
                'inputEventName': 'screenAccounts'
              },
              // {
              //   'disabled': false,
              //   'label': '收款账户开户行',
              //   'type': 'input',
              //   'key': 'payeeBank',
              //   'inputEventName': 'screenAccounts'
              // },
              {
                'disabled': false,
                'label': '开户网点',
                'type': 'input',
                'key': 'payeeBankDeptName',
                'inputEventName': 'screenAccounts'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '新增', class: 'm-submit-btn', clickEventName: 'handleAdd' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      pagesize: 20,
      tableHeadData: [
        {
          label: '行内外标志',
          prop: 'lastTrsType',
          formatter: (row, column, cellValue, index) => cellValue === '1' ? '行外' : '行内'
        },
        {
          label: '收款账号',
          prop: 'payeeAccountNo'
        },
        {
          label: '收款账户名称',
          prop: 'payeeAccountName'
        },
        {
          label: '开户行',
          prop: 'payeeBankName'
        },
        {
          label: '开户网点',
          prop: 'payeeBankDeptName',
          formatter: (row, column, cellValue, index) => row.lastTrsType === '1' ? cellValue : ''
        }
      ],
      tableData: [],
      allData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '修改',
            eventName: 'handleUpdate'
          }, {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '删除',
            eventName: 'handleDelect'
          }
        ]
      },
      actionData: [
        // {
        //   btnText: '新增',
        //   class: 'm-submit-btn',
        //   type: 'info',
        //   eventName: 'handleAdd'
        // }
        // ,
        // {
        //   btnText: '返回',
        //   class: 'm-cancel-btn',
        //   type: 'info',
        //   eventName: 'handleBack'
        // }
      ],
      bankList: [] // 银行列表
    }
  },
  methods: {
    handleUpdate (data) {
      this.$router.push({
        name: 'add',
        params: data
      })
    },
    handleDelect (index) {
      this.$confirm('确定要删除该常用往来账户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const params = {
          payeeSeq: index ? index.data.payeeSeq : '',
          ...index.data,
          payeeAcNo: index.data.payeeAccountNo,
          payeeAcName: index.data.payeeAccountName
        }
        httpPost('/eweb-transfer.PayeeBookDelete.do', params).then(res => {
          this.submit(this.formModel)
          this.screenAccounts(this.formModel)
          // this.$router.push({
          //   name: 'maintainRes',
          //   params: res
          // })
          // this.submit(this.formModel)
        }).catch(err => {
          console.error(err)
        })
      }).catch(() => {
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'add',
        params: {
          status: '0' // 判断是新增还是修改的标志
        }
      })
    },
    screenAccounts (res) {
      setTimeout(() => {
        this.tableData = this.allData.filter(item => {
          if (
            // (item.payeeBankName && item.payeeBankName.indexOf(res.payeeBank) !== -1)
            ((item.payeeAccountNo && item.payeeAccountNo.indexOf(res.payeeAccont) !== -1) || (!item.payeeAccountNo && !res.payeeAccont)) &&
            ((item.payeeAccountName && item.payeeAccountName.indexOf(res.payeeName) !== -1) || (!item.payeeAccountName && !res.payeeName)) &&
            ((item.payeeBankDeptName && item.payeeBankDeptName.indexOf(res.payeeBankDeptName) !== -1) || (!item.payeeBankDeptName && !res.payeeBankDeptName))
          ) {
            return true
          } else {
            return false
          }
        })
        this.currentPage = 1
        this.$forceUpdate()
        // console.log(this.tableData)
      }, 100)
    },
    /**
     * 发送查询接口
     */
    submit (res) {
      const params = {
        payeeAcNo: '',
        payeeAcName: '',
        payeeBankId: ''
      }
      httpPost('/eweb-transfer.PayeeBookQry.do', params).then(res => {
        this.tableShow = true
        this.allData = res.list
        this.tableData = this.allData
      }).catch(err => {
        console.error(err)
      })
    },
    reset (res) {
      this.formModel = res
      this.submit(this.formModel)
    },
    handleBack () {
      this.tableShow = false
    }
    // bankListQry () {
    //   httpPost('/eweb-common.BankQry.do').then(res => {
    //     if (res && Array.isArray(res.bankList)) {
    //       this.bankList = res.bankList
    //       this.formConfigJson.formItems[0].group[2].options = this.bankList
    //         .map(item => ({ value: item.bankName, key: item.bankNo }))
    //     }
    //   }).catch(e => {
    //     console.error(e)
    //   })
    // }
  },
  created () {
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
    }

    // this.bankListQry()
    this.submit(this.formModel)
  }
}
</script>

<style scoped>
.form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
}
</style>
