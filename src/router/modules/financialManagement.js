// 财务管理 路由
const fileUpload = () => import('@/pages/financialManagement/payroll/fileUpload/fileUpload')
const fileUploadConf = () => import('@/pages/financialManagement/payroll/fileUpload/fileUploadConf')
const uploadResults = () => import('@/pages/financialManagement/payroll/fileUpload/uploadResults')
const payrollRecordQuery = () => import('@/pages/financialManagement/payroll/payrollRecordQuery/payrollRecordQuery')
const queryHistoricalPayrollRecords = () => import('@/pages/financialManagement/payroll/queryHistoricalPayrollRecords/queryHistoricalPayrollRecords')
const payrollRecordsDetails = () => import('@/pages/financialManagement/payroll/queryHistoricalPayrollRecords/payrollRecordsDetails')
const templateSettings = () => import('@/pages/financialManagement/payroll/templateSettings/templateSettings')
const newTemplate = () => import('@/pages/financialManagement/payroll/templateSettings/newTemplate/newTemplate')
const newTemplateResult = () => import('@/pages/financialManagement/payroll/templateSettings/newTemplate/newTemplateResult')
const modifyTemplate = () => import('@/pages/financialManagement/payroll/templateSettings/modifyTemplate/modifyTemplate')
const modifyTemplateResult = () => import('@/pages/financialManagement/payroll/templateSettings/modifyTemplate/modifyTemplateResult')
const deleteTemplate = () => import('@/pages/financialManagement/payroll/templateSettings/deleteTemplate/deleteTemplate')
const bulkReimbursementPre = () => import('@/pages/financialManagement/FinancialReimbursement/bulkReimbursement/bulkReimbursementPre')
const bulkReimbursementConf = () => import('@/pages/financialManagement/FinancialReimbursement/bulkReimbursement/bulkReimbursementConf')
const bulkReimbursementResult = () => import('@/pages/financialManagement/FinancialReimbursement/bulkReimbursement/bulkReimbursementResult')
const queryReimbursementRecords = () => import('@/pages/financialManagement/FinancialReimbursement/queryReimbursementRecords/queryReimbursementRecords')
const reimbursementRecordsDetails = () => import('@/pages/financialManagement/FinancialReimbursement/queryReimbursementRecords/reimbursementRecordsDetails')
const linkCreditCard = () => import('@/pages/financialManagement/creditCard/creditCardManagement/linkCreditCard/linkCreditCard')
const linkCreditCardResult = () => import('@/pages/financialManagement/creditCard/creditCardManagement/linkCreditCard/linkCreditCardResult')
const unlinkCreditCard = () => import('@/pages/financialManagement/creditCard/creditCardManagement/unlinkCreditCard/unlinkCreditCard')
const unlinkCreditCardResult = () => import('@/pages/financialManagement/creditCard/creditCardManagement/unlinkCreditCard/unlinkCreditCardResult')
const transactionDetailsQuery = () => import('@/pages/financialManagement/creditCard/transactionDetailsQuery/transactionDetailsQuery')
const creditCardPaymentsPre = () => import('@/pages/financialManagement/creditCard/creditCardPayments/creditCardPaymentsPre')
const creditCardPaymentsConf = () => import('@/pages/financialManagement/creditCard/creditCardPayments/creditCardPaymentsConf')
const creditCardPaymentsResult = () => import('@/pages/financialManagement/creditCard/creditCardPayments/creditCardPaymentsResult')
const smallPeriodicDebitsInquire = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsInquiry/inquire')
// const smallPeriodicDebitsContractInquiry = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsContractInquiry/inquire')
const smallPeriodicDebitsContractContract = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsContractInquiry/contract')
const smallPeriodicDebitsContractPre = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsContractInquiry/enter')
const smallPeriodicDebitsContractConf = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsContractInquiry/confirm')
const smallPeriodicDebitsContractResult = () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsContractInquiry/result')
const smallRatedCreditBusinessInquire = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedPeriodCreditBusinessInquiry/inquire')
const queryPayrollDetailRecords = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedPeriodCreditBusinessInquiry/inquireDetail')
const smallRatedCreditBusinessContractInquiry = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedCreditBusinessContractInquiry/inquire')
const smallRatedCreditBusinessContractPre = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedCreditBusinessContractInquiry/enter')
const smallRatedCreditBusinessContractConf = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedCreditBusinessContractInquiry/confirm')
const smallRatedCreditBusinessContractResult = () => import('@/pages/financialManagement/smallRatedCreditBusiness/smallRatedCreditBusinessContractInquiry/result')
const baffleAccount = () => import('@/pages/financialManagement/payroll/baffleAccount/index')
const baffleAccountPre = () => import('@/pages/financialManagement/payroll/baffleAccount/baffleAccountPre')
const baffleAccountConf = () => import('@/pages/financialManagement/payroll/baffleAccount/baffleAccountConf')
const baffleAccountRes = () => import('@/pages/financialManagement/payroll/baffleAccount/baffleAccountRes')
const batchWithholdingQuery = () => import('../../pages/financialManagement/withholdingBusiness/batchWithholdingQuery/batchWithholdingQuery')
// const batchWithholdingDetailsQueryf = () => import('../../pages/financialManagement/withholdingBusiness/batchWithholdingQuery/batchWithholdingDetailsQueryf')
const batchBithholdingOfCard = () => import('../../pages/financialManagement/withholdingBusiness/batchBithholdingOfCard/batchBithholdingOfCard')
const batchBithholdingOfCardConf = () => import('../../pages/financialManagement/withholdingBusiness/batchBithholdingOfCard/batchBithholdingOfCardConf')
const batchBithholdingOfCardRes = () => import('../../pages/financialManagement/withholdingBusiness/batchBithholdingOfCard/batchBithholdingOfCardRes')
const batchWithholdingOfDebitCardConf = () => import('../../pages/financialManagement/withholdingBusiness/batchBithholdingOfCard/batchWithholdingOfDebitCardConf')
const batchWithholdingOfDebitCardRes = () => import('../../pages/financialManagement/withholdingBusiness/batchBithholdingOfCard/batchWithholdingOfDebitCardRes')

