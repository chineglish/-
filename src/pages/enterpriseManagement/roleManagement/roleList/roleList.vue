<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <d-table
              :table-data="tableData"
              :tableHeadData="tableHeadData"
              :operate-data="operateData"
              :actionData="actionData"
              @roleDetails="roleDetails"
              @addRole="addRole"
              @modifyRole="modifyRole"
              @deleteRole="deleteRole"
            >
            </d-table>
        </div>
        <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
</template>
<script>
/**
 * @name: 角色列表
 * @author: 邓焕
 * @date: 2019-12-18
 */
import { httpPost } from '@/api/sys/http'
import { mapMutations } from 'vuex'

export default {
  name: 'roleList',
  data () {
    return {
      breadData: ['企业管理台', '角色管理', '角色列表'],
      tableHeadData: [
        { label: '角色名称', prop: 'roleName' },
        { label: '角色类型', prop: 'defaultFlag', formatter: (row, column, cellValue, index) => cellValue ? '系统默认角色' : '自定义角色' },
        { label: '是否管理类', prop: 'adminRoleFlag', formatter: (row, column, cellValue, index) => cellValue ? '是' : '否' }
      ],
      tableData: [],
      msgs: [
        '1.具有管理类交易权限的企业操作员使用该功能进行企业角色管理，可对角色进行查询、新增、修改和删除。'
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            btnText: '修改',
            eventName: 'modifyRole'
          },
          {
            type: 'text',
            btnText: '删除',
            eventName: 'deleteRole'
          },
          {
            type: 'text',
            btnText: '详情',
            eventName: 'roleDetails'
          }
        ]
      },
      actionData: [{ btnText: '新增角色', class: 'm-submit-btn', eventName: 'addRole' }]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    setTreeDisabled (val) {
      for (let i = 0; i < val.length; i++) {
        val[i] = { ...val[i].data, ...val[i] }
        if (val[i].children) { this.setTreeDisabled(val[i].children) }
      }
    },
    roleDetails (res) {
      res = res.data
      this.$router.push({
        name: 'roleDetails',
        params: {
          formModel: res
        }
      })
    },
    addRole (res) {
      this.$router.push({
        name: 'addRole'
      })
    },
    modifyRole (res) {
      res = res.data
      this.$router.push({
        name: 'modifyRole',
        params: {
          formModel: res
        }
      })
    },
    deleteRole (res) {
      let formModel = res.data
      const user = this.getUser()
      httpPost('/eweb-enterprise.CifRoleDetailQry.do', {
        roleSeq: formModel.roleSeq
      }).then(result => {
        httpPost('/eweb-enterprise.RoleDeleteConfirm.do', {
          roleSeq: formModel.roleSeq,
          cifNo: user && user.cif ? user.cif.coreCifNo : '',
          adminRoleFlag: formModel.adminRoleFlag,
          roleType: formModel.roleType
        }).then(conf => {
          this.setTreeDisabled(result.list)
          this.$router.push({
            name: 'roleConf',
            params: {
              name: 'roleList',
              operat: 'delete',
              conf: conf,
              formModel: formModel,
              cifRoleDetail: result.list
            }
          })
        })
      })
    },
    roleListQuery () {
      httpPost('/eweb-enterprise.RoleListQuery.do', {
        cifNo: this.getUser().cif.coreCifNo // 客户号
      }).then(res => {
        this.tableData = res.cifRoles
        this.tableData.forEach(item => {
          if (item.defaultFlag) {
            item.btnData = [
              {
                type: 'text',
                btnText: '详情',
                eventName: 'roleDetails'
              }
            ]
          }
        })
      })
    }
  },
  created () {
    this.removeKeepAliveList()
    this.roleListQuery()
  }
}
</script>
