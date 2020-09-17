<template>
  <div class="m-form-res">
    <div class="m-form-res-status">
      <el-steps v-if="data.stepsActive !== undefined" :active="data.stepsActive" finish-status="success" align-center>
          <el-step title="信息录入"></el-step>
          <el-step title="交易确认"></el-step>
          <el-step title="提交结果"></el-step>
      </el-steps>
      <div style="margin-bottom: 20px">
        <img class="image" v-if="data._JnlStatus === '1'" src="./image/suc.png">
        <img class="image" v-else src="./image/fail.png">
      </div>
      <span class="m-form-res-status-text">{{data._JnlStatus === '1' ? data.resData.title : "交易失败,请重新交易！"}}</span>
    </div>
    <div class="m-form-res-msg">
      <table class="m-form-res-msg-detail">
        <tbody>
          <tr>
            <td class="transTime" colspan="2">交易时间</td>
            <td class="timeShow" colspan="2">{{transTime | formatDate}}</td>
            <td class="transTime" colspan="2">打印时间</td>
            <td class="timeShow" colspan="2">{{printTime | formatDate}}</td>
          </tr>
          <tr>
            <td class="detail" rowspan="3">付款人</td>
            <td class="detail">{{data.resData.group[0].label}}</td>
            <td class="detail" colspan="2">{{formModel[data.resData.group[0].key]}}</td>
            <td class="detail" rowspan="3">收款人</td>
            <td class="detail">{{data.resData.group[3].label}}</td>
            <td class="detail" colspan="2">{{formModel[data.resData.group[3].key]}}</td>
          </tr>
          <tr>
            <td class="detail">{{data.resData.group[1].label}}</td>
            <td class="detail" colspan="2">{{formModel[data.resData.group[1].key]}}</td>
            <td class="detail">{{data.resData.group[4].label}}</td>
            <td class="detail" colspan="2">{{formModel[data.resData.group[4].key]}}</td>
          </tr>
          <tr>
            <td class="detail">{{data.resData.group[2].label}}</td>
            <td class="detail" colspan="2">大连银行</td>
            <td class="detail">{{data.resData.group[5].label}}</td>
            <td class="detail" colspan="2">{{formModel[data.resData.group[5].key]}}</td>
          </tr>
          <tr>
            <td class="detail" colspan="2">币种</td>
            <td class="detail" colspan="2">人民币</td>
            <td class="detail" colspan="2">钞汇标志</td>
            <td class="detail" colspan="2">本币</td>
          </tr>
          <tr>
            <td class="detail" colspan="2">{{data.resData.group[6].label}}(小写)</td>
            <td class="detail" colspan="2">￥{{formModel[data.resData.group[6].key] | money}}</td>
            <td class="detail" colspan="2">{{data.resData.group[6].label}}(大写)</td>
            <td class="detail" colspan="2">{{capital}}</td>
          </tr>
          <tr>
            <td class="detail" colspan="2"></td>
            <td class="postscript" colspan="6">
              ￥{{formModel[data.resData.group[6].key] | money}}
              <br />{{data.resData.group[7].label}}:
              <br />{{formModel[data.resData.group[7].key]}}
            </td>
          </tr>
          <tr>
            <td class="detail" colspan="2">重要提示</td>
            <td class="postscript" colspan="6">我行提供的现金管理电子回单仅作为客户记账或发货的参考，不作为客户入账的依据</td>
          </tr>
        </tbody>
      </table>
      <div class="m-form-btn">
            <el-button v-for="(item, index) in btnData"
                      :key="index"
                      :class="item.class"
                      @click="clickEvent(item.clickEventName)"
                      :disabled="disabled">
                  {{item.btnText}}
            </el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-form-inner',
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
      default: null
    },
    transTime: {
      type: Date,
      default: null
    }
  },
  data () {
    return {
      printTime: '',
      img: '',
      disabled: ''
    }
  },
  watch: {
    isDisabled (newVal) {
      this.disabled = newVal
    }
  },
  computed: {
    capital () {
      let money = 0
      money = this.formModel[this.data.resData.group[6].key]
      let fraction = ['角', '分']
      let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
      let s = ''
      for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(money * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
      }
      s = s || '整'
      money = Math.floor(money)
      for (let i = 0; i < unit[0].length && money > 0; i++) {
        let p = ''
        for (let j = 0; j < unit[1].length && money > 0; j++) {
          p = digit[money % 10] + unit[1][j] + p
          money = Math.floor(money / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      let sum = s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
      return sum
    }
  },
  mounted () {
    let time = new Date()
    this.printTime = time
  },
  created () {
    this.disabled = this.isDisabled
  },
  methods: {
    clickEvent (eventName) {
      if (!eventName) return
      this.disabled = true
      this.$emit(eventName, this.form)
      this.disabled = false
    }
  }
}
</script>

<style lang="scss">
 .m-form-res {
  width: 1120px;
  border: 1px solid #EEEEEE;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  background: #ffffff
 }
.m-form-res-status{
  margin: 20px 0;
  width: 100%;
  text-align: center
}
.m-form-res-status-text{
  margin-top: 20px;
}
.image{
  width: 70px;
  height: 70px
}
.m-form-res-msg {
  margin-left: 17%; width: 70%
}
.m-form-res-msg-detail {
  width: 724px;
  border-collapse: collapse;
}
.detail {
  border: 0.1px solid;
  text-align: center;
}
.postscript {
  border: 0.1px solid;
  padding-left: 10px;
}
.transTime {
  border: 0.1px solid;
  width: 166px;
  text-align: center;
}
.timeShow {
  border: 0.1px solid;
  width: 196px;
  text-align: center;
}
.m-form-btn {
  margin-top: 10px;
  text-align: center;
  margin-bottom: 10px;
  .m-cancel-btn{
    display: inline-block;
    width:90px;
    line-height: 20px;
    color: #E72E32;
    background-color: #cc444d;
    background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
