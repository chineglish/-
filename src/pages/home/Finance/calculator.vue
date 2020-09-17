<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="wrap">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-date"></i> 存款计算器</span>
          <div class="search fs14">
            <span @click="goRate">利率查询</span>
          </div>
          <ul>
            <li class="fs18">存款金额<input class="fs16" type="text" v-model="depAmount"></li>
            <li class="fs18">存款期限（天）<input class="fs16" type="text" v-model="depTime"></li>
            <li class="fs18">年利率（%）
              <input class="fs16" type="text" v-model="interestRate">
            </li>
          </ul>
          <div class="content">
            <el-button class="m-submit-btn" @click="goCount(1)">提交试算</el-button>
            <div class="result fs22">
              <span class="font">所得利息金额：<span v-if="depInterest === ''" class="red">-</span><span v-else class="red">{{depInterest|Money}}</span></span>
              <span class="font">本息合计：<span v-if="depTotal === ''" class="red">-</span><span v-else class="red">{{depTotal|Money}}</span></span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-date"></i> 贷款计算器</span>
          <div class="search fs14">
            <span @click="goRate">利率查询</span>
          </div>
          <ul>
            <li class="fs18">贷款金额<input class="fs16" type="text" v-model="creditAmount"></li>
            <li class="fs18">贷款期限(月)<input class="fs16" type="text" v-model="creditTime"></li>
            <li class="fs18">年利率（%）<input class="fs16" type="text" v-model="creditRate"></li>
            <li class="fs18">还款方式
              <select  class="fs16" v-model="creditType">
                <option value="1">等额本息还款</option>
                <option value="2">等额本金还款</option>
                <!-- <option value="3">一次性还本付息</option> -->
              </select>
            </li>
          </ul>
          <div class="content">
            <el-button class="m-submit-btn" @click="goCount(2)">提交试算</el-button>
            <table class="tableData">
              <tr class="tableHeader">
                <th>期数</th>
                <th>月供</th>
                <th>月供本金</th>
                <th>月供利息</th>
                <th>本金余额</th>
              </tr>
              <tr class="tableBody" v-show="creditList.length > 0" v-for="(item, index) in creditList" :key="index">
                <td>{{item.time}}</td>
                <td>{{item.payMonth|Money}}</td>
                <td>{{item.monthPayPrincipal|Money}}</td>
                <td>{{item.monthPayAccrual|Money}}</td>
                <td class="blackFont">{{item.monthAcount|Money}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <m-hint-box :msgs="msgs" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      depAmount: '', // 存款金额
      depTime: '', // 存款期限
      interestRate: '', // 存款年利率
      depInterest: '', // 存款利息
      depTotal: '', // 存款本息合计
      creditAmount: '', // 贷款金额
      creditTime: '', // 贷款期限
      creditRate: '', // 贷款年利率
      creditType: '', // 贷款还款方式
      creditList: [], // 贷款还款列表
      breadData: ['首页', '金融小工具', '理财计算器'],
      activeName: 'first',
      msgs: ['注：本计算结果，仅供参考!!!']
    }
  },
  methods: {
    // 跳转利率查询
    goRate () {
      this.$router.push({
        name: 'rateSearch',
        params: {
          search: true,
          depAmount: this.depAmount,
          depTime: this.depTime,
          activeName: this.activeName,
          creditAmount: this.creditAmount,
          creditTime: this.creditTime,
          creditRate: this.creditRate,
          creditType: this.creditType
        }
      })
    },
    goCount (id) {
      // 存款计算
      if (id === 1) {
        this.depInterest = ((this.depAmount) * (100 * this.depTime / 365) * (parseFloat(this.interestRate) / 100)) / 100
        this.depTotal = this.depInterest * 1 + this.depAmount * 1
      }
      // 贷款计算
      if (id === 2) {
        this.creditList = []
        var monthPayAccrual = 0 // 月支付利息
        var monthPayPrincipal = 0 // 月付本金
        var monthAcount = 0 // 待还本金余额
        var payMonth = 0 // 月供
        var loanAccrualRate = this.creditRate / 100 // 年利率
        // alert(loanAccrualRate)
        var leavingsAmout = this.creditAmount * 1 // 留存金额

        if (this.creditType === '1') {
          // $scope.MonthPay = amount * loanAccrualRate/12 * Math.pow((1+loanAccrualRate/12), loanTerm)/(Math.pow(1+loanAccrualRate/12, loanTerm)-1);
          payMonth = (this.creditAmount * 1) * (loanAccrualRate / 12) * Math.pow((1 + loanAccrualRate / 12), (this.creditTime * 1)) / (Math.pow((1 + (loanAccrualRate / 12)), (this.creditTime * 1)) - 1)
        }

        for (let i = 0; i < (this.creditTime * 1); i++) {
          if (this.creditType === '1') {
            // 等额本息还款: 月还款本息 =贷款本金×月利率×（（1＋月利率）＾还款月数）÷（（1＋月利率）＾还款月数－1））
            // payMonth = (this.creditAmount * 1) * ((this.creditRate / 100 * 1) / 12) * Math.pow((1 + (this.creditRate / 100 * 1)), (this.creditTime * 1)) * 10 / (Math.pow((1 + (this.creditRate / 100 * 1)), (this.creditTime * 1)) - 1)

            // 月支付利息
            monthPayAccrual = leavingsAmout * loanAccrualRate / 12
            // alert(monthPayAccrual)
            // 月付本金
            monthPayPrincipal = payMonth - monthPayAccrual
            // 待还本金余额
            // monthAcount = (this.creditAmount * 1) - (monthPayPrincipal * (i + 1))

            leavingsAmout = leavingsAmout - monthPayPrincipal
            monthAcount = leavingsAmout
            // alert(leavingsAmout)
          } else if (this.creditType === '2') {
            // 月付本金
            monthPayPrincipal = (this.creditAmount * 1) / (this.creditTime * 1)
            // 月支付利息
            monthPayAccrual = ((this.creditAmount * 1) - monthPayPrincipal * i) * loanAccrualRate / 12
            // 等额本金还款：每月还款金额 = （贷款本金 ÷ 还款月数）+（本金 — 已归还本金累计额）×月利率
            payMonth = monthPayPrincipal + monthPayAccrual
            // 待还本金余额
            leavingsAmout = leavingsAmout - monthPayPrincipal
            monthAcount = leavingsAmout
          }
          //  else if (this.creditType === '3') {
          //   this.creditTime = 1
          //   this.$forceUpdate()
          //   // 月支付利息
          //   monthPayAccrual = (this.creditAmount * 1) * ((this.creditRate / 100 * 1) / 12)
          //   // 月付本金
          //   monthPayPrincipal = this.creditAmount * 1
          //   // 一次性还款
          //   payMonth = monthPayPrincipal + monthPayAccrual
          //   // 待还本金余额
          //   monthAcount = (this.creditAmount * 1) - (monthPayPrincipal * (i + 1))
          // }
          this.creditList.push({
            time: i + 1, // 期数
            payMonth: payMonth, // 月供
            monthPayPrincipal: monthPayPrincipal, // 月付本金
            monthPayAccrual: monthPayAccrual, // 月支付利息
            monthAcount: monthAcount // 待还本金
          })
        }
      }
    }
  },
  mounted () {
    this.depAmount = ''
    this.depTime = ''
    this.interestRate = ''
    this.creditAmount = ''
    this.creditTime = ''
    this.creditRate = ''
    this.creditType = ''
    this.creditList = []
    if (this.$route.params.data) {
      this.activeName = this.$route.params.activeName
      if (this.$route.params.activeName === 'first') {
        this.interestRate = this.$route.params.data.interest
        this.depAmount = this.$route.params.depAmount
        this.depTime = this.$route.params.depTime
      }
      if (this.$route.params.activeName === 'second') {
        this.creditAmount = this.$route.params.creditAmount
        this.creditTime = this.$route.params.creditTime
        this.creditRate = this.$route.params.data.interest
        this.creditType = this.$route.params.creditType
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-bottom: 20px;
  /*.title {
    height: 60px;
    padding: 0 30px;
    background: #fff;
    line-height: 60px;
  }*/
  .search {
    line-height: 40px;
    text-align: right;
    margin-left: 16px;
    color: #009CD8;
    cursor: pointer;
  }
  ul {
    padding: 0 30px;
    height: 50px;
    line-height: 50px;
    background: #FDF2F3;
    display: flex;
    li {
      flex: 1;
      color: #333333;
      letter-spacing: 0;
      vertical-align: middle;
      input {
        width: 120px;
        margin-left: 10px;
        border: none;
        height: 30px;
        padding: 2px 10px;
        outline: none;
      }
      select {
        width: 180px;
        height: 30px;
        background: #fff;
        outline: none;
        border: none;
        margin-left: 4px;
        line-height: 30px;
      }
    }
  }
  .content {
    background: #fff;
    text-align: center;
    padding-bottom: 50px;
    width: auto;
    button {
      margin: 24px 0;
    }
    .result {
      color: #333;
      .font {
        margin: 0 40px;
      }
      .red {
        color: #D41618;
      }
    }
    .tableData {
      table-layout: fixed;
      margin-top: 25px;
      width: 100%;
      border-collapse: collapse;
      .tableHeader {
        margin: 20px 0 10px;
        background: #f8f8f8;
        height: 45px;
        line-height: 45px;
        color: #333;
      }
      .tableBody {
        text-align: center;
        color: #666;
        td {
          padding: 15px 0 15px;
        }
        .blackFont {
          color: #333
        }
      }
    }
    table tr:nth-child(odd) {
      background: #f8f8f8;
    }
  }
}
</style>
