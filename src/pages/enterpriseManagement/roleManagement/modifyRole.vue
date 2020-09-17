<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <m-new-form
          :componentJson="formConfigJson"
          :btnData="btnData"
          ref="form"
          :formModel="formModel"
          @submit="onSubmit"
          @gotoBack="gotoBack"
        >
          <span style="margin-left: 50px" slot-scope="{ node, data }">
            <span v-show="false">{{getTreeData(data)}}</span>
            <span v-if="(node.level === 4 && node.id < noAccount) || (node.level === 3 && node.id > noAccount)"  @click.stop="click">
              <el-checkbox true-label="1" false-label="0"  v-model="data.MakeFlag" @change="(value)=>changeMakeFlag(data, value)" :disabled="false">录入</el-checkbox>
              <el-checkbox true-label="1" false-label="0" v-model="data.AuthFlag" @change="(value)=>changeAuthFlag(data, value)" :disabled="false">审核</el-checkbox>
            </span>
            <span v-if="data.type === '0'">
              <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="false">录入</el-checkbox>
              <el-checkbox true-label="1" false-label="0" v-model="data.data.AuthFlag" :disabled="false">审核</el-checkbox>
            </span>
            <span v-if="data.type === '1'">
              <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="false"></el-checkbox>
            </span>
          </span>
        </m-new-form>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'

/**
 * @author 邓焕
 * @date 2019-12-18
 * @name 修改角色
 */
export default {
  name: 'modifyRole',
  data () {
    return {
      breadData: ['企业管理台', '角色管理', '角色修改'],
      formModel: {
        roleName: '',
        adminRoleFlag: false,
        roleType: '自定义角色'
      },
      noAccount: 9999,
      // 以下为动态数据
      formConfigJson: {
        stepsActive: 0,
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '角色名称',
                'type': 'input',
                'key': 'roleName'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                formatter: (key, value) => value ? '是' : '否',
                'key': 'adminRoleFlag'
              },
              {
                'disabled': false,
                'label': '角色类型',
                'type': 'text',
                'key': 'roleType'
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
                showCheckbox: false,
                expandedKeys: ['root'],
                nodeKey: 'value',
                filterNode: this.filterNode,
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
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'gotoBack' }
      ],
      errorFlag: false,
      cifRoleProductAcList: [],
      cifRoleProductList: [],
      expandedKeys: []
    }
  },
  methods: {
    // 阻止事件冒泡,不要删
    click () {},
    filterNode (value, data) {
      if (data.data.AuthFlag === '1' || data.data.MakeFlag === '1') {
        this.expandedKeys.push(data.key)
      }
      return true
    },
    getTreeData (data) {
      if (data.value === 'root') {
        this.treeData = data
      }
    },
    getCifRoleProductAcList (list, acSeq) {
      if (!list.children && (list.data.MakeFlag === true || list.data.AuthFlag === true || list.data.AuthFlag === '1' || list.data.MakeFlag === '1')) {
        this.errorFlag = true
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
        this.errorFlag = true
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
    // // 改变角色类型事件
    // changeRoleType (res) {
    //   this.formModel = res
    //   if (res.roleType === 0) {
    //     this.changeAuthFlag(this.treeData, '0')
    //   } else {
    //     this.changeMakeFlag(this.treeData, '0')
    //   }
    // },
    changeMakeFlag (data, value) {
      if (data.children) {
        data.MakeFlag = value
        data.children.forEach(item => {
          this.changeMakeFlag(item, value)
        })
      } else if (data.MakeFlag) {
        data.data.MakeFlag = value
      }
    },
    changeAuthFlag (data, value) {
      if (data.children) {
        data.AuthFlag = value
        data.children.forEach(item => {
          this.changeAuthFlag(item, value)
        })
      } else if (data.AuthFlag) {
        data.data.AuthFlag = value
      }
    },
    onSubmit (params, formConfigJson) {
      let _params = params
      const user = this.getUser()
      params.isAdminUser = ''
      let roleData = formConfigJson.formItems[1].group[0].data[0]
      roleData.children[0].children.forEach(item => {
        this.getCifRoleProductAcList(item, item.data.acSeq)
      })
      this.getCifRoleProductList(roleData.children[1])
      if (this.errorFlag) {
        httpPost('/eweb-enterprise.RoleUpdateConfirm.do', {
          roleSeq: params.roleSeq,
          cifNo: user && user.cif ? user.cif.coreCifNo : '',
          adminRoleFlag: params.adminRoleFlag,
          roleType: params.roleType,
          roleName: params.roleName,
          cifRoleProductAcList: this.cifRoleProductAcList,
          cifRoleProductList: this.cifRoleProductList
        }).then(conf => {
          if (this.$refs.form) {
            let tree = this.$refs.form.$refs.tree[0]
            tree.filter()
          }
          this.$router.push({
            name: 'roleConf',
            params: {
              name: 'modifyRole',
              expandedKeys: this.expandedKeys,
              formModel: _params,
              operat: 'update',
              conf: conf,
              cifRoleDetail: formConfigJson.formItems[1].group[0].data
            }
          })
        })
      } else {
        this.$msg('请至少勾选一项功能!!!')
      }
    },
    gotoBack () {
      this.$router.push({
        name: 'roleList'
      })
    },
    setTreeStart (val) {
      for (let i = 0; i < val.length; i++) {
        val[i] = { ...val[i].data, ...val[i] }
        if (val[i].children) {
          val[i].MakeFlag = '0'
          val[i].AuthFlag = '0'
          this.setTreeStart(val[i].children)
        }
      }
    },
    cifRoleDetailQry () {
      if (this.$route.params.formModel) {
        this.formModel = this.$route.params.formModel
        this.formModel.roleType = this.formModel.defaultFlag ? '系统默认角色' : '自定义角色'
        httpPost('/eweb-enterprise.CifRoleDetailQry.do', {
          roleSeq: this.$route.params.formModel.roleSeq
        }).then(res => {
          this.setTreeStart(res.list)
          this.formConfigJson.formItems[1].group[0].data = res.list
          // 延时获取非账户相关节点的NodeId
          setTimeout(() => {
            if (this.$refs.form) {
              let tree = this.$refs.form.$refs.tree[0]
              tree.setCheckedKeys(['rootNoAc'])
              let checkedNodes = tree.getCheckedNodes()
              this.noAccount = checkedNodes.length > 0 ? checkedNodes[0].$treeNodeId : 9999
            }
          }, 1000)
        })
      } else {
        this.gotoBack()
      }
    }
  },
  created () {
    this.cifRoleDetailQry()
  }
}
</script>
