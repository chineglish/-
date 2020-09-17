// 企业管理台 路由
// 操作员管理
const opManagement = () => import('@/pages/enterpriseManagement/operatorManagement/opManagement')
const opDetail = () => import('@/pages/enterpriseManagement/operatorManagement/opDetail')
const opUpdate = () => import('@/pages/enterpriseManagement/operatorManagement/opUpdate')
const opUpdateConf = () => import('@/pages/enterpriseManagement/operatorManagement/opUpdateConf')
const opUpdateRes = () => import('@/pages/enterpriseManagement/operatorManagement/opUpdateRes')
const resetPasswordRes = () => import('@/pages/enterpriseManagement/operatorManagement/resetPasswordRes')
// 角色管理
const roleList = () => import('@/pages/enterpriseManagement/roleManagement/roleList/roleList')
const roleDetails = () => import('@/pages/enterpriseManagement/roleManagement/roleList/roleDetails')
const addRole = () => import('@/pages/enterpriseManagement/roleManagement/addRole')
const modifyRole = () => import('@/pages/enterpriseManagement/roleManagement/modifyRole')
const roleConf = () => import('@/pages/enterpriseManagement/roleManagement/roleConf')
const maintainRoleResults = () => import('@/pages/enterpriseManagement/roleManagement/maintainRoleRes')
// 留言部分
const queryIndex = () => import('@/pages/enterpriseManagement/leaveMessage/queryIndex')
const leaveMessageConf = () => import('@/pages/enterpriseManagement/leaveMessage/leaveMessageConf')
const leaveMessagePre = () => import('@/pages/enterpriseManagement/leaveMessage/leaveMessagePre')
const leaveMessageRes = () => import('@/pages/enterpriseManagement/leaveMessage/leaveMessageRes')
// 个人信息部分
const queryInformation = () => import('@/pages/enterpriseManagement/PersonalInformation/queryInformation')
const informationPre = () => import('@/pages/enterpriseManagement/PersonalInformation/informationPre')
const informationConf = () => import('@/pages/enterpriseManagement/PersonalInformation/informationConf')
const addInformation = () => import('@/pages/enterpriseManagement/PersonalInformation/addInformation')
const addInformationConfirm = () => import('@/pages/enterpriseManagement/PersonalInformation/addInformationConfirm')
const informationRes = () => import('@/pages/enterpriseManagement/PersonalInformation/informationRes')
const pwdChange = () => import('@/pages/enterpriseManagement/PersonalInformation/pwdChange')
const usualRes = () => import('@/pages/enterpriseManagement/PersonalInformation/usualRes')
// 审批流程设置
const accountSetUpResult = () => import('@/pages/enterpriseManagement/approvalProcess/accountSetUp/accountSetUpResult')
const notAccountSetUpConfirm = () => import('@/pages/enterpriseManagement/approvalProcess/notAccountSetUp/notAccountSetUpConfirm')
const notAccountSetUpResult = () => import('@/pages/enterpriseManagement/approvalProcess/notAccountSetUp/notAccountSetUpResult')
// 电话银行开通
const telephoneBankOpenPre = () => import('@/pages/enterpriseManagement/telephoneBankOpen/openPre')
const telephoneBankOpenRes = () => import('@/pages/enterpriseManagement/telephoneBankOpen/openRes')
// 手机银行开通
const mobilephoneBanlOpenStatus = () => import('@/pages/enterpriseManagement/mobilephoneBanlOpen/status')
const mobilephoneBanlOpenRes = () => import('@/pages/enterpriseManagement/mobilephoneBanlOpen/openRes')

