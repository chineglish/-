// 电子票据 路由
const billIndex = () => import('@/pages/electronicBill/billIndex')
const raPre = () => import('@/pages/electronicBill/recourseApplication/raPre')
const raInquiry = () => import('@/pages/electronicBill/recourseApplication/raInquiry')
const raConf = () => import('@/pages/electronicBill/recourseApplication/raConf')
const raConfAgain = () => import('@/pages/electronicBill/recourseApplication/raConfAgain')
const raRes = () => import('@/pages/electronicBill/recourseApplication/raRes')
const queryReseller = () => import('@/pages/electronicBill/recourseApplication/queryReseller')
const TicketRegistrationList = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationList')
const TicketRegistrationPre = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationPre')
const TicketRegistrationConf = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationConf')
const TicketRegistrationRes = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationRes')
const TicketRegistrationInner = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationInner')
const TicketRegistrationBatch = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationBatch')
const TicketRegistrationBatchDetail = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationBatchDetail')
const TicketRegistrationBatchConf = () => import('@/pages/electronicBill/ticketRegistration/TicketRegistrationBatchConf')

// 追索申请撤回
const recourseRecallApplyInput = () => import('@/pages/electronicBill/recourseRecallApply/recourseRecallApplyInput')
const recourseRecallApplyQuery = () => import('@/pages/electronicBill/recourseRecallApply/recourseRecallApplyQuery')
const recourseRecallApplyComfirmPre = () => import('@/pages/electronicBill/recourseRecallApply/recourseRecallApplyComfirmPre')
const recourseRecallApplyComfirm = () => import('@/pages/electronicBill/recourseRecallApply/recourseRecallApplyComfirm')
const recourseRecallApplyResult = () => import('@/pages/electronicBill/recourseRecallApply/recourseRecallApplyResult')
// 同意清偿申请
const agreePayApplyInput = () => import('@/pages/electronicBill/recourseAgreePayApply/agreePayApplyInput')
const agreePayApplyComfirmPre = () => import('@/pages/electronicBill/recourseAgreePayApply/agreePayApplyComfirmPre')
const agreePayApplyComfirm = () => import('@/pages/electronicBill/recourseAgreePayApply/agreePayApplyComfirm')
const agreePayApplyResult = () => import('@/pages/electronicBill/recourseAgreePayApply/agreePayApplyResult')
const agreePayApplyQuery = () => import('@/pages/electronicBill/recourseAgreePayApply/agreePayApplyQuery')
// 同意清偿回复
const agreePayReplyInput = () => import('@/pages/electronicBill/recourseAgreePayReply/agreePayReplyInput')
const agreePayReplyComfirmPre = () => import('@/pages/electronicBill/recourseAgreePayReply/agreePayReplyComfirmPre')
const agreePayReplyComfirm = () => import('@/pages/electronicBill/recourseAgreePayReply/agreePayReplyComfirm')
const agreePayReplyResult = () => import('@/pages/electronicBill/recourseAgreePayReply/agreePayReplyResult')
const agreePayReplyQuery = () => import('@/pages/electronicBill/recourseAgreePayReply/agreePayReplyQuery')
// 清偿申请撤回
const PayApplyRecallInput = () => import('@/pages/electronicBill/recoursePayApplyRecall/PayApplyRecallInput')
const PayApplyRecallComfirmPre = () => import('@/pages/electronicBill/recoursePayApplyRecall/PayApplyRecallComfirmPre')
const PayApplyRecallComfirm = () => import('@/pages/electronicBill/recoursePayApplyRecall/PayApplyRecallComfirm')
const PayApplyRecallResult = () => import('@/pages/electronicBill/recoursePayApplyRecall/PayApplyRecallResult')
const PayApplyRecallQuery = () => import('@/pages/electronicBill/recoursePayApplyRecall/PayApplyRecallQuery')
// 清偿申请结果查询
const payApplyResultQuery = () => import('@/pages/electronicBill/payApplyResultQuery/payApplyResultQuery')
const payApplyResultQueryInput = () => import('@/pages/electronicBill/payApplyResultQuery/payApplyResultQueryInput')
// 票据质押
// 质押申请
const pledgeApplyInput = () => import('@/pages/electronicBill/billPledge/pledgeApply/pledgeApplyInput')
const pldgeApplyInfoInput = () => import('@/pages/electronicBill/billPledge/pledgeApply/pldgeApplyInfoInput')
const pledgeApplyComfirm = () => import('@/pages/electronicBill/billPledge/pledgeApply/pledgeApplyComfirm')
const pledgeApplyResult = () => import('@/pages/electronicBill/billPledge/pledgeApply/pledgeApplyResult')
const pledgeApplyQuery = () => import('@/pages/electronicBill/billPledge/pledgeApply/pledgeApplyQuery')
const pldgeApplyBatchPre = () => import('@/pages/electronicBill/billPledge/pledgeApply/pldgeApplyBatchPre')
const pldgeApplyBatchConf = () => import('@/pages/electronicBill/billPledge/pledgeApply/pldgeApplyBatchConf')
// 质押撤销
const pledgeRecallInput = () => import('@/pages/electronicBill/billPledge/pledgeRecall/pledgeRecallInput')
const pledgeRecallInfoInput = () => import('@/pages/electronicBill/billPledge/pledgeRecall/pledgeRecallInfoInput')
const pledgeRecallComfirm = () => import('@/pages/electronicBill/billPledge/pledgeRecall/pledgeRecallComfirm')
const pledgeRecallResult = () => import('@/pages/electronicBill/billPledge/pledgeRecall/pledgeRecallResult')
const pledgeRecallQuery = () => import('@/pages/electronicBill/billPledge/pledgeRecall/pledgeRecallQuery')
// 质押应答
const pledgeReplyInput = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyInput')
const pledgeReplyInfoInput = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyInfoInput')
const pledgeReplyComfirm = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyComfirm')
const pledgeReplyResult = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyResult')
const pledgeReplyQuery = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyQuery')
const pledgeReplyBatchPre = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyBatchPre')
const pledgeReplyBatchConfirm = () => import('@/pages/electronicBill/billPledge/pledgeReply/pledgeReplyBatchConfirm')
// 解质押申请
const jiePledgeApplyInput = () => import('@/pages/electronicBill/billPledge/jiePledgeApply/jiePledgeApplyInput')
const jiePledgeApplyInfoInput = () => import('@/pages/electronicBill/billPledge/jiePledgeApply/jiePledgeApplyInfoInput')
const jiePledgeApplyComfirm = () => import('@/pages/electronicBill/billPledge/jiePledgeApply/jiePledgeApplyComfirm')
const jiePledgeApplyResult = () => import('@/pages/electronicBill/billPledge/jiePledgeApply/jiePledgeApplyResult')
const jiePledgeApplyQuery = () => import('@/pages/electronicBill/billPledge/jiePledgeApply/jiePledgeApplyQuery')
// 解质押撤销
const jiePledgeRecallInput = () => import('@/pages/electronicBill/billPledge/jiePledgeRecall/jiePledgeRecallInput')
const jiePledgeRecallInfoInput = () => import('@/pages/electronicBill/billPledge/jiePledgeRecall/jiePledgeRecallInfoInput')
const jiePledgeRecallComfirm = () => import('@/pages/electronicBill/billPledge/jiePledgeRecall/jiePledgeRecallComfirm')
const jiePledgeRecallResult = () => import('@/pages/electronicBill/billPledge/jiePledgeRecall/jiePledgeRecallResult')
const jiePledgeRecallQuery = () => import('@/pages/electronicBill/billPledge/jiePledgeRecall/jiePledgeRecallQuery')
// 解质押应答
const jiePledgeReplyQuery = () => import('@/pages/electronicBill/billPledge/jiePledgeReply/jiePledgeReplyQuery')
const jiePledgeReplyInput = () => import('@/pages/electronicBill/billPledge/jiePledgeReply/jiePledgeReplyInput')
const jiePledgeReplyInfoInput = () => import('@/pages/electronicBill/billPledge/jiePledgeReply/jiePledgeReplyInfoInput')
const jiePledgeReplyComfirm = () => import('@/pages/electronicBill/billPledge/jiePledgeReply/jiePledgeReplyComfirm')
const jiePledgeReplyResult = () => import('@/pages/electronicBill/billPledge/jiePledgeReply/jiePledgeReplyResult')

// const TicketRegistrationList = () => import('../../pages/electronicBill/ticketRegistration/TicketRegistrationList')
// const TicketRegistrationPre = () => import('../../pages/electronicBill/ticketRegistration/TicketRegistrationPre')
// const TicketRegistrationConf = () => import('../../pages/electronicBill/ticketRegistration/TicketRegistrationConf')
// const TicketRegistrationRes = () => import('../../pages/electronicBill/ticketRegistration/TicketRegistrationRes')

