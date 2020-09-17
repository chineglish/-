<template>
  <div class="homeBg">
    <div style="background: #f8f8f8;">
      <!-- 首页顶部个人信息部分 -->
      <div class="bodyTop">
        <div class="userInfo fs14 clearfix">
          <img class="userIcon fll" id="headerImg" :src="headerImg" @click="gotoInformation"/>
          <ul class="fll ml20">
            <li class="fs18">
              <span>{{timeHello}}好，{{userInfo.userName}}({{userInfo.roleName}})</span>
            </li>
            <li class="mt5">企业名称：{{userInfo.cifName}}</li>
            <li class="mt5 clearfix">
              <div class="fll">密码安全度：弱</div>
              <div class="bar">
                <div class="bars">
					<div class="progressBar" :style="{ width: `${percentage}%` }"></div>
                </div>
              </div>
              <div class="fll">强</div>
            </li>
          </ul>
          <ul class="fll ml30">
            <li class="mt5" v-if="userInfo.expireDate!==''">证书到期日：{{userInfo.expireDate}}</li>
            <li class="mt5" v-if="userInfo.nextFeeDate!==''">证书应缴费日期：{{userInfo.nextFeeDate}}</li>
            <li class="mt5">上次登录时间：{{userInfo.lastLoginTime}}</li>
          </ul>
          <ul class="flr weather fs14">
            <!-- <li>本机IP：{{userInfo.lastLoginIp}}</li> -->
            <li>登录时间：{{getLoginTime}}</li>
            <!-- <li>登录地址：辽宁省大连市</li> -->
          </ul>
        </div>
      </div>
      <!-- 页面布局中间部分 -->
      <div class="content">
        <!-- 我的资产及待办事项 -->
        <div class="newWrap">
          <!-- 我的资产部分 -->
          <div class="myAssets">
            <div class="box fs24 clearfix">
            <div class="fll">常用工具</div>
            <div class="flr lookMore" @click="goCommonFun">设置 <img src="./image/right.png" style="width: 7px; height: 15px"></div>
          </div>
            <div class="iconWrap">
              <span class="icon-item" v-for="(item, index) in menuList" :key="index" @click="goCommonDetail(item)">
                <li style="height: 50px">
                  <img :src="getSrc(item.menuId)">
                </li>
                <p>{{item.name}}</p>
              </span>
            </div>
          </div>
          <!-- 待办事项部分 -->
          <div class="myTodo">
            <div class="box fs24">待办事项</div>
            <div class="todoBox">
              <ul class="fs18">
                <li class="todoTitle fs20">待办业务</li>
                <li style="height: 50px"><img class="todoIcon" @click="goTodo" src="./image/toDoBusiness@2x.png"></li>
                <li class="todoNum"><span @click="goTodo" :class="pendTrsCount === 0 ? 'green fs36': 'red fs36'">{{pendTrsCount | getTodoCount}}</span>项</li>
              </ul>
              <ul class="fs18">
                <li class="todoTitle fs20">业务提醒</li>
                <li style="height: 50px"><img class="todoIcon" @click="goTodo" src="./image/businessReminder@2x.png"></li>
                <li class="todoNum"><span @click="goTodo" :class="remindCount === 0 ? 'green fs36': 'red fs36'">{{remindCount | getTodoCount}}</span>项</li>
              </ul>
              <ul class="fs18">
                <li class="todoTitle fs20">电子对账</li>
                <li style="height: 50px"><img class="todoIcon" @click="goTodo" src="./image/electronicReconciliation@2x.png"></li>
                <li class="todoNum"><span @click="goTodo" :class="bankNotCheckCount === 0 ? 'green fs36': 'red fs36'">{{bankNotCheckCount | getTodoCount}}</span>项</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 消息通知及账户信息部分 -->
        <div class="clearfix">
          <!-- 消息通知部分 -->
          <div ref="smallCard" class="boxWrap smallCard fll h300">
            <div class="box fs24 clearfix">
              <div class="fll">消息通知</div>
              <div class="flr lookMore" @click="lookMoreNews">查看更多 <img src="./image/right.png" style="width: 7px; height: 15px; paddingTop: 2px"></div>
            </div>
            <div class="messageWrap">
                <div class="messageItem fs18 clearfix"  v-for="(item, index) in noticeList"
                :key="index" @click="lookNewsDetail(item)" v-show="index < 4">
                  <p class="fll"></p>
                  <span class="fll" style="color: #A6261E;" v-if="index===0">[置顶]</span>
                  <span class="fll" style="color: #A6261E;" v-else>[新]</span>
                  <el-popover
                    placement="top-start"
                    title=""
                    :offset="50"
                    width="250"
                    trigger="hover"
                    :content="item.noticeSubject">
                      <span slot="reference" class="overFlow fll" style="float: left; text-align: left">{{item.noticeSubject}}</span>
                      <!-- <span class="fs12">{{item.submitTime}}</span> -->
                  </el-popover>
                </div>
            </div>
          </div>
          <!-- 账户信息部分 -->
          <div ref="bigCard" class="boxWrap bigCard fll h300">
            <div class="box fs24 clearfix">
              <div class="fll">账户余额<span class="sonTitle fs18">| 共有 {{list.length}} 个账户 | <span class="setting" @click="goMore">设置</span></span></div>
              <div class="flr lookMore">
                <span @click="isBlanace(2)" :class="isShowBlanace === true ? 'fFont' : '' ">显示</span>/
                <span @click="isBlanace(2)" :class="isShowBlanace === true ? '' : 'fFont' ">隐藏</span>
                <!-- <span style="marginLeft: 20px;" @click="gotoCurrentAccountQry">查看更多 <img src="./image/right.png" style="width: 7px; height: 15px; paddingTop: 2px"></span> -->
              </div>
            </div>
            <div class="swiperWrap">
              <div class="block">
                <!-- 卡片小于两个时 -->
                <div class="alotCardWrap" v-if="list.length<=2">
                    <div class="alotCardContainerSub" v-for="( item, index ) in list" :key="index">
                      <div class="alotCard">
                        <div class="fs14" style="color: #666666;">账户 | 活期存款账户
                          <span class="alot-card-click" @click="gotoTransfer(item)" v-if="item.transferFlag === '1'">去转账</span>
                          <span class="alot-card-click" @click="gotoDetail(item)">查明细</span>
                        </div>
                        <div class="fs18" style="18px; color: #333333;">{{item.acNo}}</div>
                        <div class="fs14" style="color: #666666;">{{item.openOrgName}}</div>
                        <div class="fs16" style="color: #151515;">可用余额：{{coinType[item.availBal]}} <span v-if="isShowBlanace === true">******</span><span v-else>{{item.availBal|Money}}</span> 元</div>
                      </div>
                    </div>
                </div>
                <!-- 卡片在三个及以上 -->
                <el-carousel type="card" v-else height="190px" :autoplay="false" indicator-position="none" :initial-index="1" :loop="false" trigger="click">
                  <el-carousel-item v-for="(item, key) in list" :key="key">
                    <div class="alotCardWrap">
                      <div class="alotCardContainer">
                        <div class="alotCard">
                          <div class="fs14" style="color: #666666;">账户 | 活期存款账户
                          <span class="alot-card-click" @click="gotoTransfer(item)" v-if="item.transferFlag === '1'">去转账</span>
                          <span class="alot-card-click" @click="gotoDetail(item)">查明细</span>
                          </div>
                          <div class="fs20" style="color: #333333;">{{item.acNo}}</div>
                          <div class="fs14" style="color: #666666;">{{item.openOrgName}}</div>
                          <div class="fs16" style="color: #151515;">可用余额：{{coinType[item.availBal]}} <span v-if="isShowBlanace === true">******</span><span v-else>{{item.availBal|Money}}</span> 元</div>
                        </div>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
        <!-- 金融小工具及转账明细部分 -->
        <div class="clearfix">
          <!-- 金融小工具部分 -->
          <div class="boxWrap smallCard fll">
            <div class="box fs24">金融小工具</div>
            <div class="flexBox">
              <div class="flexItem">
                <div  @click="goForeignEx">
                  <div class="top">
                    <img class="icon" src="./image/exchangeRate@2x.png" />
                  </div>
                  <p>外汇牌价</p>
                </div>
                <div @click="goRateSearch">
                  <div class="top">
                    <img class="icon" src="./image/rateInquiry@2x.png" />
                  </div>
                  <p>利率查询</p>
                </div>
              </div>
              <div class="flexItem">
                <div @click="goNetQuery">
                  <div class="top">
                    <img class="icon" src="./image/onlineEnquiry@2x.png" />
                  </div>
                  <p>网点查询</p>
                </div>
                <div @click="goCalculator">
                  <div class="top">
                    <img class="icon" src="./image/financialCalculator@2x.png" />
                  </div>
                  <p>理财计算器</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 转账明细部分 -->
          <div class="boxWrap bigCard fll">
            <div class="box fs24 clearfix">
              <div class="fll">网银转账明细</div>
              <div class="flr lookMore fs18" @click="transMoreQry">查看更多 <img src="./image/right.png" style="width: 7px; height: 15px"></div>
            </div>
            <div class="tableWrap">
              <table class="tableData" border="1px">
                <tr class="tableHeader">
                  <th width="25%">转账时间</th>
                  <th width="25%">付款账号</th>
                  <th width="30%">交易金额</th>
                  <th width="30%">收款户名</th>
                </tr>
                <tr class="tableBody" v-for="(item, index) in transData" :key="index">
                  <td><!-- 显示日期 -->{{item.transTime || '--'}}</td>
                  <td>{{item.payerAcNo ? item.payerAcNo : '--'}}</td>
                  <td>{{item.amount|Money}}</td>
                  <td>{{item.payeeAcName ? item.payeeAcName : '--'}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- 底部两个图片 -->
        <div class="clearfix">
          <div class="fll imgWrap"><img src="./image/banner-b.png"></div>
          <div class="flr imgWrap"><img src="./image/banner-c.png"></div>
        </div>
      </div>
      <!-- 原底部图片 -->
      <!-- <div class="bgBanner"></div> -->
    </div>
    <div class="homeAlert" v-if="showMobileUpdate">
      <div class="alertBox fs22">
        <div>检测到用户信息未填写电话号码,请填写电话号码！</div>
        <el-button class="m-submit-btn" @click="gotoMobileUpdate">确定</el-button>
      </div>
    </div>
     <div class="homeAlert" v-if="showCertUpdate">
      <div class="alertBox fs22">
        <div>检测到用户证书即将过期,是否更新证书?</div>
        <el-button class="m-submit-btn" @click="CertUpdate">确定</el-button>
        <el-button class="m-cancel-btn" @click="showCertUpdate = false">取消</el-button>
      </div>
    </div>
    <div class="homeAlert" v-if="showRemindMsg">
      <div class="alertBox fs22">
        <div>{{remindMsg}}</div>
        <el-button class="m-submit-btn" @click="showRemindMsg = false">确定</el-button>
      </div>
    </div>
    <!-- 初次登录提醒修改密码弹窗 -->
    <div class="homeAlert" v-if="FirstLoginFlag === 'N' && !$store.state.common.showGuide">
    <!-- <div class="homeAlert"> -->
      <div class="alertBox fs22">
        <div>您当前密码为初始密码，请修改密码！</div>
        <el-button class="m-submit-btn" @click="initUKey">确定</el-button>
        <el-dialog title="修改密码" :close-on-press-escape='false' :visible.sync="showPwdChange" fullscreen :show-close="false">
          <div class="pwd-change-box">
            <ul>
                <li>
                  <div class="fs18">旧密码</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-1" class="u-key-container"></div>
                    <div class="u-key-prompt">
                    </div>
                  </div>
                </li>
                <li>
                  <div class="fs18">新密码</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-2" class="u-key-container"></div>
                    <div class="u-key-prompt" id="safetyStrength">
                    </div>
                  </div>
                </li>
                <li>
                  <div class="fs18">新密码确认</div>
                  <div class="u-key-container-wrapper">
                    <div id="u-key-3" class="u-key-container"></div>
                    <div class="u-key-prompt">
                    </div>
                  </div>
                </li>
            </ul>
            <ul class="error-box" id="error-box">
            </ul>
            <div>
              <el-button class="m-submit-btn" @click="commitPwd">确定</el-button>
              <el-button class="m-cancel-btn" @click="pwdReset">重置</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="homeAlert" v-if="showDownloadCryptoKit">
      <div class="alertBox fs16" v-if="showDownloadCryptoKitButton">
        <div>检测到未安装驱动程序，需先下载!!!</div>
        <el-button class="m-submit-btn" @click="downloadCryptoKit">确定</el-button>
        <el-button class="m-cancel-btn" @click="showDownloadCryptoKit = false">取消</el-button>
      </div>
      <div class="alertBox fs16" v-if="!showDownloadCryptoKitButton">
        <div>安装完驱动程序可先退出登录并按F5刷新页面, 请允许证书安装驱动在浏览器运行!</div>
        <el-button class="m-submit-btn" @click="CertUpdate">确定</el-button>
        <el-button class="m-cancel-btn" @click="showDownloadCryptoKit = false">取消</el-button>
      </div>
    </div>
    <!-- 下载证书弹窗  -->
    <div class="homeAlert" v-if="showDownloadProgress">
      <div class="alertBox fs16">
        <div class="download-title">{{downloadTitle}}</div>
        <el-progress :percentage="downloadPercentageDob" :color="downloadCustomColors" v-if="showDownloadPercentageDob"></el-progress>
        <el-progress :percentage="downloadPercentageSin" :color="downloadCustomColors" v-else></el-progress>
      </div>
    </div>
    <a ref="downloadCryptoKit" href="" download="Cryptokit.exe" style="display: none"></a>
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import UKey from '@/assets/js/u-key'
import util from '@/libs/util'
import { getSignCertInfo } from '@/assets/js/SignMsg.js'
import { isLoadSuccess, OnLoad } from '@/assets/js/CertEnrollment'

export default {
  filters: {
    filterDate (val) {
      return val ? val.substring(0, 10) : '--'
    },
    getTodoCount (val) {
      return parseFloat(val) > 99 ? '99+' : val
    }
  },
  data () {
    this.chartSettings = {
      dimension: '账户类型',
      metrics: '(元)'
    }
    return {
      showMobileUpdate: false, // 显示手机未绑定
      showDownloadCryptoKit: false,
      showDownloadCryptoKitButton: true,
      showChangPwdBtn: false, // 显示修改密码按钮
      showGuide: true, // 显示新手指导
      guideIndex: 1, // 当前显示的是哪个新手指导,总共4个
      shouGuideNext: true, // 是否显示新手指导下一个按钮
      // accNum: 0, // 账户数量
      uKey$1: '',
      uKey$2: '',
      uKey$3: '',
      remindMsg: '',
      showRemindMsg: false,
      showPwdChange: false,
      FirstLoginFlag: 'Y',
      downloadTitle: '证书下载中,请不要拔出U-KEY',
      percentage: 30,
      downloadPercentageSin: 0,
      downloadPercentageDob: 0,
      showDownloadProgress: false,
      showCertUpdate: false,
      showDownloadPercentageDob: false,
      clientCertDN: '',
      downloadCustomColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      customColor: '#409eff', // 默认强度颜色
      num: '50000', // 跳动数字
      timeHello: '上午', // 顶部招呼
      userInfo: [], // 用户信息
      noticeList: [], // 公告列表
      assetsData: [], // 我的资产滚动数据
      tableData: [], // 转账明细数据
      menuList: [], // 常用功能列表数据
      transData: [], // 账户余额卡片数据
      isShowMyaccount: false, // 是否显示/隐藏--我的资产金额
      isShowBlanace: true, // 是否显示/隐藏--账户余额金额
      list: [],
      pendTrsCount: 0, // 待处理交易笔数
      remindCount: 0, // 业务提醒笔数
      bankNotCheckCount: 0, // 客户未对账笔数
      headerImg: '',
      bgcolor: {
        '0': '#8C090A',
        '1': '#D26D6D',
        '2': '#E09C9D'
      },
      coinType: {
        '156': '人民币',
        '840': '美元',
        '344': '港币',
        '756': '瑞士法郎',
        '392': '日元',
        '124': '加拿大元',
        '036': '澳元',
        '978': '欧元',
        '826': '英镑',
        '752': '瑞典克郎'
      },
      eCharts_options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [
          {
            name: '余额分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      },
      myChart: null,
      swiperOptions: {
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        },
        slidesPerView: 8,
        centeredSlides: false
      }
    }
  },
  computed: {
    // 获取登录时间
    getLoginTime () {
      let user = this.getUser()
      return user._transTime
    }
  },
  methods: {
    // 跳转个人信息维护页面
    gotoInformation () {
      this.$router.push('/queryInformation')
    },
    // 拼接图片地址
    getSrc (name) {
      return `${util.getUrl()}icon/${name}@2x.png`
    },
    // 跳转单笔转账
    gotoTransfer (item) {
      this.$router.push({
        name: 'singleTransPre',
        params: {
          item
        }
      })
    },
    // 跳转账户明细查询
    gotoDetail (item) {
      this.$router.push({
        name: 'accountDetailQry',
        params: {
          item
        }
      })
    },
    // 首次登录跳转修改密码
    goPwdChange () {
      this.$router.push('/pwdChange')
    },
    // 跳转公告列表
    lookMoreNews () {
      this.$router.push({
        name: 'newsList',
        params: { noticeList: this.noticeList }
      })
    },
    // 跳转公告详情
    lookNewsDetail (item) {
      this.$router.push({
        name: 'newsDetail',
        params: { notice: item }
      })
    },
    // 跳转活期账户查询
    gotoCurrentAccountQry () {
      this.$router.push('/currentAccountQry')
    },
    // 跳转待办事项
    goTodo () {
      this.$router.push('/todoBusiness')
    },
    // 跳转常用工具设置
    goCommonFun () {
      this.$router.push('/commonFun')
    },
    // 常用工具跳转
    goCommonDetail (item) {
      this.$router.push({ name: item.path })
    },
    // 跳转外汇查询
    goForeignEx () {
      this.$router.push('/foreignEx')
    },
    // 跳转账户排序
    goMore () {
      let list = []
      this.list.forEach(item => {
        list = list.concat(item)
      })
      this.$router.push({
        name: 'accountRank',
        params: { list }
      })
    },
    // 跳转利率查询
    goRateSearch () {
      this.$router.push({
        name: 'rateSearch',
        params: { state: '0', backpage: 'index' }
      })
    },
    // 跳转网点查询
    goNetQuery () {
      // 新打开网点查询页面
      window.open('http://www.bankofdl.com/home/pc/sy/fuzhu/cycx/wddt/dl/yywd/map.shtml')
      // window.location.href = ''
      // this.$router.push('/netQuery')
    },
    // 跳转理财计算器
    goCalculator () {
      this.$router.push('/calculator')
    },
    changeShowBalance (i) {
      this.tableData[i].showBalance = true
      this.$forceUpdate()
    },
    // 控制金额是否展示
    isBlanace (id) {
      if (id === 1) {
        this.isShowMyaccount = !this.isShowMyaccount
      }
      if (id === 2) {
        this.isShowBlanace = !this.isShowBlanace
      }
    },
    // 控制密码强度
    // customColorMethod () {
    //   if (this.percentage <= 30) {
    //     // this.customColor = '#f56c6c'
    //     document.getElementById('progressBar').style.backgroundColor = '#F81212'
    //   } else if (this.percentage <= 70) {
    //     document.getElementById('progressBar').style.backgroundImage = 'linear-gradient(270deg, #F1CC16 50%, #F81212 100%)'
    //   } else {
    //     document.getElementById('progressBar').style.backgroundImage = 'linear-gradient(270deg, #14D21E 0%, #F1CC16 50%, #F81212 100%)'
    //   }
    // },
    // echarts画图
    draw () {
      this.myChart = this.$echarts.init(document.getElementById('myEchart'))
      this.myChart.setOption(this.eCharts_options, true)
    },
    // 更好的取随机数
    getRandomNum (Min, Max) {
      var Range = Max - Min
      var Rand = Math.random()
      return Min + Math.round(Rand * Range)
    },
    // 数字跳动
    jumpNum () {
      let that = this
      let endNum = that.num
      let startNum = 0
      let endTime = 70
      // let stepNum = 0;
      let newInterval = setInterval(() => {
        if (that.num <= endNum) {
          endTime -= 0.01
          let strNum = that.num.toString()
          if (strNum.length < 6) {
            that.num = that.getRandomNum(startNum, endNum)
            startNum = that.num
          } else if (strNum.length >= 6 && strNum.length < 14) {
            that.num = that.getRandomNum(startNum, endNum)
            startNum = that.num
          } else {
            that.num = that.getRandomNum(startNum, endNum)
            startNum = that.num
          }
        } else {
          that.num = endNum
          clearInterval(newInterval)
        }
      }, endTime)
    },
    // 获取时间友情提示
    getDate () {
      let date = new Date()
      let hours = date.getHours()
      switch (true) {
        case hours >= 0 && hours < 5:
          this.timeHello = '凌晨'
          break
        case hours >= 5 && hours < 7:
          this.timeHello = '清晨'
          break
        case hours >= 7 && hours < 11:
          this.timeHello = '上午'
          break
        case hours >= 11 && hours < 14:
          this.timeHello = '中午'
          break
        case hours >= 14 && hours < 18:
          this.timeHello = '下午'
          break
        case hours >= 18 && hours < 22:
          this.timeHello = '晚上'
          break
        case hours >= 22:
          this.timeHello = '深夜'
          break
      }
    },
    // 控制金额是否显示
    handleData () {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].showBalance = false
      }
      this.$forceUpdate()
    },
    // 下载证书下载驱动
    downloadCryptoKit () {
      if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
        if (window.navigator.cpuClass === 'x86') {
          this.$refs.downloadCryptoKit.href = util.getUrl() + 'resources/CryptoKit.CertEnrollment.DLBank.x86.exe'
          this.$refs.downloadCryptoKit.download = 'CryptoKit.CertEnrollment.DLBank.x86.exe'
        } else {
          this.$refs.downloadCryptoKit.href = util.getUrl() + 'resources/CryptoKit.CertEnrollment.DLBank.x64.exe'
          this.$refs.downloadCryptoKit.download = 'CryptoKit.CertEnrollment.DLBank.x64.exe'
        }
      } else {
        this.$refs.downloadCryptoKit.href = util.getUrl() + 'resources/npCryptoKit.CertEnrollment.DLBank.x86.exe'
        this.$refs.downloadCryptoKit.download = 'npCryptoKit.CertEnrollment.DLBank.x86.exe'
      }
      this.$refs.downloadCryptoKit.click()
      this.showDownloadCryptoKitButton = false
    },
    gotoMobileUpdate () {
      this.$router.push('/queryInformation')
    },
    CertUpdate () {
      this.showDownloadCryptoKit = false
      if (util.getLoginType() !== 'C') {
        this.clientCertDN = getSignCertInfo('SubjectDN')
      } if (this.clientCertDN !== 'uninstall') {
        httpPost('/eweb-enterprise.CertUpdateConfirm.do', {
          clientCertDN: this.clientCertDN
        }).then(data => {
          if (isLoadSuccess()) {
            httpPost('/eweb-common.GenToken.do').then(token => {
              httpPost('/eweb-enterprise.CertUpdate.do', {
                _tokenName: token._tokenName,
                _dataMapKey: data._dataMapKey,
                clientCertDN: this.clientCertDN
              }).then(res => {
                this.showCertUpdate = false
                this.downloadCryptoKitFun()
              })
            })
          } else {
            this.showDownloadCryptoKit = true
          }
        })
      }
    },
    // 获取数据
    getData () {
      httpPost('eweb-query.HomePageUserInfoQry.do').then(res => {
        if (localStorage.loginJoin === 'true') {
          // 判断证书状态 为未下载则跳转到证书下载页面 距离到期时间小于90天跳转到证书更新页面
          if (res.certUpdateState === '1') {
            this.showCertUpdate = true
          }
          if (res.remindMsg) {
            this.remindMsg = res.remindMsg
            this.showRemindMsg = true
          }
          if (res.mobileUpdateState === '1') {
            this.showMobileUpdate = true
          }
        }

        if (res.pwdLevel === '3') {
          this.percentage = 0
        } else if (res.pwdLevel === '2') {
          this.percentage = 30
        } else if (res.pwdLevel === '1') {
          this.percentage = 70
        }
        // this.customColorMethod()
        this.userInfo = res
        if (this.userInfo.userPic === '' || this.userInfo.userPic === null) {
          this.headerImg = `${util.getUrl()}header/header1@3x.png`
        } else {
          this.headerImg = `${util.getUrl()}header/${this.userInfo.userPic}@3x.png`
        }
        httpPost('eweb-query.HomePageAccountInfoQry.do').then(res => {
          if (Array.isArray(res.assetsList)) {
            this.list = res.assetsList
          }
          this.changeCard(this.list.length)
        })
        httpPost('eweb-query.HomePageMsgNotifyQry.do').then(res => {
          if (Array.isArray(res.noticeList)) {
            this.noticeList = res.noticeList
          }
        })
        httpPost('eweb-query.HomePageToDoListQry.do').then(res => {
          this.pendTrsCount = res.pendTrsCount // 待处理交易笔数
          this.remindCount = res.remindCount // 业务提醒笔数
          this.bankNotCheckCount = res.bankNotCheckCount // 客户未对账笔数
        })
        httpPost('eweb-common.HomeSpeedMenuQry.do').then(res => {
          if (Array.isArray(res.list)) {
            this.menuList = res.list
            this.$store.commit('d2admin/menu/asideSet', res.list)
          }
        })
        httpPost('eweb-common.HomeTransferListQry.do').then(res => {
          if (Array.isArray(res.list)) {
            let arr = res.list
            if (arr.length > 4) {
              this.transData = arr.splice(0, 4)
            } else {
              this.transData = arr
            }
          }
        })
      }).catch(() => {
        this.$msg('获取首页数据失败!')
      })
    },
    // 转账明细查看等多
    transMoreQry () {
      this.$router.push({ name: 'onlineBankTransInquiry' })
    },
    // 初始化密码控件
    initUKey () {
      this.showPwdChange = true
      try {
        // 延时,确保在dom生成之后再初始化ukey
        setTimeout(() => {
          this.uKey$1 = new UKey(document.getElementById('u-key-1'), 'password-u-key-1')
          this.uKey$2 = new UKey(document.getElementById('u-key-2'), 'password-u-key-2')
          this.uKey$3 = new UKey(document.getElementById('u-key-3'), 'password-u-key-3')
          var jsevent = document.createElement('script')
          jsevent = document.createElement('script')
          jsevent.type = 'text/javascript'
          jsevent.event = 'KeyPressSuccess(BstrObjectID)'
          jsevent.htmlFor = 'password-u-key-2'
          jsevent.async = true
          jsevent.innerHTML = 'KeyPressSuccess(BstrObjectID); '
          document.head.appendChild(jsevent)
          this.$forceUpdate()
        }, 100)
      } catch (e) {
        // console.error(e)
      }
    },
    // 重置密码重置按钮
    pwdReset () {
      this.uKey$1.clearData()
      this.uKey$2.clearData()
      this.uKey$3.clearData()
      document.getElementById('error-box').innerHTML = ''
    },
    // 重置密码提交
    commitPwd () {
      let password1 = ''
      let password2 = ''
      let password3 = ''
      try {
        const data1 = this.uKey$1.getData()
        password1 = data1.password
      } catch (e) {
        this.$msg('未输入旧密码')
      }
      try {
        const data2 = this.uKey$2.getData()
        password2 = data2.password
      } catch (e) {
        this.$msg('未输入新密码')
      }
      try {
        const data3 = this.uKey$3.getData()
        password3 = data3.password
      } catch (e) {
        this.$msg('未输入新密码确认')
      }
      let params = {
        userSeq: this.getUser().userSeq,
        oldPassword: password1,
        password: password2,
        passwordRepeat: password3
      }
      if (!this.uKey$2.getData().passwordLengthIntensity) {
        this.$msg('用户密码长度不够，请重新输入密码')
      } else if (this.uKey$2.getData().isWeakPassword) {
        this.$msg('用户密码过于简单，请重新输入密码')
      } else if (this.uKey$2.getData().passwordStrength < 2) {
        this.$msg('密码强度不合格，用户密码应至少由数组、字母、字符中的其中两项组成')
      } else {
        httpPost('/eweb-common.GenToken.do').then(token => {
          params._tokenName = token._tokenName
          httpPost('eweb-operator.OperatorPswModify.do', params).then(() => {
            this.logout()
          })
        })
      }
    },
    // 一个卡片与多个卡片格子样式切换
    changeCard (length) {
      if (length <= 1) {
        this.$refs.smallCard.className = 'boxWrap smallCardChange fll h300'
        this.$refs.bigCard.className = 'boxWrap fll h300 bigCardChange'
      } else {
        this.$refs.smallCard.className = 'boxWrap smallCard fll h300'
        this.$refs.bigCard.className = 'boxWrap bigCard fll h300'
      }
    },
    downloadCryptoKitFun () {
      let certType = 1
      let contianerName = ''
      let contianerName2 = ''
      if (isLoadSuccess()) {
        this.showDownloadProgress = true
        const CryptoAgent = OnLoad()
        httpPost('/eweb-common.CertDownLoadQry.do', { clientCertDN: this.clientCertDN }).then(res => {
          let p10List = {}
          certType = res.certList.length
          if (certType > 0) {
            res.certList.forEach((item, index) => {
              const keyLength = Number(item.keyLength)
              const cert = index + 1
              var res1 = CryptoAgent.CFCA_SetCSPInfo(keyLength, 'EnterSafe Interpass3000 CSP For Bank of Dalian V1.0')
              var res2 = CryptoAgent.CFCA_SetKeyAlgorithm(item.keyAlg)
              if (res1 && res2) {
                if (cert === 1) {
                  this.downloadPercentageSin = 20
                } else if (cert === 2) {
                  this.downloadPercentageDob = 20
                }
                let pkcs10Requisition = 0
                try {
                  var strSubjectDN = 'cn=' + res.keyID
                  if (item.keyAlg === 'RSA') {
                    if (keyLength === 1024) {
                      // RSA md5
                      pkcs10Requisition = CryptoAgent.CFCA_PKCS10CertRequisitionwithMD5(strSubjectDN, cert, 0)
                    } else {
                      // RSA sha1
                      pkcs10Requisition = CryptoAgent.CFCA_PKCS10CertRequisition(strSubjectDN, cert, 0)
                    }
                  } else {
                    // SM2
                    pkcs10Requisition = CryptoAgent.CFCA_PKCS10CertRequisition(strSubjectDN, cert, 0)
                  }

                  if (cert === 1) {
                    this.downloadPercentageSin = 40
                    contianerName = CryptoAgent.CFCA_GetContainer()
                    p10List.certLevel = item.certLevel
                    p10List.p10single = pkcs10Requisition
                    p10List.serialNoSingle = item.serialNo
                    this.downloadPercentageSin = 50
                  } else if (cert === 2) {
                    this.downloadPercentageDob = 40
                    contianerName2 = CryptoAgent.CFCA_GetContainer()
                    p10List.certLevel = item.certLevel
                    p10List.p10Commposite = pkcs10Requisition
                    p10List.serialNoCommposite = item.serialNo
                    this.downloadPercentageDob = 50
                  }
                } catch (e) {
                  const errorDesc = CryptoAgent.GetLastErrorDesc()
                  console.log(errorDesc)
                  this.showDownloadCryptoKit = false
                  this.showDownloadProgress = false
                  this.$msg('请确保插入u-key')
                  return false
                }
              } else {
                const errorDesc = CryptoAgent.GetLastErrorDesc()
                this.$message({
                  showClose: true,
                  message: errorDesc,
                  type: 'error'
                })
                this.showDownloadProgress = false
                this.showDownloadCryptoKit = false
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '用户未绑定证书',
              type: 'warning'
            })
            this.showDownloadProgress = false
            this.showDownloadCryptoKit = false
          }
          if (contianerName) {
            if (certType === 1 || (certType === 2 && contianerName2)) {
              if (p10List.p10single) {
                p10List.clientCertDN = this.clientCertDN
                httpPost('/eweb-common.CertDownLoad.do', p10List).then(cert => {
                  certType = Number(cert.operType)
                  if (certType === 1) {
                    this.downloadPercentageSin = 70
                    const res = this.importEncryptCert(CryptoAgent, certType, contianerName, cert.signatureCertSingle)
                    if (res) {
                      this.showDownloadProgress = false
                      this.$alert('单证书安装成功,请一小时后重新插入U-KEY并重新登录!!!', '证书安装', {
                        confirmButtonText: '确定',
                        type: 'success',
                        center: true
                      }).then(() => {
                        this.logout()
                      })
                    }
                  } else if (certType === 2) {
                    this.downloadPercentageSin = this.downloadPercentageDob = 70
                    const res1 = this.importEncryptCert(CryptoAgent, 1, contianerName, cert.signatureCertSingle)
                    const res2 = this.importEncryptCert(CryptoAgent, 2, contianerName2, cert.commpositeSignatureCert, cert.encryptCert_PrivateData, cert.encryptCert_PublickeyCert)
                    if (res1 && res2) {
                      this.showDownloadProgress = false
                      this.$alert('双证书安装成功,请一小时后重新插入U-KEY并重新登录!!!', '证书安装', {
                        confirmButtonText: '确定',
                        type: 'success',
                        center: true
                      }).then(() => {
                        this.logout()
                      })
                    }
                  }
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '证书p10内容为空',
                  type: 'error'
                })
                this.showDownloadCryptoKit = false
                this.showDownloadProgress = false
                return false
              }
            } else {
              this.$message({
                showClose: true,
                message: '双证密钥容器名称内容为空',
                type: 'error'
              })
              this.showDownloadCryptoKit = false
              this.showDownloadProgress = false
              return false
            }
          } else {
            this.$message({
              showClose: true,
              message: '单证密钥容器名称内容为空',
              type: 'error'
            })
            this.showDownloadCryptoKit = false
            this.showDownloadProgress = false
            return false
          }
        }).catch(() => {
          this.showDownloadProgress = false
          this.showDownloadProgress = false
        })
      } else {
        this.showDownloadCryptoKit = true
        this.showDownloadProgress = false
      }
    },
    // 下载证书
    downloadCertificate () {
      const user = this.getUser()
      if (util.getLoginType() !== 'C' && user.userCert && user.userCert.certState === 'U' && localStorage.loginJoin === 'true') {
        if (util.getLoginType() !== 'C') {
          this.clientCertDN = getSignCertInfo('SubjectDN')
        }
        this.downloadCryptoKitFun()
      }
    },
    // 登出
    logout () {
      const path = util.getLoginRouter()
      const callback = () => {
        this.$router.push(path)
      }
      const data = {
        successCallback: callback
      }
      this.$store.dispatch('common/logout', data)
    },
    // 安装证书
    importEncryptCert (CryptoAgent, certType, contianerName, signatureCert, encryptCert_PrivateData, encryptCert_PublickeyCert) {
      if (signatureCert === '') {
        this.$message({
          showClose: true,
          message: '签名公钥证书内容为空',
          type: 'error'
        })
        return false
      }
      let importRes = CryptoAgent.CFCA_ImportSignCert(certType, signatureCert, contianerName)
      if (importRes) {
        this.downloadPercentageSin = 100
      }
      if (certType === 2) {
        this.showDownloadPercentageDob = true
        importRes = CryptoAgent.CFCA_ImportEncryptCert(encryptCert_PrivateData, encryptCert_PublickeyCert, contianerName, 0x1 | 0x2)
        if (!importRes) {
          const errorDesc = CryptoAgent.GetLastErrorDesc()
          this.$alert('双证书安装失败,请联系银行人员重新安装' + errorDesc, '证书安装', {
            confirmButtonText: '确定',
            type: 'error',
            center: true
          }).then(() => {
            this.logout()
          })
          return false
        } else {
          this.downloadPercentageDob = 100
          return importRes
        }
      }
      if (!importRes) {
        const errorDesc = CryptoAgent.GetLastErrorDesc()
        this.$alert('单证书安装失败,请联系银行人员重新安装' + errorDesc, '证书安装', {
          confirmButtonText: '确定',
          type: 'error',
          center: true
        }).then(() => {
          this.logout()
        })
        return false
      } else {
        return importRes
      }
    }
  },
  watch: {
    'eCharts_options': {
      handler (newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.draw()
        }
      },
      deep: true
    }
  },
  // 判断是否由客户端进入
  created () {
    let userMsg = util.getlogininfo()
    if (userMsg) {
      userMsg = JSON.parse(userMsg)
      localStorage.setItem('loginJoin', true)
      this.$store.commit('common/updateUser', userMsg.user)
      this.$store.commit('common/updateMenuList', userMsg.menuList)
      localStorage.setItem('loginType', userMsg.loginType)
      httpPost('eweb-common.GetAuthMenuDataTwo.do', { menuId: 'Edraft' }).then(res => {
        this.$store.commit('d2admin/menu/setBillMenu', res.menus.children)
      })
      location.replace(location.href)
    }
  },
  // 判断是否由登录页进入
  beforeRouteEnter (to, from, next) {
    if (from.name === 'login') {
      localStorage.setItem('loginJoin', true)
    } else {
      localStorage.setItem('loginJoin', false)
    }
    next()
  },
  mounted () {
    // const user = this.getUser()
    // this.FirstLoginFlag = user ? user.firstLoginFlag : 'F'
    // firstLoginFlag 用户是否首次登陆
    this.FirstLoginFlag = this.getUser().firstLoginFlag
    if (this.FirstLoginFlag === 'N') {
      // 显示新手引导页
      this.$store.commit('common/setShowGuide', true)
    }
    // 获取首页数据
    this.getData()
    this.downloadCertificate()
    this.jumpNum()
    this.getDate()
    this.handleData()
    // this.initUKey()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/usualStyle.scss";
  .changeCss{
    overflow: auto;
  }
  .u-key-container-wrapper {
      margin: 10px 0;
      height: 32px;
      padding: 0 50px;
      background: #f8f8f8!important;
      line-height: 32px;
      .u-key-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 0 30px 0 15px;
        height: 36px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
      }
  }
