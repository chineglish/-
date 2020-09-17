<template>
  <div class="table-test">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div style="clear: both"></div>
    <div class="topWrap clearfix">
        <div class="fll">外汇牌价发布时间：<span class="time">{{updateTime}}</span></div>
<!--        <img :class="rotate ? 'flr research rotate' : 'flr research'" @click="goRotate" src="../image/research.png">-->
<!--        <div class="flr">倒计时：<span>00:{{count}}</span></div>-->
    </div>
    <div class="supTable">
      <table border="1">
        <tr class="fs16">
            <th width='15%'>货币全称</th>
            <th width='12%'>货币简称</th>
            <th width='8%'>基数</th>
            <th width='15%'>中间价</th>
            <th width='10%'>现汇买入价</th>
            <th width='10%'>现汇卖出价</th>
            <th width='10%'>现钞买入价</th>
            <th width='10%'>现钞卖出价</th>
        </tr>
        <tr class="tableData" v-for="(item, index) in tableData" :key="index">
            <td class="clearfix pdlr">
                <img class="icon fll" :src="item.icon">
                <span>{{item.fullName}}</span>
            </td>
            <td>{{item.huobfhao}}</td>
            <td>{{item.pjdanwei}}</td>
            <td>{{item.zhngjjia}}</td>

            <td>{{item.mairujia}}</td>
            <td>{{item.maichjia}}</td>
            <td>{{item.caomrjia}}</td>
            <td>{{item.caomcjia}}</td>
        </tr>
      </table>
    </div>
    <m-btn :btnData="btnData" @click="gotoBack"></m-btn>
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
      breadData: ['首页', '金融小工具', '外汇牌价查询'],
      tableData: [],
      count: 59,
      refresh: null,
      rotate: false,
      btnData: [{ btnText: '返回', class: 'm-cancel-btn', clickEventName: '' }]
    }
  },
  methods: {
    // 刷新数据定时器
    setTimer () {
      this.refresh = setInterval(() => {
        this.checkConut()
      }, 1000)
    },
    // 倒计时
    checkConut () {
      if (this.count === 0 || this.count === '0' || this.count <= 0) {
        window.clearInterval(this.refresh)
        this.getData()
      } else {
        if (this.count <= 10) {
          this.count = 0 + `${this.count - 1}`
        } else {
          this.count = this.count - 1
        }
      }
    },
    // 获取数据
    getData () {
      if (this.refresh) {
        window.clearInterval(this.refresh)
      }
      httpPost('eweb-query.HomePageExchangeRateQry.do').then(res => {
        this.tableData = res.rateList
        this.updateTime = res.updateTime
        this.tableData.forEach(item => {
          item.fullName = currency_type_entity[item.huobfhao]
          switch (item.huobfhao) {
            case 'USD':
              item.icon = require('../image/USD.png')
              break
            case 'HKD':
              item.icon = require('../image/HKD.png')
              break
            case 'EUR':
              item.icon = require('../image/EUR.png')
              break
            case 'JPY':
              item.icon = require('../image/JPY.png')
              break
            case 'GBP':
              item.icon = require('../image/GBP.png')
              break
            case 'CHF':
              item.icon = require('../image/CHF.png')
              break
            case 'AUD':
              item.icon = require('../image/AUD.png')
              break
            case 'CAD':
              item.icon = require('../image/CAD.png')
              break
            case 'SEK':
              item.icon = require('../image/SEK.png')
              break
          }
        })
      })
      // this.tableData = [
      //   { icon: require('../image/USD.png'), fullName: '美元', abbName: 'USD', num: '1', midPrice: '6.3287', pay: '5.3107', sell: '7.8362', nowPay: '5.9605', nowSell: '7.3362' },
      //   { icon: require('../image/HKD.png'), fullName: '港元', abbName: 'HKD', num: '1', midPrice: '0.7890', pay: '0.7890', sell: '0.8890', nowPay: '0.5890', nowSell: '0.8090' },
      //   { icon: require('../image/EUR.png'), fullName: '欧元', abbName: 'EUR', num: '1', midPrice: '6.3287', pay: '5.3107', sell: '7.8362', nowPay: '5.9605', nowSell: '7.3362' },
      //   { icon: require('../image/JPY.png'), fullName: '日元', abbName: 'JPY', num: '100', midPrice: '6.3287', pay: '5.3107', sell: '7.8362', nowPay: '5.9605', nowSell: '7.3362' },
      //   { icon: require('../image/GBD.png'), fullName: '英镑', abbName: 'GBD', num: '1', midPrice: '6.3287', pay: '5.3107', sell: '7.8362', nowPay: '5.9605', nowSell: '7.3362' },
      //   { icon: require('../image/CHF.png'), fullName: '瑞士法郎', abbName: 'CHF', num: '1', midPrice: '6.3287', pay: '5.3107', sell: '7.8362', nowPay: '5.9605', nowSell: '7.3362' }
      // ]
      this.count = 59
      this.setTimer()
    },
    // 点击刷新 图片动画
    goRotate () {
      this.rotate = true
      let timer = setInterval(() => {
        this.rotate = false
        this.getData()
        clearInterval(timer)
      }, 500)
    },
    gotoBack () {
      this.$router.push('/index')
    }
  },
  created () {
    if (this.refresh) {
      window.clearInterval(this.refresh)
    }
    this.getData()
  },
  //   销毁定时器
  beforeDestroy () {
    window.clearInterval(this.refresh)
  }
}
</script>

<style lang="scss" scoped>
.topWrap {
    height: 50px;
    line-height: 50px;
    color: #666;
    .research {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-top: 12px;
        margin-left: 16px;
        margin-right: 10px;
    }
    .rotate {
        -webkit-transform: rotate(360deg);
        animation: rotation 0.5s linear infinite;
        -moz-animation: rotation 0.5s linear infinite;
        -webkit-animation: rotation 0.5s linear infinite;
        -o-animation: rotation 0.5s linear infinite;
    }
    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    .time {
        color: #B51011;
    }
}
.supTable {
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        border: solid #cccccc;
        border-width:1px 0px 0px 1px;
        th{
          border: solid #cccccc;
          border-width:0px 1px 1px 0px;
        }
        td{
          border: solid #cccccc;
          border-width:0px 1px 1px 0px;
        }
    }
    table tr:nth-child(1) {
        height: 50px;
        line-height: 50px;
        color: #666;
        background: #fdf2f3;
    }
    table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .tableData {
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: #666;
        .pdlr {
            padding-right: 40px;
            padding-left: 40px;
        }
        .icon {
            width: 30px;
            height: 30px;
            margin-top: 5px;
            margin-left: 0px;
        }
    }
}
</style>