// 票据余额查询
const billBalanceQuery = () => import('@/pages/electronicBill/billQuery/billBalance/BillBalanceQuery')
const billBalanceQueryResult = () => import('@/pages/electronicBill/billQuery/billBalance/billBalanceQueryResult')
const billInfoBeside = () => import('@/pages/electronicBill/billQuery/billBalance/billInfoBeside')
const billInfoDetails = () => import('@/pages/electronicBill/billQuery/billBalance/billInfoDetails')
const billInfoFront = () => import('@/pages/electronicBill/billQuery/billBalance/billInfoFront')
// 票据批量查询
const billBatchQuery = () => import('@/pages/electronicBill/billQuery/billBatch/BillBatchQuery')
const billBatchQueryDetails = () => import('@/pages/electronicBill/billQuery/billBatch/billBatchQueryDetails')
const billBatchQueryResult = () => import('@/pages/electronicBill/billQuery/billBatch/billBatchQueryResult')
const billBatchQueryResulta = () => import('@/pages/electronicBill/billQuery/billBatch/billBatchQueryResulta')
// 票据信息查询
const billInfoQuery = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoQuery')
const billInfoQueryList = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoQueryList')
const billInfoTable = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoTable')
const billInfoQueryResult = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoQueryResult')
const billInfoDetailsResult = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoDetailsResult')
const billInfoBackTable = () => import('@/pages/electronicBill/billQuery/billInfo/billInfoBackTable')

// 票据详情
const billFace = () => import('@/pages/electronicBill/module/billFace')
const billBack = () => import('@/pages/electronicBill/module/billBack')

const promptAcceptanceInquire = () => import('@/pages/electronicBill/promptAcceptance/inquire/promptAcceptanceInquire')
const PromptAcceptanceApplyPre = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplyPre')
const PromptAcceptanceApplyDetail = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplyDetail')
const PromptAcceptanceApplyConf = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplyConf')
const PromptAcceptanceApplySolo = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplySolo')
const PromptAcceptanceApplySoloConf = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplySoloConf')
const PromptAcceptanceApplyRes = () => import('@/pages/electronicBill/promptAcceptance/apply/PromptAcceptanceApplyRes')
const PromptAcceptanceRevokePre = () => import('@/pages/electronicBill/promptAcceptance/revoke/PromptAcceptanceRevokePre')
const PromptAcceptanceRevokeConf = () => import('@/pages/electronicBill/promptAcceptance/revoke/PromptAcceptanceRevokeConf')
const PromptAcceptanceRevokeDetail = () => import('@/pages/electronicBill/promptAcceptance/revoke/PromptAcceptanceRevokeDetail')
const PromptAcceptanceRevokeRes = () => import('@/pages/electronicBill/promptAcceptance/revoke/PromptAcceptanceRevokeRes')
const PromptAcceptanceRevoke = () => import('@/pages/electronicBill/promptAcceptance/revoke/PromptAcceptanceRevoke')
const PromptAcceptanceReplyPre = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplyPre')
const PromptAcceptanceReplyDetail = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplyDetail')
const PromptAcceptanceReplyConf = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplyConf')
const PromptAcceptanceReplySolo = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplySolo')
const PromptAcceptanceReplySoloConf = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplySoloConf')
const PromptAcceptanceReplyRes = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReplyRes')
const PromptAcceptanceReply = () => import('@/pages/electronicBill/promptAcceptance/reply/PromptAcceptanceReply')

const PromptReceiptInquire = () => import('@/pages/electronicBill/promptReceipt/inquire/PromptReceiptInquire')
const PromptReceiptApplyPre = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplyPre')
const PromptReceiptApplyDetail = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplyDetail')
const PromptReceiptApplyConf = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplyConf')
const PromptReceiptApplySolo = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplySolo')
const PromptReceiptApplySoloConf = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplySoloConf')
const PromptReceiptApplyRes = () => import('@/pages/electronicBill/promptReceipt/apply/PromptReceiptApplyRes')
const PromptReceiptReplyPre = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplyPre')
const PromptReceiptReply = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReply')
const PromptReceiptReplySolo = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplySolo')
const PromptReceiptReplySoloConf = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplySoloConf')
const PromptReceiptReplyConf = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplyConf')
const PromptReceiptReplyDetail = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplyDetail')
const PromptReceiptReplyRes = () => import('@/pages/electronicBill/promptReceipt/reply/PromptReceiptReplyRes')
const PromptReceiptRevokePre = () => import('@/pages/electronicBill/promptReceipt/revoke/PromptReceiptRevokePre')
const PromptReceiptRevoke = () => import('@/pages/electronicBill/promptReceipt/revoke/PromptReceiptRevoke')
const PromptReceiptRevokeDetail = () => import('@/pages/electronicBill/promptReceipt/revoke/PromptReceiptRevokeDetail')
const PromptReceiptRevokeConf = () => import('@/pages/electronicBill/promptReceipt/revoke/PromptReceiptRevokeConf')
const PromptReceiptRevokeRes = () => import('@/pages/electronicBill/promptReceipt/revoke/PromptReceiptRevokeRes')

const CancelTicketInquire = () => import('@/pages/electronicBill/cancelTicket/apply/CancelTicketInquire')
const CancelTicketPre = () => import('@/pages/electronicBill/cancelTicket/apply/CancelTicketPre')
const CancelTicketConf = () => import('@/pages/electronicBill/cancelTicket/apply/CancelTicketConf')
const CancelTicketDetail = () => import('@/pages/electronicBill/cancelTicket/apply/CancelTicketDetail')
const CancelTicketRes = () => import('@/pages/electronicBill/cancelTicket/apply/CancelTicketRes')
const QueryCancelledTicket = () => import('@/pages/electronicBill/cancelTicket/queryCancelledTicket/QueryCancelledTicket')

const AcceptanceReplyInquire = () => import('@/pages/electronicBill/acceptance/reply/AcceptanceReplyInquire')
const AcceptanceReplyPre = () => import('@/pages/electronicBill/acceptance/reply/AcceptanceReplyPre')
const AcceptanceReplyConf = () => import('@/pages/electronicBill/acceptance/reply/AcceptanceReplyConf')
const AcceptanceReplyRes = () => import('@/pages/electronicBill/acceptance/reply/AcceptanceReplyRes')
const AcceptancePaymentReceiptInquire = () => import('@/pages/electronicBill/acceptance/paymentReceipt/AcceptancePaymentReceiptInquire')
const AcceptancePaymentReceiptPre = () => import('@/pages/electronicBill/acceptance/paymentReceipt/AcceptancePaymentReceiptPre')
const AcceptancePaymentReceiptConf = () => import('@/pages/electronicBill/acceptance/paymentReceipt/AcceptancePaymentReceiptConf')
const AcceptancePaymentReceiptRes = () => import('@/pages/electronicBill/acceptance/paymentReceipt/AcceptancePaymentReceiptRes')
const AcceptanceRefuseInquire = () => import('@/pages/electronicBill/acceptance/refuse/AcceptanceRefuseInquire')
const AcceptanceRefusePre = () => import('@/pages/electronicBill/acceptance/refuse/AcceptanceRefusePre')
const AcceptanceRefuseConf = () => import('@/pages/electronicBill/acceptance/refuse/AcceptanceRefuseConf')
const AcceptanceRefuseRes = () => import('@/pages/electronicBill/acceptance/refuse/AcceptanceRefuseRes')

const EndorsementTransferReplyInquire = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplyInquire')
const EndorsementTransferReplyPre = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplyPre')
const EndorsementTransferReplyDetail = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplyDetail')
const EndorsementTransferReplyConf = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplyConf')
const EndorsementTransferReplySolo = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplySolo')
const EndorsementTransferReplySoloConf = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplySoloConf')
const EndorsementTransferReplyRes = () => import('@/pages/electronicBill/endorsementTransfer/reply/EndorsementTransferReplyRes')
const EndorsementTransferApplyInquire = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplyInquire')
const EndorsementTransferApplyPre = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplyPre')
const EndorsementTransferApplySolo = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplySolo')
const EndorsementTransferApplySoloConf = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplySoloConf')
const EndorsementTransferApplyDetailPre = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplyDetailPre')
const EndorsementTransferApplyConf = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplyConf')
const EndorsementTransferApplyRes = () => import('@/pages/electronicBill/endorsementTransfer/apply/EndorsementTransferApplyRes')
const EndorsementTransferRevokeInquire = () => import('@/pages/electronicBill/endorsementTransfer/revoke/EndorsementTransferRevokeInquire')
const EndorsementTransferRevokePre = () => import('@/pages/electronicBill/endorsementTransfer/revoke/EndorsementTransferRevokePre')
const EndorsementTransferRevokeConf = () => import('@/pages/electronicBill/endorsementTransfer/revoke/EndorsementTransferRevokeConf')
const EndorsementTransferRevokeDetail = () => import('@/pages/electronicBill/endorsementTransfer/revoke/EndorsementTransferRevokeDetail')
const EndorsementTransferRevokeRes = () => import('@/pages/electronicBill/endorsementTransfer/revoke/EndorsementTransferRevokeRes')
const EndorsementTransferReplyQuery = () => import('@/pages/electronicBill/endorsementTransfer/replyQuery/EndorsementTransferReplyQuery')
const EndorsementTransferResultsQuery = () => import('@/pages/electronicBill/endorsementTransfer/resultsQuery/EndorsementTransferResultsQuery')

