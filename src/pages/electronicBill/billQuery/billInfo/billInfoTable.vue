<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="boxWrap" id="printId">
      <div class="box-header">
        <div class="box-header-one">
          <div class="box-header-one-startDate">出票日期: {{tableData.stdIssDate}}</div>
          <div class="box-header-one-staus">票据状态: {{tableData.stdBilStat}}</div>
        </div>
        <div class="box-header-two">
          <div class="box-header-two-endDate">汇票到期日: {{tableData.stdDueDate}}</div>
          <div class="box-header-two-Num">票据号码: {{tableData.stdBillNum}}</div>
        </div>
      </div>
      <div class="table">
        <div class="t-header">
          <div class="t-header-lift">
            <div class="t-ticket">出票人</div>
            <div class="t-bank">
              <div class="t-bank-a t-line-hight">全&nbsp;&nbsp;&nbsp;称</div>
              <div class="t-bank-a t-line-hight">账&nbsp;&nbsp;&nbsp;号</div>
              <div class="t-line-hight">开户银行</div>
            </div>
            <div class="t-ticket-content">
              <div class="t-bank-b t-line-hight">&nbsp;{{tableData.stdDrwrNam}}</div>
              <div class="t-bank-b t-line-hight">&nbsp;{{tableData.stdDrwrAcc}}</div>
              <div class="t-line-hight t-bankArr">&nbsp;{{tableData.stdDrwrBnm}}</div>
            </div>
          </div>
          <div class="t-header-right">
            <div class="t-ticket t-ticket-name">收票人</div>
            <div class="t-bank">
              <div class="t-bank-a t-line-hight">全&nbsp;&nbsp;&nbsp;称</div>
              <div class="t-bank-a t-line-hight">账&nbsp;&nbsp;号</div>
              <div class="t-line-hight">开户银行</div>
            </div>
            <div class="t-ticket-content">
              <div class="t-bank-b t-line-hight">&nbsp;{{tableData.stdPyeeNam}}</div>
              <div class="t-bank-b t-line-hight">&nbsp;{{tableData.stdPyeeAcc}}</div>
              <div class="t-line-hight t-bankArr">&nbsp;{{tableData.stdPyeeBnm}}</div>
            </div>
          </div>
        </div>
        <div class="t-money">
          <div class="t-money-a t-money-bill">票据金额</div>
            <div class="t-money-a t-money-RMB">人民币(大写)&nbsp;&nbsp;{{tableData.bigMoney}}</div>
            <div class="t-money-a">
              <div class="t-money-top">
                <div>十</div>
                <div>亿</div>
                <div>千</div>
                <div>百</div>
                <div>十</div>
                <div>万</div>
                <div>千</div>
                <div>百</div>
                <div>十</div>
                <div>元</div>
                <div>角</div>
                <div>分</div>
              </div>
              <div class="t-money-bottom">
                <div v-for="(item, index) in stdPmMoney" :key="index">{{ item }}</div>
              </div>
            </div>
        </div>
        <div class="t-info">
          <div class="t-info-name">承兑人信息</div>
          <div class="t-info-bank">
            <div class="t-info-bank-a t-info-bank-b">
              <div class="t-info-bank-quan">&nbsp;全&nbsp;称&nbsp;</div>
              <div class="t-info-bank-conName">&nbsp;&nbsp;{{tableData.stdAccpNam}}</div>
            </div>
            <div class="t-info-bank-a">
              <div class="t-info-bank-acno">&nbsp;账&nbsp;号&nbsp;</div>
              <div class="t-info-bank-conAcno">&nbsp;&nbsp;{{tableData.stdaccpacc}}</div>
            </div>
          </div>
          <div class="t-info-adr">
            <div class="t-info-adr-acno">&nbsp;开&nbsp;户&nbsp;行&nbsp;行&nbsp;号:&nbsp;{{tableData.stdAccpBnm}}</div>
            <div class="t-info-adr-content">&nbsp;开&nbsp;户&nbsp;行&nbsp;名&nbsp;称:&nbsp;{{tableData.stdacguanm}}</div>
          </div>
        </div>
        <div class="t-trans">
          <div class="t-trans-acno">
            <div class="t-trans-acno-a">
              <div class="t-trans-acno-trans">交易合同号</div>
              <div class="t-trans-acno-acno">{{tableData.stdContrNm}}</div>
            </div>
            <div class="t-trans-acno-b">
              <div class="t-trans-acno-w">能否转让</div>
              <div class="t-trans-acno-y">&nbsp;&nbsp;&nbsp;&nbsp;{{tableData.stdEndOrmk}}</div>
            </div>
          </div>
          <div class="t-trans-info">
            <div class="t-trans-info-name">承兑信息</div>
            <div class="t-trans-info-con">
              <div class="t-trans-info-con-a">&nbsp;出票人承诺:&nbsp;本汇票请予以承兑，到期无条件付款</div>
              <div class="t-trans-info-con-b">
                <div class="t-trans-info-con-b-one">&nbsp;承兑人承兑:&nbsp;本汇票已经承兑，到期无条件付款</div>
                <div class="t-trans-info-con-b-two">&nbsp;承兑日期:&nbsp;{{tableData.stdaccpdat}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="t-ticket-info" v-if="draftFaceGuarntInfoTakeBill.length === 0">
          <div class="t-ticket-info-name">出票保证信息</div>
          <div class="t-ticket-info-con">
            <div class="t-ticket-info-con-one">&nbsp;保证人名称:</div>
            <div class="t-ticket-info-con-two">&nbsp;保证人地址:</div>
            <div class="t-ticket-info-con-thr">&nbsp;保证日期:&nbsp;</div>
          </div>
        </div>
        <div class="t-ticket-info" v-for="(item, index) in draftFaceGuarntInfoTakeBill" :key="index">
          <div class="t-ticket-info-name">出票保证信息</div>
          <div class="t-ticket-info-con">
            <div class="t-ticket-info-con-one">&nbsp;保证人名称:{{item.guarName}}</div>
            <div class="t-ticket-info-con-two">&nbsp;保证人地址:{{item.guarntrAddr}}</div>
            <div class="t-ticket-info-con-thr">&nbsp;保证日期:&nbsp;{{item.guarDt}}</div>
          </div>
        </div>
        <div class="t-ticket-info" v-for="(item, index) in draftFaceGuarntInfoChengDui" :key="index+1">
          <div class="t-ticket-info-name">承兑保证信息</div>
          <div class="t-ticket-info-con">
            <div class="t-ticket-info-con-one">&nbsp;承兑保证人名称:{{item.guarName}}&nbsp;</div>
            <div class="t-ticket-info-con-two">&nbsp;承兑保证人地址:{{item.guarntrAddr}}&nbsp;</div>
            <div class="t-ticket-info-con-thr">&nbsp;承兑保证日期:&nbsp;{{item.guarDt}}</div>
          </div>
        </div>
        <div class="t-ticket-info" v-if="draftFaceGuarntInfoChengDui.length === 0">
          <div class="t-ticket-info-name">承兑保证信息</div>
          <div class="t-ticket-info-con">
            <div class="t-ticket-info-con-one">&nbsp;承兑保证人名称:</div>
            <div class="t-ticket-info-con-two">承兑保证人地址:</div>
            <div class="t-ticket-info-con-thr">承兑保证日期:&nbsp;</div>
          </div>
        </div>
        <div class="t-grade">
          <div class="t-grade-name">评级信息(有出票人，承兑人自己记载，仅供参考)</div>
          <div class="t-grade-con">
            <div class="t-grade-con-ticket-a">
              <div class="t-grade-con-ticket-people">&nbsp;出票人</div>
              <div class="t-grade-con-ticket-cont">
                <div class="t-grade-con-ticket-cont-one">&nbsp;评级主体:&nbsp;{{tableData.stdDrragCy}}</div>
                <div class="t-grade-con-ticket-cont-two">&nbsp;信用等级:&nbsp;{{tableData.stdDrcdRat}}</div>
                <div class="t-grade-con-ticket-cont-thr">&nbsp;评级到期日:&nbsp;{{tableData.stdRdueDat}}</div>
              </div>
            </div>
            <div class="t-grade-con-ticket-b">
              <div class="t-grade-con-ticket-people">&nbsp;承兑人</div>
              <div class="t-grade-con-ticket-cont">
                <div class="t-grade-con-ticket-cont-one">&nbsp;评级主体:&nbsp;{{tableData.stdAccpBdy}}</div>
                <div class="t-grade-con-ticket-cont-two">&nbsp;信用等级:&nbsp;{{tableData.stdAccpRat}}</div>
                <div class="t-grade-con-ticket-cont-thr">&nbsp;评级到期日:&nbsp;{{tableData.stdAccpDue}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomWrap no-print">
      <button class="el-button m-submit-btn" @click="printPage">打印</button>
      <button class="el-button m-cancel-btn" @click="backBillInfo">票据背面</button>
      <button class="el-button m-cancel-btn" @click="transDetails">交易明细查询</button>
      <button class="el-button m-cancel-btn" @click="back">返回</button>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
// import { mapMutations } from 'vuex'
import { httpPost } from '@/api/sys/http'
import { billStatus_Entity } from '@/assets/js/entity'
export default {
  name: 'billInfoTable',
  data () {
    return {
      stdPmMoney: [],
      breadData: ['电子商业汇票 ', '票据信息查询', '票据信息查询'],
      tableData: {},
      // 出票保证信息，承兑保证信息
      draftFaceGuarntInfo: [],
      // 出票保证信息
      draftFaceGuarntInfoTakeBill: [],
      // 承兑保证信息
      draftFaceGuarntInfoChengDui: []
    }
  },
  methods: {
    // ...mapMutations({
    //   removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    // }),
    printPage () {
      util.handerPrint()
    },
    back () { // 返回
      this.$router.push({
        name: 'billInfoQueryList',
        params: {
          acNo: this.$route.params.acNo,
          params: this.$route.params.params, // 查询条件
          pageNation: this.$route.params.pageNation // 分页信息
        }
      })
    },
    backBillInfo () { // 票据背面
      let resList = this.$route.params.res
      this.acNo = this.$route.params.acNo
      const params = {
        acNo: this.acNo,
        stdBillNum: this.tableData.stdBillNum,
        stdBillTyp: this.tableData.stdBillTyp,
        pageSize: 9999,
        pageIndex: 1,
        params: this.$route.params.params, // 查询条件
        pageNation: this.$route.params.pageNation // 分页信息
      }
      httpPost('/eweb-edraft.BillBackQry.do', params).then(res => {
        this.$router.push({
          name: 'billInfoBackTable',
          params: {
            res,
            resList,
            ...params,
            stdBilStat: this.tableData.stdBilStat
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    transDetails () { // 交易明细查询
      let resList = this.$route.params.res
      let acNo = this.$route.params.acNo
      const params = {
        stdBillNum: this.tableData.stdBillNum,
        stdBilStat: this.tableData.stdBilStat,
        pageSize: 20,
        pageIndex: 1,
        params: this.$route.params.params, // 查询条件
        pageNation: this.$route.params.pageNation // 分页信息
      }
      httpPost('/eweb-edraft.BillTransDetQry.do', params).then(res => {
        this.$router.push({
          name: 'billInfoDetailsResult',
          params: {
            res,
            params,
            resList,
            acNo
          }
        })
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created () {
    this._params = this.$route.params.params
    this._pageNation = this.$route.params.pageNation
    this.acNo = this.$route.params.acNo
    this.tableData = this.$route.params.res.list[0]
    this.draftFaceGuarntInfo = this.$route.params.res.draftFaceGuarntInfo
    let str = this.tableData.stdPmMoney
    if (str.indexOf('.') !== -1) {
      let arr = str.split('.')
      let list = arr[0].concat(arr[1])
      this.stdPmMoney = list.split('')
      this.stdPmMoney.unshift('￥')
      let n = 12 - this.stdPmMoney.length
      for (let i = 0; i < n; i++) {
        this.stdPmMoney.unshift('')
      }
    } else {
      str = str + '00'
      this.stdPmMoney = str.split('')
      this.stdPmMoney.unshift('￥')
      let n = 12 - this.stdPmMoney.length
      for (let i = 0; i < n; i++) {
        this.stdPmMoney.unshift('')
      }
    }
    // 金额转大写
    this.tableData.bigMoney = util.getMoneyHanzi(this.tableData.stdPmMoney)
    // this.removeKeepAliveList()
    // 转让标志
    if (this.tableData.stdEndOrmk === 'EM00') {
      this.tableData.stdEndOrmk = '可再转让'
    } else if (this.tableData.stdEndOrmk === 'EM01') {
      this.tableData.stdEndOrmk = '不得转让'
    }
    // 票据状态
    if (this.$route.params.res) {
      this.tableData.stdBilStat = billStatus_Entity[this.tableData.stdBilStat]
    }
    if (this.$route.params.stdBilStat) {
      this.tableData.stdBilStat = this.$route.params.stdBilStat
    }
    // 承兑保证信息， 出票保证信息
    for (let i = 0; i < this.draftFaceGuarntInfo.length; i++) {
      if (this.draftFaceGuarntInfo[i].guarType === '14') {
        this.draftFaceGuarntInfoTakeBill = this.draftFaceGuarntInfo
      } else {
        this.draftFaceGuarntInfoTakeBill = [
          {
            guarDt: '',
            guarName: '',
            guarntrAddr: ''
          }
        ]
      }
    }
    for (let i = 0; i < this.draftFaceGuarntInfo.length; i++) {
      if (this.draftFaceGuarntInfo[i].guarType === '13') {
        this.draftFaceGuarntInfoChengDui = this.draftFaceGuarntInfo
      } else {
        this.draftFaceGuarntInfoChengDui = [
          {
            guarDt: '',
            guarName: '',
            guarntrAddr: ''
          }
        ]
      }
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.boxWrap {
  padding: 20px 0;
  background: #fff;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 20px;
  .box-header {
    margin: 0px auto;
    width: 1000px;
    .box-header-one {
      width: 1000px;
      height: 30px;
      .box-header-one-startDate {
        width: 400px;
        float: left;
      }
      .box-header-one-staus {
         width: 600px;
         float: left;
      }
    }
    .box-header-two {
      width: 1000px;
      height: 30px;
      .box-header-two-endDate {
        width: 400px;
        float: left;
      }
      .box-header-two-Num {
        width: 600px;
        float: left;
      }
    }
  }
  .table {
    margin: 0px auto;
    width: 1000px;
    border: 1px solid #333333;
    .t-header {
      display: flex;
      flex-direction: row;
      // text-align: center;
      width: 1000px;
      border-bottom: 1px solid #333333;
      .t-header-lift {
        width: 500px;
        display: flex;
        flex-direction: row;
        .t-ticket {
          padding: 10px 5px 5px 5px;
          height: 85px;
        }
        .t-bank-b {
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 1px solid #333333;
        }
        .t-bankArr {
          overflow: hidden;
          white-space: nowrap;
        }
        .t-line-hight {
          padding: 5px 0px 5px 5px;
        }
        .t-ticket-content {
          width: 360px;
        }
      }
      .t-header-right {
        width: 500px;
        display: flex;
        flex-direction: row;
        .t-ticket {
          padding: 10px 5px 5px 5px;
          height: 85px;
        }
        .t-ticket-name {
          border-left: 1px solid #333333;
        }
        .t-bank-b {
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 1px solid #333333;
        }
        .t-bankArr {
          overflow: hidden;
          white-space: nowrap;
        }
        .t-line-hight {
          padding: 5px 0px 5px 5px;
        }
        .t-ticket-content {
          width: 360px;
        }
      }
      .t-ticket {
        width: 30px;
        text-align: center;
        border-right: 1px solid #333333;
      }
      .t-bank {
        width: 100px;
        border-right: 1px solid #333333;
        .t-bank-a {
          text-align: center;
          border-bottom: 1px solid #333333;
        }
        .t-line-hight {
          text-align: center;
          padding: 5px 0 5px 5px;
        }
      }
    }
    .t-money {
      width: 1000px;
      height: 60px;
      overflow: hidden;
      border-bottom: 1px solid #333333;
      .t-money-a {
        float: left;
        .t-money-top, .t-money-bottom {
          text-align: center;
          width: 359px;
          height: 30px;
          border-bottom: 1px solid #333333;
          div {
            float: left;
            width: 28.7px;
            height: 30px;
            border-left: 1px solid #333333;
          }
        }
      }
      .t-money-bill {
        width: 140px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-right: 1px solid #333333;
      }
      .t-money-RMB {
        width: 500px;
        height: 60px;
        line-height: 60px;
      }
    }
    .t-info {
      width: 1000px;
      height: 60px;
      border-bottom: 1px solid #333333;
      .t-info-bank, .t-info-name, .t-info-adr {
        float: left;
      }
      .t-info-name {
        width: 140px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-right: 1px solid #333333;
      }
      .t-info-bank {
        width: 400px;
        height: 60px;
        border-right: 1px solid #333333;
        .t-info-bank-a {
          width: 400px;
          height: 30px;
          div {
            float: left;
          }
          .t-info-bank-quan {
            height: 30px;
            line-height: 30px;
            border-right: 1px solid #333333;
          }
          .t-info-bank-acno {
            height: 30px;
            line-height: 30px;
            border-right: 1px solid #333333;
          }
          .t-info-bank-conAcno {
            line-height: 30px;
          }
          .t-info-bank-conName {
            width: 347px;
            overflow: hidden;
            white-space: nowrap;
            line-height: 30px;
          }
        }
        .t-info-bank-b {
          border-bottom: 1px solid #333333;
        }
      }
      .t-info-adr {
        width: 458px;
        height: 60px;
        .t-info-adr-acno {
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #333333;
        }
        .t-info-adr-content {
          width: 450px;
          overflow: hidden;
          white-space: nowrap;
          line-height: 30px;
        }
      }
    }
    .t-trans {
      width: 1000px;
      height: 100px;
      overflow: hidden;
      border-bottom: 1px solid #333333;
      .t-trans-acno {
        width: 541px;
        height: 100px;
        float: left;
        border-right: 1px solid #333333;
        .t-trans-acno-a {
          text-align: center;
          width:541px;
          height: 30px;
          border-bottom: 1px solid #333333;
          .t-trans-acno-trans {
            width: 140px;
            height: 30px;
            line-height: 30px;
            float: left;
            border-right: 1px solid #333333;
          }
          .t-trans-acno-acno {
            width: 400px;
            height: 30px;
            line-height: 30px;
          }
        }
        .t-trans-acno-b {
          width:541px;
          height: 70px;
          .t-trans-acno-w {
            width: 140px;
            height: 70px;
            text-align: center;
            line-height: 70px;
            float: left;
            border-right: 1px solid #333333;
          }
          .t-trans-acno-y {
             width: 400px;
             height: 70px;
             line-height: 70px;
          }
        }
      }
      .t-trans-info {
        width: 458px;
        height: 100px;
        float: left;
        .t-trans-info-name {
          width: 35px;
          height: 100px;
          line-height: 40px;
          border-right: 1px solid #333333;
          float: left;
        }
        .t-trans-info-con {
          width: 422px;
          height: 100px;
          float: left;
          .t-trans-info-con-a {
            width: 422px;
            height: 30px;
            line-height: 30px;
            // float: left;
            border-bottom: 1px solid #333333;
          }
          .t-trans-info-con-b {
            width: 422px;
            height: 69px;
            .t-trans-info-con-b-one {
              width: 422px;
              line-height: 30px;
            }
            .t-trans-info-con-b-two {
              width: 422px;
              line-height: 40px;
              position: relative;
              left: 50%;
            }
          }
        }
      }
    }
    .t-ticket-info {
      width: 1000px;
      height: 30px;
      border-bottom: 1px solid #333333;
      .t-ticket-info-name {
        width: 140px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid #333333;
        float: left;
      }
      .t-ticket-info-con {
        width: 859px;
        line-height: 30px;
        float: left;
        .t-ticket-info-con-one {
          width: 350px;
          overflow: hidden;
          white-space: nowrap;
          float: left;
        }
        .t-ticket-info-con-two {
          width: 300px;
          overflow: hidden;
          white-space: nowrap;
          float: left;
        }
        .t-ticket-info-con-thr {
          width: 209px;
          float: left;
        }
      }
    }
    .t-grade {
      width: 1000px;
      overflow: hidden;
      .t-grade-name {
        width: 140px;
        height: 66px;
        float: left;
        border-right: 1px solid #333333;
      }
      .t-grade-con {
        width: 859px;
        height: 66px;
        float: left;
        .t-grade-con-ticket-a {
          width: 859px;
          height: 33px;
          float: left;
          line-height: 30px;
          border-bottom: 1px solid #333333;
          .t-grade-con-ticket-people {
            width: 60px;
            height: 33px;
            border-right: 1px solid #333333;
            float: left;
          }
          .t-grade-con-ticket-cont {
            width: 798px;
            overflow: hidden;
            .t-grade-con-ticket-cont-one {
              float: left;
              width: 400px;
            }
            .t-grade-con-ticket-cont-two {
              float: left;
              width: 190px;
            }
            .t-grade-con-ticket-cont-thr {
              float: left;
              width: 208px
            }
          }
        }
        .t-grade-con-ticket-b {
          width: 859px;
          height: 33px;
          float: left;
          line-height: 30px;
          .t-grade-con-ticket-people {
            width: 60px;
            height: 33px;
            border-right: 1px solid #333333;
            float: left;
          }
          .t-grade-con-ticket-cont {
            width: 798px;
            overflow: hidden;
            .t-grade-con-ticket-cont-one {
              float: left;
              width: 400px;
            }
            .t-grade-con-ticket-cont-two {
              float: left;
              width: 190px;
            }
            .t-grade-con-ticket-cont-thr {
              float: left;
              width: 208px
            }
          }
        }
      }
    }
  }
}
.bottomWrap {
  padding-top: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>
