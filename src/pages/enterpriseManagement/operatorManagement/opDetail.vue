<template>
    <div>
      <m-breadcrumb :data="breadData"></m-breadcrumb>
      <div class="form-box">
          <m-new-form
                  :componentJson="formConfigJson"
                  :btnData="btnData"
                  :formModel="formModel"
                  :msgs="msgs"
                  @back="back">
          </m-new-form>
      </div>
    </div>
</template>

<script>/**
 *@name:操作员管理-查询详情
 * @author: 梁文彬
 * @date: 2019-12-17
 */

import { httpPost } from '@/api/sys/http'
import { id_type } from '@/assets/js/entity'
import util from '../../../libs/util'

export default {
  name: 'opDetail',
  data () {
    return {
      breadData: ['企业管理台', '操作员管理'],
      formModel: {
        authorizedAcc: [],
        opaAccount: []
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'userId',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'userName',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '证件类型',
                'type': 'text',
                'key': 'certificateType',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '证件号码',
                'type': 'text',
                'key': 'idNo',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '性别',
                'type': 'text',
                'key': 'genderShow',
                formatter: (key, value) => value || '--'
              },
              // {
              //   'disabled': true,
              //   'label': '联系电话',
              //   'type': 'text',
              //   'key': 'phone'
              // },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'mobilephone',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': 'Email地址',
                'type': 'text',
                'key': 'email',
                formatter: (key, value) => value || '--'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'administrator',
                formatter: (key, value) => value || '--'
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                'disabled': true,
                'label': '操作员角色',
                'type': 'radio',
                'key': 'roleSeq',
                'options': [],
                trans: { value: 'roleName', key: 'roleSeq' }
              },
              {
                'disabled': true,
                'label': '业务开通',
                'type': 'checkbox',
                'key': 'businessOpening',
                'options': [
                  { 'value': '网上银行', 'key': '0' },
                  { 'value': '手机银行', 'key': '1' }
                ]
              },
              {
                'disabled': true,
                'label': '可操作账户',
                'type': 'checkbox',
                'key': 'opaAccount',
                'options': []
              },
              {
                'disabled': true,
                'label': '企业授权账户',
                'type': 'checkbox',
                'key': 'authorizedAcc',
                'options': []
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      msgs: []
    }
  },
  methods: {
    back (res) {
      this.$router.push('/opManagement')
    },
    operatorInfoQuery () {
      let params = {
        userId: this.$route.params.data.userId // 用户顺序号
      }
      httpPost('/eweb-operator.OperatorDetailQuery.do', params).then(result => {
        this.formModel = result
        this.formConfigJson.formItems[1].group[0].options = result.roleList
        this.formModel.businessOpening = ['网上银行']
        if (this.formModel.isOpenEmbs === 'Y') {
          this.formModel.businessOpening.push('手机银行')
        }
        if (this.$route.params.data.adminUser === '1') {
          this.formModel.administrator = '是'
        } else {
          this.formModel.administrator = '否'
        }
        if (this.formModel.gender === '1') {
          this.formModel.genderShow = '女'
        } else if (this.formModel.gender === '0') {
          this.formModel.genderShow = '男'
        } else {
          this.formModel.genderShow = '未知性别'
        }
        let rightFlag = ''
        this.formModel.opaAccount = []
        this.formModel.userAcList.forEach((item, index) => {
          if (item.rightFlag === 'FT') {
            rightFlag = '任意转出'
          } else if (item.rightFlag === 'EIT') {
            rightFlag = '只划至本企业'
          } else if (item.rightFlag === 'Q') {
            rightFlag = '仅开通查询'
          } else if (item.rightFlag === 'SPT') {
            rightFlag = '指定收款人'
          } else if (item.rightFlag === 'FTE') {
            rightFlag = '任意转出 + 现金管理'
          } else if (item.rightFlag === 'AT') {
            rightFlag = '只划至被授权人'
          }
          const value = item.acNo + ' / ' + item.acName + ' / ' + item.openBank + ' / ' + rightFlag
          this.formConfigJson.formItems[1].group[2].options.push({
            value: value,
            key: index
          })
          this.formModel.opaAccount.push(value)
        })
        // for (let i in this.formConfigJson.formItems[1].group[2].options) {
        // }
        this.formModel.authorizedAccList = []
        this.formModel.authorizedAcc = []
        this.formModel.authAcList.forEach((item, index) => {
          if (item.rightFlag === 'FT') {
            rightFlag = '任意转出'
          } else if (item.rightFlag === 'EIT') {
            rightFlag = '只划至本企业'
          } else if (item.rightFlag === 'Q') {
            rightFlag = '仅开通查询'
          } else if (item.rightFlag === 'SPT') {
            rightFlag = '指定收款人'
          } else if (item.rightFlag === 'FTE') {
            rightFlag = '任意转出 + 现金管理'
          } else if (item.rightFlag === 'AT') {
            rightFlag = '只划至被授权人'
          }
          const value = item.acNo + ' / ' + item.acName + ' / ' + item.openBank + ' / ' + rightFlag
          this.formConfigJson.formItems[1].group[3].options.push(
            {
              value: value,
              key: index
            }
          )
          this.formModel.authorizedAcc.push(value)
        })
        this.formModel.certificateType = util.handleEnums(id_type, this.formModel.idType)
      })
    }
  },
  created () {
    if (this.$route.params.data) {
      this.operatorInfoQuery()
    } else {
      this.$router.push('./opManagement')
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .form-box >>> .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #333333;
    }
</style>
