<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="listWrap">
        <div class="title fs24">消息通知</div>
        <ul class="list fs18">
          <li v-for="(item, index) in noticeList" :key="index" class="clearfix" @click="lookNewsDetail(item)">
            <span class="fll fs14">{{item.noticeSubject}}</span>
            <span class="flr fs14">{{item.submitTime | getDate}}</span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <el-button class="m-cancel-btn" @click="onBack()">返回</el-button>
      </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
// import util from '../../../libs/util'
export default {
  data () {
    return {
      breadData: ['首页', '消息通知列表'],
      noticeList: []
    }
  },
  methods: {
    // 跳转公告详情
    lookNewsDetail (item) {
      this.$router.push({
        name: 'newsDetail',
        params: { notice: item }
      })
    },
    onBack () {
      this.$router.push({
        name: 'index'
      })
    }
  },
  filters: {
    getDate (val) {
      return val.slice(0, 10)
    }
  },
  mounted () {
    httpPost('eweb-query.HomePageMsgNotifyQry.do').then(res => {
      if (Array.isArray(res.noticeList)) {
        this.noticeList = res.noticeList
      }
    })
    // this.noticeList = this.$route.params.noticeList
  }
}
</script>

<style lang="scss" scoped>
.listWrap {
  padding-top: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px #ccc;
  margin-bottom: 20px;
  .title {
    margin-top: 10px;
    padding-left: 20px;
    border-left: 4px solid #d41618;
    margin-left: 40px;
  }
  .list {
    max-height: 500px;
    min-height: 200px;
    overflow: scroll;
    padding: 20px 60px;
    overflow-x: hidden;
    li {
      width: 100%;
      line-height: 60px;
      border-top: 2px solid #ccc;
      cursor: pointer;
      .fll{
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 220px);
      }
      .flr{
        width: 220px;
        text-align: end;
      }
    }
  }
  .list::-webkit-scrollbar {
    display: none;
  }
  .list li:last-child {
    border-bottom: 2px solid #ccc;
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
