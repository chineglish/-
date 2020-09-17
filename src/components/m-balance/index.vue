<template>
    <div class="m-balance">
        <div class="m-item" v-if="isShowBlance" v-loading="Loading" element-loading-spinner="el-icon-loading">
          <i class="el-icon-refresh pointer m-item-value fs16" @click="qryBalance" v-if="isNeedRefresh"></i>
          <span class="m-item-value fs16" v-if="!isNeedRefresh && !Loading">{{Balance}}</span>
        </div>
        <a class="m-event-btn fs12" v-if="isShowBlance" @click="isShowBlance = !isShowBlance">隐藏余额</a>
        <div class="m-item" v-if="!isShowBlance">
          <i class="el-icon-refresh pointer m-item-value fs16" @click="qryBalance" v-if="isNeedRefresh"></i>
          <span class="m-item-value fs16" v-if="!isNeedRefresh">****</span>
        </div>
        <a class="m-event-btn fs12" v-if="!isShowBlance" @click="isShowBlance = !isShowBlance">显示余额</a>
    </div>
</template>

<script>
// import {qryBalance} from '@/api/comm'
export default {
  name: 'm-balance',
  data () {
    return {
      isShowBlance: false,
      Balance: '0.00',
      isNeedRefresh: false,
      Loading: false
    }
  },
  props: {
    sendParams: {
      type: Object,
      default: function () {
        return {
          AcType: '',
          BankAcType: '',
          AcNo: '',
          SubAcSeq: '',
          Currency: 'CNY',
          showLoading: false
        }
      }
    }
  },
  watch: {
    sendParams: {
      deep: true,
      handler: function () {
        this.Loading = true
        this.qryBalance()
      }
    }
  },
  methods: {
    qryBalance () {
    }
  },
  created () {}
}
</script>
<style lang="scss">
    .m-balance {
      .m-item {
          display: inline-block;
          padding: 0px 6px 0px 0px;
          margin-right: 15px;
          height: 22px;
          .m-item-value {
            display: inline-block;
            color: #333;
            margin-right:-15px;
            height:100%;
          }
      }
      .m-loading {
        margin-right:15px;
      }
      .m-event-btn {
          color: #2BB0F1;
          // margin-left: 12px;
          display: inline-block;
          cursor: pointer;
      }
    }
</style>
