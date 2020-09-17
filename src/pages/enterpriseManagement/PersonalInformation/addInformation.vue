<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="card fs16">
          <m-steps :data="stepsData"></m-steps>
          <div class="boxWrap">
              <div class="left">
                <img src="@/assets/image/up.jpg">
                <el-button class="m-submit-btn">选择</el-button>
              </div>
              <div class="right">
                <div class="boxFlex">
                  <div class="Box1">操作员姓名</div>
                  <div class="Box2">
                    <input type="text">
                  </div>
                  <div class="Box1">操作员号</div>
                  <div class="Box2">
                    <input type="text">
                  </div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">昵称</div>
                  <div class="Box2">张三</div>
                  <div class="Box1">性别</div>
                  <div class="Box2">女</div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">证件类型</div>
                  <div class="Box2">二代身份证</div>
                  <div class="Box1">证件号码</div>
                  <div class="Box2">778789****1233</div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">联系方式</div>
                  <div class="Box2">010-67989747</div>
                  <div class="Box1">手机号码</div>
                  <div class="Box2">
                    <input type="text">
                  </div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">所属部门</div>
                  <div class="Box2">商务部</div>
                  <div class="Box1">E-mail</div>
                  <div class="Box2">1234567@qwer.com</div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">操作员状态</div>
                  <div class="Box2">正常</div>
                  <div class="Box1">操作员角色</div>
                  <div class="Box2">默认录入员</div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">USBKey ID</div>
                  <div class="Box2">0123456</div>
                  <div class="Box1">证书状态</div>
                  <div class="Box2">正常</div>
                </div>
                <div class="boxFlex">
                  <div class="Box1">证书有效期</div>
                  <div class="Box2">2022-09-31</div>
                  <div class="Box1">证书缴费日期</div>
                  <div class="Box2">2020-09-31</div>
                </div>
                <div class="bottomBox">
                  <div class="Box1">可操作账户</div>
                  <div class="bottomContent">03001078347 ／小馋猫食品公司／金州支行   任意转出<br>03001078347 ／小馋猫食品公司／金州支行   指定收款人</div>
                </div>
              </div>
          </div>
          <div class="btnWrap">
            <el-button class="m-submit-btn">确认</el-button>
            <el-button class="m-cancel-btn">返回</el-button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      breadData: ['企业管理台', '操作员个人信息维护'],
      stepsData: {
        stepsActive: 0,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      leaveState: false
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  .boxWrap {
      display: flex;
      .left {
          flex: 1;
          position: relative;
          border-bottom: 1px solid #EEEEEE;
          img {
            position: absolute;
            left: 24%;
            top: 40%;
            width: 80px;
            height: 80px;
          }
          button {
            position: absolute;
            top: 60%;
            left: 15%;
          }
      }
      .right {
          flex: 7;
          .boxFlex {
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            .Box1 {
              flex: 1;
              border-left: 1px solid #EEEEEE;
              background: #F8F8F8;
            }
            .Box2 {
              flex: 2;
              color: #666;
              border-left: 1px solid #EEEEEE;
            }
          }
          .bottomBox {
            height: 104px;
            display: flex;
            border-bottom: 1px solid #EEEEEE;
            .Box1 {
              flex: 1;
              line-height: 104px;
              border-left: 1px solid #EEEEEE;
              background: #F8F8F8;
            }
            .bottomContent {
              flex: 5;
              color: #666;
              border-left: 1px solid #EEEEEE;
              padding: 20px 1px;
              line-height: 24px;
            }
          }
      }
      input {
        width: 160px;
        height: 24px;
        line-height: 24px;
        padding: 2px 8px;
        outline: none;
      }
  }
  .btnWrap {
    padding: 30px 0 30px;
    text-align: center;
    button {
      margin: 0 50px;
    }
    .back {
        color: #333;
        background-color: #f4f4f5;
        background-image: linear-gradient(0deg, #C5C5C5 0%, #F1F1F1 10%, #EBEBEB 86%, #FFFFFF 99%);
        border: 1px solid #D22427;
        border-radius: 6px;
    }
  }
}
</style>
