<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="card">
            <div class="title fs20">交易待办</div>
            <div>
                <div class="content fs18">待审核交易
                    <img v-if="showAuditTran" @click="changeShow(6)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(6)" src="@/assets/image/down.jpg">
                    <el-button class="m-submit-btn flr" @click="goWaitQPage()">查看全部</el-button>
                </div>
                <ul class="fs16" v-if="showAuditTran" v-for="(item, index) in authQryList2" :key="index">
                    <li class="clearfix">
                        <p class="fll">您有一笔{{getPrd(item.transCode)}}交易流水号为{{item.taskSeq}}的业务需要审核。</p>
                        <el-button class="m-submit-btn flr" @click="goWaitQPageDetails(item)">详情</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您有一笔单笔转账交易流水号为1235的业务被张三（操作员号码0654）拒绝了。</p>
                        <button class="flr">详情</button>
                    </li> -->
                </ul>
            </div>
            <div>
                <div class="content fs18">待处理交易
                    <img v-if="showToDeal" @click="changeShow(1)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(1)" src="@/assets/image/down.jpg">
                </div>
                <ul class="fs16" v-if="showToDeal">
                    <li class="clearfix" v-if="this.certFeeFlag === '1'">
                        <p class="fll">您有企业操作员证书处于待续费状态。</p>
                        <el-button class="m-submit-btn flr" @click="goCertFee()">去处理</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您有报销员工认证待处理。</p>
                        <button class="flr">去处理</button>
                    </li> -->
                    <!-- <li class="clearfix">
                        <p class="fll">您有一笔大额存单于2019-09-11到期。</p>
                        <button class="flr">去处理</button>
                    </li> -->
                    <li class="clearfix"  v-if="this.certUpdateFlag === '1'">
                        <p class="fll">您的证书将于{{this.expireDate}}到期。</p>
                        <el-button class="m-submit-btn flr" @click="goCertUpdate()">去处理</el-button>
                    </li>
                    <li class="clearfix"  v-if="this.creditCardFlag === '1'">
                        <p class="fll">您已签约信用卡功能，还款日即将来临。</p>
                        <el-button class="m-submit-btn flr" @click="goCreditCardPay()">去处理</el-button>
                    </li>
                    <li class="clearfix"  v-if="!!this.custSum">
                        <p class="fll">票据提醒{{this.custSum}}条数。</p>
                        <el-button class="m-submit-btn flr" @click="goBillInfoQuery()">去处理</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="card">
            <div class="title fs20">业务提醒
              <el-button class="m-submit-btn flr" @click="read">全部已阅</el-button>
            </div>
            <div>
                <div class="content fs18">预约交易
                    <img v-if="showAppTran" @click="changeShow(2)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(2)" src="@/assets/image/down.jpg">
                </div>
                <ul class="fs16" v-if="showAppTran" v-for="(item, index) in appointmentTransList" :key="index">
                    <li class="clearfix">
                        <p class="fll">您有一笔预约转账（交易流水号{{item.globalJnlNo}}，交易金额{{item.amount}}元 ，执行时间{{item.scheduleBeginTime}}）交易{{getTransState(item.authFlag)}}</p>
                        <el-button class="m-submit-btn flr" @click="goScheduledQry()">详情</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您有企业操作员证书处于待续费状态.</p>
                        <button class="flr">详情</button>
                    </li>
                    <li class="clearfix">
                        <p class="fll">您有企业操作员证书处于待续费状态.</p>
                        <button class="flr">详情</button>
                    </li>
                    <li class="clearfix">
                        <p class="fll">您有企业操作员证书处于待续费状态.</p>
                        <button class="flr">详情</button>
                    </li> -->
                </ul>
            </div>
            <div>
                <div class="content fs18">交易信息
                    <img v-if="showMessTran" @click="changeShow(3)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(3)" src="@/assets/image/down.jpg">
                </div>
                <ul class="fs16" v-if="showMessTran"  v-for="(item, index) in paymentTransferLogQryList" :key="index">
                    <li class="clearfix">
                        <p class="fll">您有一笔单笔转账（交易流水号{{item.globalJnlNo}}）交易已经处理<span class="green">{{getTransState(item.trsState)}}</span>。</p>
                        <el-button class="m-submit-btn flr" @click="goEbankTransQry(item)">去处理</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您有一笔单笔转账（交易流水号39210483924990）交易已经处理<span class="red">失败</span>。</p>
                        <button class="flr">去处理</button>
                    </li> -->
                </ul>
            </div>
            <div>
                <div class="content fs18">被拒交易
                    <img v-if="showRejectTran" @click="changeShow(4)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(4)" src="@/assets/image/down.jpg">
                    <el-button class="m-submit-btn flr" @click="goWaitQPageVoucher()">查看全部</el-button>
                </div>
                <ul class="fs16" v-if="showRejectTran" v-for="(item, index) in authQryList1" :key="index">
                    <li class="clearfix">
                        <p class="fll">您有一笔{{getPrd(item.transCode)}}交易流水号为{{item.taskSeq}}的业务被拒绝了。</p>
                        <el-button class="m-submit-btn flr" @click="goWaitQPageVoucher(item)">详情</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您有一笔单笔转账交易流水号为1235的业务被张三（操作员号码0654）拒绝了。</p>
                        <button class="flr">详情</button>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="card">
            <div class="title fs20">电子对账</div>
            <div>
                <div class="content fs18">待对账交易
                    <img v-if="showEletron" @click="changeShow(5)" src="@/assets/image/up.jpg">
                    <img v-else @click="changeShow(5)" src="@/assets/image/down.jpg">
                </div>
                <ul class="ulnth fs16" v-if="showEletron" v-for="(item, index) in bankNotCheckCountList" :key="index">
                    <li class="clearfix">
                        <p class="fll">您尾号为{{item.Accno.slice(-4)}}的电子账户进行对账。</p>
                        <el-button class="m-submit-btn flr" @click="goBillCheck(item)">详情</el-button>
                    </li>
                    <!-- <li class="clearfix">
                        <p class="fll">您尾号为8838的电子账户进行对账。</p>
                        <button class="flr">详情</button>
                    </li>
                    <li class="clearfix">
                        <p class="fll">您尾号为8838的电子账户进行对账。</p>
                        <button class="flr">详情</button>
                    </li> -->
                </ul>
            </div>
            <div class="btnWrap">
                <el-button class="m-cancel-btn" @click="goback">返回</el-button>
            </div>
        </div>
        <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { business_Type, operator_state } from '@/assets/js/entity'
