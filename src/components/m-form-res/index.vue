<template>
  <div id="m-form-res">
    <div class="m-form-res-show">
      <m-steps :data="data"></m-steps>
      <div class="m-res-desc" v-if="data._JnlStatus">
        <div class="m-desc-img">
          <!-- v-if="
          data._JnlStatus === 'WCK'
          || data._JnlStatus === 'NW'
          || data._JnlStatus === 'OK'
          || data._JnlStatus === 'BH'" -->
          <img src="./image/suc.png">
          <!-- <img v-else src="./image/fail.png"> -->
        </div>
        <slot name="success-desc" v-if="data && data.JnlStatus">
          <div class="m-desc-content fs13">
            <p>尊敬的客户：</p>
            <p class="m-desc-reason">
              <span>{{JnlStatus[data._JnlStatus]}}！</span>
              <span v-if="data._RejMessage">{{data._RejMessage}}</span>
              <slot name="goOn">
                <span v-if="data.AuthItemList && data.AuthItemList !== null"
                      class="trs-auth">此次交易还需要<br/>
                    <span v-for="item in data.AuthItemList" :key="item.AuthUserCount">{{item.AuthUserCount}}个{{item.UserGrpId}}级授权员,授权</span>
                </span>
              </slot>
              <br v-if="data._RejMessage || (data.AuthItemList && data.AuthItemList !== null)">
              <span class="fs12">如有问题，请联系审核人员或者拨打客服电话 96500.</span>
            </p>
          </div>
        </slot>
      </div>
      <div class="m-res-info" v-if="data.resData">
        <h1 class="m-form-block-contianer-title m-info-title" v-if="data._JnlStatus">交易已提交</h1>
        <div style="text-align: center; padding-bottom: 40px;" v-if="data._JnlStatus">
          <span class="jnl-no">交易流水号：{{data.resData._jnlNo}}</span>
          <span class="status">交易状态：{{getStatus}}</span>
        </div>
        <div class="m-info-body">
          <div class="m-info-item fs14" :style="{'width': data.itemWidth ==='4' ? '50%' : '100%', display: item.display || ''}"
               v-for="item in data.resData.group" :key="item.label" v-show="item.show !== false">
            <span class="m-info-label">{{item.label}}</span>
            <span class="m-info-value">{{(item.formatter && typeof item.formatter === 'function' ? item.formatter(formModel[item.key]) : formModel[item.key]) || ''}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <m-btn :btnData="btnData" @click="clickEvent"></m-btn>
  </div>
</template>

<script>
import util from '@/libs/util'
import { process_state } from '@/assets/js/entity'
export default {
  name: 'm-form-res',
  props: {
    data: {
      type: Object,
      default: null
    },
    formModel: {
      type: Object,
      default: null
    },
    btnData: {
      type: Array,
      default: () => []
    },
    // 按钮禁用
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isDisabled (newVal) {
      this.disabled = newVal
    }
  },
  data () {
    return {
      disabled: ''
    }
  },
  computed: {
    getStatus () {
      return util.handleEnums(process_state, this.data._JnlStatus)
      // （WCK）待审核 （NW与OK）交易成功 （FL）失败 （BH）已受理
      // if (this.data._JnlStatus === 'WCK') {
      //   return '请等待复核员审核！'
      // } else if (this.data._JnlStatus === 'NW' || this.data._JnlStatus === 'OK') {
      //   return '交易成功'
      // } else if (this.data._JnlStatus === 'FL') {
      //   return '交易失败'
      // } else if (this.data._JnlStatus === 'BH') {
      //   return '交易已受理'
      // } else {
      //   return '交易状态未知'
      // }
    }
  },
  methods: {
    clickEvent (eventName) {
      if (!eventName) return
      this.disabled = true
      // if (eventName === 'back') {
      //   // 返回事件
      //   this.$router.go(-1)
      //   this.disabled = false
      // } else {
      //   // 其他事件
      //   this.disabled = false
      //   this.$emit(eventName, this.form)
      // }
      this.$emit(eventName, this.form)
      this.disabled = false
    }
  },
  created () {
    this.disabled = this.isDisabled
  }
}
</script>

<style lang="scss">
  #m-form-res {
    width: 100%;
    border: 1px solid #EEEEEE;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);

    img {
      width: 100%;
      height: 100%;
    }

    .m-form-res-show {
      width: 100%;
      background: #fff;
      // padding: 10px 0px 10px 0px;

      .m-res-desc {
        padding-top: 30px;
        display: flex;
        justify-content: center;
        text-align: center;

        .m-desc-img {
          display: inline-block\9;
          width: 70px;
          height: 70px;
        }
      }

      .m-res-info {
        margin-bottom: 30px;
        .m-info-title {
          text-align: center;
          margin-top: 10px;
          color: #333333;
          padding-bottom: 0px !important;
          padding-right: 20px\9;
        }
        .jnl-no {
        }
        .status{
          margin-left: 30px;
        }
        .m-info-body {
          display: flex;
          flex-wrap: wrap;
          /*width: 70%;*/
          /*margin: 0 15%;*/
          // padding-top: 30px;

          .m-info-item {
            color: #666;
            display: flex;
            display: inline-block\9;
            white-space: nowrap\9;

            .m-info-label {
              display: inline-block;
              color: #333333;
              width: 30%;
              text-align: right;
              border: 0.1px solid;
              margin-right: -1px;
              margin-bottom: -1px;
              padding: 10px 10px 10px 15px;
              background: #EFF3F6;
              border: #E6EAEE 1px solid;
            }

            .m-info-value {
              width: 70%;
              border: 0.1px solid;
              margin-right: -1px;
              margin-bottom: -1px;
              padding: 10px 10px 10px 20px;
              display: inline-block;
              color: #666666;
              border: #E6EAEE 1px solid;
            }
          }
        }
      }

      .m-desc-content {
        margin-left: 20px;
        color: #333;

        .m-desc-reason {
          margin-top: 10px;
          line-height: 18px;
        }
      }
    }

    // .m-form-btn {
    //   padding: 20px 0;
    //   text-align: center;
    //   justify-content: center;

    //   .m-cancel-btn {
    //     display: inline-block;
    //     width: 120px;
    //     line-height: 20px;
    //     color: #FFFFFF;
    //     background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
    //     border-radius: 6px;
    //     text-align: center;
    //     cursor: pointer;
    //   }

    //   .m-submit-btn {
    //     display: inline-block;
    //     line-height: 20px;
    //     color: #000000;
    //     background-image: linear-gradient(0deg, #C5C5C5 0%, #F1F1F1 10%, #EBEBEB 86%, #FFFFFF 99%);
    //     border: 1px solid #D22427;
    //     border-radius: 6px;
    //     text-align: center;
    //     margin-left: 50px;
    //     cursor: pointer;
    //   }
    // }
  }
</style>
