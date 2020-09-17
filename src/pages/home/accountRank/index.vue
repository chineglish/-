<template>
  <div class="table-test">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="supTable">
      <table>
        <tr class="fs16 table-title">
          <th width='5%'>选择</th>
          <th width='22%'>账户名称</th>
          <th width='10%'>账户别名</th>
          <th width='10%'>账户类型</th>
          <th width='15%'>账户</th>
          <th width='8%'>币种</th>
          <th width='20%'>可用余额</th>
          <th width='10%'>账户状态</th>
        </tr>
        <tr :id="'tr-'+index" @click="choose(index)" :class="item.isChoose? 'tableData isChoose' : 'tableData'" v-for="(item, index) in tableData" :key="index">
          <td>
            <input type="checkbox" @change="choose(index)" v-model="item.isChoose">
          </td>
          <td>{{item.acName}}</td>
          <td>
            <input class="input fs16" @focus="changeAlias(index, $event)" type="text" v-model="item.acAlias">
          </td>
          <td>
            <span>{{acType[item.acType]}}</span>
          </td>
          <td>{{item.acNo}}</td>
          <td>
            {{coinType[item.currency]}}
          </td>
          <td>{{item.availBal|Money}}</td>
          <td>
            <span class="green" v-if="item.acState==='N'">正常</span>
            <span class="red" v-else>异常</span>
          </td>
        </tr>
      </table>
      <m-btn :btnData="btnData" @click="btnClick"></m-btn>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { currency_type_entity } from '@/assets/js/entity'

export default {
  name: 'tableTest',
  data () {
    return {
      filename: __filename,
      breadData: ['首页', '账户排序设置'],
      tableData: [],
      btnData: [
        { btnText: '上移', class: 'm-submit-btn', clickEventName: 'goUp' },
        { btnText: '下移', class: 'm-submit-btn', clickEventName: 'goDown' },
        { btnText: '保存', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      coinType: currency_type_entity,
      acType: {
        '0001': '基本户',
        '0002': '一般户',
        '0003': '临时户',
        '0004': '专户',
        '0008': '经常项目外汇账户',
        '0009': '资本项目外汇账户',
        '0010': '其他项目外汇账户',
        '0101': '单位普通定期账户',
        '0102': '财政定期账户',
        '0701': '一年以内国库定期存款（中央）',
        '0702': '一年以上国库定期存款（中央）',
        '0703': '一年以内国库定期存款（地方）',
        '0704': '一年以上国库定期存款（地方）',
        '0301': '单位通知存款',
        '0302': '机关团体事业单位通知存款',
        '0303': '部队通知存款',
        '0304': '财政通知存款',
        '0305': '股东定期存款',
        '0501': '承兑保证金(活期)',
        '0502': '担保保证金(活期)',
        '0503': '信用证保证金(活期)',
        '0504': '其他保证金(活期)',
        '0506': '保函保证金(活期)',
        '0507': '信用卡保证金',
        '0509': '提货担保保证金',
        '0510': '对内保函保证金',
        '0511': '备用信用证保证金',
        '0512': '保理保证金',
        '0513': '贷押保证金',
        '0514': '远期结售汇保证金',
        '0601': '承兑保证金(定期)',
        '0602': '担保保证金(定期)',
        '0603': '信用证保证金(定期)',
        '0604': '其他保证金(定期)',
        '0606': '保函保证金(定期)',
        '0607': '信用卡保证金',
        '0609': '提货担保保证金',
        '0610': '对内保函保证金',
        '0611': '备用信用证保证金',
        '0612': '保理保证金',
        '0613': '贷押保证金',
        'XXX': '默认值',
        '0402': '社保基金协议存款',
        '0007': '外币账户',
        '0614': '远期结售汇保证金',
        '0401': '保险公司协议存款',
        '0103': '一年以内社保定期存款',
        '0104': '一年以上社保定期存款',
        '0901': '境内存款类金融机构存放(定期)',
        '0902': '境外存款类金融机构存放(定期)',
        '0903': '境内其他金融机构存放(定期)',
        '0904': '境外其他金融机构存放(定期)'
      }
    }
  },
  methods: {
    btnClick (eventName) {
      switch (eventName) {
        case 'goUp':
          this.goUp()
          break
        case 'goDown':
          this.goDown()
          break
        case 'submit':
          this.submit()
          break
      }
    },
    choose (i) {
      if (this.tableData[i].isChoose === false) {
        this.tableData[i].isChoose = true
      } else {
        this.tableData[i].isChoose = false
      }
      this.$forceUpdate()
    },
    changeAlias (i, e) {
      this.tableData[i].alias = e.target.value
      this.$forceUpdate()
    },
    goUp () {
      let obj = {}
      for (let i = 0; i < this.tableData.length; i++) {
        if (i > 0 && this.tableData[i].isChoose) {
          obj = this.tableData[i]
          this.tableData[i] = this.tableData[i - 1]
          this.tableData[i - 1] = obj
          this.$forceUpdate()
        }
      }
    },
    goDown () {
      let obj = {}
      for (let i = this.tableData.length - 1; i >= 0; i--) {
        if (i < this.tableData.length - 1 && this.tableData[i].isChoose) {
          obj = this.tableData[i]
          this.tableData[i] = this.tableData[i + 1]
          this.tableData[i + 1] = obj
          this.$forceUpdate()
        }
      }
    },
    getData () {
      this.tableData = this.$route.params.list
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].isChoose = false
      }
    },
    submit () {
      httpPost('eweb-query.HomePageAccountOrder.do', { accList: this.tableData }).then(res => {
        this.$forceUpdate()
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  .supTable {
    background: #fff;
    box-shadow: 0 0 10px #ccc;

    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      // border: solid #cccccc;
      // border-width:1px 0px 0px 1px;
      th{
        border: solid #eeeeee;
        border-width:0px 1px 1px 0px;
      }
      td{
        border: solid #eeeeee;
        padding: 0 5px;
        border-width: 0px 1px 1px 0px;
      }
      .input {
        padding: 0 0 0 6px;
        width: 120px;
        outline: none;
        color: #666;
      }
    }

    .table-title {
      height: 50px;
      line-height: 50px;
      color: #666;
      background: #fdf2f3;
    }
    .isChoose{
      background: #f8f8f8;
    }
    // table tr:nth-child(even) {
    //   background: #f8f8f8;
    // }

    .tableData {
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: #666;
    }

    .btnWrap {
      height: 100px;
      background: #fff;
      margin-bottom: 20px;
      display: flex;

      button {
        flex: 1;
        width: calc(100%/3 - 240px)\9;
        margin: 30px 120px;
        border-radius: 6px;
        cursor: pointer;
        outline: none;
      }
    }
  }

  .green {
    color: #03AF3A;
  }

  .red {
    color: #D70110;
  }
</style>
