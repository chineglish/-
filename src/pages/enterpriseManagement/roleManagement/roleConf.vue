<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          ref="form"
          :formModel="formModel"
          @submit="onSubmit"
          @gotoBack="gotoBack">
          <span style="margin-left: 50px" slot-scope="{ node, data }">
            <span v-if="data.type === '0'">
              <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="true" @change="(value)=>changeCheck(value,node)">录入</el-checkbox>
              <el-checkbox true-label="1" false-label="0" v-model="data.data.AuthFlag" :disabled="true" @change="(value)=>changeCheck(value,node)">审核</el-checkbox>
            </span>
            <span v-if="data.type === '1'">
              <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="true" @change="(value)=>changeCheck(value,node)"></el-checkbox>
            </span>
          </span>
        </m-new-form>
    </div>
</template>

<script>
/**
 * @author 邓焕
 * @date 2019-12-18
 * @name 角色信息确认页
 */
import { httpPost } from '@/api/sys/http'
// import util from '../../../libs/util'
export default {
  name: 'roleConf',
  data () {
    return {
      breadData: ['企业管理台', '角色管理 ', '角色添加/修改'],
      formModel: {
        roleName: '',
        isManagement: '',
        roleType: 0,
        authority: []
      },
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '角色名称',
                'type': 'text',
                'key': 'roleName'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'isManagement'
              },
              {
                'disabled': true,
                'label': '角色类型',
                'type': 'text',
                'key': 'roleType',
                formatter: () => '自定义角色'
              },
              {
                label: ' '
              }
            ]
          },
          {
            formWidth: '100%',
            group: [
              {
                label: '功能权限',
                type: 'tree',
                expandedKeys: ['root'],
                nodeKey: 'key',
                showCheckbox: false,
                key: 'authority',
                props: {
                  label: 'text',
                  children: 'children'
                },
                data: []
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确认', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ],
      cifRoleProductAcList: [],
      cifRoleProductList: []
    }
  },
  methods: {
    onSubmit (params) {
      //  跳转结果页
      httpPost('/eweb-common.GenToken.do').then(token => {
        let interfaceAddress = ''
        const user = this.getUser()
        let requestParameters = {}
        let _params = params
        if (this.$route.params.operat === 'delete') {
          interfaceAddress = '/eweb-enterprise.RoleDelete.do'
          requestParameters = {
            cifNo: user && user.cif ? user.cif.coreCifNo : '',
            adminRoleFlag: params.adminRoleFlag,
            roleSeq: this.$route.params.formModel.roleSeq,
            roleType: params.roleType,
            _tokenName: token._tokenName
          }
        } else if (this.$route.params.operat === 'update') {
          interfaceAddress = '/eweb-enterprise.RoleUpdate.do'
          this.$route.params.cifRoleDetail[0].children[0].children.forEach(item => {
            this.getCifRoleProductAcList(item, item.data.acSeq)
          })
          this.getCifRoleProductList(this.$route.params.cifRoleDetail[0].children[1])
          requestParameters = {
            cifNo: this.getUser().cif.coreCifNo,
            _tokenName: token._tokenName,
            adminRoleFlag: params.adminRoleFlag,
            roleType: params.roleType,
            roleName: params.roleName,
            roleSeq: params.roleSeq,
            cifRoleProductAcList: this.cifRoleProductAcList,
            cifRoleProductList: this.cifRoleProductList
          }
        } else if (this.$route.params.operat === 'add') {
          interfaceAddress = '/eweb-enterprise.RoleAdd.do'
          this.$route.params.cifRoleDetail[0].children[0].children.forEach(item => {
            this.getCifRoleProductAcList(item, item.data.acSeq)
          })
          this.getCifRoleProductList(this.$route.params.cifRoleDetail[0].children[1])
          requestParameters = {
            cifNo: this.getUser().cif.coreCifNo,
            _tokenName: token._tokenName,
            adminRoleFlag: params.adminRoleFlag,
            roleType: params.roleType,
            roleName: params.roleName,
            cifRoleProductAcList: this.cifRoleProductAcList,
            cifRoleProductList: this.cifRoleProductList
          }
        }
        if (this.$route.params.conf) {
          const singMsg = this.isSign({ _Data2Sign: this.$route.params.conf._Data2Sign, _authenticateType: this.$route.params.conf._authenticateType })
          requestParameters._authenticateTypeChoose = this.$route.params.conf._authenticateType ? this.$route.params.conf._authenticateType[0] : ''
          requestParameters._dataMapKey = this.$route.params.conf._dataMapKey
          requestParameters.CSIISignature = singMsg
        }
        httpPost(interfaceAddress, requestParameters).then(res => {
          _params.JnlStatus = res._processState
          _params._jnlNo = res._jnlNo
          _params.transactionDate = res._transTime
          _params.tradeName = '角色管理'
          const user = this.getUser()
          _params.operatorName = user ? user.userName : ''
          _params.operatorNo = user ? user.userId : ''
          this.$router.push({
            name: 'maintainRoleResults',
            params: _params
          })
        })
      })
    },
    getCifRoleProductAcList (list, acSeq) {
      if (!list.children && (list.data.MakeFlag === true || list.data.AuthFlag === true || list.data.AuthFlag === '1' || list.data.MakeFlag === '1')) {
        this.cifRoleProductAcList.push({
          makeRight: list.data.MakeFlag === true || list.data.MakeFlag === '1',
          authRight: list.data.AuthFlag === true || list.data.AuthFlag === '1',
          acSeq: acSeq,
          prdId: list.data.value
        })
      }
      if (list.children) {
        list.children.forEach(item => {
          this.getCifRoleProductAcList(item, acSeq)
        })
      }
    },
    getCifRoleProductList (list) {
      if (!list.children && (list.data.MakeFlag === true || list.data.AuthFlag === true || list.data.AuthFlag === '1' || list.data.MakeFlag === '1')) {
        this.cifRoleProductList.push({
          makeRight: list.data.MakeFlag === true || list.data.MakeFlag === '1',
          authRight: list.data.AuthFlag === true || list.data.AuthFlag === '1',
          prdId: list.data.value
        })
      }
      if (list.children) {
        list.children.forEach(item => {
          this.getCifRoleProductList(item)
        })
      }
    },
    gotoBack () {
      this.$router.push({
        name: this.$route.params.name,
        params: this.$route.params
      })
    }
  },
  created () {
    if (this.$route.params.operat === 'update') {
      this.breadData = ['企业管理台', '角色管理 ', '角色修改']
    } else if (this.$route.params.operat === 'add') {
      this.breadData = ['企业管理台', '角色管理 ', '角色添加']
    } else if (this.$route.params.operat === 'delete') {
      this.breadData = ['企业管理台', '角色管理 ', '角色删除']
    }
    if (this.$route.params.formModel) {
      this.formConfigJson.formItems[1].group[0].expandedKeys = this.$route.params.expandedKeys
      this.formConfigJson.formItems[1].group[0].data = this.$route.params.cifRoleDetail
      this.formModel = this.$route.params.formModel
      if (this.$route.params.formModel.adminRoleFlag) {
        this.$route.params.formModel.isManagement = '是'
      } else {
        this.$route.params.formModel.isManagement = '否'
      }
    } else {
      this.$router.push('./roleList')
    }
  }
}
</script>