const PromptPaymentApplyInquire = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplyInquire')
const PromptPaymentApplyPre = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplyPre')
const PromptPaymentApplyConf = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplyConf')
const PromptPaymentApplySolo = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplySolo')
const PromptPaymentApplySoloConf = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplySoloConf')
const PromptPaymentApplyDetailPre = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplyDetailPre')
const PromptPaymentApplyRes = () => import('@/pages/electronicBill/promptPayment/apply/PromptPaymentApplyRes')
const PromptPaymentRevokeInquire = () => import('@/pages/electronicBill/promptPayment/revoke/PromptPaymentRevokeInquire')
const PromptPaymentRevokePre = () => import('@/pages/electronicBill/promptPayment/revoke/PromptPaymentRevokePre')
const PromptPaymentRevokeDetailPre = () => import('@/pages/electronicBill/promptPayment/revoke/PromptPaymentRevokeDetailPre')
const PromptPaymentRevokeConf = () => import('@/pages/electronicBill/promptPayment/revoke/PromptPaymentRevokeConf')
const PromptPaymentRevokeRes = () => import('@/pages/electronicBill/promptPayment/revoke/PromptPaymentRevokeRes')
const PromptPaymentResultQuery = () => import('@/pages/electronicBill/promptPayment/resultQuery/PromptPaymentResultQuery')
const PromptPaymentSignforPre = () => import('@/pages/electronicBill/promptPayment/signFor/PromptPaymentSignforPre')
const PromptPaymentSignforInner = () => import('@/pages/electronicBill/promptPayment/signFor/PromptPaymentSignforInner')
const PromptPaymentSignforInquire = () => import('@/pages/electronicBill/promptPayment/signFor/PromptPaymentSignforInquire')
const PromptPaymentSignforConf = () => import('@/pages/electronicBill/promptPayment/signFor/PromptPaymentSignforConf')
const PromptPaymentSignforRes = () => import('@/pages/electronicBill/promptPayment/signFor/PromptPaymentSignforRes')
const PromptPaymentRejectionPre = () => import('@/pages/electronicBill/promptPayment/rejection/PromptPaymentRejectionPre')
const PromptPaymentRejectionInquire = () => import('@/pages/electronicBill/promptPayment/rejection/PromptPaymentRejectionInquire')
const PromptPaymentRejectionConf = () => import('@/pages/electronicBill/promptPayment/rejection/PromptPaymentRejectionConf')
const PromptPaymentRejectionRes = () => import('@/pages/electronicBill/promptPayment/rejection/PromptPaymentRejectionRes')
const PromptPaymentRejectionInner = () => import('@/pages/electronicBill/promptPayment/rejection/PromptPaymentRejectionInner')

const DiscountApplyInquire = () => import('@/pages/electronicBill/discount/apply/DiscountApplyInquire')
const DiscountApplyPre = () => import('@/pages/electronicBill/discount/apply/DiscountApplyPre')
const DiscountApplyConf = () => import('@/pages/electronicBill/discount/apply/DiscountApplyConf')
const DiscountApplySolo = () => import('@/pages/electronicBill/discount/apply/DiscountApplySolo')
const DiscountApplySoloConf = () => import('@/pages/electronicBill/discount/apply/DiscountApplySoloConf')
const DiscountApplyDetailPre = () => import('@/pages/electronicBill/discount/apply/DiscountApplyDetailPre')
const DiscountApplyRes = () => import('@/pages/electronicBill/discount/apply/DiscountApplyRes')
const DiscountRevokeInquire = () => import('@/pages/electronicBill/discount/revoke/DiscountRevokeInquire')
const DiscountRevokePre = () => import('@/pages/electronicBill/discount/revoke/DiscountRevokePre')
const DiscountRevokeConf = () => import('@/pages/electronicBill/discount/revoke/DiscountRevokeConf')
const DiscountRevokeDetail = () => import('@/pages/electronicBill/discount/revoke/DiscountRevokeDetail')
const DiscountRevokeRes = () => import('@/pages/electronicBill/discount/revoke/DiscountRevokeRes')
const DiscountResultQuery = () => import('@/pages/electronicBill/discount/resultQuery/DiscountResultQuery')

const EnsureReplyInquire = () => import('@/pages/electronicBill/ensure/reply/EnsureReplyInquire')
const EnsureReplyPre = () => import('@/pages/electronicBill/ensure/reply/EnsureReplyPre')
const EnsureReplyConf = () => import('@/pages/electronicBill/ensure/reply/EnsureReplyConf')
const EnsureReplySolo = () => import('@/pages/electronicBill/ensure/reply/EnsureReplySolo')
const EnsureReplySoloConf = () => import('@/pages/electronicBill/ensure/reply/EnsureReplySoloConf')
const EnsureReplyDetailPre = () => import('@/pages/electronicBill/ensure/reply/EnsureReplyDetailPre')
const EnsureReplyRes = () => import('@/pages/electronicBill/ensure/reply/EnsureReplyRes')
const EnsureRevokeInquire = () => import('@/pages/electronicBill/ensure/revoke/EnsureRevokeInquire')
const EnsureRevokePre = () => import('@/pages/electronicBill/ensure/revoke/EnsureRevokePre')
const EnsureRevokeConf = () => import('@/pages/electronicBill/ensure/revoke/EnsureRevokeConf')
const EnsureRevokeInner = () => import('@/pages/electronicBill/ensure/revoke/EnsureRevokeInner')
const EnsureRevokeRes = () => import('@/pages/electronicBill/ensure/revoke/EnsureRevokeRes')
const EnsureResultQuery = () => import('@/pages/electronicBill/ensure/resultQuery/EnsureResultQuery')
const EnsureApplyQuery = () => import('@/pages/electronicBill/ensure/apply/ensureApplyQuery/EnsureApplyQuery')
const EnsureApplyQueryDetail = () => import('@/pages/electronicBill/ensure/apply/ensureApplyQuery/EnsureApplyQueryDetail')
const EnsureApplyAddPre = () => import('@/pages/electronicBill/ensure/apply/ensureApplyAdd/EnsureApplyAddPre')
const EnsureApplyAddConf = () => import('@/pages/electronicBill/ensure/apply/ensureApplyAdd/EnsureApplyAddConf')
const EnsureApplyAddRes = () => import('@/pages/electronicBill/ensure/apply/ensureApplyAdd/EnsureApplyAddRes')
const EnsureApplyChangePre = () => import('@/pages/electronicBill/ensure/apply/ensureApplyChange/EnsureApplyChangePre')
const EnsureApplyChangeConf = () => import('@/pages/electronicBill/ensure/apply/ensureApplyChange/EnsureApplyChangeConf')
const EnsureApplyChangeRes = () => import('@/pages/electronicBill/ensure/apply/ensureApplyChange/EnsureApplyChangeRes')
const EnsureApplyDeleteConf = () => import('@/pages/electronicBill/ensure/apply/ensureApplyDelete/EnsureApplyDeleteConf')
const EnsureApplyDeleteRes = () => import('@/pages/electronicBill/ensure/apply/ensureApplyDelete/EnsureApplyDeleteRes')
const EnsureApplyPre = () => import('@/pages/electronicBill/ensure/apply/EnsureApplyPre')
const EnsureApplyInquire = () => import('@/pages/electronicBill/ensure/apply/EnsureApplyInquire')
const EnsureApplySolo = () => import('@/pages/electronicBill/ensure/apply/EnsureApplySolo')
const EnsureApplySoloConf = () => import('@/pages/electronicBill/ensure/apply/EnsureApplySoloConf')
const EnsureApplyDetailPre = () => import('@/pages/electronicBill/ensure/apply/EnsureApplyDetailPre')
const EnsureApplyConf = () => import('@/pages/electronicBill/ensure/apply/EnsureApplyConf')
const EnsureApplyRes = () => import('@/pages/electronicBill/ensure/apply/EnsureApplyRes')

