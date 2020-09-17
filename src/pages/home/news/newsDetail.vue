<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="newsWrap">
        <div class="newTitle fs24">{{notice.noticeSubject}}</div>
        <div class="newsContent fs18">
          <div class="greet">尊敬的客户：</div>
          <div class="detail">{{notice.noticeContent}}</div>
          <div class="bottomName">大连银行</div>
          <div class="bottomTime">{{notice.submitDate}}</div>
        </div>
      </div>
    <div class="btn">
       <el-button class="m-cancel-btn" @click="onBack">返回</el-button>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      breadData: ['首页', '公告详情'],
      notice: {}
    }
  },
  mounted () {
    this.notice = this.$route.params.notice
    console.log(this.notice.noticeContent)
  },
  methods: {
    onBack () {
      this.$router.push({
        name: 'newsList'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newsWrap {
  padding-top: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .newTitle {
    margin-top: 10px;
    padding-left: 20px;
    border-left: 4px solid #d41618;
    margin-left: 40px;
    margin-bottom: 20px;
  }
  .newsContent {
    background: #f5f5f5;
    margin: 0 40px;
    .greet {
      padding-top: 20px;
      padding-left: 20px;
    }
    .detail {
      padding: 20px;
      max-height: 500px;
      min-height: 160px;
      white-space: pre-wrap;
    }
    .bottomName {
      padding-right: 50px;
      text-align: right;
    }
    .bottomTime {
      padding-right: 20px;
      padding-bottom: 20px;
      text-align: right;
    }
  }
}
.btn{
  text-align: center;
  margin-bottom: 10px;
}
.m-cancel-btn {
        display: inline-block;
        width: 120px;
        line-height: 20px;
        color: #FFFFFF;
        background-color: #cc444d;
        background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
      }
</style>