const financialManagementRouter = [
  {
    path: 'fileUpload',
    name: 'fileUpload',
    component: fileUpload,
    meta: {
      auth: true,
      title: '代发工资/文件上传',
      notCache: true
    }
  },
  {
    path: 'fileUploadConf',
    name: 'fileUploadConf',
    component: fileUploadConf,
    meta: {
      auth: true,
      title: '代发工资/文件上传'
    }
  },
  {
    path: 'uploadResults',
    name: 'uploadResults',
    component: uploadResults,
    meta: {
      auth: true,
      title: '代发工资/文件上传'
    }
  },
  {
    path: 'payrollRecordQuery',
    name: 'payrollRecordQuery',
    component: payrollRecordQuery,
    meta: {
      auth: true,
      title: '代发工资/代发工资记录查询'
    }
  },
  {
    path: 'queryHistoricalPayrollRecords',
    name: 'queryHistoricalPayrollRecords',
    component: queryHistoricalPayrollRecords,
    meta: {
      auth: true,
      title: '代发工资/历史代发工资记录查询'
    }
  },
  {
    path: 'payrollRecordsDetails',
    name: 'payrollRecordsDetails',
    component: payrollRecordsDetails,
    meta: {
      auth: true,
      title: '代发工资/历史代发工资记录查询/代发记录详情'
    }
  },
  {
    path: 'templateSettings',
    name: 'templateSettings',
    component: templateSettings,
    meta: {
      auth: true,
      title: '代发工资/模板设置'
    }
  },
  {
    path: 'newTemplate',
    name: 'newTemplate',
    component: newTemplate,
    meta: {
      auth: true,
      title: '代发工资/模板设置/新增模板'
    }
  },
  {
    path: 'newTemplateResult',
    name: 'newTemplateResult',
    component: newTemplateResult,
    meta: {
      auth: true,
      title: '代发工资/模板设置/新增模板结果'
    }
  },
  {
    path: 'modifyTemplate',
    name: 'modifyTemplate',
    component: modifyTemplate,
    meta: {
      auth: true,
      title: '代发工资/模板设置/修改模板'
    }
  },
  {
    path: 'modifyTemplateResult',
    name: 'modifyTemplateResult',
    component: modifyTemplateResult,
    meta: {
      auth: true,
      title: '代发工资/模板设置/修改模板'
    }
  },
  {
    path: 'deleteTemplate',
    name: 'deleteTemplate',
    component: deleteTemplate,
    meta: {
      auth: true,
      title: '代发工资/模板设置/删除模板'
    }
  },
  {
    path: 'bulkReimbursementPre',
    name: 'bulkReimbursementPre',
    component: bulkReimbursementPre,
    meta: {
      auth: true,
      title: '财务报销/批量报销/录入',
      notCache: true
    }
  },
  {
    path: 'bulkReimbursementConf',
    name: 'bulkReimbursementConf',
    component: bulkReimbursementConf,
    meta: {
      auth: true,
      title: '财务报销/批量报销/确定'
    }
  },
  {
    path: 'bulkReimbursementResult',
    name: 'bulkReimbursementResult',
    component: bulkReimbursementResult,
    meta: {
      auth: true,
      title: '财务报销/批量报销/结果'
    }
  },
  {
    path: 'queryReimbursementRecords',
    name: 'queryReimbursementRecords',
    component: queryReimbursementRecords,
    meta: {
      auth: true,
      title: '财务报销/报销记录查询/查询',
      notCache: true
    }
  },
  {
    path: 'reimbursementRecordsDetails',
    name: 'reimbursementRecordsDetails',
    component: reimbursementRecordsDetails,
    meta: {
      auth: true,
      title: '财务报销/报销记录查询/详情'
    }
  },
  {
    path: 'creditCardManagement',
    name: 'creditCardManagement',
    component: () => import('@/pages/financialManagement/creditCard/creditCardManagement/creditCardManagement'),
    meta: {
      auth: true,
      title: '信用卡/信用卡管理'
    }
  },
  {
    path: 'linkCreditCard',
    name: 'linkCreditCard',
    component: linkCreditCard,
    meta: {
      auth: true,
      title: '信用卡/信用卡管理/信用卡加挂'
    }
  },
  {
    path: 'linkCreditCardResult',
    name: 'linkCreditCardResult',
    component: linkCreditCardResult,
    meta: {
      auth: true,
      title: '信用卡/信用卡管理/信用卡加挂结果'
    }
  },
  {
    path: 'unlinkCreditCard',
    name: 'unlinkCreditCard',
    component: unlinkCreditCard,
    meta: {
      auth: true,
      title: '信用卡/信用卡管理/信用卡解挂'
    }
  },
  {
    path: 'unlinkCreditCardResult',
    name: 'unlinkCreditCardResult',
    component: unlinkCreditCardResult,
    meta: {
      auth: true,
      title: '信用卡/信用卡管理/信用卡解挂结果'
    }
  },
  {
    path: 'transactionDetailsQuery',
    name: 'transactionDetailsQuery',
    component: transactionDetailsQuery,
    meta: {
      auth: true,
      title: '信用卡/信用卡交易明细查询'
    }
  },
  {
    path: 'creditCardPayments',
    name: 'creditCardPayments',
    component: () => import('@/pages/financialManagement/creditCard/creditCardPayments/creditCardPayments'),
    meta: {
      auth: true,
      title: '信用卡/信用卡还款'
    }
  },
  {
    path: 'creditCardPaymentsPre',
    name: 'creditCardPaymentsPre',
    component: creditCardPaymentsPre,
    meta: {
      auth: true,
      title: '信用卡/信用卡还款/信用卡还款录入'
    }
  },
  {
    path: 'creditCardPaymentsConf',
    name: 'creditCardPaymentsConf',
    component: creditCardPaymentsConf,
    meta: {
      auth: true,
      title: '信用卡/信用卡还款/信用卡还款确认'
    }
  },
  {
    path: 'creditCardPaymentsResult',
    name: 'creditCardPaymentsResult',
    component: creditCardPaymentsResult,
    meta: {
      auth: true,
      title: '信用卡/信用卡还款/信用卡还款结果'
    }
  },
  {
    path: 'smallPeriodicDebitsInquire',
    name: 'smallPeriodicDebitsInquire',
    component: smallPeriodicDebitsInquire,
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务查询'
    }
  },
  {
    path: 'smallPeriodicDebitsInquireDetail',
    name: 'smallPeriodicDebitsInquireDetail',
    component: () => import('@/pages/financialManagement/smallPeriodicDebits/smallPeriodicDebitsInquiry/inquireDetail'),
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务查询'
    }
  },
  // {
  //   path: 'smallPeriodicDebitsContractInquiry',
  //   name: 'smallPeriodicDebitsContractInquiry',
  //   component: smallPeriodicDebitsContractInquiry,
  //   meta: {
  //     auth: true,
  //     title: '小额定期借记业务/小额定期借记业务签约/查询'
  //   }
  // },
  {
    path: 'smallPeriodicDebitsContractContract',
    name: 'smallPeriodicDebitsContractContract',
    component: smallPeriodicDebitsContractContract,
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务签约/签约'
    }
  },
  {
    path: 'smallPeriodicDebitsContractPre',
    name: 'smallPeriodicDebitsContractPre',
    component: smallPeriodicDebitsContractPre,
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务签约/录入',
      notCache: true
    }
  },
  {
    path: 'smallPeriodicDebitsContractConf',
    name: 'smallPeriodicDebitsContractConf',
    component: smallPeriodicDebitsContractConf,
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务签约/确认'
    }
  },
  {
    path: 'smallPeriodicDebitsContractResult',
    name: 'smallPeriodicDebitsContractResult',
    component: smallPeriodicDebitsContractResult,
    meta: {
      auth: true,
      title: '小额定期借记业务/小额定期借记业务签约/结果'
    }
  },
  {
    path: 'smallRatedCreditBusinessInquire',
    name: 'smallRatedCreditBusinessInquire',
    component: smallRatedCreditBusinessInquire,
    meta: {
      auth: true,
      title: '小额定期贷记业务/小额定期贷记业务查询',
      notCache: true
    }
  },
  {
    path: 'queryPayrollDetailRecords',
    name: 'queryPayrollDetailRecords',
    component: queryPayrollDetailRecords,
    meta: {
      auth: true,
      title: '小额定期贷记业务记录查询'
    }
  },
  {
    path: 'smallRatedCreditBusinessContractInquiry',
    name: 'smallRatedCreditBusinessContractInquiry',
    component: smallRatedCreditBusinessContractInquiry,
    meta: {
      auth: true,
      title: '小额定期贷记业务/小额定期贷记业务签约/查询',
      notCache: true
    }
  },
  {
    path: 'smallRatedCreditBusinessContractPre',
    name: 'smallRatedCreditBusinessContractPre',
    component: smallRatedCreditBusinessContractPre,
    meta: {
      auth: true,
      title: '小额定期贷记业务/小额定期贷记业务签约/录入',
      notCache: true
    }
  },
  {
    path: 'smallRatedCreditBusinessContractConf',
    name: 'smallRatedCreditBusinessContractConf',
    component: smallRatedCreditBusinessContractConf,
    meta: {
      auth: true,
      title: '小额定期贷记业务/小额定期贷记业务签约/确认'
    }
  },
  {
    path: 'smallRatedCreditBusinessContractResult',
    name: 'smallRatedCreditBusinessContractResult',
    component: smallRatedCreditBusinessContractResult,
    meta: {
      auth: true,
      title: '小额定期贷记业务/小额定期贷记业务签约/结果'
    }
  },
  {
    path: 'baffleAccount',
    name: 'baffleAccount',
    component: baffleAccount,
    meta: {
      auth: true,
      title: '代发工资/挡板账户资金回退'
    }
  },
  {
    path: 'baffleAccountPre',
    name: 'baffleAccountPre',
    component: baffleAccountPre,
    meta: {
      auth: true,
      title: '代发工资/挡板账户资金回退/录入'
    }
  },
  {
    path: 'baffleAccountConf',
    name: 'baffleAccountConf',
    component: baffleAccountConf,
    meta: {
      auth: true,
      title: '代发工资/挡板账户资金回退确认'
    }
  },
  {
    path: 'baffleAccountRes',
    name: 'baffleAccountRes',
    component: baffleAccountRes,
    meta: {
      auth: true,
      title: '代发工资/挡板账户资金回退/结果'
    }
  },
  {
    path: 'batchWithholdingQuery',
    name: 'batchWithholdingQuery',
    component: batchWithholdingQuery,
    meta: {
      auth: true,
      title: '代扣业务/批量代扣查询'
    }
  },
  {
    path: 'batchWithholdingDetailsQuery',
    name: 'batchWithholdingDetailsQuery',
    component: () => import('../../pages/financialManagement/withholdingBusiness/batchWithholdingQuery/batchWithholdingDetailsQuery'),
    meta: {
      auth: true,
      title: '代扣业务/批量代扣明细查询'
    }
  },
  {
    path: 'batchBithholdingOfCard',
    name: 'batchBithholdingOfCard',
    component: batchBithholdingOfCard,
    meta: {
      auth: true,
      title: '代扣业务/批量代扣录入',
      notCache: true
    }
  },
  {
    path: 'batchBithholdingOfCardConf',
    name: 'batchBithholdingOfCardConf',
    component: batchBithholdingOfCardConf,
    meta: {
      auth: true,
      title: '代扣业务/批量信用卡代扣业务确认页'
    }
  },
  {
    path: 'batchBithholdingOfCardRes',
    name: 'batchBithholdingOfCardRes',
    component: batchBithholdingOfCardRes,
    meta: {
      auth: true,
      title: '代扣业务/批量信用卡代扣业务结果页'
    }
  },
  {
    path: 'batchWithholdingOfDebitCardConf',
    name: 'batchWithholdingOfDebitCardConf',
    component: batchWithholdingOfDebitCardConf,
    meta: {
      auth: true,
      title: '代扣业务/批量借记卡代扣业务确认页'
    }
  },
  {
    path: 'batchWithholdingOfDebitCardRes',
    name: 'batchWithholdingOfDebitCardRes',
    component: batchWithholdingOfDebitCardRes,
    meta: {
      auth: true,
      title: '代扣业务/批量借记卡代扣业务结果页'
    }
  }
  // {
  //   path: 'batchWithholdingDetailsQueryf',
  //   name: 'batchWithholdingDetailsQueryf',
  //   cpmponent: batchWithholdingDetailsQueryf,
  //   meta: {
  //     auth: true,
  //     title: '代扣业务/批量代扣明细查询'
  //   }
  // }
]
export default financialManagementRouter