const enterpriseManagementRouter = [
  {
    path: 'opManagement',
    name: 'opManagement',
    component: opManagement,
    meta: {
      auth: true,
      title: '操作员管理'
    }
  },
  {
    path: 'opDetail',
    name: 'opDetail',
    component: opDetail,
    meta: {
      auth: true,
      title: '操作员管理-查询详情'
    }
  },
  {
    path: 'opUpdate',
    name: 'opUpdate',
    component: opUpdate,
    meta: {
      auth: true,
      title: '操作员管理-修改'
    }
  },
  {
    path: 'opUpdateConf',
    name: 'opUpdateConf',
    component: opUpdateConf,
    meta: {
      auth: true,
      title: '操作员管理-修改确认'
    }
  },
  {
    path: 'opUpdateRes',
    name: 'opUpdateRes',
    component: opUpdateRes,
    meta: {
      auth: true,
      title: '操作员管理-修改结果'
    }
  },
  {
    path: 'resetPasswordRes',
    name: 'resetPasswordRes',
    component: resetPasswordRes,
    meta: {
      auth: true,
      title: '操作员管理-密码重置结果'
    }
  },
  {
    path: 'roleList',
    name: 'roleList',
    component: roleList,
    meta: {
      auth: true,
      title: '角色管理/角色管理－角色查询列表'
    }
  },
  {
    path: 'roleDetails',
    name: 'roleDetails',
    component: roleDetails,
    meta: {
      auth: true,
      title: '角色管理/角色详情'
    }
  },
  {
    path: 'addRole',
    name: 'addRole',
    component: addRole,
    meta: {
      auth: true,
      title: '角色管理/角色添加',
      notCache: true
    }
  },
  {
    path: 'modifyRole',
    name: 'modifyRole',
    component: modifyRole,
    meta: {
      auth: true,
      title: '角色管理/角色修改',
      notCache: true
    }
  },
  {
    path: 'roleConf',
    name: 'roleConf',
    component: roleConf,
    meta: {
      auth: true,
      title: '角色管理/角色添加／修改／删除－确认'
    }
  },
  {
    path: 'maintainRoleResults',
    name: 'maintainRoleResults',
    component: maintainRoleResults,
    meta: {
      auth: true,
      title: '角色维护结果'
    }
  },
  // 留言部分
  {
    path: 'queryIndex',
    name: 'queryIndex',
    component: queryIndex,
    meta: {
      auth: true,
      title: '留言查询首页',
      rmCache: true
    }
  },
  {
    path: 'queryDetail',
    name: 'queryDetail',
    component: () => import('@/pages/enterpriseManagement/leaveMessage/queryDetail'),
    meta: {
      auth: true,
      title: '留言查询详情'
    }
  },
  {
    path: 'leaveMessageConf',
    name: 'leaveMessageConf',
    component: leaveMessageConf,
    meta: {
      auth: true,
      title: '留言服务确认'
    }
  },
  {
    path: 'leaveMessagePre',
    name: 'leaveMessagePre',
    component: leaveMessagePre,
    meta: {
      auth: true,
      title: '留言服务首页',
      notCache: true
    }
  },
  {
    path: 'leaveMessageRes',
    name: 'leaveMessageRes',
    component: leaveMessageRes,
    meta: {
      auth: true,
      title: '留言服务结果'
    }
  },
  // 个人信息部分
  {
    path: 'queryInformation',
    name: 'queryInformation',
    component: queryInformation,
    meta: {
      auth: true,
      title: '操作员个人信息查询'
    }
  },
  {
    path: 'pwdChange',
    name: 'pwdChange',
    component: pwdChange,
    meta: {
      auth: true,
      title: '操作员密码修改'
    }
  },
  {
    path: 'usualRes',
    name: 'usualRes',
    component: usualRes,
    meta: {
      auth: true,
      title: '复用结果页'
    }
  },
  {
    path: 'informationPre',
    name: 'informationPre',
    component: informationPre,
    meta: {
      auth: true,
      title: '操作员个人信息修改'
    }
  },
  {
    path: 'informationConf',
    name: 'informationConf',
    component: informationConf,
    meta: {
      auth: true,
      title: '操作员个人信息修改确认'
    }
  },
  {
    path: 'addInformation',
    name: 'addInformation',
    component: addInformation,
    meta: {
      auth: true,
      title: '操作员个人信息补录'
    }
  },
  {
    path: 'addInformationConfirm',
    name: 'addInformationConfirm',
    component: addInformationConfirm,
    meta: {
      auth: true,
      title: '操作员个人信息补录确认'
    }
  },
  {
    path: 'informationRes',
    name: 'informationRes',
    component: informationRes,
    meta: {
      auth: true,
      title: '操作员个人信息修改/补录结果'
    }
  },
  // 审批流程设置
  {
    path: 'approvalInquire',
    name: 'approvalInquire',
    component: () => import('@/pages/enterpriseManagement/approvalProcess/approvalInquire'),
    meta: {
      auth: true,
      title: '审批流程设置'
    }
  },
  {
    path: 'approvalProcess',
    name: 'approvalProcess',
    component: () => import('@/pages/enterpriseManagement/approvalProcess/approvalProcess'),
    meta: {
      auth: true,
      title: '审批流程设置',
      notCache: true
    }
  },
  {
    path: 'accountSetUpConfirm',
    name: 'accountSetUpConfirm',
    component: () => import('@/pages/enterpriseManagement/approvalProcess/accountSetUp/accountSetUpConfirm'),
    meta: {
      auth: true,
      title: '审批流程设置-财务相关交易-确认'
    }
  },
  {
    path: 'accountSetUpResult',
    name: 'accountSetUpResult',
    component: accountSetUpResult,
    meta: {
      auth: true,
      title: '审批流程设置-财务相关交易-结果'
    }
  },
  {
    path: 'notAccountSetUpConfirm',
    name: 'notAccountSetUpConfirm',
    component: notAccountSetUpConfirm,
    meta: {
      auth: true,
      title: '审批流程设置-非财务相关交易-结果'
    }
  },
  {
    path: 'notAccountSetUpResult',
    name: 'notAccountSetUpResult',
    component: notAccountSetUpResult,
    meta: {
      auth: true,
      title: '审批流程设置-非财务相关交易-结果'
    }
  },
  // 电话银行开通
  {
    path: 'telephoneBankOpenPre',
    name: 'telephoneBankOpenPre',
    component: telephoneBankOpenPre,
    meta: {
      auth: true,
      title: '电话银行开通-录入'
    }
  },
  {
    path: 'telephoneBankOpenRes',
    name: 'telephoneBankOpenRes',
    component: telephoneBankOpenRes,
    meta: {
      auth: true,
      title: '电话银行开通-结果'
    }
  },
  // 手机银行开通
  {
    path: 'mobilephoneBanlOpenStatus',
    name: 'mobilephoneBanlOpenStatus',
    component: mobilephoneBanlOpenStatus,
    meta: {
      auth: true,
      title: '手机银行开通-状态'
    }
  },
  {
    path: 'mobilephoneBanlOpenRes',
    name: 'mobilephoneBanlOpenRes',
    component: mobilephoneBanlOpenRes,
    meta: {
      auth: true,
      title: '手机银行开通-结果'
    }
  }
]
export default enterpriseManagementRouter
