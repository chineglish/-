<template>
  <m-new-form :componentJson="formConfigJson"
              ref="form"
              :formModel="formModel"
  >
  <div style="width:100%; margin: 15px 0;" slot="cifRoleProductAcList" class="aaa">
    <d-table
      :tableData="formModel.cifRoleProductAcList"
      :tableHeadData="cifRoleHeadData"
      :pagesize="'20'"
    >
    </d-table>
  </div>
  </m-new-form>
</template>

<script>
/**
 * @author 邓焕
 * @date 2019-12-18
 * @name 角色信息确认页
 */
// import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { prd_id } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'roleConffer',
  data () {
    return {
    //   breadData: ['企业管理台', '角色管理 ', '角色添加/修改']
      formConfigJson: {
        formItems: [
          {
            title: '角色添加/修改/维护/删除',
            formWidth: '100%',
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
                'key': 'isManagement',
                formatter: (row, column, cellValue, index) => cellValue ? '是' : '否'
              },
              {
                'disabled': true,
                'label': '角色类型',
                'type': 'text',
                'key': 'roleType',
                formatter: (row, column, cellValue, index) => cellValue ? '系统默认角色' : '自定义角色'
              },
              {
                'disabled': true,
                'label': '功能权限添加',
                'type': 'blank',
                'key': 'authority',
                blankSlotName: 'cifRoleProductAcList'
              }
            ]
          }
        ]
      },
      cifRoleHeadData: [
        { label: '使用权(录入)', prop: 'makeRight', formatter: (row, column, cellValue, index) => cellValue === 'true' ? '是' : '否' },
        { label: '验证权(审核)', prop: 'authRight', formatter: (row, column, cellValue, index) => cellValue === 'true' ? '是' : '否' },
        { label: '功能名称', prop: 'prdId', formatter: (row, column, cellValue, index) => util.handleEnums(prd_id, cellValue) }
      ]
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
