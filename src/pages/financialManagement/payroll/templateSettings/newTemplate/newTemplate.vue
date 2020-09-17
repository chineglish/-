<template>
  <div class="newTemplate">
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="newTemplate-box">
          <div class="newTemplate-box-title fs16">
              模板名称
          </div>
          <div class="newTemplate-box-content">
              <el-input :minlength="5" clearable v-model="templateName" @change="val => templateName = val" placeholder="请输入模板名称"></el-input>
          </div>
      </div>
      <div class="newTemplate-box">
          <div class="newTemplate-box-title fs16">
              必选项目
          </div>
          <div class="newTemplate-box-content">
              <el-checkbox-group disabled v-model="checkedList">
                  <el-checkbox v-for="(item,index) in checkList.requiredList" :key="index" :label=item>
                      {{item.value}}
                  </el-checkbox>
              </el-checkbox-group>
          </div>
      </div>
      <div class="newTemplate-box">
          <div class="newTemplate-box-title fs16">
              应发项目
          </div>
          <div class="newTemplate-box-content">
              <el-checkbox-group v-model="checkedList">
                  <el-checkbox v-for="(item,index) in checkList.sendList" :key="index" :label=item>
                    <el-input v-model="item.value" @change="val => item.value = val" clearable></el-input>
                  </el-checkbox>
              </el-checkbox-group>
          </div>
      </div>
      <div class="newTemplate-box">
          <div class="newTemplate-box-title fs16">
              应扣项目
          </div>
          <div class="newTemplate-box-content">
              <el-checkbox-group v-model="checkedList">
                  <el-checkbox v-for="(item,index) in checkList.deductList" :key="index" :label=item>
                    <el-input v-model="item.value" @change="val => item.value = val" clearable></el-input>
                  </el-checkbox>
              </el-checkbox-group>
          </div>
      </div>
      <ul class="error-box" id="error-box"></ul>
      <div class="newTemplate-button">
          <el-button class="m-submit-btn" size="small" type="primary" @click="submitTemplate">确认</el-button>
          <el-button class="m-cancel-btn" size="small" type="info" plain @click="gotoBack">返回</el-button>
      </div>
  </div>
</template>

<script>/**
  * @name: 新增模板
  * @author: 邓焕
  * @date: 2019-12-13
  */

import { httpPost } from '@/api/sys/http'

export default {
  name: 'newTemplate',
  data () {
    return {
      breadData: ['财务管理', '代发工资', '模板设置'],
      checkedList: [],
      checkList: {
        requiredList: [
          { key: '1', value: '序号' },
          { key: '2', value: '账号' },
          { key: '3', value: '姓名' },
          { key: '4', value: '实发工资' }
        ],
        sendList: [
          { key: '5', value: '基本工资' },
          { key: '6', value: '岗位工资' },
          { key: '7', value: '绩效奖励' },
          { key: '8', value: '奖金' },
          { key: '9', value: '加班工资' },
          { key: '10', value: '综合补贴' },
          { key: '11', value: '住房补贴' },
          { key: '12', value: '采暖费' },
          { key: '13', value: '交通费' },
          { key: '14', value: '其他收入1' },
          { key: '15', value: '其他收入2' },
          { key: '16', value: '其他收入3' },
          { key: '17', value: '其他收入4' },
          { key: '18', value: '其他收入5' },
          { key: '19', value: '其他收入6' }
        ],
        deductList: [
          { key: '20', value: '住房公积金' },
          { key: '21', value: '养老保险' },
          { key: '22', value: '失业保险' },
          { key: '23', value: '医疗保险' },
          { key: '24', value: '工伤保险' },
          { key: '25', value: '生育保险' },
          { key: '26', value: '代扣税' },
          { key: '27', value: '考勤扣款' },
          { key: '28', value: '其他支出1' },
          { key: '29', value: '其他支出2' },
          { key: '30', value: '其他支出3' },
          { key: '31', value: '其他支出4' },
          { key: '32', value: '其他支出5' },
          { key: '33', value: '其他支出6' },
          { key: '34', value: '其他支出7' }
        ]
      },
      templateName: ''
    }
  },
  methods: {
    submitTemplate () {
      if (this.templateName.length === 0) {
        this.$msg('项目名称不可为空')
      } else {
        let templateList = {}
        let errorFlag = false
        this.checkedList.forEach(item => {
          if (item.value) {
            templateList[item.key] = item.value
          } else {
            this.$msg('项目内容不可上传为空')
            errorFlag = true
          }
        })
        if (!errorFlag) {
          httpPost('/eweb-common.GenToken.do').then(token => {
            httpPost('/eweb-transfer.PaySalaryTemplateAdd.do', {
              templateName: this.templateName,
              templateList: templateList,
              _tokenName: token._tokenName
            }).then(res => {
              res.tradeName = '代发工资模板设置成功'
              res.transactionDate = res._transTime
              this.$router.push({
                name: 'newTemplateResult',
                params: res
              })
            })
          })
        }
      }
    },
    gotoBack () {
      this.$router.push({
        name: 'templateSettings'
      })
    }
  },
  created () {
    this.checkedList = this.checkList.requiredList
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/unit/color.scss';
.newTemplate{
    // padding: 20px;
    background: #ffffff;
    .newTemplate-box{
        width: 100%;
        display: flex;
        text-align: left;
        line-height: 50px;
        overflow: hidden\9;
        position: relative\9;
        .newTemplate-box-title{
          text-align: right;
          width: 200px;
          background: #F8F8F8;
          padding-right: 20px;
          color: #333333;;
          border: 1px solid #EEEEEE;
          display: inline-block\9;
          text-align: end;
          width: 20%\9;
          height: 100%\9;
          position: absolute\9;
        }
        .newTemplate-box-content{
            display: inline-block\9;
            width: 80%\9;
            margin-left: 21%\9;
            flex: 8;
            background: #FFFFFF;
            padding-left: 40px;
            border: 1px solid #EEEEEE;

            .input-error{
                color: #F56C6C;
                line-height: 10px;
                margin-top: -5px;
                position: absolute;
            }

            .el-input{
                width: 44%;
                line-height: 30px;
            }

            .el-checkbox{
                width: 50%;
                margin: 0;
                line-height: 50px;
                .el-input{
                    width: 100%;
                }
            }
        }
    }
    .newTemplate-button{
        display: flex;
        justify-content: center;
        padding: 20px;
        text-align: center;
        .el-button--primary{
            margin-right: 50px;
            background-color: $color-primary;
            background-image: linear-gradient(0deg, #710A0B 0%, #C21D1F 17%, #E72E32 86%, #FFA1A3 100%);
            border-radius: 6px;
            border-color:#FFA1A3;
            padding-left: 20px;
            padding-right: 20px;
        }
        .el-button--info{
            background-color: #f4f4f5;
            background-image: linear-gradient(0deg, #C5C5C5 0%, #F1F1F1 10%, #EBEBEB 86%, #FFFFFF 99%);
            border: 1px solid #D22427;
            color: #000000;
            padding: 0px 20px;
            padding-top: 9px\9;
            padding-bottom: 9px\9;
        }
    }
}
.newTemplate-box-content >>> .el-checkbox__label{
    width: 80%;
    line-height: 30px;
    margin-left: 10px;
}

</style>>
