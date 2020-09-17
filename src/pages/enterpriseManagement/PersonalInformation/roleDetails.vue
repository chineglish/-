<template>
  <m-new-form :componentJson="formConfigJson" :formModel="formModel" @gotoBack="gotoBack">
    <span style="margin-left: 50px" slot-scope="{ node, data }">
      <span v-if="data.type === '0'">
        <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="true">录入</el-checkbox>
        <el-checkbox true-label="1" false-label="0" v-model="data.data.AuthFlag" :disabled="true">审核</el-checkbox>
      </span>
      <span v-if="data.type === '1'">
        <el-checkbox true-label="1" false-label="0" v-model="data.data.MakeFlag" :disabled="true"></el-checkbox>
      </span>
    </span>
  </m-new-form>
</template>

<script>/**
 * @author 邓焕
 * @date 2020-07-04
 * @name 角色信息详情页
 */

import { httpPost } from '@/api/sys/http'

export default {
  name: 'roleDetails',
  props: {
    roleName: {
      type: String,
      default: ''
    },
    roleSeq: {
      type: Number,
      default: 0
    },
    adminRoleFlag: {
      type: Boolean,
      default: false
    },
    defaultFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formModel: {
        roleName: '',
        isManagement: '0',
        roleType: '自定义角色',
        authority: []
      },
      // 以下为动态数据
      formConfigJson: {
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
                expandAll: true,
                key: 'authority',
                expandedKeys: ['root'],
                nodeKey: 'value',
                props: {
                  label: 'text',
                  children: 'children'
                },
                data: []
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    setTreeDisabled (val) {
      for (let i = 0; i < val.length; i++) {
        val[i] = { ...val[i].data, ...val[i] }
        if (val[i].children) { this.setTreeDisabled(val[i].children) }
      }
    },
    gotoBack (params) {
      this.$router.push('./roleList')
    },
    cifRoleDetailQry () {
      // if (this.$route.params.formModel) {
      // this.formModel = this.$route.params.formModel
      if (this.adminRoleFlag) {
        this.formModel.isManagement = '是'
      } else {
        this.formModel.isManagement = '否'
      }
      this.formModel.roleType = this.defaultFlag ? '系统默认角色' : '自定义角色'
      this.formModel.roleName = this.roleName
      httpPost('/eweb-enterprise.CifRoleDetailQry.do', { roleSeq: this.roleSeq }).then(res => {
        this.setTreeDisabled(res.list)
        this.formConfigJson.formItems[1].group[0].data = res.list
      })
      // } else {
      //   this.$router.push('./roleList')
      // }
    }
  },
  created () {
    // 使tree不可选
    this.cifRoleDetailQry()
  }
}
</script>
