// 菜单 顶栏
export default [
  {
    name: '转账汇款',
    children: [
      {
        name: '单笔转账',
        path: '/singleTransPre'
      },
      {
        name: '公司内部转账',
        path: '/innerCompanyTransPre'
      },
      {
        name: '转账附言管理',
        path: '/msgManage'
      },
      {
        name: '批量转账',
        path: '/batchTransfer'
      },
      {
        name: '预约交易查询',
        path: '/scheduledTransInquiry'
      },
      {
        name: '定时交易查询',
        path: '/timedTransInquiry'
      },
      {
        name: '常用往来账号',
        path: '/currentAccInquiry'
      },
      {
        name: '网银转账结果页查询',
        path: '/onlineBankTransInquiry'
      },
      {
        name: '非税缴费',
        children: [
          {
            name: '非税缴费',
            path: '/noTaxPay'
          },
          {
            name: '非税缴费历史查询',
            path: '/historyInquiry'
          }
        ]
      },
      {
        name: '体彩缴费',
        path: '/sportsPayPre'
      },
      {
        name: '上海航运',
        children: [
          {
            name: '出入金交易',
            path: '/shipTrans'
          },
          {
            name: '出入金交易明细查询',
            path: '/dwInquiry'
          }
        ]
      }
    ]
  },
  {
    name: '财务管理',
    children: [
      {
        name: '代发工资',
        children: [
          {
            name: '文件上传',
            path: '/fileUpload'
          },
          {
            name: '代发工资记录查询',
            path: '/payrollRecordQuery'
          },
          {
            name: '历史代发工资记录查询',
            path: '/queryHistoricalPayrollRecords'
          },
          {
            name: '模板设置',
            path: '/templateSettings'
          },
          {
            name: '挡板资金回退',
            path: '/baffleAccount'
          }
        ]
      },
      {
        name: '财务报销',
        children: [
          {
            name: '批量报销',
            path: '/bulkReimbursementPre'
          },
          {
            name: '批量报销记录查询',
            path: '/queryReimbursementRecords'
          }
        ]
      },
      {
        name: '信用卡',
        children: [
          {
            name: '信用卡管理',
            path: '/creditCardManagement',
            children: [
              {
                name: '信用卡加挂',
                path: '/linkCreditCard'
              },
              {
                name: '信用卡解挂',
                path: '/unlinkCreditCard'
              }
            ]
          },
          {
            name: '信用卡还款',
            path: '/creditCardpayments'
          },
          {
            name: '信用卡交易明细查询',
            path: '/transactionDetailsQuery'
          }
        ]
      },
      {
        name: '小额定期贷记业务',
        children: [
          {
            name: '小额定期贷记业务签约',
            path: '/smallRatedCreditBusinessContractInquiry'
          },
          {
            name: '小额定期贷记业务查询',
            path: '/smallRatedCreditBusinessInquire'
          }
        ]
      },
      {
        name: '小额定期借记业务',
        children: [
          {
            name: '小额定期借记业务签约',
            path: '/smallPeriodicDebitsContractContract'
          },
          {
            name: '小额定期借记业务查询',
            path: '/smallPeriodicDebitsInquire'
          }
        ]
      }
    ]
  },
  {
    name: '账户管理',
    children: [
      {
        name: '资产负债查询',
        path: '/assetsDebtQuery'
      },
      {
        name: '活期账号查询',
        path: '/currentAccountQry'
      },
      {
        name: '保证金查询',
        path: '/securityDepositQry'
      },
      {
        name: '网银电子回单',
        children: [
          {
            name: '网银电子回单查询',
            path: '/receiptInquiry'
          },
          {
            name: '网银电子回单验证',
            path: '/receiptVerify'
          }
        ]
      },
      {
        name: '银企对账',
        path: '/enterpriseBankBill'
      },
      {
        name: '农民工保证金查询',
        children: [
          {
            name: '保证金信息明细查询',
            path: '/migrantWorkersSecurityDepositQry'
          },
          {
            name: '保证金修改记录查询',
            path: '/migrantWorkersSecurityDepositEditHistoryQry'
          },
          {
            name: '农民工保证金统计表',
            path: '/migrantWorkersSecurityDepositStatisticalTable'
          }
        ]
      },
      {
        name: '我的理财',
        path: '/myFinancial/false'
      },
      {
        name: '综合票据查询',
        path: '/comprehensiveBillQry'
      },
      {
        name: '账户明细查询',
        path: '/accountDetailQry'
      },
      {
        name: '账号已注销账簿信息查询',
        path: '/deactiveLedgerQry'
      },
      {
        name: '定期账号查询',
        path: '/regularAccountQuery'
      },
      {
        name: '子账号查询',
        path: '/childAccountQuery'
      },
      {
        name: '协定存款查询',
        path: '/dealDepositQuery'
      },
      {
        name: '大额存单查询',
        path: '/bigDepositQuery'
      },
      {
        name: '结构性存款查询',
        path: '/strucQuery'
      },
      {
        name: '定期通查询',
        path: '/regularPokQuery'
      },
      {
        name: '电子回单',
        children: [
          {
            name: '电子回单查询',
            path: '/elecReceiptQuery'
          },
          {
            name: '电子回单验证',
            path: '/elecReceiptCheck'
          }
        ]
      }
    ]
  },
  {
    name: '企业管理台',
    children: [
      {
        name: '操作员管理',
        path: '/opManagement'
      },
      {
        name: '角色管理',
        path: '/roleList'
      },
      {
        name: '证书管理',
        children: [
          {
            name: '证书续费',
            path: '/enterpriseManage'
          },
          {
            name: '证书更新',
            path: '/certificateUpdate'
          },
          {
            name: '自动扣费签约',
            path: 'autoFeeSignAlready'
          }
        ]
      },
      {
        name: '限额管理',
        path: '/quotaManage'
      },
      {
        name: '网银日志管理',
        path: '/onlineBankingLog'
      },
      {
        name: '企业信息维护',
        path: '/enterpriseInfoMaintenance'
      },
      {
        name: '留言服务',
        path: '/queryIndex'
      },
      {
        name: '个人信息维护',
        path: '/queryInformation'
      },
      {
        name: '审批流程设置',
        path: '/approvalProcess'
      },
      {
        name: '电话银行开通',
        path: '/telephoneBankOpenPre'
      },
      {
        name: '手机银行开通',
        path: '/mobilephoneBanlOpenStatus'
      },
      {
        name: '管理类交易审核',
        path: '/manageTransactionCheck'
      }
    ]
  },
  {
    name: '现金管理',
    children: [
      {
        name: '集团服务',
        children: [
          {
            name: '授权关系查询',
            path: '/authQuery'
          },
          {
            name: '集团关系查询',
            path: '/groupQuery'
          }
        ]
      },
      {
        name: '多级账簿',
        children: [
          {
            name: '多级账簿查询',
            path: '/multiLevelLedgerQuery'
          },
          {
            name: '多级账簿余额查询',
            path: '/multiLevelLedgerBalanceQuery'
          },
          {
            name: '多级账户明细查询',
            path: '/multiLevelLedgerDetailsQuery'
          },
          {
            name: '多级账簿转账',
            path: '/transferQuery'
          },
          {
            name: '多级账簿余额调整',
            path: '/multiLevelLedgerBalanceSet'
          },
          {
            name: '多级账簿明细调账',
            path: '/multiLevelLedgerDetailAdjustment'
          },
          {
            name: '多级账簿明细权限设置',
            path: '/setMultiLevelLedgerRoots'
          },
          {
            name: '多级账簿明细权限查询',
            path: '/rootsQuery'
          }
        ]
      },
      {
        name: '资金归集',
        children: [
          {
            name: '归集关系查询',
            path: '/collectRetQuery'
          },
          {
            name: '归集资金划拨',
            path: '/pooledFundsTransferPre'
          },
          {
            name: '定时归集设置',
            path: '/periodicColSet'
          },
          {
            name: '定时归集查询',
            path: '/peroidicColSetQuery'
          },
          {
            name: '归集周期设置',
            path: '/collectPerSet'
          },
          {
            name: '归集周期查询',
            path: '/collectPerSetQuery'
          },
          {
            name: '归集账户余额查询',
            path: '/collectionAccBalInquery'
          },
          {
            name: '归集账户明细查询',
            path: '/collectionAccDeIquery'
          }
        ]
      },
      {
        name: '统计分析(现管截图)',
        children: [
          {
            name: '账户余额趋势分析',
            path: '/accountBalanceTrend'
          },
          {
            name: '账户余额分布统计',
            path: '/accountBalanceDistribution'
          },
          {
            name: '账号交易明细分析',
            path: '/accountTransferDetail'
          },
          {
            name: '资金收支汇总分析',
            path: '/fundREInSummary'
          },
          {
            name: '账号归集明细分析',
            path: '/accountGroupDetail'
          },
          {
            name: '账号归集余额分析',
            path: '/accountGroupBalance'
          },
          {
            name: '企业账号内部利息汇总',
            path: '/enterpriseAccountInnerInterest'
          },
          {
            name: '多级账簿成员单位余额分布',
            path: '/multiLedgerBalance'
          },
          {
            name: '多级账簿成员单位交易查询',
            path: '/multiLedgerTransferDetail'
          }
        ]
      },
      {
        name: '虚拟资金池',
        children: [
          {
            name: '虚拟资金池建立',
            path: '/virtualFundPoolBuildPre'
          },
          {
            name: '虚拟资金池关系加入/修改/删除',
            path: '/VirtualFundPoolListInquire'
          },
          {
            name: '虚拟资金池关系查询',
            path: '/VirtualFundPoolRelationshipQuery'
          },
          {
            name: '虚拟资金池余额查询',
            path: '/virtualFundPoolBalanceInquiry'
          }
        ]
      }
    ]
  },
  {
    name: '投资理财',
    path: '/accountSelection'
  },
  {
    name: '理财管理',
    children: [
      {
        name: '理财产品查询',
        path: '/productSearch'
      },
      {
        name: '我的理财查询',
        path: '/myFinancial/true'
      }
    ]
  },
  {
    name: '贷款业务',
    children: [
      {
        name: '贷款信息查询',
        path: '/loanManage'
      },
      {
        name: '企业融资申请',
        path: '/enterpriseFinancingApplication'
      }
    ]
  },
  {
    name: '理财服务',
    children: [
      {
        name: '大额存单',
        children: [
          {
            name: '单位大额存单申购',
            path: '/purchaseInquiry'
          },
          {
            name: '单位大额存单支取',
            path: '/withdrawInquiry'
          },
          {
            name: '单位大额存单查询',
            path: '/largeDepositInquiry'
          }
        ]
      },
      {
        name: '定期通',
        children: [
          {
            name: '定期通开户',
            path: '/openProtocol'
          },
          {
            name: '定期通支取',
            path: '/regularPassWithdraw'
          },
          {
            name: '定期通查询',
            path: '/regularInquiry'
          }
        ]
      },
      {
        name: '定活互转',
        children: [
          {
            name: '活期转定期',
            path: '/bankProtocol'
          },
          {
            name: '定期支取',
            path: '/regularDraw'
          },
          {
            name: '定期账号查询',
            path: '/regularQuery'
          }
        ]
      },
      {
        name: '通知存款',
        children: [
          {
            name: '活期转通知存款',
            path: '/dealBook'
          },
          {
            name: '通知存款支取',
            path: '/forwardDrawList'
          },
          {
            name: '通知存款账号查询',
            path: '/noticeFinding'
          }
        ]
      },
      {
        name: '结构性存款',
        children: [
          {
            name: '结构性存款查询',
            path: '/structureQuery'
          },
          {
            name: '结构性存款开户',
            path: '/openAccountAgreement'
          },
          {
            name: '结构性存款销户',
            path: '/account'
          }
        ]
      }
    ]
  },
  {
    name: '交易管理',
    path: '/waitQPage'
  },
  {
    name: '更多',
    children: [
      {
        name: '银行网点查询',
        path: '/bankInfoQuery'
      }
    ]
  }
  // {
  //   name: '电子票据',
  //   children: [
  //     {
  //       name: '出票登记',
  //       path: '/TicketRegistrationList'
  //     },
  //     {
  //       name: '提示承兑',
  //       path: '/promptAcceptanceInquire'
  //     },
  //     {
  //       name: '提示收票',
  //       path: '/PromptReceiptInquire'
  //     },
  //     {
  //       name: '撤票',
  //       children: [
  //         {
  //           name: '撤票申请',
  //           path: '/CancelTicketInquire'
  //         },
  //         {
  //           name: '查询已撤票服务',
  //           path: '/QueryCancelledTicket'
  //         }
  //       ]
  //     },
  //     {
  //       name: '承兑',
  //       children: [
  //         {
  //           name: '承兑应答',
  //           path: '/AcceptanceReplyInquire'
  //         },
  //         {
  //           name: '付款签收',
  //           path: '/AcceptancePaymentReceiptInquire'
  //         },
  //         {
  //           name: '拒付',
  //           path: '/AcceptanceRefuseInquire'
  //         }
  //       ]
  //     },
  //     {
  //       name: '背书转让',
  //       children: [
  //         {
  //           name: '背书申请',
  //           path: '/EndorsementTransferApplyInquire'
  //         },
  //         {
  //           name: '背书撤回',
  //           path: '/EndorsementTransferRevokeInquire'
  //         },
  //         {
  //           name: '被背书应答',
  //           path: '/EndorsementTransferReplyInquire'
  //         },
  //         {
  //           name: '背书结果查询',
  //           path: '/EndorsementTransferResultsQuery'
  //         },
  //         {
  //           name: '被背书应答查询',
  //           path: '/EndorsementTransferReplyQuery'
  //         }
  //       ]
  //     },
  //     {
  //       name: '保证',
  //       children: [
  //         {
  //           name: '提示保证申请',
  //           path: '/EnsureApplyQuery'
  //         },
  //         {
  //           name: '撤销提示保证',
  //           path: '/EnsureRevokeInquire'
  //         },
  //         {
  //           name: '保证应答',
  //           path: '/EnsureReplyInquire'
  //         },
  //         {
  //           name: '提示保证查询服务',
  //           path: '/EnsureResultQuery'
  //         }
  //       ]
  //     },
  //     {
  //       name: '提示付款',
  //       children: [
  //         {
  //           name: '提示付款申请',
  //           path: '/PromptPaymentApplyInquire'
  //         },
  //         {
  //           name: '提示付款撤回',
  //           path: '/PromptPaymentRevokeInquire'
  //         },
  //         {
  //           name: '提示付款结果查询',
  //           path: '/PromptPaymentResultQuery'
  //         }
  //       ]
  //     },
  //     {
  //       name: '贴现',
  //       children: [
  //         {
  //           name: '贴现申请查询',
  //           path: '/DiscountApplyInquire'
  //         },
  //         {
  //           name: '贴现撤回',
  //           path: '/DiscountRevokeInquire'
  //         },
  //         {
  //           name: '贴现结果查询',
  //           path: '/DiscountResultQuery'
  //         }
  //       ]
  //     },
  //     {
  //       name: '追索',
  //       children: [
  //         {
  //           name: '追索申请',
  //           path: '/'
  //         },
  //         {
  //           name: '追索申请撤回',
  //           path: '/recourseRecallApplyInput'
  //         },
  //         {
  //           name: '同意清偿申请',
  //           path: '/agreePayApplyInput'
  //         },
  //         {
  //           name: '同意清偿回复',
  //           path: '/agreePayReplyInput'
  //         },
  //         {
  //           name: '清偿申请撤回',
  //           path: '/PayApplyRecallInput'
  //         },
  //         {
  //           name: '清偿申请结果查询',
  //           path: '/payApplyResultQueryInput'
  //         }
  //       ]
  //     },
  //     {
  //       name: '票据质押',
  //       children: [
  //         {
  //           name: '质押申请',
  //           path: '/pledgeApplyInput'
  //         },
  //         {
  //           name: '质押撤销',
  //           path: '/pledgeRecallInput'
  //         },
  //         {
  //           name: '质押应答',
  //           path: '/pledgeReplyInput'
  //         },
  //         {
  //           name: '解质押申请',
  //           path: '/jiePledgeApplyInput'
  //         },
  //         {
  //           name: '解质押撤销',
  //           path: '/jiePledgeRecallInput'
  //         },
  //         {
  //           name: '解质押应答',
  //           path: '/jiePledgeReplyInput'
  //         }
  //       ]
  //     },
  //     {
  //       name: '票据信息查询',
  //       path: '/billInformationQuery'
  //     }
  //   ]
  // }
]
