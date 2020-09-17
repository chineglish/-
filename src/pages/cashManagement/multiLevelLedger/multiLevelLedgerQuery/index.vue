<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div style="clear: both"></div>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @changeAccountNo="changeAccountNo"
                @inquire="inquire"
        >
        </m-new-form>
        <div class="search-result" v-if="showResult">
            <div class="search-result-title fs20">
                查询结果
            </div>
            <div class="search-result-content" v-for="(item, index) in multistageBook" :key="index">
                <p class="fs18"><i class="el-icon-folder-opened" style="margin-right: 5px;"></i>{{item.asAcNo}}--{{item.asAcName}}</p>
                <com-tree
                  :list="item.subLevel"
                ></com-tree>
            </div>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type_entity } from '@/assets/js/entity'
import ComTree from './components/tree'

export default {
  name: 'multiLevelLedgerQuery',
  components: {
    ComTree
  },
  data () {
    return {
      // 面包屑导航
      breadData: ['现金管理', '多级账簿', '多级账簿查询'],
      showResult: false,
      acList: [],
      list: [],
      multistageBook: [],
      formModel: {
        acNo: '',
        currencyCode: '',
        accountName: ''
        // ledgerName: ''
      },
      formConfigJson: {
        rules: {
          acNo: [{ required: false, message: '', trigger: 'change' }]
          // ledgerName: [{ required: false, message: '', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '多级账簿查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                trans: { value: 'payerAcNoShow', key: 'acNo' },
                changeEventName: 'changeAccountNo',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => currency_type_entity[value]
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'accountName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' }
        // { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    // reset (res) {
    //   this.formModel = res
    //   this.PayerAccountListQry()
    // },
    changeAccountNo (data) {
      let obj = this.acList.find(item => data.acNo === item.acNo)
      this.formModel.currencyCode = obj.currencyCode
      this.formModel.accountName = obj.acName
    },
    inquire (obj) {
      this.showResult = false
      // 发送接口重新查询
      httpPost('/eweb-cash.MultistageBookInfoQry.do', {
        acNo: obj.acNo,
        currencyCode: obj.currencyCode
      }).then(res => {
        this.multistageBook = res.levelList
        this.showResult = true
        // this.queryBookInfo(res)
      }).catch(() => {
        this.showResult = false
      })
    },
    // queryBookInfo (obj) {
    //   httpPost('/eweb-cash.MultistageBookInfoQry.do', {
    //     acNo: obj.acNo,
    //     currencyCode: obj.currencyCode
    //   }).then(res => {
    //     this.multistageBook = res.levelList
    //     this.showResult = true
    //   }).catch(() => {
    //     this.showResult = false
    //   })
    // },
    // 交易账户获取
    PayerAccountListQry () {
      httpPost('/eweb-cash.MultistageBookActListQry.do', { productType: '02' }).then(res => {
        this.acList = res.acList
        this.acList.forEach(item => {
          item.payerAcNoShow = util.getPayerAccount(item)
        })
        this.formModel.acNo = this.acList[0].acNo
        this.formConfigJson.formItems[0].group[0].options = res.acList
        if (this.acList.length > 0 || this.acList.length === '') {
          this.changeAccountNo(this.formModel)
        } else {
          this.formModel.acNo = ''
          this.formModel.currencyCode = ''
          this.formModel.accountName = ''
        }
      })
    }
  },
  created () {
    this.PayerAccountListQry()
  }
}
</script>

<style lang="scss" scoped>
    .search-result{
        width: 100%;
        height: auto;
        background: #FFFFFF;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin: 20px 0px;

        .search-result-title{
            padding-left: 30px;
            line-height: 60px;
            font-weight: bold;
            color: #333333;
        }
        .search-result-content{
            p{
                position: relative;
                margin: 0;
                padding-left: 65px;
                font-weight: bold;
                background: #FDF2F3;
                line-height: 40px;
                z-index: 99;
            }
        }
    }

</style>