.homeBg {
  position: relative;
  width: 1200px !important;
  .homeAlert {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    right: 0;
    background: rgba(0, 0, 0, .3);
    .pwd-change-box {
      background: #fff;
      box-shadow: 0 0 10px #ccc;
      margin-bottom: 20px;
      padding-top: 30px;
      ul {
        margin: 0 200px;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        li {
            height: 54px;
            line-height: 54px;
            background: #f8f8f8;
            display: flex;
            border-bottom: 1px solid #ccc;
            div {
              padding: 0;
              flex: 1;

              input {
                width: 160px;
                height: 24px;
                padding: 4px 10px;
              }
            }
            .u-key-container-wrapper {
              flex: 2;
              margin: 12px 0;
              height: 30px;
              background: #f8f8f8!important;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: center;
              justify-content: center;
              .u-key-container {
                flex: 2;
                text-align: left;
                height: 30px;
                padding-top: 3px;
                margin-left: 50px;
                border: 1px solid #DCDFE6;
                background: #fff;
                border-radius: 4px;
              }
              .u-key-prompt {
                flex: 1;
                background: #f8f8f8!important;
                text-align: left;
                padding-left: 10px;
                border: 0;
              }
            }
        }
        li div:last-child {
            border-left: 1px solid #ccc;
            background: #fff;
        }
      }
      div {
        padding: 30px 0 30px;
        text-align: center;
        button {
          padding: 0px;
          margin: 0 50px;
          cursor: pointer;
          outline: none;
        }
      }

      .u-key-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
    .alertBox {
      margin: 0 auto;
      margin-top: 20%;
      padding: 40px;
      width: 420px;
      border-radius: 8px;
      background: #FFF5F5;
      background-image: linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 97%);
      box-shadow: 2px 2px 7px 0 rgba(0,0,0,0.20);
      text-align: center;
      button {
        margin-top: 20px;
        cursor: pointer;
        outline: none;
      }
    }
  }
}
.bodyTop {
  height: 110px;
  background-image: url("./image/bgImage.png");
  background-repeat: no-repeat;
  background-size: auto;
  box-sizing: border-box;
  padding-left: 10px;
  .userInfo {
    margin: 0 auto;
    height: 110px;
    width: 1200px;
    color: #fff;
    font-weight: 300;
    .userIcon {
      margin-top: 12px;
      width: 84px;
      height: 84px;
      border-radius: 50%;
      cursor: pointer;
    }
    .ml20 {
      width: 33%;
      margin-left: 20px;
      padding-top: 20px;
    }
    .ml30 {
      margin-left: 30px;
      padding-top: 20px;
    }
    .mt5 {
      margin-top: 5px;
    }
    .weather {
      // margin-top: 60px;
      // height: 110px;
      padding-top: 70px;
      margin-right: 20px;
      li{
        margin-top: 5px;
        text-align: left;
        // line-height: 20px;
      }
    }
    .progress {
      width: 100px;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 7px;
    }
  }
}
.content {
  margin: 0 auto;
  width: 1200px;
  padding-bottom: 20px;
  .boxWrap {
    margin-top: 20px;
    padding-top: 10px;
    box-shadow: 0px 0px 10px #ccc;
    background: #fff;
    .box {
      margin-top: 10px;
      padding-left: 20px;
      border-left: 4px solid #d41618;
      margin-left: 40px;
    }
    .messageWrap {
      margin: 30px 20px 30px 40px;
      height: 180px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      webkit-scrollbar {
        width: 0px;
      }
      .messageItem {
        color: #151515;
        flex: 1;
        line-height: 60px;
        p {
          margin: 0;
          padding: 0;
          margin-top: 26px;
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #D41618;
        }
      }
      .messageItem span:nth-child(2) {
        margin-left: 20px;
        cursor: pointer;
        // color: #A6261E;
      }
      .messageItem span:last-child {
        margin-left: 6px;
      }
    }
    .drawWrap {
      display: flex;
      padding: 20px 40px;
      position: relative;
      .scrollWrap {
        flex: 1;
        padding-left: 30px;
        .scrollBox {
          width: 180px;
          height: 280px;
          text-align: center;
          overflow: scroll;
          .scrollItem {
            color: #fff;
            padding: 10px 20px;
          }
        }
      }
      .echartsWrap {
        flex: 3;
        #myEchart {
          /* top: -30px; */
        }
      }
      .newsList {
        flex: 2;
      }
      /* .allMoney {
        position: absolute;
        top: 28%;
        left: 44.2%;
        right: 44.2%;
        bottom: 28%;
        border-radius: 50%;
        background: rgba(255, 255, 255);
        z-index: 9999999999;
        padding-top: 45px;
        text-align: center;
      } */
    }
    .flexBox {
      text-align: center;
      margin: 16px auto 0;
      width: 300px;
      border: 1px solid #ccc;
      // border-radius: 4px;
      .flexItem {
        display: flex;
        flex-direction: row;
        div {
          width: auto;
          width: calc(50% - 2px)\9;
          flex: 1;
          cursor: pointer;
          display: inline-block;
          .top {
            border: none;
          }
          p {}
        }
        .messageBox {
          position: relative;
          .newMessage {
            position: absolute;
            color: #fff;
            width: 25px;
            top: 10%;
            height: 25px;
            line-height: 25px;
            right: 10%;
            background: #d41618;
            border-radius: 50%;
          }
        }
      }
      .flexItem {
        height: 122px;
        .icon {
          width: 41px;
          height: 42px;
          margin: 20px auto 0;
          cursor: pointer;
        }
        .icon:hover{
          width: 50px;
          height: 50px;
        }
      }
    }
    .flexBox .flexItem:first-child {
      border-bottom: 1px solid #ccc;
    }
    .flexItem div:first-child {
      border-right: 1px solid #ccc;
    }
    .tableWrap{
      max-height: 248px;
    }
    .tableData {
      table-layout: fixed;
      margin: 0 40px;
      margin-top: 15px;
      width: 90%;
      text-align: center;
      border-collapse: collapse;
      border: solid #cccccc;
      border-width:1px 0px 0px 1px;
      max-height: 248px;
      overflow: scroll;
      th{
        border: solid #cccccc;
        border-width:0px 1px 1px 0px;
      }
      td{
        border: solid #cccccc;
        border-width:0px 1px 1px 0px;
      }
      .tableHeader {
        margin: 20px 0 10px;
        background: #F5F5F5;
        height: 47px;
        line-height: 47px;
        color: #333;
      }
      .tableBody {
        color: #666;
        td {
          height: 47px;
          // line-height: 47px;
          background: #fff;
          // padding: 15px 0 15px;
        }
        .searchOne {
          color: #009cd8;
          cursor: pointer;
        }
      }
    }
    table tr:nth-child(even) {
      background: #f8f8f8;
    }
    .iconWrap {
      margin: 0 auto;
      padding: 20px 30px;
      position: relative;
      .icon-item {
        width: 25%;
        height: 90px;
        cursor: pointer;
        img {
          width: 38px;
        }
      }
      // .swiper-container {
      //   .swiper-slide {
      //     text-align: center;
      //     & > div {
      //       .iconImg {
      //         margin-bottom: 10px;
      //         width: 52px;
      //         height: 52px;
      //       }
      //     }
      //   }
      // }
      // .swiper-button-prev {
      //   position: absolute;
      //   left: 25px;
      // }
      // .swiper-button-next {
      //   position: absolute;
      //   right: 25px;
      // }
    }
    .mt15 {
      margin-top: 15px;
    }
    .sonTitle {
      margin-left: 6px;
      color: #3F3F3F;
      .setting {
        color: #B51011;
        cursor: pointer;
      }
    }
    .swiperWrap {
      margin: 20px 20px 0 40px;
      height: 220px;
      .el-carousel__item {
        background: #fff!important;
      }
      .el-carousel__container{
        .alotCard{
          margin: 0!important;
        }
      }
      .alotCardWrap {
        display: flex;
        justify-content: center;
        padding: 20px 0;
        height: 160px;
        text-align: center;
        .alotCardContainer{
          display: flex;
          flex: 1;
          display: inline-block\9;
          border-radius: 8px;
          box-shadow: 2px 2px 7px 0 rgba(0,0,0,0.20);
          overflow: hidden;
          width: 100%;
          text-align: left;
        }
        .alotCardContainerSub{
          display: flex;
          flex: 1;
          display: inline-block\9;
          margin: 0 20px;
          border-radius: 8px;
          box-shadow: 2px 2px 7px 0 rgba(0,0,0,0.20);
          overflow: hidden;
          width: calc(50% - 70px)\9;
          text-align: left;
        }
        .alotCard {
          flex: 1;
          padding-left: 30px;
          // width: 400px;
          background-image: linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 97%);
          /*box-shadow: 2px 2px 7px 0 rgba(0,0,0,0.20);*/
          /*border-radius: 8px;*/
          display: flex;
          flex-direction: column;
          // margin: 0 50px;
          // max-width: 380px;
          color: #333;
          display: inline-block\9;
          /*width: calc(50% - 70px)\9;*/
          width: 100%\9;
          filter: progid:dximagetransform.microsoft.gradient(GradientType=0, startColorstr='#FFF5F5', endColorstr='#FFFFFF');/*IE8+*/
          div {
            flex: 1;
            line-height: 38px;
          }
          .alot-card-click{
            float: right;
            padding-right: 20px;
            cursor: pointer;
            color: #B51011;
          }
          .alot-card-click:hover{
            color: #009cd8;
          }
        }
        .alotCard div:nth-child(odd) {
          color: #666;
        }
      }
      // .alotCardWrap .alotCard:nth-child(1) {
      //   margin-right: 30px;
      // }
      // .alotCardWrap .alotCard:nth-child(2) {
      //   margin-left: 30px;
      // }
    }
  }
  .smallCard {
    width: 380px;
    height: 350px;
    background: #fff;
  }
  .smallCardChange {
    width: 580px;
    height: 350px;
    background: #fff;
    .overFlow {
      display: inline-block;
      width: 400px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      /* display: -webkit-box; */
      -moz-text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
    .alotCard{
      margin: 0 20px;
    }
  }
  .bigCardChange {
    margin-left: 20px;
    width: 600px!important;
    height: 350px;
    background: #fff;
    .alotCardContainerSub{
      margin: 0 50px!important;
      width: calc(50% + 30px)!important;
    }
  }
  .bigCard {
    margin-left: 20px;
    width: 800px;
    height: 350px;
    background: #fff;
  }
  .imgWrap {
    margin-top: 20px;
    box-shadow: 0px 0px 10px #ccc;
    height: 145px;
  }
  .lookMore {
    color: #b51011;
    margin-right: 20px;
    margin-top: 3px;
    cursor: pointer;
  }
  .fFont {
    color: #999;
  }
  .h300 {
    height: 300px;
  }
  .newWrap {
    margin-top: 20px;
    display: flex;
    height: 320px;
    .myAssets {
      flex: 4;
      display: inline-block\9;
      height: 100%\9;
      width: calc(100%/7*4)\9;
      padding-top: 10px;
      background: #fff;
      box-shadow: 0px 0px 10px #ccc;
      .el-carousel__item {
        background: #fff!important;
      }
      .iconWrap {
        margin: 0 auto;
        padding: 20px 80px;
        position: relative;
        height: auto;
        .icon-item {
          width: 25%;
          height: 100px;
          float: left;
          text-align: center;
          margin: 10px 0;
          cursor: pointer;
          img {
            width: auto;
            height: 38px;
          }
          img:hover{
            position: relative;
            width: auto;
            height: 50px;
          }
        }
      }
      .wrapCard {
        margin-top: 20px;
        display: flex;
        .scrollWrap {
          flex: 1;
          padding-left: 40px;
          padding-right: 30px;
          .scrollBox {
            min-width: 200px;
            height: 210px;
            text-align: center;
            overflow: scroll;
            border-radius: 6px;
            cursor: pointer;
            overflow-x: hidden;
            .scrollItem {
              height: 50px;
              /*line-height: 50px;*/
              color: #fff;
              padding: 10px 10px;
              text-align: justify;
              text-align-last: justify;
              .scrollAmount {
                margin-top: 5px;
              }
            }
          }
          .scrollBox::-webkit-scrollbar {
            display: none;
          }
          .scrollBox li:nth-child(odd) {
            background: #8C090A;
          }
          .scrollBox li:nth-child(even) {
            background: #D26D6D;
          }
        }
        .eChartsWrap {
          flex: 1.4;
        }
      }
    }
    .myTodo {
      display: inline-block\9;
      width: calc(100%/7*3 - 20px)\9;
      height: 100%\9;
      float: right\9;
      margin-left: 20px;
      flex: 3;
      padding-top: 10px;
      background: #fff;
      box-shadow: 0px 0px 10px #ccc;
      .todoBox {
        display: inline-block\9;
        margin-top: 30px;
        display: flex;
        height: 200px;
        padding: 0 20px;
        text-align: center;
        ul {
          width: calc(90%/3)\9;
          display: inline-block\9;
          flex: 1;
          .todoTitle {
            margin: 10px auto 30px;
          }
          .todoIcon {
            width: auto;
            height: 43px;
            cursor: pointer;
          }
          .todoIcon:hover {
            width: auto;
            height: 50px;
            cursor: pointer;
          }
          .todoNum {
            margin-top: 20px;
            cursor: pointer;
            span {
              margin-right: 4px;
            }
          }
          .red {
            color: #D41618;
          }
          .green {
            color: #03AF3A;
          }
        }
      }
      .todoBox ul:nth-child(2) {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .box {
      margin-top: 10px;
      padding-left: 20px;
      border-left: 4px solid #d41618;
      margin-left: 40px;
    }
  }
}
.overFlow {
  display: inline-block;
  width: 180px;
  cursor: pointer;
  white-space: nowrap;
  line-height: 30px;
  color: #333;
  margin-top: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box; */
  -moz-text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/* .bgBanner {
  height: 240px;
  background: url("./image/banner-b.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
} */
.bar {
  float: left;
  width: 160px;
	height: 10px;
	padding: 1px;
	background: #eee;
  border-radius: 5px;
	box-sizing: border-box;
	margin: 6px 10px 0;
	.bars {
		box-sizing: border-box;
		height: 8px;
		border: 1px solid #000;
    border-radius: 6px;
    background-color: #F81212;
		background-image: linear-gradient(270deg, #14D21E 0%, #F1CC16 50%, #F81212 100%);
		position: relative;
		.progressBar {
			position: absolute;
			height: 100%;
			background: #eee;
			top: 0;
			right: 0;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
		// .progressBar::before {
		// 	content: '';
		// 	position: absolute;
		// 	left: -8px;
		// 	bottom: -15px;
		// 	border-top: 8px solid transparent;
		// 	border-left: 8px solid transparent;
		// 	border-right: 8px solid transparent;
		// 	border-bottom: 10px solid #eee;
		// }
	}
}
</style>
<style scoped>
	.homeBg >>> .el-popover--plain{
		background: #009cd8;
		margin-top: 50px;
		margin-left: -50px;
	}
	.el-carousel__button {
		width: 10px;
		height: 10px;
		background-color: #B51011!important;
		border-radius: 10px;
	}
/*.clearfix >>> .el-progress-bar__inner {
  background: linear-gradient(270deg, #14D21E 0%, #F1CC16 50%, #F81212 100%)!important;
}*/
</style>