const electronicBillRouter = [
  {
    path: 'raPre',
    name: 'raPre',
    component: raPre,
    meta: {
      auth: true,
      title: '追索申请查询-录入',
      isTicket: true
    }
  },
  {
    path: 'raInquiry',
    name: 'raInquiry',
    component: raInquiry,
    meta: {
      auth: true,
      title: '追索申请-查询',
      isTicket: true
    }
  },
  {
    path: 'raConf',
    name: 'raConf',
    component: raConf,
    meta: {
      auth: true,
      title: '追索申请-录入',
      isTicket: true
    }
  },
  {
    path: 'raConfAgain',
    name: 'raConfAgain',
    component: raConfAgain,
    meta: {
      auth: true,
      title: '追索申请-确认',
      isTicket: true
    }
  },
  {
    path: 'raRes',
    name: 'raRes',
    component: raRes,
    meta: {
      auth: true,
      title: '追索申请-结果',
      isTicket: true
    }
  },
  {
    path: 'queryReseller',
    name: 'queryReseller',
    component: queryReseller,
    meta: {
      auth: true,
      title: '追索申请-可被追索对象查询',
      isTicket: true
    }
  },
  {
    path: 'recourseRecallApplyInput',
    name: 'recourseRecallApplyInput',
    component: recourseRecallApplyInput,
    meta: {
      auth: true,
      title: '追索申请撤回录入页',
      isTicket: true
    }
  },
  {
    path: 'recourseRecallApplyQuery',
    name: 'recourseRecallApplyQuery',
    component: recourseRecallApplyQuery,
    meta: {
      auth: true,
      title: '追索申请撤回查询页',
      isTicket: true
    }
  },
  {
    path: 'recourseRecallApplyComfirmPre',
    name: 'recourseRecallApplyComfirmPre',
    component: recourseRecallApplyComfirmPre,
    meta: {
      auth: true,
      title: '追索申请撤回确认页',
      isTicket: true
    }
  },
  {
    path: 'recourseRecallApplyComfirm',
    name: 'recourseRecallApplyComfirm',
    component: recourseRecallApplyComfirm,
    meta: {
      auth: true,
      title: '追索申请撤回确认页',
      isTicket: true
    }
  },
  {
    path: 'recourseRecallApplyResult',
    name: 'recourseRecallApplyResult',
    component: recourseRecallApplyResult,
    meta: {
      auth: true,
      title: '追索申请撤回结果页',
      isTicket: true
    }
  },
  {
    path: 'agreePayApplyInput',
    name: 'agreePayApplyInput',
    component: agreePayApplyInput,
    meta: {
      auth: true,
      title: '同意清偿申请查询录入页',
      isTicket: true
    }
  },
  {
    path: 'agreePayApplyComfirmPre',
    name: 'agreePayApplyComfirmPre',
    component: agreePayApplyComfirmPre,
    meta: {
      auth: true,
      title: '同意清偿申请录入页',
      isTicket: true
    }
  },
  {
    path: 'agreePayApplyComfirm',
    name: 'agreePayApplyComfirm',
    component: agreePayApplyComfirm,
    meta: {
      auth: true,
      title: '同意清偿申请确认页',
      isTicket: true
    }
  },
  {
    path: 'agreePayApplyResult',
    name: 'agreePayApplyResult',
    component: agreePayApplyResult,
    meta: {
      auth: true,
      title: '同意清偿申请结果页',
      isTicket: true
    }
  },
  {
    path: 'agreePayApplyQuery',
    name: 'agreePayApplyQuery',
    component: agreePayApplyQuery,
    meta: {
      auth: true,
      title: '同意清偿申请查询页',
      isTicket: true
    }
  }, {
    path: 'agreePayReplyInput',
    name: 'agreePayReplyInput',
    component: agreePayReplyInput,
    meta: {
      auth: true,
      title: '同意清偿回复查询录入页',
      isTicket: true
    }
  },
  {
    path: 'agreePayReplyComfirmPre',
    name: 'agreePayReplyComfirmPre',
    component: agreePayReplyComfirmPre,
    meta: {
      auth: true,
      title: '同意清偿回复录入页',
      isTicket: true
    }
  },
  {
    path: 'agreePayReplyComfirm',
    name: 'agreePayReplyComfirm',
    component: agreePayReplyComfirm,
    meta: {
      auth: true,
      title: '同意清偿回复确认页',
      isTicket: true
    }
  },
  {
    path: 'agreePayReplyResult',
    name: 'agreePayReplyResult',
    component: agreePayReplyResult,
    meta: {
      auth: true,
      title: '同意清偿回复结果页',
      isTicket: true
    }
  },
  {
    path: 'agreePayReplyQuery',
    name: 'agreePayReplyQuery',
    component: agreePayReplyQuery,
    meta: {
      auth: true,
      title: '同意清偿回复查询页',
      isTicket: true
    }
  },
  {
    path: 'PayApplyRecallInput',
    name: 'PayApplyRecallInput',
    component: PayApplyRecallInput,
    meta: {
      auth: true,
      title: '清偿申请撤回查询录入页',
      isTicket: true
    }
  },
  {
    path: 'PayApplyRecallComfirmPre',
    name: 'PayApplyRecallComfirmPre',
    component: PayApplyRecallComfirmPre,
    meta: {
      auth: true,
      title: '清偿申请撤回录入页',
      isTicket: true
    }
  },
  {
    path: 'PayApplyRecallComfirm',
    name: 'PayApplyRecallComfirm',
    component: PayApplyRecallComfirm,
    meta: {
      auth: true,
      title: '清偿申请撤回确认页',
      isTicket: true
    }
  },
  {
    path: 'PayApplyRecallResult',
    name: 'PayApplyRecallResult',
    component: PayApplyRecallResult,
    meta: {
      auth: true,
      title: '清偿申请撤回结果页',
      isTicket: true
    }
  },
  {
    path: 'payApplyRecallQuery',
    name: 'PayApplyRecallQuery',
    component: PayApplyRecallQuery,
    meta: {
      auth: true,
      title: '清偿申请撤回查询页',
      isTicket: true
    }
  },
  {
    path: 'payApplyResultQueryInput',
    name: 'payApplyResultQueryInput',
    component: payApplyResultQueryInput,
    meta: {
      auth: true,
      title: '清偿申请结果录入页',
      isTicket: true
    }
  },
  {
    path: 'payApplyResultQuery',
    name: 'payApplyResultQuery',
    component: payApplyResultQuery,
    meta: {
      auth: true,
      title: '清偿申请结果查询页',
      isTicket: true
    }
  },
  {
    path: 'pledgeApplyInput',
    name: 'pledgeApplyInput',
    component: pledgeApplyInput,
    meta: {
      auth: true,
      title: '质押申请查询录入页',
      isTicket: true
    }
  },
  {
    path: 'pldgeApplyInfoInput',
    name: 'pldgeApplyInfoInput',
    component: pldgeApplyInfoInput,
    meta: {
      auth: true,
      title: '质押申请录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeApplyComfirm',
    name: 'pledgeApplyComfirm',
    component: pledgeApplyComfirm,
    meta: {
      auth: true,
      title: '质押申请确认页',
      isTicket: true
    }
  },
  {
    path: 'pldgeApplyBatchPre',
    name: 'pldgeApplyBatchPre',
    component: pldgeApplyBatchPre,
    meta: {
      auth: true,
      title: '批量质押申请录入页',
      isTicket: true
    }
  },
  {
    path: 'pldgeApplyBatchConf',
    name: 'pldgeApplyBatchConf',
    component: pldgeApplyBatchConf,
    meta: {
      auth: true,
      title: '批量质押申请确认',
      isTicket: true
    }
  },
  {
    path: 'pledgeApplyResult',
    name: 'pledgeApplyResult',
    component: pledgeApplyResult,
    meta: {
      auth: true,
      title: '质押申请结果页',
      isTicket: true
    }
  },
  {
    path: 'pledgeApplyQuery',
    name: 'pledgeApplyQuery',
    component: pledgeApplyQuery,
    meta: {
      auth: true,
      title: '质押申请查询页',
      isTicket: true
    }
  },
  {
    path: 'pledgeRecallInput',
    name: 'pledgeRecallInput',
    component: pledgeRecallInput,
    meta: {
      auth: true,
      title: '质押查询录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeRecallInfoInput',
    name: 'pledgeRecallInfoInput',
    component: pledgeRecallInfoInput,
    meta: {
      auth: true,
      title: '质押撤销录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeRecallComfirm',
    name: 'pledgeRecallComfirm',
    component: pledgeRecallComfirm,
    meta: {
      auth: true,
      title: '质押撤销确认页',
      isTicket: true
    }
  },
  {
    path: 'pledgeRecallResult',
    name: 'pledgeRecallResult',
    component: pledgeRecallResult,
    meta: {
      auth: true,
      title: '质押撤销结果页',
      isTicket: true
    }
  },
  {
    path: 'pledgeRecallQuery',
    name: 'pledgeRecallQuery',
    component: pledgeRecallQuery,
    meta: {
      auth: true,
      title: '质押撤销查询页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyInput',
    name: 'pledgeReplyInput',
    component: pledgeReplyInput,
    meta: {
      auth: true,
      title: '质押查询录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyInfoInput',
    name: 'pledgeReplyInfoInput',
    component: pledgeReplyInfoInput,
    meta: {
      auth: true,
      title: '质押应答录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyComfirm',
    name: 'pledgeReplyComfirm',
    component: pledgeReplyComfirm,
    meta: {
      auth: true,
      title: '质押应答确认页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyBatchPre',
    name: 'pledgeReplyBatchPre',
    component: pledgeReplyBatchPre,
    meta: {
      auth: true,
      title: '批量质押应答录入页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyBatchConfirm',
    name: 'pledgeReplyBatchConfirm',
    component: pledgeReplyBatchConfirm,
    meta: {
      auth: true,
      title: '批量质押应答确认页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyResult',
    name: 'pledgeReplyResult',
    component: pledgeReplyResult,
    meta: {
      auth: true,
      title: '质押应答结果页',
      isTicket: true
    }
  },
  {
    path: 'pledgeReplyQuery',
    name: 'pledgeReplyQuery',
    component: pledgeReplyQuery,
    meta: {
      auth: true,
      title: '质押应答查询页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeApplyInput',
    name: 'jiePledgeApplyInput',
    component: jiePledgeApplyInput,
    meta: {
      auth: true,
      title: '解质押查询录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeApplyInfoInput',
    name: 'jiePledgeApplyInfoInput',
    component: jiePledgeApplyInfoInput,
    meta: {
      auth: true,
      title: '解质押申请录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeApplyComfirm',
    name: 'jiePledgeApplyComfirm',
    component: jiePledgeApplyComfirm,
    meta: {
      auth: true,
      title: '解质押申请确认页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeApplyResult',
    name: 'jiePledgeApplyResult',
    component: jiePledgeApplyResult,
    meta: {
      auth: true,
      title: '解质押申请结果页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeApplyQuery',
    name: 'jiePledgeApplyQuery',
    component: jiePledgeApplyQuery,
    meta: {
      auth: true,
      title: '解质押申请查询页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeRecallQuery',
    name: 'jiePledgeRecallQuery',
    component: jiePledgeRecallQuery,
    meta: {
      auth: true,
      title: '解质押撤销查询页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeRecallInput',
    name: 'jiePledgeRecallInput',
    component: jiePledgeRecallInput,
    meta: {
      auth: true,
      title: '解质押查询录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeRecallInfoInput',
    name: 'jiePledgeRecallInfoInput',
    component: jiePledgeRecallInfoInput,
    meta: {
      auth: true,
      title: '解质押撤销录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeRecallComfirm',
    name: 'jiePledgeRecallComfirm',
    component: jiePledgeRecallComfirm,
    meta: {
      auth: true,
      title: '解质押撤销确认页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeRecallResult',
    name: 'jiePledgeRecallResult',
    component: jiePledgeRecallResult,
    meta: {
      auth: true,
      title: '解质押撤销结果页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeReplyInput',
    name: 'jiePledgeReplyInput',
    component: jiePledgeReplyInput,
    meta: {
      auth: true,
      title: '解质押应答查询录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeReplyInfoInput',
    name: 'jiePledgeReplyInfoInput',
    component: jiePledgeReplyInfoInput,
    meta: {
      auth: true,
      title: '解质押应答录入页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeReplyComfirm',
    name: 'jiePledgeReplyComfirm',
    component: jiePledgeReplyComfirm,
    meta: {
      auth: true,
      title: '解质押应答确认页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeReplyResult',
    name: 'jiePledgeReplyResult',
    component: jiePledgeReplyResult,
    meta: {
      auth: true,
      title: '解质押应答结果页',
      isTicket: true
    }
  },
  {
    path: 'jiePledgeReplyQuery',
    name: 'jiePledgeReplyQuery',
    component: jiePledgeReplyQuery,
    meta: {
      auth: true,
      title: '解质押应答查询页',
      isTicket: true
    }
  },
  {
    path: 'billIndex',
    name: 'billIndex',
    component: billIndex,
    meta: {
      auth: true,
      title: '电子票据',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationList',
    name: 'TicketRegistrationList',
    component: TicketRegistrationList,
    meta: {
      auth: true,
      title: '出票登记',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationPre',
    name: 'TicketRegistrationPre',
    component: TicketRegistrationPre,
    meta: {
      auth: true,
      title: '出票登记-录入',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationInner',
    name: 'TicketRegistrationInner',
    component: TicketRegistrationInner,
    meta: {
      auth: true,
      title: '出票登记-录入页',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationBatch',
    name: 'TicketRegistrationBatch',
    component: TicketRegistrationBatch,
    meta: {
      auth: true,
      title: '出票登记-批量',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationBatchDetail',
    name: 'TicketRegistrationBatchDetail',
    component: TicketRegistrationBatchDetail,
    meta: {
      auth: true,
      title: '出票登记-批量录入',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationBatchConf',
    name: 'TicketRegistrationBatchConf',
    component: TicketRegistrationBatchConf,
    meta: {
      auth: true,
      title: '出票登记-批量确认',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationConf',
    name: 'TicketRegistrationConf',
    component: TicketRegistrationConf,
    meta: {
      auth: true,
      title: '出票登记-确认',
      isTicket: true
    }
  },
  {
    path: 'TicketRegistrationRes',
    name: 'TicketRegistrationRes',
    component: TicketRegistrationRes,
    meta: {
      auth: true,
      title: '出票登记-结果',
      isTicket: true
    }
  },
  {
    path: 'billFace',
    name: 'billFace',
    component: billFace,
    meta: {
      auth: true,
      title: '票面详情-正面'
    }
  },
  {
    path: 'billBack',
    name: 'billBack',
    component: billBack,
    meta: {
      auth: true,
      title: '票面详情-背面'
    }
  },
  {
    path: 'promptAcceptanceInquire',
    name: 'promptAcceptanceInquire',
    component: promptAcceptanceInquire,
    meta: {
      auth: true,
      title: '提示承兑-查询',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplyPre',
    name: 'PromptAcceptanceApplyPre',
    component: PromptAcceptanceApplyPre,
    meta: {
      auth: true,
      title: '提示承兑-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplyDetail',
    name: 'PromptAcceptanceApplyDetail',
    component: PromptAcceptanceApplyDetail,
    meta: {
      auth: true,
      title: '提示承兑-申请确认',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplyConf',
    name: 'PromptAcceptanceApplyConf',
    component: PromptAcceptanceApplyConf,
    meta: {
      auth: true,
      title: '提示承兑-申请确认',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplySolo',
    name: 'PromptAcceptanceApplySolo',
    component: PromptAcceptanceApplySolo,
    meta: {
      auth: true,
      title: '提示承兑-申请确认单个',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplySoloConf',
    name: 'PromptAcceptanceApplySoloConf',
    component: PromptAcceptanceApplySoloConf,
    meta: {
      auth: true,
      title: '提示承兑-申请确认单个',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceApplyRes',
    name: 'PromptAcceptanceApplyRes',
    component: PromptAcceptanceApplyRes,
    meta: {
      auth: true,
      title: '提示承兑-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceRevokePre',
    name: 'PromptAcceptanceRevokePre',
    component: PromptAcceptanceRevokePre,
    meta: {
      auth: true,
      title: '提示承兑-撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceRevokeConf',
    name: 'PromptAcceptanceRevokeConf',
    component: PromptAcceptanceRevokeConf,
    meta: {
      auth: true,
      title: '提示承兑-撤销确定',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceRevokeDetail',
    name: 'PromptAcceptanceRevokeDetail',
    component: PromptAcceptanceRevokeDetail,
    meta: {
      auth: true,
      title: '提示承兑-撤销确定',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceRevokeRes',
    name: 'PromptAcceptanceRevokeRes',
    component: PromptAcceptanceRevokeRes,
    meta: {
      auth: true,
      title: '提示承兑-撤销结果',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceRevoke',
    name: 'PromptAcceptanceRevoke',
    component: PromptAcceptanceRevoke,
    meta: {
      auth: true,
      title: '提示承兑-撤销展示',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplyPre',
    name: 'PromptAcceptanceReplyPre',
    component: PromptAcceptanceReplyPre,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplySolo',
    name: 'PromptAcceptanceReplySolo',
    component: PromptAcceptanceReplySolo,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答单笔',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplySoloConf',
    name: 'PromptAcceptanceReplySoloConf',
    component: PromptAcceptanceReplySoloConf,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答单笔',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplyDetail',
    name: 'PromptAcceptanceReplyDetail',
    component: PromptAcceptanceReplyDetail,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答确定',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplyConf',
    name: 'PromptAcceptanceReplyConf',
    component: PromptAcceptanceReplyConf,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答确定',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReplyRes',
    name: 'PromptAcceptanceReplyRes',
    component: PromptAcceptanceReplyRes,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答结果',
      isTicket: true
    }
  },
  {
    path: 'PromptAcceptanceReply',
    name: 'PromptAcceptanceReply',
    component: PromptAcceptanceReply,
    meta: {
      auth: true,
      title: '提示承兑-提示承兑应答展示',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptInquire',
    name: 'PromptReceiptInquire',
    component: PromptReceiptInquire,
    meta: {
      auth: true,
      title: '提示收票-查询',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplyPre',
    name: 'PromptReceiptApplyPre',
    component: PromptReceiptApplyPre,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplyConf',
    name: 'PromptReceiptApplyConf',
    component: PromptReceiptApplyConf,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplyDetail',
    name: 'PromptReceiptApplyDetail',
    component: PromptReceiptApplyDetail,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplySolo',
    name: 'PromptReceiptApplySolo',
    component: PromptReceiptApplySolo,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplySoloConf',
    name: 'PromptReceiptApplySoloConf',
    component: PromptReceiptApplySoloConf,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptApplyRes',
    name: 'PromptReceiptApplyRes',
    component: PromptReceiptApplyRes,
    meta: {
      auth: true,
      title: '提示收票-申请',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplyPre',
    name: 'PromptReceiptReplyPre',
    component: PromptReceiptReplyPre,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReply',
    name: 'PromptReceiptReply',
    component: PromptReceiptReply,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplySolo',
    name: 'PromptReceiptReplySolo',
    component: PromptReceiptReplySolo,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplySoloConf',
    name: 'PromptReceiptReplySoloConf',
    component: PromptReceiptReplySoloConf,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplyDetail',
    name: 'PromptReceiptReplyDetail',
    component: PromptReceiptReplyDetail,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplyConf',
    name: 'PromptReceiptReplyConf',
    component: PromptReceiptReplyConf,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptReplyRes',
    name: 'PromptReceiptReplyRes',
    component: PromptReceiptReplyRes,
    meta: {
      auth: true,
      title: '提示收票-应答',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptRevokePre',
    name: 'PromptReceiptRevokePre',
    component: PromptReceiptRevokePre,
    meta: {
      auth: true,
      title: '提示收票-撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptRevoke',
    name: 'PromptReceiptRevoke',
    component: PromptReceiptRevoke,
    meta: {
      auth: true,
      title: '提示收票-撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptRevokeDetail',
    name: 'PromptReceiptRevokeDetail',
    component: PromptReceiptRevokeDetail,
    meta: {
      auth: true,
      title: '提示收票-撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptRevokeConf',
    name: 'PromptReceiptRevokeConf',
    component: PromptReceiptRevokeConf,
    meta: {
      auth: true,
      title: '提示收票-撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptReceiptRevokeRes',
    name: 'PromptReceiptRevokeRes',
    component: PromptReceiptRevokeRes,
    meta: {
      auth: true,
      title: '提示收票-撤销',
      isTicket: true
    }
  },
  {
    path: 'CancelTicketInquire',
    name: 'CancelTicketInquire',
    component: CancelTicketInquire,
    meta: {
      auth: true,
      title: '撤票申请-查询',
      isTicket: true
    }
  },
  {
    path: 'CancelTicketPre',
    name: 'CancelTicketPre',
    component: CancelTicketPre,
    meta: {
      auth: true,
      title: '撤票申请-录入',
      isTicket: true
    }
  },
  {
    path: 'CancelTicketConf',
    name: 'CancelTicketConf',
    component: CancelTicketConf,
    meta: {
      auth: true,
      title: '撤票申请-确认',
      isTicket: true
    }
  },
  {
    path: 'CancelTicketDetail',
    name: 'CancelTicketDetail',
    component: CancelTicketDetail,
    meta: {
      auth: true,
      title: '撤票申请-确认',
      isTicket: true
    }
  },
  {
    path: 'CancelTicketRes',
    name: 'CancelTicketRes',
    component: CancelTicketRes,
    meta: {
      auth: true,
      title: '撤票申请-结果',
      isTicket: true
    }
  },
  {
    path: 'QueryCancelledTicket',
    name: 'QueryCancelledTicket',
    component: QueryCancelledTicket,
    meta: {
      auth: true,
      title: '撤票申请-结果',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceReplyInquire',
    name: 'AcceptanceReplyInquire',
    component: AcceptanceReplyInquire,
    meta: {
      auth: true,
      title: '承兑应答-查询',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceReplyPre',
    name: 'AcceptanceReplyPre',
    component: AcceptanceReplyPre,
    meta: {
      auth: true,
      title: '承兑应答-录入',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceReplyConf',
    name: 'AcceptanceReplyConf',
    component: AcceptanceReplyConf,
    meta: {
      auth: true,
      title: '承兑应答-确认',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceReplyRes',
    name: 'AcceptanceReplyRes',
    component: AcceptanceReplyRes,
    meta: {
      auth: true,
      title: '承兑应答-结果',
      isTicket: true
    }
  },
  {
    path: 'AcceptancePaymentReceiptInquire',
    name: 'AcceptancePaymentReceiptInquire',
    component: AcceptancePaymentReceiptInquire,
    meta: {
      auth: true,
      title: '付款签收-查询',
      isTicket: true
    }
  },
  {
    path: 'AcceptancePaymentReceiptPre',
    name: 'AcceptancePaymentReceiptPre',
    component: AcceptancePaymentReceiptPre,
    meta: {
      auth: true,
      title: '付款签收-录入',
      isTicket: true
    }
  },
  {
    path: 'AcceptancePaymentReceiptConf',
    name: 'AcceptancePaymentReceiptConf',
    component: AcceptancePaymentReceiptConf,
    meta: {
      auth: true,
      title: '付款签收-确认',
      isTicket: true
    }
  },
  {
    path: 'AcceptancePaymentReceiptRes',
    name: 'AcceptancePaymentReceiptRes',
    component: AcceptancePaymentReceiptRes,
    meta: {
      auth: true,
      title: '付款签收-结果',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceRefuseInquire',
    name: 'AcceptanceRefuseInquire',
    component: AcceptanceRefuseInquire,
    meta: {
      auth: true,
      title: '拒付-查询',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceRefusePre',
    name: 'AcceptanceRefusePre',
    component: AcceptanceRefusePre,
    meta: {
      auth: true,
      title: '拒付-查询',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceRefuseConf',
    name: 'AcceptanceRefuseConf',
    component: AcceptanceRefuseConf,
    meta: {
      auth: true,
      title: '拒付-查询',
      isTicket: true
    }
  },
  {
    path: 'AcceptanceRefuseRes',
    name: 'AcceptanceRefuseRes',
    component: AcceptanceRefuseRes,
    meta: {
      auth: true,
      title: '拒付-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyInquire',
    name: 'EndorsementTransferReplyInquire',
    component: EndorsementTransferReplyInquire,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyDetail',
    name: 'EndorsementTransferReplyDetail',
    component: EndorsementTransferReplyDetail,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyPre',
    name: 'EndorsementTransferReplyPre',
    component: EndorsementTransferReplyPre,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyConf',
    name: 'EndorsementTransferReplyConf',
    component: EndorsementTransferReplyConf,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplySoloConf',
    name: 'EndorsementTransferReplySoloConf',
    component: EndorsementTransferReplySoloConf,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplySolo',
    name: 'EndorsementTransferReplySolo',
    component: EndorsementTransferReplySolo,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyRes',
    name: 'EndorsementTransferReplyRes',
    component: EndorsementTransferReplyRes,
    meta: {
      auth: true,
      title: '背书转让-被背书应答-结果',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplyInquire',
    name: 'EndorsementTransferApplyInquire',
    component: EndorsementTransferApplyInquire,
    meta: {
      auth: true,
      title: '背书转让-背书申请-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplyPre',
    name: 'EndorsementTransferApplyPre',
    component: EndorsementTransferApplyPre,
    meta: {
      auth: true,
      title: '背书转让-背书申请-录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplySolo',
    name: 'EndorsementTransferApplySolo',
    component: EndorsementTransferApplySolo,
    meta: {
      auth: true,
      title: '背书转让-背书申请-录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplySoloConf',
    name: 'EndorsementTransferApplySoloConf',
    component: EndorsementTransferApplySoloConf,
    meta: {
      auth: true,
      title: '背书转让-背书申请-录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplyDetailPre',
    name: 'EndorsementTransferApplyDetailPre',
    component: EndorsementTransferApplyDetailPre,
    meta: {
      auth: true,
      title: '背书转让-背书申请-详细录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplyConf',
    name: 'EndorsementTransferApplyConf',
    component: EndorsementTransferApplyConf,
    meta: {
      auth: true,
      title: '背书转让-背书申请-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferApplyRes',
    name: 'EndorsementTransferApplyRes',
    component: EndorsementTransferApplyRes,
    meta: {
      auth: true,
      title: '背书转让-背书申请-结果',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferRevokeInquire',
    name: 'EndorsementTransferRevokeInquire',
    component: EndorsementTransferRevokeInquire,
    meta: {
      auth: true,
      title: '背书转让-背书撤回-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferRevokePre',
    name: 'EndorsementTransferRevokePre',
    component: EndorsementTransferRevokePre,
    meta: {
      auth: true,
      title: '背书转让-背书撤回-录入',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferRevokeConf',
    name: 'EndorsementTransferRevokeConf',
    component: EndorsementTransferRevokeConf,
    meta: {
      auth: true,
      title: '背书转让-背书撤回-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferRevokeDetail',
    name: 'EndorsementTransferRevokeDetail',
    component: EndorsementTransferRevokeDetail,
    meta: {
      auth: true,
      title: '背书转让-背书撤回-确认',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferRevokeRes',
    name: 'EndorsementTransferRevokeRes',
    component: EndorsementTransferRevokeRes,
    meta: {
      auth: true,
      title: '背书转让-背书撤回-结果',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferReplyQuery',
    name: 'EndorsementTransferReplyQuery',
    component: EndorsementTransferReplyQuery,
    meta: {
      auth: true,
      title: '背书转让-被背书应答查询-查询',
      isTicket: true
    }
  },
  {
    path: 'EndorsementTransferResultsQuery',
    name: 'EndorsementTransferResultsQuery',
    component: EndorsementTransferResultsQuery,
    meta: {
      auth: true,
      title: '背书转让-背书结果查询-查询',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplyInquire',
    name: 'PromptPaymentApplyInquire',
    component: PromptPaymentApplyInquire,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请-查询',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplyPre',
    name: 'PromptPaymentApplyPre',
    component: PromptPaymentApplyPre,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请-录入',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplyConf',
    name: 'PromptPaymentApplyConf',
    component: PromptPaymentApplyConf,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请-确认',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplyDetailPre',
    name: 'PromptPaymentApplyDetailPre',
    component: PromptPaymentApplyDetailPre,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplySolo',
    name: 'PromptPaymentApplySolo',
    component: PromptPaymentApplySolo,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplySoloConf',
    name: 'PromptPaymentApplySoloConf',
    component: PromptPaymentApplySoloConf,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentApplyRes',
    name: 'PromptPaymentApplyRes',
    component: PromptPaymentApplyRes,
    meta: {
      auth: true,
      title: '提示付款-提示付款申请-结果',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRevokeInquire',
    name: 'PromptPaymentRevokeInquire',
    component: PromptPaymentRevokeInquire,
    meta: {
      auth: true,
      title: '提示付款-提示付款撤销-查询',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRevokePre',
    name: 'PromptPaymentRevokePre',
    component: PromptPaymentRevokePre,
    meta: {
      auth: true,
      title: '提示付款-提示付款撤销-录入',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRevokeDetailPre',
    name: 'PromptPaymentRevokeDetailPre',
    component: PromptPaymentRevokeDetailPre,
    meta: {
      auth: true,
      title: '提示付款-提示付款撤销',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRevokeConf',
    name: 'PromptPaymentRevokeConf',
    component: PromptPaymentRevokeConf,
    meta: {
      auth: true,
      title: '提示付款-提示付款撤销-确认',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRevokeRes',
    name: 'PromptPaymentRevokeRes',
    component: PromptPaymentRevokeRes,
    meta: {
      auth: true,
      title: '提示付款-提示付款撤销-结果',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentResultQuery',
    name: 'PromptPaymentResultQuery',
    component: PromptPaymentResultQuery,
    meta: {
      auth: true,
      title: '提示付款-提示付款结果查询',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRejectionConf',
    name: 'PromptPaymentRejectionConf',
    component: PromptPaymentRejectionConf,
    meta: {
      auth: true,
      title: '提示付款-提示付款-拒付',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRejectionInquire',
    name: 'PromptPaymentRejectionInquire',
    component: PromptPaymentRejectionInquire,
    meta: {
      auth: true,
      title: '提示付款-提示付款-拒付',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRejectionPre',
    name: 'PromptPaymentRejectionPre',
    component: PromptPaymentRejectionPre,
    meta: {
      auth: true,
      title: '提示付款-提示付款-拒付',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRejectionInner',
    name: 'PromptPaymentRejectionInner',
    component: PromptPaymentRejectionInner,
    meta: {
      auth: true,
      title: '提示付款-提示付款-拒付',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentRejectionRes',
    name: 'PromptPaymentRejectionRes',
    component: PromptPaymentRejectionRes,
    meta: {
      auth: true,
      title: '提示付款-提示付款-拒付',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentSignforConf',
    name: 'PromptPaymentSignforConf',
    component: PromptPaymentSignforConf,
    meta: {
      auth: true,
      title: '提示付款-提示付款-付款签收',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentSignforInquire',
    name: 'PromptPaymentSignforInquire',
    component: PromptPaymentSignforInquire,
    meta: {
      auth: true,
      title: '提示付款-提示付款-付款签收',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentSignforPre',
    name: 'PromptPaymentSignforPre',
    component: PromptPaymentSignforPre,
    meta: {
      auth: true,
      title: '提示付款-提示付款-付款签收',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentSignforInner',
    name: 'PromptPaymentSignforInner',
    component: PromptPaymentSignforInner,
    meta: {
      auth: true,
      title: '提示付款-提示付款-付款签收',
      isTicket: true
    }
  },
  {
    path: 'PromptPaymentSignforRes',
    name: 'PromptPaymentSignforRes',
    component: PromptPaymentSignforRes,
    meta: {
      auth: true,
      title: '提示付款-提示付款-付款签收',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplyInquire',
    name: 'DiscountApplyInquire',
    component: DiscountApplyInquire,
    meta: {
      auth: true,
      title: '贴现-贴现申请-查询',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplySolo',
    name: 'DiscountApplySolo',
    component: DiscountApplySolo,
    meta: {
      auth: true,
      title: '贴现-贴现申请',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplySoloConf',
    name: 'DiscountApplySoloConf',
    component: DiscountApplySoloConf,
    meta: {
      auth: true,
      title: '贴现-贴现申请',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplyDetailPre',
    name: 'DiscountApplyDetailPre',
    component: DiscountApplyDetailPre,
    meta: {
      auth: true,
      title: '贴现-贴现申请',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplyPre',
    name: 'DiscountApplyPre',
    component: DiscountApplyPre,
    meta: {
      auth: true,
      title: '贴现-贴现申请-录入',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplyConf',
    name: 'DiscountApplyConf',
    component: DiscountApplyConf,
    meta: {
      auth: true,
      title: '贴现-贴现申请-确认',
      isTicket: true
    }
  },
  {
    path: 'DiscountApplyRes',
    name: 'DiscountApplyRes',
    component: DiscountApplyRes,
    meta: {
      auth: true,
      title: '贴现-贴现申请-结果',
      isTicket: true
    }
  },
  {
    path: 'DiscountRevokeInquire',
    name: 'DiscountRevokeInquire',
    component: DiscountRevokeInquire,
    meta: {
      auth: true,
      title: '贴现-贴现撤销-查询',
      isTicket: true
    }
  },
  {
    path: 'DiscountRevokePre',
    name: 'DiscountRevokePre',
    component: DiscountRevokePre,
    meta: {
      auth: true,
      title: '贴现-贴现撤销-录入',
      isTicket: true
    }
  },
  {
    path: 'DiscountRevokeConf',
    name: 'DiscountRevokeConf',
    component: DiscountRevokeConf,
    meta: {
      auth: true,
      title: '贴现-贴现撤销-确认',
      isTicket: true
    }
  },
  {
    path: 'DiscountRevokeDetail',
    name: 'DiscountRevokeDetail',
    component: DiscountRevokeDetail,
    meta: {
      auth: true,
      title: '贴现-贴现撤销-确认',
      isTicket: true
    }
  },
  {
    path: 'DiscountRevokeRes',
    name: 'DiscountRevokeRes',
    component: DiscountRevokeRes,
    meta: {
      auth: true,
      title: '贴现-贴现撤销-结果',
      isTicket: true
    }
  },
  {
    path: 'DiscountResultQuery',
    name: 'DiscountResultQuery',
    component: DiscountResultQuery,
    meta: {
      auth: true,
      title: '贴现-贴现结果查询',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplyInquire',
    name: 'EnsureReplyInquire',
    component: EnsureReplyInquire,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答-查询',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplyPre',
    name: 'EnsureReplyPre',
    component: EnsureReplyPre,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答-录入',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplyConf',
    name: 'EnsureReplyConf',
    component: EnsureReplyConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答-确认',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplySolo',
    name: 'EnsureReplySolo',
    component: EnsureReplySolo,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplySoloConf',
    name: 'EnsureReplySoloConf',
    component: EnsureReplySoloConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplyDetailPre',
    name: 'EnsureReplyDetailPre',
    component: EnsureReplyDetailPre,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答',
      isTicket: true
    }
  },
  {
    path: 'EnsureReplyRes',
    name: 'EnsureReplyRes',
    component: EnsureReplyRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证应答-结果',
      isTicket: true
    }
  },
  {
    path: 'EnsureRevokeInquire',
    name: 'EnsureRevokeInquire',
    component: EnsureRevokeInquire,
    meta: {
      auth: true,
      title: '提示保证-提示保证撤销-查询',
      isTicket: true
    }
  },
  {
    path: 'EnsureRevokePre',
    name: 'EnsureRevokePre',
    component: EnsureRevokePre,
    meta: {
      auth: true,
      title: '提示保证-提示保证撤销-录入',
      isTicket: true
    }
  },
  {
    path: 'EnsureRevokeConf',
    name: 'EnsureRevokeConf',
    component: EnsureRevokeConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证撤销-确认',
      isTicket: true
    }
  },
  {
    path: 'EnsureRevokeInner',
    name: 'EnsureRevokeInner',
    component: EnsureRevokeInner,
    meta: {
      auth: true,
      title: '提示保证-提示保证撤销-录入',
      isTicket: true
    }
  },
  {
    path: 'EnsureRevokeRes',
    name: 'EnsureRevokeRes',
    component: EnsureRevokeRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证撤销-结果',
      isTicket: true
    }
  },
  {
    path: 'EnsureResultQuery',
    name: 'EnsureResultQuery',
    component: EnsureResultQuery,
    meta: {
      auth: true,
      title: '提示保证-提示保证结果查询',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyQuery',
    name: 'EnsureApplyQuery',
    component: EnsureApplyQuery,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-查询',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyQueryDetail',
    name: 'EnsureApplyQueryDetail',
    component: EnsureApplyQueryDetail,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-查询详情',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyAddPre',
    name: 'EnsureApplyAddPre',
    component: EnsureApplyAddPre,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-添加录入',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyAddConf',
    name: 'EnsureApplyAddConf',
    component: EnsureApplyAddConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-添加确认',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyAddRes',
    name: 'EnsureApplyAddRes',
    component: EnsureApplyAddRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-添加结果',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyChangePre',
    name: 'EnsureApplyChangePre',
    component: EnsureApplyChangePre,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-修改录入',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyChangeConf',
    name: 'EnsureApplyChangeConf',
    component: EnsureApplyChangeConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-修改确认',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyChangeRes',
    name: 'EnsureApplyChangeRes',
    component: EnsureApplyChangeRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-修改结果',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyDeleteConf',
    name: 'EnsureApplyDeleteConf',
    component: EnsureApplyDeleteConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-删除确认',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyDeleteRes',
    name: 'EnsureApplyDeleteRes',
    component: EnsureApplyDeleteRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请-删除结果',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyPre',
    name: 'EnsureApplyPre',
    component: EnsureApplyPre,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyInquire',
    name: 'EnsureApplyInquire',
    component: EnsureApplyInquire,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyDetailPre',
    name: 'EnsureApplyDetailPre',
    component: EnsureApplyDetailPre,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplySolo',
    name: 'EnsureApplySolo',
    component: EnsureApplySolo,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplySoloConf',
    name: 'EnsureApplySoloConf',
    component: EnsureApplySoloConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyConf',
    name: 'EnsureApplyConf',
    component: EnsureApplyConf,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'EnsureApplyRes',
    name: 'EnsureApplyRes',
    component: EnsureApplyRes,
    meta: {
      auth: true,
      title: '提示保证-提示保证申请',
      isTicket: true
    }
  },
  {
    path: 'billBalanceQuery',
    name: 'billBalanceQuery',
    component: billBalanceQuery,
    meta: {
      auth: true,
      title: '票据查询-票据余额查询录入',
      isTicket: true
    }
  },
  {
    path: 'billBalanceQueryResult',
    name: 'billBalanceQueryResult',
    component: billBalanceQueryResult,
    meta: {
      auth: true,
      title: '票据查询-票据余额查询',
      isTicket: true,
      rmCache: true
    }
  },
  {
    path: 'billInfoFront',
    name: 'billInfoFront',
    component: billInfoFront,
    meta: {
      auth: true,
      title: '票据查询-票据余额查询正面',
      notCache: true
      // isTicket: true
    }
  },
  {
    path: 'billInfoDetails',
    name: 'billInfoDetails',
    component: billInfoDetails,
    meta: {
      auth: true,
      title: '票据查询-票据余额查询详情页',
      isTicket: true
    }
  },
  {
    path: 'billInfoBeside',
    name: 'billInfoBeside',
    component: billInfoBeside,
    meta: {
      auth: true,
      title: '票据查询-票据余额查询背面'
      // isTicket: true
    }
  },
  {
    path: 'billBatchQuery',
    name: 'billBatchQuery',
    component: billBatchQuery,
    meta: {
      auth: true,
      title: '票据查询-票据批量查询录入',
      isTicket: true
    }
  },
  {
    path: 'billBatchQueryDetails',
    name: 'billBatchQueryDetails',
    component: billBatchQueryDetails,
    meta: {
      auth: true,
      title: '票据查询-票据批量查询详情',
      isTicket: true
    }
  },
  {
    path: 'billBatchQueryResult',
    name: 'billBatchQueryResult',
    component: billBatchQueryResult,
    meta: {
      auth: true,
      title: '票据查询-票据批量查询结果',
      isTicket: true
    }
  },
  {
    path: 'billBatchQueryResulta',
    name: 'billBatchQueryResulta',
    component: billBatchQueryResulta,
    meta: {
      auth: true,
      title: '票据查询-票据批量查询结果',
      isTicket: true
    }
  },
  {
    path: 'billInfoQuery',
    name: 'billInfoQuery',
    component: billInfoQuery,
    meta: {
      auth: true,
      title: '票据信息查询',
      isTicket: true
    }
  },
  {
    path: 'billInfoQueryList',
    name: 'billInfoQueryList',
    component: billInfoQueryList,
    meta: {
      auth: true,
      title: '票据信息查询列表',
      rmCache: true,
      isTicket: true
    }
  },
  {
    path: 'billInfoTable',
    name: 'billInfoTable',
    component: billInfoTable,
    meta: {
      auth: true,
      title: '票据信息表格',
      notCache: true
    }
  },
  {
    path: 'billInfoQueryResult',
    name: 'billInfoQueryResult',
    component: billInfoQueryResult,
    meta: {
      auth: true,
      title: '票据交易状态',
      isTicket: true
    }
  },
  {
    path: 'billInfoDetailsResult',
    name: 'billInfoDetailsResult',
    component: billInfoDetailsResult,
    meta: {
      auth: true,
      title: '票据交易状态',
      isTicket: true
    }
  },
  {
    path: 'billInfoBackTable',
    name: 'billInfoBackTable',
    component: billInfoBackTable,
    meta: {
      auth: true,
      title: '票据信息表格'
    }
  }
]
export default electronicBillRouter
