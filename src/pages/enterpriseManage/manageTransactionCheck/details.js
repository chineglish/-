import util from '@/libs/util'
import {
  currency_type_entity,
  trans_type_code_entity,
  id_type_entity,
  opBusiness_entity
} from '@/assets/js/entity'

export default (transCode, type) => {
  let list = []
  switch (transCode) {
    // 限额管理
    case 'eweb-enterprise.CifAcLimitSet':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '账号', type: 'text', key: 'acNo' },
            { disabled: true, label: '账户名称', type: 'text', key: 'acName' },
            { disabled: true, label: '币种', type: 'text', key: 'currency', formatter: (row, column, cellValue, index) => currency_type_entity[column] },
            { disabled: true, label: '限额名称', type: 'text', key: 'transTypeCode', formatter: (row, column, cellValue, index) => trans_type_code_entity[column] },
            { disabled: true, label: '单笔限额（元）', type: 'text', key: 'limitTrs', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '日累计限额（元）', type: 'text', key: 'limitDay', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '月累计限额（元）', type: 'text', key: 'limitMon', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '年累计限额（元）', type: 'text', key: 'limitYear', formatter: (row, column, cellValue, index) => util.formatCurrency(column) },
            { disabled: true, label: '日累计笔数', type: 'text', key: 'limitDayCount' },
            { disabled: true, label: '月累计笔数', type: 'text', key: 'limitMonCount' },
            { disabled: true, label: '年累计笔数', type: 'text', key: 'limitYearCount' }
          ]
        }
      ]
      break
    // 操作员信息修改
    case 'eweb-operator.OperatorModify':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '操作员号', type: 'text', key: 'userId' },
            { disabled: true, label: '操作员姓名', type: 'text', key: 'userName' },
            { disabled: true, label: '证件类型', type: 'text', key: 'idType', formatter: (row, column, cellValue, index) => id_type_entity[column] },
            { disabled: true, label: '证件号码', type: 'text', key: 'idNo' },
            { disabled: true, label: '性别', type: 'text', key: 'gender', formatter: (row, column, cellValue, index) => column === '0' ? '男' : '女' },
            { disabled: true, label: '手机号码', type: 'text', key: 'mobilephone' },
            { disabled: true, label: 'Email地址', type: 'text', key: 'email' },
            { disabled: true, label: '是否管理员', type: 'text', key: 'adminUser', formatter: (row, column, cellValue, index) => column === '1' ? '是' : '否' },
            { disabled: true, label: '操作员角色', type: 'text', key: 'roleName' },
            { disabled: true, label: '业务开通', type: 'text', key: 'openFlag', formatter: (row, column, cellValue, index) => opBusiness_entity[column] },
            {
              disabled: true,
              label: '可操作账户',
              type: 'text',
              key: 'opaAccount',
              formWidth: '100%',
              labelWidth: '16.75%',
              isConcatHtml: true,
              style: {
                width: '100%',
                overflow: 'hidden'
              },
              formatter: (row, column, cellValue, index) => {
                let str = ''
                if (column) {
                  for (let i = 0; i < column.length; i++) {
                    str = str + `<p style="margin: 0; width: 100%; float: left;">${column[i]}</p>`
                  }
                }
                return str
              }
            }, {
              disabled: true,
              label: '企业授权账户',
              type: 'text',
              key: 'authorizedAcc',
              formWidth: '100%',
              labelWidth: '16.75%',
              isConcatHtml: true,
              style: {
                width: '100%',
                overflow: 'hidden'
              },
              formatter: (row, column, cellValue, index) => {
                let str = ''
                if (column) {
                  for (let i = 0; i < column.length; i++) {
                    str = str + `<p style="margin: 0; width: 100%; float: left;">${column[i]}</p>`
                  }
                }
                return str
              }
            }
          ]
        }
      ]
      break
    // 角色维护-添加
    case 'eweb-enterprise.RoleAdd':
      list = [
        {
          title: '角色管理-新增',
          formWidth: '50%',
          group: [
            { disabled: true, label: '角色名称', type: 'text', key: 'roleName' },
            { disabled: true, label: '是否管理员', type: 'text', key: 'adminRoleFlag', formatter: (row, column, cellValue, index) => column ? '是' : '否' },
            { disabled: true, label: '角色类型', type: 'text', key: 'roleType' },
            {},
            {
              disabled: true,
              label: '功能权限添加',
              type: 'blank',
              key: 'cifRoleProductAcList',
              formWidth: '100%',
              labelWidth: '16.75%',
              blankSlotName: 'cifRoleProductAcList'
            }
          ]
        }
      ]
      break
    // 角色维护-修改
    case 'eweb-enterprise.RoleUpdate':
      list = [
        {
          title: '角色管理-修改',
          formWidth: '50%',
          group: [
            { disabled: true, label: '角色名称', type: 'text', key: 'roleName' },
            { disabled: true, label: '是否管理员', type: 'text', key: 'adminRoleFlag', formatter: (row, column, cellValue, index) => column ? '是' : '否' },
            { disabled: true, label: '角色类型', type: 'text', key: 'roleType' },
            {},
            {
              label: '功能权限修改',
              type: 'blank',
              formWidth: '100%',
              labelWidth: '16.75%',
              blankSlotName: 'cifRoleProductAcList'
            }
          ]
        }
      ]
      break
    // 角色维护-删除
    case 'eweb-enterprise.RoleDelete':
      list = [
        {
          title: '角色管理-删除',
          formWidth: '50%',
          group: [
            { disabled: true, label: '角色名称', type: 'text', key: 'roleName' },
            { disabled: true, label: '是否管理员', type: 'text', key: 'adminRoleFlag', formatter: (row, column, cellValue, index) => column ? '是' : '否' },
            { disabled: true, label: '角色类型', type: 'text', key: 'roleType' },
            {},
            {
              label: '功能权限删除',
              type: 'blank',
              formWidth: '100%',
              labelWidth: '16.75%',
              blankSlotName: 'cifRoleProductAcList'
            }
          ]
        }
      ]
      break
    // 操作员密码重置
    case 'eweb-operator.OperatorPasswordReset':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '操作员姓名', type: 'text', key: 'userName' },
            { disabled: true, label: '操作员号', type: 'text', key: 'userId' },
            { disabled: true, label: '手机号', type: 'text', key: 'mobilephone' }
          ]
        }
      ]
      break
    // 手机银行开通
    case 'eweb-setting.MobilphoneBankApplication':
      list = []
      break
    // 企业信息维护
    case 'eweb-enterprise.UpdEcorgInfo':
      list = [
        {
          formWidth: '50%',
          group: [
            { disabled: true, label: '详细地址', type: 'text', key: 'addr' },
            { disabled: true, label: '邮编', type: 'text', key: 'postCode' },
            { disabled: true, label: '联系人姓名', type: 'text', key: 'name' },
            { disabled: true, label: '联系人证件类型', type: 'text', key: 'idType', formatter: (row, column, cellValue, index) => id_type_entity[column] },
            { disabled: true, label: '联系人证件号码', type: 'text', key: 'idNo' },
            { disabled: true, label: '联系人电话', type: 'text', key: 'telePhone' },
            { disabled: true, label: '联系人手机', type: 'text', key: 'mobile' },
            { disabled: true, label: '联系人Email地址', type: 'text', key: 'email' }
          ]
        }
      ]
      break
  }

  if (type === '1') {
    list[list.length] = {
      formWidth: '100%',
      group: [
        { disabled: false, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
        { show: false, disabled: false, label: '拒绝原因', type: 'input', key: 'refuseBecause' },
        { slotName: 'formTable' }
      ]
    }
  } else if (type === '2') {
    list[list.length] = {
      formWidth: '100%',
      group: [
        { disabled: true, label: '审核意见', type: 'radio', options: [{ value: '通过', key: '0' }, { value: '拒绝', key: '1' }], key: 'idea', changeEventName: 'on-idea-change' },
        { show: true, disabled: true, label: '拒绝原因', type: 'input', key: 'refuseBecause' },
        { slotName: 'formTable' }
      ]
    }
  } else {
    list[list.length] = {
      formWidth: '100%',
      group: [
        { slotName: 'formTable' }
      ]
    }
  }

  return list
}
