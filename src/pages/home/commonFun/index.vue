<template>
  <div>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <div>
      <div class="card">
        <div class="top fs22" v-if="menuList.length > 0">当前常用功能</div>
        <ul class="clearfix">
          <li v-for="(item, index) in menuList" :key="index">
            <!-- <div class="back-img" :style="`background-image: url(${getSrc(item.menuId)});`"></div> -->
            <div style="height: 50px">
              <img :src="getSrc(item.menuId)" @click="gotoPage(item)">
            </div>
            <p class="fs16" @click="gotoPage(item)">{{item.name}}</p>
            <el-button class="m-cancel-btn" @click="deleteMenu(index)">删除</el-button>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="top fs22">所有功能</div>
        <div v-for="(item, index) in allList" :key="index">
          <div class="title fs18">{{item.name}}<img class="title-icon" src="../image/rightArrow.png" alt=""></div>
          <ul class="clearfix">
            <li class="card-item" v-show="item.children" v-for="(menu, index2) in item.children" :key="index2">
              <div style="height: 50px">
                <img :src="getSrc(menu.menuId)" @click="gotoPage(menu)">
              </div>
              <p class="fs14" @click="gotoPage(menu)">{{menu.name}}</p>
              <el-button class="m-cancel-btn" v-if="menu.isShow" @click="deleteMenuItem(menu.menuId)">撤回</el-button>
              <el-button v-else class="m-submit-btn" @click="addMenu(menu)">添加</el-button>
            </li>
          </ul>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  data () {
    return {
      breadData: ['首页', '常用功能设置'],
      menuList: [],
      allList: []
    }
  },
  methods: {
    // 拼接图片地址
    getSrc (name) {
      return `${util.getUrl()}icon/${name}@2x.png`
    },
    gotoPage (item) {
      this.$router.push({ name: item.path })
    },
    deleteMenu (id) {
      if (this.menuList.length > 0) {
        let arr = _.cloneDeep(this.menuList)
        arr.splice(id, 1)
        httpPost('eweb-common.HomeSpeedMenuAdd.do', { list: arr }).then(res => {
          this.getData()
        }).catch(() => {
          this.$message.error('删除失败，请重试')
        })
      }
    },
    deleteMenuItem (str) {
      let arr = this.menuList
      arr.forEach((obj, index) => {})
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].menuId === str) {
          arr.splice(i, 1)
          break
        }
      }
      httpPost('eweb-common.HomeSpeedMenuAdd.do', { list: arr }).then(res => {
        this.getData()
      }).catch(() => {
        this.$message.error('撤回失败，请重试')
      })
    },
    addMenu (item) {
      if (this.menuList.length >= 8) {
        this.$message({
          message: '常用功能最多可设置8个!!!',
          type: 'warning'
        })
      } else {
        for (let i = 0; i < this.menuList.length; i++) {
          if (item.menuId === this.menuList[i].menuId) {
            this.$message({
              message: '功能已存在，不可新增',
              type: 'warning'
            })
            return
          }
        }
        let arr = _.cloneDeep(this.menuList)
        // arr.item.num = (this.menuList.length * 1) + 1
        arr.push(item)
        httpPost('eweb-common.HomeSpeedMenuAdd.do', { list: arr }).then(res => {
          this.getData()
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '添加失败，请重试',
            type: 'error'
          })
        })
      }
    },
    getData () {
      httpPost('eweb-common.HomeSpeedMenuQry.do').then(res => {
        if (Array.isArray(res.list)) {
          this.menuList = res.list
          httpPost('eweb-common.GetAuthMenuData.do').then(res => {
            if (Array.isArray(res.menus)) {
              this.allList = util.flatMap(res.menus, 'children')
              this.allList.splice(0, 1)
              let list = []
              this.menuList.map(e => {
                list.push(e.menuId)
              })
              this.allList.map(e => {
                if (e.hasOwnProperty('children') && e.children.length > 0) {
                  e.children.forEach(obj => {
                    if (list.includes(obj.menuId)) {
                      obj.isShow = true
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 6px #ccc;
    text-align: left\9;
    .top {
        padding-left: 20px;
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        color: #333;
        background: #FDF2F3;
    }
    .title {
      margin: 30px 30px 0;
      height: 30px;
      line-height: 30px;
      color: #0D155B;
      .title-icon{
        height: 12px;
        width: auto;
        margin-left: 5px;
      }
    }

    ul {
      li {
        width: 103px;
        float: left;
        padding: 20px;
        height: 150px;
        text-align: center;
        // .back-img{
        //   width: 100px;
        //   height: 100px;
        //   // background-image: url('http://localhost:8080/EBankFrontEnd/icon/SingleTransfer@2x.png');
        //   background-size: 50%;
        //   background-origin: content-box;
        //   background-position: center;
        //   background-repeat: no-repeat;
        // }
        img {
          width: auto;
          height: 38px;
        }
        img:hover{
          width: auto;
          height: 42px;
        }
        p {
          margin: 15px 0;
          color: #333;
          height: 35px;
        }
      }
      .m-cancel-btn, .m-submit-btn{
        padding: 6px 25px !important;
      }
      .card-item{
        width: 90px;
        height: 150px;
        padding: 20px 12px;
        img {
          width: auto;
          height: 38px;
        }
        p{
          width: 100%;
          word-wrap: break-word;
          word-break: normal;
        }
        img:hover{
          width: auto;
          height: 42px;
        }
        .m-cancel-btn, .m-submit-btn{
          padding: 6px 25px !important;
        }
      }
    }
    .line {
        margin: 0 30px;
        height: 1px;
        background: #000;
        opacity: 0.12;
    }
}
</style>
