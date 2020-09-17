<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div class="card" v-if="formModel">
      <div class="title fs18">{{formModel.name}}（先生/女士），您曾在 {{formModel.submitTime}} 留言：</div>
      <div class="wrap fs16">
        <div class="item1">留言人</div>
        <div class="item2">{{formModel.userName}}</div>
      </div>
      <div class="wrap fs16">
        <div class="item1">联系方式</div>
        <div class="item3">
          <div class="sonContent">{{formModel.telNo}}</div>
          <div class="item1">电子信箱</div>
          <div class="sonContent pl30">{{formModel.email}}</div>
        </div>
      </div>
      <div class="wrap fs16">
        <div class="item1">QQ号码</div>
        <div class="item3">
          <div class="sonContent">{{formModel.qqNo}}</div>
          <div class="item1">微信</div>
          <div class="sonContent pl30">{{formModel.wechatNo}}</div>
        </div>
      </div>
      <div class="wrap fs16">
        <div class="item1">留言主题</div>
        <div class="item2">{{formModel.msgTitle}}</div>
      </div>
      <div class="wrap fs16">
        <div class="item1">留言类型</div>
        <div class="item2" v-if="formModel.msgType === '1'">建议</div>
        <div class="item2" v-if="formModel.msgType === '2'">表扬</div>
        <div class="item2" v-if="formModel.msgType === '3'">投诉</div>
        <div class="item2" v-if="formModel.msgType === '4'">预约</div>
        <div class="item2" v-if="formModel.msgType === '5'">其他</div>
      </div>
      <div class="wrap fs16 h120">
        <div class="item1">留言内容</div>
        <div class="item2">{{formModel.msgContent}}</div>
      </div>
      <div v-if="formModel.hfFlag === '1'" class="wrap fs16">
        <div class="item1">留言回复内容</div>
        <div class="item2">{{formModel.ansContent}}</div>
      </div>
      <div v-else class="wrap fs16">
        <div class="item1">留言回复状态</div>
        <div class="item2" v-if="formModel.hfFlag === '1'">已回复</div>
        <div class="item2" v-if="formModel.hfFlag === '0'">未回复</div>
      </div>
      <div class="btnWrap">
        <button class="m-cancel-btn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadData: ['企业管理台', '留言查询', '留言详情'],
      formModel: {
        name: ''
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  created () {
    this.formModel = this.$route.params.data
    this.formModel.name = this.getUser().userName
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 16px;
    color: #333;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.20);

    .title {
      padding: 0 30px;
      height: 60px;
      line-height: 60px;
      background: #FDF2F3;
    }

    .wrap {
      display: flex;
      height: 52px;
      line-height: 52px;
      border-bottom: 1px solid #EEEEEE;

      .item1 {
        flex: 1;
        background: #F8F8F8;
        padding-left: 30px;
      }

      .item2 {
        padding-left: 30px;
        flex: 8;
        color: #666;
      }

      .item3 {
        display: flex;
        flex: 8;
        color: #666;
        padding-left: 30px;

        .sonContent {
          flex: 2;
        }

        .pl30 {
          padding-left: 30px;
        }
      }
    }

    .h120 {
      height: auto;
      // line-height: 30px;s
      .item2 {
        padding: 10px 30px 10px 30px;
        text-align: justify;
        word-wrap:break-word;
        line-height: 30px;
      }
    }

    .btnWrap {
      padding: 30px 0 36px;
      text-align: center;
    }
  }
</style>
