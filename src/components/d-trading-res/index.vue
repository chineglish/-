<template>
  <div id="trading-res">
    <div class="img"></div>
    <!-- 提示信息开始 -->
    <div class="toast fs18">
      <span class="hint" v-if="h.showNumber">{{h.who}}:{{h.number}}</span>
      <span v-if="h.showHint">{{h.words}}</span>
    </div>
    <!-- 提示信息结束 -->
    <div class="hide fs16">
      <span class="hide-words">{{hide}}</span>
       <svg class="icon hide-arrow hide-change-arrow" ref="arrow" viewBox="0 0 1024 1024" @click="changeTipArrow" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2205" height="128" width="128"><path d="M467.05836289 497.11504151a63.64133262 63.64133262 0 0 0 65.13877529 8.98465869 32.94374854 32.94374854 0 0 0 11.23082315-5.98977247l393.82753974-350.40168984A45.67201523 45.67201523 0 0 0 960.46586914 111.52343867a45.67201523 45.67201523 0 0 0-17.2205956-34.44119121 62.14388906 62.14388906 0 0 0-79.36448468 0L511.23293457 394.54018789 158.58508115 77.08224746A62.14388906 62.14388906 0 0 0 79.2205956 75.58480391a42.67712901 42.67712901 0 0 0 0 67.38494062z" fill="" p-id="2206"></path><path d="M863.88078887 527.81262471L511.23293457 843.77312246 158.58508115 526.31518203a62.14388906 62.14388906 0 0 0-79.36448555 0 42.67712901 42.67712901 0 0 0 0 67.38493975l390.08393174 354.14529697a63.64133262 63.64133262 0 0 0 65.13877529 8.98465869 32.94374854 32.94374854 0 0 0 11.23082403-5.98977246l393.82753886-350.40168896a45.67201523 45.67201523 0 0 0 20.96420362-39.68224277 45.67201523 45.67201523 0 0 0-17.2205956-34.44119122 62.14388906 62.14388906 0 0 0-79.36448468 1.49744268z" fill="" p-id="2207"></path></svg>
    </div>
    <!-- 中间表单部分开始 -->
    <d-vertical-table
      :tabledata="tableData"
      :showOne="showOne"
      :tableStyle="{ width:'800px' }"
      v-if="showTable"
    >
    </d-vertical-table>
    <!-- 中间表单部分结束 -->
    <!-- 底部按钮开始 -->
    <div class="btn">
      <span class="back-btn" @click="backBtn">{{btn1}}</span>
      <span class="detail-btn" v-if="detail.isShow" @click="detailBtn">{{detail.info}}</span>
    </div>
    <!-- 底部按钮结束 -->
  </div>
</template>
<script>
export default {
  props: {
    h: {
      type: Object,
      default: () => {
        return {
          who: '批次号',
          number: '1241312312312',
          words: '请等待审核员审核！',
          showHint: true,
          showNumber: true
        }
      }
    },
    detail: { // 是否展示详细信息列表
      type: Object,
      default: () => {
        return {
          info: '详细信息',
          isShow: true,
          url: '' // 直接写你要跳转的路径,例如/tableTest
        }
      }
    },
    backBtnUrl: { // 点击返回按钮返回的页面
      type: String,
      default: ''
    },
    tableData: { // table数据
      type: Array,
      default: () => []
    },
    tableStyle: { // table样式
      type: Object,
      default: () => {}
    },
    showOne: { // 显示一行两列还是1行四列
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      'btn1': '返回', // 返回按钮
      'hide': '隐藏',
      'showTable': true
    }
  },
  methods: {
    backBtn () {
      this.backBtnUrl && this.$router.push({ path: this.backBtnUrl })
    },
    detailBtn () {
      this.detail.url && this.$router.push({ path: this.detail.url })
    },
    changeTipArrow () {
      this.hide = this.showTable ? '详细信息' : '隐藏'
      this.showTable = !this.showTable
      this.$refs.arrow.classList.toggle('hide-change-arrow')
    }
  }
}
</script>
<style lang="scss" scoped>
  .img{
    width: 70px;
    height: 70px;
    border: 3px solid #D41618;
    position: relative;
    border-radius: 50%;
    margin: 0 auto;
    &:before {
      content: '';
      position: absolute;
      border: 2px solid #D41618;
      height: 19px;
      left: 20px;
      top: 28px;
      transform: rotateZ(-45deg);
    }
    &:after{
      position: absolute;
      content: '';
      height: 30px;
      border: 2px solid #D41618;
      left: 40px;
      top: 16px;
      transform: rotateZ(45deg);
    }
  }
  .toast{
    color: #333;
    line-height: 25px;
    letter-spacing: 0;
    margin-bottom: 50px;
    text-align: center;
    margin-top: 15px;
    .hint{
      padding-right:50px;
    }
  }
  .hide {
    line-height: 50px;
    padding-bottom: 20px;
    text-align: center;
    .hide-words{
      padding-right: 30px;
    }
    .hide-arrow{
      width:20px;
      height: 20px;
      vertical-align: sub
    }
    .hide-change-arrow{
      transform: rotateZ(180deg)
    }
  }
  .btn{
    text-align: center;
    .back-btn{
      display: inline-block;
      width:110px;
      line-height: 38px;
      background-color: #cc444d;
      background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
    }
    .detail-btn{
      display: inline-block;
      width: 110px;
      line-height: 38px;
      background-color: #f4f4f5;
      background-image: linear-gradient(0deg, #C5C5C5 0%, #F1F1F1 10%, #EBEBEB 86%, #FFFFFF 99%);
      border: 1px solid #D22427;
      border-radius: 6px;
      text-align: center;
      margin-left: 50px;
      cursor: pointer;
    }
  }
</style>