import util from '@/libs/util.js'

export default {
  data () {
    return {
      breadData: ['首页', '待办业务提醒'],
      showToDeal: true,
      showAppTran: true,
      showMessTran: true,
      showRejectTran: true,
      showEletron: true,
      showAuditTran: true,
      certFeeFlag: '',
      certUpdateFlag: '',
      custSum: '',
      expireDate: '',
      authQryList1: '',
      bankNotCheckCountList: [],
      creditCardFlag: '',
      appointmentTransList: [],
      authQryList2: [],
      paymentTransferLogQryList: [],
      msgs: ['1.用户选择账户管理-银企对账，用于企业用户查询银企对账信息并进行对账。']
    }
  },
  methods: {
    getPrd (transCode) {
      return util.handleEnums(business_Type, transCode)
    },
    getTransState (transState) {
      return util.handleEnums(operator_state, transState)
    },
    goback () {
      this.$router.back()
    },
    // 更改显示下拉
    changeShow (id) {
      switch (id) {
        case 1:
          this.showToDeal = !this.showToDeal
          break
        case 2:
          this.showAppTran = !this.showAppTran
          break
        case 3:
          this.showMessTran = !this.showMessTran
          break
        case 4:
          this.showRejectTran = !this.showRejectTran
          break
        case 5:
          this.showEletron = !this.showEletron
          break
        case 6:
          this.showAuditTran = !this.showAuditTran
          break
        default:
          break
      }
    },
    // 跳转到证书续费页面
    goCertFee () {
      this.$router.push('enterpriseManage')
    },
    // 跳转到证书更新页面
    goCertUpdate () {
      this.$router.push('certificateUpdate')
    },
    // 跳转到信用卡还款页面
    goCreditCardPay () {
      this.$router.push('creditCardPayments')
    },
    // 跳转到预约交易查询页面
    goScheduledQry () {
      this.$router.push('scheduledTransInquiry')
    },
    // 跳转到网银转账结果页面
    goEbankTransQry (item) {
      httpPost('/eweb-query.HomePageModifyRemindFlag.do', {
        jnlList: [],
        trsList: [{ jnlNo: item.globalJnlNo }]
      }).then(() => {
        this.$router.push('onlineBankTransInquiry')
      })
    },
    goBillInfoQuery () {
      this.$router.push('/comprehensiveBillQry')
    },
    // 跳转到交易管理页面
    goWaitQPage (data) {
      this.$router.push({
        name: 'waitQPage',
        params: {
          activeName: 'first'
        }
      })
    },
    goWaitQPageDetails (formModel) {
      switch (formModel.transCode) {
        case 'eweb-transfer.SocialSecurityContribution': // 社保缴费
          this.$router.push({
            name: 'socialSecurityPaymentDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-enterprise.AutDedFeeRel': // 自动签约扣费维护-解约
          this.$router.push({
            name: 'autDedFeeRelDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.CollectDateSet': // 归集周期设置
          this.$router.push({
            name: 'collectPerSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        case 'eweb-cash.TimingCollectSet': // 定时归集设置
          this.$router.push({
            name: 'periodicColSetDetail',
            params: {
              detail: formModel,
              jnlNo: formModel.taskSeq,
              type: '1'
            }
          })
          break
        default:
          this.$router.push({
            name: 'transactionManagementDetails',
            params: {
              detail: formModel,
              transCode: formModel.transCode,
              type: '1',
              jnlNo: formModel.taskSeq
            }
          })
          break
      }
    },
    goWaitQPageVoucher (item) {
      httpPost('/eweb-query.HomePageModifyRemindFlag.do', {
        jnlList: item ? [{ jnlNo: item.taskSeq }] : this.authQryList1.map(item => {
          return { jnlNo: item.taskSeq }
        }),
        trsList: []
      }).then(() => {
        this.$router.push({
          name: 'myForm'
        })
      })
    },
    // 跳转到银企对账页面
    goBillCheck (data) {
      this.$router.push({
        name: 'enterpriseBankCheckBillPre',
        params: {
          acNo: data.Accno,
          flag: 1
        }
      })
    },
    // 业务提醒,全部已阅
    read () {
      httpPost('/eweb-query.HomePageModifyRemindFlag.do', {
        jnlList: this.authQryList1.map(item => {
          return { jnlNo: item.taskSeq }
        }),
        trsList: this.paymentTransferLogQryList.map(item => {
          return { jnlNo: item.globalJnlNo }
        })
      }).then(() => {
        this.$message({
          showClose: true,
          message: '全部已阅',
          type: 'success'
        })
      })
    }
  },
  mounted () {
    httpPost('eweb-query.HomePageToDoListQry.do').then(res => {
      this.certFeeFlag = res.certFeeFlag
      this.custSum = res.custSum
      this.creditBillInfoQuery = res.creditBillInfoQuery
      this.expireDate = res.expireDate
      this.authQryList1 = res.authQryList1
      this.certUpdateFlag = res.certUpdateFlag
      this.bankNotCheckCountList = res.bankNotCheckCountList
      this.creditCardFlag = res.creditCardFlag
      this.appointmentTransList = res.appointmentTransList
      this.authQryList2 = res.authQryList2
      this.paymentTransferLogQryList = res.paymentTransferLogQryList
    })
  }
}
</script>

<style lang="scss" scoped>
.card {
    color: #333;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-bottom: 20px;
    .title {
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
    }
    .content {
        padding: 0 30px;
        width: calc(100% - 60px);
        height: 46px;
        line-height: 46px;
        background: #FDF2F3;
        vertical-align: middle;
        img {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
    div {
      button {
        margin-top: 10px;
      }
    }
    ul {
        color: #666;
        li {
            padding: 0 30px;
            height: 54px;
            line-height: 54px;
            p {
                margin: 0;
            }
            button {
                margin-top: 10px;
            }
            .green {
                color: #03AF3A;
            }
            .red {
                color: #D70110;
            }
        }
    }
    ul li:nth-child(odd) {
      background: #FEFEFE;;
    }
    ul li:nth-child(even) {
      background: #f8f8f8;
    }
    .ulnth li:nth-child(odd) {
      background: #f8f8f8;
    }
    .ulnth li:nth-child(even) {
      background: #fff;
    }
    .btnWrap {
        padding: 56px 0 21px;
        text-align: center;
    }
    button {
        border: none;
    }
}
</style>
