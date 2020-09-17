<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box"
      >
      <div
        center
        width="100%"
        >
        <h2 class="title" align="center">操作详情</h2>
        <m-form-res
          id="m-form-res"
          class="m-form-res"
          style="width: 100%"
          :formModel="topFormModel"
          :data="data"
        >
        </m-form-res>
      </div>
    </div>
    <div style="clear: both" v-if="shownoder">
      <single-transfer v-if="formModel.transCode === 'eweb-transfer.Transfer'"
        :formModel="formModel">
      </single-transfer>
      <confirmCurrent-Tofer v-if="formModel.transCode === 'eweb-invest.CurrentRegular'"
        :formModel="formModel">
      </confirmCurrent-Tofer>
      <sportsPay-Conffer v-if="formModel.transCode === 'eweb-transfer.LotteryPayFee'"
        :formModel="formModel">
      </sportsPay-Conffer>
      <fileUpload-Conffer v-if="formModel.transCode === 'eweb-transfer.PaySalaryUpload'"
        :formModel="formModel">
      </fileUpload-Conffer>
      <openAccount-Confer v-if="formModel.transCode === 'eweb-invest.StructuredDepositOpen'"
        :formModel="formModel">
      </openAccount-Confer>
      <rpWithdraw-Conffer v-if="formModel.transCode === 'eweb-invest.DrawRegular'"
        :formModel="formModel">
      </rpWithdraw-Conffer>
      <autoFeeSign-Confirmfer v-if="formModel.transCode === 'eweb-enterprise.AutDedFeeSign'"
        :formModel="formModel">
      </autoFeeSign-Confirmfer>
      <creditCardPayments-Conffer v-if="formModel.transCode === 'eweb-transfer.CreditCardRepay'"
        :formModel="formModel">
      </creditCardPayments-Conffer>
      <smallRegularCredit-Busfer v-if="formModel.transCode === 'eweb-transfer.SmallLimitLead'"
        :formModel="formModel">
      </smallRegularCredit-Busfer>
      <trans-Conffer v-if="formModel.transCode === 'eweb-cash.CollectCashPooling'"
        :formModel="formModel">
      </trans-Conffer>
      <comfirm-Accountfer v-if="formModel.transCode === 'eweb-invest.StructuredDepositClose'"
        :formModel="formModel">
      </comfirm-Accountfer>
      <open-Conffer v-if="formModel.transCode === 'eweb-invest.OpenRegularAcNo'"
        :formModel="formModel">
      </open-Conffer>
      <innerCompanyTrans-Conffer v-if="formModel.transCode === 'eweb-transfer.InnerTransfer'"
        :formModel="formModel">
      </innerCompanyTrans-Conffer>
      <confirmRegulai-Drawfer v-if="formModel.transCode === 'eweb-invest.PeriodicWithdrawal'"
        :formModel="formModel">
      </confirmRegulai-Drawfer>
      <financiaRedeem-Confirmfer v-if="formModel.transCode === 'eweb-invest.InvestProductRedeem'"
        :formModel="formModel">
      </financiaRedeem-Confirmfer>
      <timed-Cancelfer v-if="formModel.transCode === 'eweb-transfer.RepealAppointTrans'"
        :formModel="formModel">
      </timed-Cancelfer>
      <smallLimit-Borrowfer v-if="formModel.transCode === 'eweb-transfer.SmallLimitBorrow'"
        :formModel="formModel">
      </smallLimit-Borrowfer>
      <batchTransfer-Conffer v-if="formModel.transCode === 'eweb-transfer.BatchTransfer'"
        :formModel="formModel">
      </batchTransfer-Conffer>
      <baffleAccount-Conffer v-if="formModel.transCode === 'eweb-transfer.BaffleAcctMoneyBack'"
        :formModel="formModel">
      </baffleAccount-Conffer>
      <bulkReimbursement-Conffer v-if="formModel.transCode === 'eweb-transfer.FinanceReimburse'"
        :formModel="formModel">
      </bulkReimbursement-Conffer>
      <multiLevelLedgerBalance-Confer v-if="formModel.transCode === 'eweb-cash.MultistageBookBalUpdate'"
        :formModel="formModel">
      </multiLevelLedgerBalance-Confer>
      <adjustment-Confirmfer v-if="formModel.transCode === 'eweb-cash.MultistageBookDetailAdjust'"
        :formModel="formModel">
      </adjustment-Confirmfer>
      <withdraw-Conffer v-if="formModel.transCode === 'eweb-largeDeposit.LargeProductDraw'"
        :formModel="formModel">
      </withdraw-Conffer>
      <!-- <transCancel-fer v-if="formModel.transCode === 'eweb-transfer.RepealAppointTrans'"
        :formModel="formModel">
      </transCancel-fer> -->
      <role-Conffer v-if="formModel.transCode === 'eweb-enterprise.RoleAdd'"
        :formModel="formModel">
      </role-Conffer>
      <role-Conffer v-if="formModel.transCode === 'eweb-enterprise.RoleDelete'"
        :formModel="formModel">
      </role-Conffer>
      <role-Conffer v-if="formModel.transCode === 'eweb-enterprise.RoleUpdate'"
        :formModel="formModel">
      </role-Conffer>
      <setMultLeveLedgerRoots-Confirmfer v-if="formModel.transCode === 'eweb-cash.MultistageBookAuthSet'"
        :tableData="tableData"
        :formModel="formModel">
      </setMultLeveLedgerRoots-Confirmfer>
      <mobilephoneBanlOpen-Statusfer v-if="formModel.transCode === 'eweb-setting.MobilphoneBankApplication'"
        :formModel="formModel">
      </mobilephoneBanlOpen-Statusfer>
      <opUpdate-Conffer v-if="formModel.transCode === 'eweb-operator.OperatorModify'"
        :formModel="formModel">
      </opUpdate-Conffer>
      <financialCancel-Comfirmfer v-if="formModel.transCode === 'eweb-invest.InvestProductCancle'"
        :formModel="formModel">
      </financialCancel-Comfirmfer>
      <financialPurchen-Conffer v-if="formModel.transCode === 'eweb-invest.InvestProductBuy'"
        :formModel="formModel">
      </financialPurchen-Conffer>
      <linkCredit-Cardfer v-if="formModel.transCode === 'eweb-transfer.CreditCardAdd'"
        :formModel="formModel">
      </linkCredit-Cardfer>
      <confirm-moneyfer v-if="formModel.transCode === 'eweb-invest.DemandNotification'"
        :formModel="formModel">
      </confirm-moneyfer>
      <certificate-Confirmfer v-if="formModel.transCode === 'eweb-enterprise.CertFees'"
        :formModel="formModel">
      </certificate-Confirmfer>
      <multiLevelLedgerTransfer-Confirmfer v-if="formModel.transCode === 'eweb-cash.MultistageBookTransfer'"
        :formModel="formModel">
      </multiLevelLedgerTransfer-Confirmfer>
      <LargeProduct-Buyfer v-if="formModel.transCode === 'eweb-largeDeposit.LargeProductBuy'"
        :formModel="formModel">
      </LargeProduct-Buyfer>
      <pay-for v-if="formModel.transCode === 'eweb-largeDeposit.LargeDepositAssignApply'"
        :formModel="formModel">
      </pay-for>
      <pay-assigne v-if="formModel.transCode === 'eweb-largeDeposit.LargeDepositAssignAffirm'"
        :formModel="formModel">
      </pay-assigne>
      <maintenance-Confirmfer v-if="formModel.transCode === 'eweb-enterprise.UpdEcorgInfo'"
        :formModel="formModel">
      </maintenance-Confirmfer>
      <collectPerSet-FerAction v-if="formModel.transCode === 'eweb-cash.CollectDateSet'"
        :formModel="formModel">
      </collectPerSet-FerAction>
      <periodicCol-SergerFer v-if="formModel.transCode === 'eweb-cash.TimingCollectSet'"
        :formModel="formModel">
      </periodicCol-SergerFer>
      <autoFeeSign-Confirmfer v-if="formModel.transCode === 'eweb-enterprise.UpdateAutDedFeeSign'"
        :formModel="formModel">
      </autoFeeSign-Confirmfer>
      <pass-WordResetfer v-if="formModel.transCode === 'eweb-operator.OperatorPasswordReset'"
        :formModel="formModel">
      </pass-WordResetfer>
      <deposit-Withdrawfer v-if="formModel.transCode === 'eweb-invest.DepositWithdraw'"
        :formModel="formModel">
      </deposit-Withdrawfer>
      <approveProcess-Setfer v-if="formModel.transCode === 'eweb-setting.ApproveProcessSet'"
        :tableData="tableData"
        :formModel="formModel">
      </approveProcess-Setfer>
      <cifAcLimitSetting-fer v-if="formModel.transCode === 'eweb-setting.CifAcLimitSet'"
        :formModel="formModel">
      </cifAcLimitSetting-fer>
      <cifAcLimit-Settingfer v-if="formModel.transCode === 'eweb-enterprise.CifAcLimitSet'"
        :formModel="formModel">
      </cifAcLimit-Settingfer>
      <batchBithholdingOfCard-Conffer v-if="formModel.transCode === 'eweb-transfer.DebitCardBulkWithholding'"
        :formModel="formModel">
      </batchBithholdingOfCard-Conffer>
      <batchBithholdingOfCard-Conffer v-if="formModel.transCode === 'eweb-transfer.CreditCardBulkWithholding'"
        :formModel="formModel">
      </batchBithholdingOfCard-Conffer>
      <TicketRegistration-Innerfer v-if="formModel.transCode === 'eweb-edraft.IssueRegister'"
        :formModel="formModel">
      </TicketRegistration-Innerfer>
      <general-Cancellation v-if="formModel.transCode === 'eweb-edraft.RevokeReq'"
        :formModel="formModel">
      </general-Cancellation>
      <PromptAcceptanceApplySoloConffer v-if="formModel.transCode === 'eweb-edraft.AcceptApplication'"
        :formModel="formModel">
      </PromptAcceptanceApplySoloConffer>
      <generalSignIn-Transaction v-if="formModel.transCode === 'eweb-edraft.CurrentSign'"
        :formModel="formModel">
      </generalSignIn-Transaction>
      <socialSecurityPayment-Conffer v-if="formModel.transCode === 'eweb-transfer.SocialSecurityContribution'"
        :formModel="formModel"
        :tableData="tableData">
      </socialSecurityPayment-Conffer>
      <withdrawal-Conffer v-if="formModel.transCode === 'eweb-transfer.SHShipPayments'"
        :formModel="formModel">
      </withdrawal-Conffer>
      <deposit-Conffer v-if="formModel.transCode === 'eweb-transfer.SHShipIncome'"
        :formModel="formModel">
      </deposit-Conffer>
      <noTaxPay-Conffer v-if="formModel.transCode === 'eweb-transfer.PaymentPayInfo'"
        :formModel="formModel">
      </noTaxPay-Conffer>
      <autoFeeSign-Alreadyfer v-if="formModel.transCode === 'eweb-enterprise.AutDedFeeRel'"
        :formModel="formModel"
        :tableData="tableData">
      </autoFeeSign-Alreadyfer>
      <commonCurrentAccount-Conf v-if="formModel.transCode === 'eweb-transfer.PayeeBookAdd' || formModel.transCode === 'eweb-transfer.PayeeBookDelete' || formModel.transCode === 'eweb-transfer.PayeeBookUpdate'"
        :formModel="formModel">
      </commonCurrentAccount-Conf>
      <TicketRegistrationBatch-Conffer v-if="formModel.transCode === 'eweb-edraft.IssueRegisterBatch'"
        :formModel="formModel"
        :tableData="tableData">
      </TicketRegistrationBatch-Conffer>
      <PromptReceiptApplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.PromptChargeTicket'"
        :formModel="formModel">
      </PromptReceiptApplySolo-Conffer>
      <EndorsementTransferApply-Conffer v-if="formModel.transCode === 'eweb-edraft.EndorsedTransferBatch'"
        :formModel="formModel"
        :tableData="tableData">
      </EndorsementTransferApply-Conffer>
      <pledgeApply-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.PledgeReqBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </pledgeApply-Comfirmfer>
      <EnsureApplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.GuaranteeApply'"
        :formModel="formModel">
      </EnsureApplySolo-Conffer>
      <DiscountApplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.Discount'"
        :formModel="formModel">
      </DiscountApplySolo-Conffer>
      <EndorsementTransferApplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.EndorsedTransfer'"
        :formModel="formModel">
      </EndorsementTransferApplySolo-Conffer>
      <jiePledgeApply-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.RelievePledgeReq'"
        :formModel="formModel">
      </jiePledgeApply-Comfirmfer>
      <PromptPaymentApplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.PaymentReminder'"
        :formModel="formModel">
      </PromptPaymentApplySolo-Conffer>
      <pledgeApply-Comffer v-if="formModel.transCode === 'eweb-edraft.PledgeReq'"
        :formModel="formModel">
      </pledgeApply-Comffer>
      <agreePayApply-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.AgreePayOff'"
        :formModel="formModel">
      </agreePayApply-Comfirmfer>
      <agree-PayReply-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.QcCurrentSign'"
        :formModel="formModel">
      </agree-PayReply-Comfirmfer>
      <EnsureReplySolo-Conffer v-if="formModel.transCode === 'eweb-edraft.BzCurrentSign'"
        :formModel="formModel">
      </EnsureReplySolo-Conffer>
      <PromptReceiptApply-Conffer v-if="formModel.transCode === 'eweb-edraft.PromptChargeTicketBatch'"
        :formModel="formModel"
        :tableData="tableData">
      </PromptReceiptApply-Conffer>
      <PromptReceiptReply-Conffer v-if="formModel.transCode === 'eweb-edraft.SpCurrentSignBatch'"
        :formModel="formModel"
        :tableData="tableData">
      </PromptReceiptReply-Conffer>
      <ra-conf-againfer v-if="formModel.transCode === 'eweb-edraft.RecourseNotice'"
        :formModel="formModel">
      </ra-conf-againfer>
      <jiePledgeReply-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.JzyCurrentSign'"
        :formModel="formModel">
      </jiePledgeReply-Comfirmfer>
      <information-Conffer v-if="formModel.transCode === 'eweb-operator.OperatorInfoModify'"
        :formModel="formModel">
      </information-Conffer>
      <pwd-changefer v-if="formModel.transCode === 'eweb-operator.OperatorPswModify'"
        :formModel="formModel">
      </pwd-changefer>
      <discount-Apply-Conffer v-if="formModel.transCode === 'eweb-edraft.DiscountBatch'"
        :formModel="formModel"
        :tableData="tableData">
      </discount-Apply-Conffer>
      <discount-Revoke-Conffer v-if="formModel.transCode === 'eweb-edraft.TxRevokeReq'"
        :formModel="formModel">
      </discount-Revoke-Conffer>
      <jie-Pledge-Recall-Comfirmfer v-if="formModel.transCode === 'eweb-edraft.JzyRevokeReq'"
        :formModel="formModel">
      </jie-Pledge-Recall-Comfirmfer>
      <prompt-Payment-Revoke-Conffer v-if="formModel.transCode === 'eweb-edraft.FkRevokeReq'"
        :formModel="formModel">
      </prompt-Payment-Revoke-Conffer>
      <timed-Cancelconfer v-if="formModel.transCode === 'eweb-transfer.TimeTransferTrsRepeal'"
        :formModel="formModel">
      </timed-Cancelconfer>
      <check-Bill-Conffer v-if="formModel.transCode === 'eweb-query.BankCheckOutcome'"
        :formModel="formModel">
      </check-Bill-Conffer>
      <cancel-Ticket-Conffer v-if="formModel.transCode === 'eweb-edraft.VacatePcle'"
        :formModel="formModel">
      </cancel-Ticket-Conffer>
      <certificate-Updatefer v-if="formModel.transCode === 'eweb-enterprise.CertUpdate'"
        :formModel="formModel">
      </certificate-Updatefer>
      <prompt-Acceptance-Reply-Conffer v-if="formModel.transCode === 'eweb-edraft.CdCurrentSignBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </prompt-Acceptance-Reply-Conffer>
      <prompt-Acceptance-Apply-Conffer v-if="formModel.transCode === 'eweb-edraft.AcceptApplicationBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </prompt-Acceptance-Apply-Conffer>
      <ensure-Apply-Conffer v-if="formModel.transCode === 'eweb-edraft.GuaranteeApplyBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </ensure-Apply-Conffer>
      <prompt-Payment-Signfor-Conffer v-if="formModel.transCode === 'eweb-edraft.FkCurrentSign'"
        :formModel="formModel">
      </prompt-Payment-Signfor-Conffer>
      <Prompt-AcceptanceReplySoloConffer v-if="formModel.transCode === 'eweb-edraft.CdCurrentSign'"
        :formModel="formModel">
      </Prompt-AcceptanceReplySoloConffer>
      <PayApply-RecallComfirmfer v-if="formModel.transCode === 'eweb-edraft.QcRevokeReq'"
        :formModel="formModel">
      </PayApply-RecallComfirmfer>
      <Ensure-ReplyConffer v-if="formModel.transCode === 'eweb-edraft.BzCurrentSignBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </Ensure-ReplyConffer>
      <Endorsement-TransferReplyConffer v-if="formModel.transCode === 'eweb-edraft.BsCurrentSignBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </Endorsement-TransferReplyConffer>
      <pledge-ReplyComfirmfer v-if="formModel.transCode === 'eweb-edraft.ZyCurrentSign'"
        :formModel="formModel">
      </pledge-ReplyComfirmfer>
      <pledge-ReplyBatchConfirmfer v-if="formModel.transCode === 'eweb-edraft.ZyCurrentSignBatch'"
        :tableData="tableData"
        :formModel="formModel">
      </pledge-ReplyBatchConfirmfer>
      <pledge-RecallComfirmfer v-if="formModel.transCode === 'eweb-edraft.ZyRevokeReq'"
        :formModel="formModel">
      </pledge-RecallComfirmfer>
      <PromptReceipt-ReplySoloConffer v-if="formModel.transCode === 'eweb-edraft.SpCurrentSign'"
        :formModel="formModel">
      </PromptReceipt-ReplySoloConffer>
      <Prompt-PaymentRejectionConffer v-if="formModel.transCode === 'eweb-edraft.JfCurrentSign'"
        :formModel="formModel">
      </Prompt-PaymentRejectionConffer>
      <Prompt-ReceiptRevokeConffer v-if="formModel.transCode === 'eweb-edraft.SpRevokeReq'"
        :formModel="formModel">
      </Prompt-ReceiptRevokeConffer>
      <Prompt-AcceptanceRevokeConffer v-if="formModel.transCode === 'eweb-edraft.CdRevokeReq'"
        :formModel="formModel">
      </Prompt-AcceptanceRevokeConffer>
      <Ensure-RevokeConffer v-if="formModel.transCode === 'eweb-edraft.BzRevokeReq'"
        :formModel="formModel">
      </Ensure-RevokeConffer>
      <Endorsement-TransferRevokeConffer v-if="formModel.transCode === 'eweb-edraft.BsRevokeReq'"
        :formModel="formModel">
      </Endorsement-TransferRevokeConffer>
      <endorsement-Transfer-Reply-SoloConffer v-if="formModel.transCode === 'eweb-edraft.BsCurrentSign'"
        :formModel="formModel">
      </endorsement-Transfer-Reply-SoloConffer>
      <leave-MessageConffer v-if="formModel.transCode === 'eweb-setting.MessageApplication'"
        :formModel="formModel">
      </leave-MessageConffer>
      <unlink-CreditCardfer v-if="formModel.transCode === 'eweb-transfer.CreditCardDel'"
        :formModel="formModel">
      </unlink-CreditCardfer>
      <financial-RedeemCancelConfirmfer v-if="formModel.transCode === 'eweb-invest.InvestProductRedCancle'"
        :formModel="formModel">
      </financial-RedeemCancelConfirmfer>
      <telephone-bank-application :formModel="formModel" v-if="formModel.transCode === 'eweb-setting.TelephoneBankApplication'"></telephone-bank-application>
      <div class="form-box">
        <div
          v-if="showBankSelection"
          width="100%"
          center
          >
          <div class="approval-level-settins" width="100%">
          <h2 class="title" align="center">审核详情</h2>
            <div class="table-container" width="100%">
              <el-table :data="this.paramsData.userList" border style="width: 100%;">
              <el-table-column prop="process" label="审批进度" align="center"></el-table-column>
              <el-table-column prop="message" label="审批意见" align="center"></el-table-column>
              <el-table-column prop="checkTime" label="审批时间" align="center"></el-table-column>
              <el-table-column prop="userId" label="操作员号" align="center"></el-table-column>
              <el-table-column prop="processState" label="审批状态" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="error-box" id="error-box"></ul>
    <div class="m-form-btn"><el-button class="m-cancel-btn" @click="onBack">返回</el-button></div>
  </d2-container>
</template>

<script>
import pledgeApplyComffer from './onlineBanking/pledgeApplyComffer'
import PromptPaymentApplySoloConffer from './onlineBanking/PromptPaymentApplySoloConffer'
import jiePledgeApplyComfirmfer from './onlineBanking/jiePledgeApplyComfirmfer'
import EndorsementTransferApplySoloConffer from './onlineBanking/EndorsementTransferApplySoloConffer'
import DiscountApplySoloConffer from './onlineBanking/DiscountApplySoloConffer'
import EnsureApplySoloConffer from './onlineBanking/EnsureApplySoloConffer'
import pledgeApplyComfirmfer from './onlineBanking/pledgeApplyComfirmfer'
import EndorsementTransferApplyConffer from './onlineBanking/EndorsementTransferApplyConffer'
import TicketRegistrationBatchConffer from './onlineBanking/TicketRegistrationBatchConffer'
import PromptReceiptApplySoloConffer from './onlineBanking/PromptReceiptApplySoloConffer'
import commonCurrentAccountConf from './onlineBanking/commonCurrentAccountConf'
import socialSecurityPaymentConffer from './onlineBanking/socialSecurityPaymentConffer'
import SingleTransfer from './onlineBanking/singleTransfer'
import periodicColSergerFer from './onlineBanking/periodicColSergerFer'
import collectPerSetFerAction from './onlineBanking/collectPerSetFerAction'
import confirmCurrentTofer from './onlineBanking/confirmCurrentTofer'
import maintenanceConfirmfer from './onlineBanking/maintenanceConfirmfer'
import sportsPayConffer from './onlineBanking/sportsPayConffer'
import fileUploadConffer from './onlineBanking/fileUploadConffer'
import openAccountConfer from './onlineBanking/openAccountConfer'
import rpWithdrawConffer from './onlineBanking/rpWithdrawConffer'
import autoFeeSignConfirmfer from './onlineBanking/autoFeeSignConfirmfer'
import creditCardPaymentsConffer from './onlineBanking/creditCardPaymentsConffer'
import smallRegularCreditBusfer from './onlineBanking/smallRegularCreditBusfer'
import transConffer from './onlineBanking/transConffer'
import comfirmAccountfer from './onlineBanking/comfirmAccountfer'
import openConffer from './onlineBanking/openConffer'
import innerCompanyTransConffer from './onlineBanking/innerCompanyTransConffer'
import financialPurchenConffer from './onlineBanking/financialPurchenConffer'
import confirmRegulaiDrawfer from './onlineBanking/confirmRegulaiDrawfer'
import financiaRedeemConfirmfer from './onlineBanking/financiaRedeemConfirmfer'
import timedCancelfer from './onlineBanking/timedCancelfer'
import smallLimitBorrowfer from './onlineBanking/smallLimitBorrowfer'
import batchTransferConffer from './onlineBanking/batchTransferConffer'
import baffleAccountConffer from './onlineBanking/baffleAccountConffer'
import bulkReimbursementConffer from './onlineBanking/bulkReimbursementConffer'
import multiLevelLedgerBalanceConfer from './onlineBanking/multiLevelLedgerBalanceConfer'
import adjustmentConfirmfer from './onlineBanking/adjustmentConfirmfer'
import withdrawConffer from './onlineBanking/withdrawConffer'
import transCancelfer from './onlineBanking/transCancelfer'
import roleConffer from './onlineBanking/roleConffer'
import setMultLeveLedgerRootsConfirmfer from './onlineBanking/setMultLeveLedgerRootsConfirmfer'
import mobilephoneBanlOpenStatusfer from './onlineBanking/mobilephoneBanlOpenStatusfer'
import opUpdateConffer from './onlineBanking/opUpdateConffer'
import financialCancelComfirmfer from './onlineBanking/financialCancelComfirmfer'
import linkCreditCardfer from './onlineBanking/linkCreditCardfer'
import confirmMoneyfer from './onlineBanking/confirmMoneyfer'
import certificateConfirmfer from './onlineBanking/certificateConfirmfer'
import multiLevelLedgerTransferConfirmfer from './onlineBanking/multiLevelLedgerTransferConfirmfer'
import passWordResetfer from './onlineBanking/passWordResetfer'
import LargeProductBuyfer from './onlineBanking/LargeProductBuyfer'
import depositWithdrawfer from './onlineBanking/depositWithdrawfer'
import approveProcessSetfer from './onlineBanking/approveProcessSetfer'
import cifAcLimitSettingfer from './onlineBanking/cifAcLimitSettingfer'
import creditCardDelfer from './onlineBanking/creditCardDelfer'
import batchBithholdingOfCardConffer from './onlineBanking/batchBithholdingOfCardConffer'
import TicketRegistrationInnerfer from './onlineBanking/TicketRegistrationInnerfer'
import generalCancellation from './onlineBanking/generalCancellation'
import PromptAcceptanceApplySoloConffer from './onlineBanking/PromptAcceptanceApplySoloConffer'
import generalSignInTransaction from './onlineBanking/generalSignInTransaction'
import withdrawalConffer from './onlineBanking/withdrawalConffer'
import depositConffer from './onlineBanking/depositConffer'
import noTaxPayConffer from './onlineBanking/noTaxPayConffer'
import autoFeeSignAlreadyfer from './onlineBanking/autoFeeSignAlreadyfer'
import agreePayApplyComfirmfer from './onlineBanking/agreePayApplyComfirmfer'
import EnsureReplySoloConffer from './onlineBanking/EnsureReplySoloConffer'
import PromptReceiptApplyConffer from './onlineBanking/PromptReceiptApplyConffer'
import PromptReceiptReplyConffer from './onlineBanking/PromptReceiptReplyConffer'
import raConfAgainfer from './onlineBanking/raConfAgainfer'
import jiePledgeReplyComfirmfer from './onlineBanking/jiePledgeReplyComfirmfer'
import informationConffer from './onlineBanking/informationConffer'
import pwdChangefer from './onlineBanking/pwdChangefer'
import discountApplyConffer from './onlineBanking/discountApplyConffer'
import discountRevokeConffer from './onlineBanking/discountRevokeConffer'
import jiePledgeRecallComfirmfer from './onlineBanking/jiePledgeRecallComfirmfer'
import promptPaymentRevokeConffer from './onlineBanking/promptPaymentRevokeConffer'
import timedCancelconfer from './onlineBanking/timedCancelconfer'
import checkBillConffer from './onlineBanking/checkBillConffer'
import CancelTicketConffer from './onlineBanking/CancelTicketConffer'
import certificateUpdatefer from './onlineBanking/certificateUpdatefer'
import PromptAcceptanceReplyConffer from './onlineBanking/PromptAcceptanceReplyConffer'
import PromptAcceptanceApplyConffer from './onlineBanking/PromptAcceptanceApplyConffer'
import EnsureApplyConffer from './onlineBanking/EnsureApplyConffer'
import PromptPaymentSignforConffer from './onlineBanking/PromptPaymentSignforConffer'
import PromptAcceptanceReplySoloConffer from './onlineBanking/PromptAcceptanceReplySoloConffer'
import PayApplyRecallComfirmfer from './onlineBanking/PayApplyRecallComfirmfer'
import EnsureReplyConffer from './onlineBanking/EnsureReplyConffer'
import EndorsementTransferReplyConffer from './onlineBanking/EndorsementTransferReplyConffer'
import pledgeReplyComfirmfer from './onlineBanking/pledgeReplyComfirmfer'
import pledgeReplyBatchConfirmfer from './onlineBanking/pledgeReplyBatchConfirmfer'
import pledgeRecallComfirmfer from './onlineBanking/pledgeRecallComfirmfer'
import PromptReceiptReplySoloConffer from './onlineBanking/PromptReceiptReplySoloConffer'
import PromptPaymentRejectionConffer from './onlineBanking/PromptPaymentRejectionConffer'
import PromptReceiptRevokeConffer from './onlineBanking/PromptReceiptRevokeConffer'
import PromptAcceptanceRevokeConffer from './onlineBanking/PromptAcceptanceRevokeConffer'
import EnsureRevokeConffer from './onlineBanking/EnsureRevokeConffer'
import EndorsementTransferRevokeConffer from './onlineBanking/EndorsementTransferRevokeConffer'
import EndorsementTransferReplySoloConffer from './onlineBanking/EndorsementTransferReplySoloConffer'
import agreePayReplyComfirmfer from './onlineBanking/agreePayReplyComfirmfer'
import leaveMessageConffer from './onlineBanking/leaveMessageConffer'
import unlinkCreditCardfer from './onlineBanking/unlinkCreditCardfer'
import payFor from './onlineBanking/payFor'
import payAssigne from './onlineBanking/payAssigne'
import financialRedeemCancelConfirmfer from './onlineBanking/financialRedeemCancelConfirmfer'
import telephoneBankApplication from './onlineBanking/telephoneBankApplication'
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { business_Type, operator_state, process_state } from '@/assets/js/entity'
// 要修改组件-打印this.tableData2.transCode-找到组件根据transcode确认交易名称
export default {
  name: 'onlineBankingLogDetail',
  components: {
    financialRedeemCancelConfirmfer,
    unlinkCreditCardfer,
    leaveMessageConffer,
    agreePayReplyComfirmfer,
    EndorsementTransferReplySoloConffer,
    EndorsementTransferRevokeConffer,
    EnsureRevokeConffer,
    PromptAcceptanceRevokeConffer,
    PromptReceiptRevokeConffer,
    PromptPaymentRejectionConffer,
    PromptReceiptReplySoloConffer,
    pledgeRecallComfirmfer,
    pledgeReplyBatchConfirmfer,
    pledgeReplyComfirmfer,
    EndorsementTransferReplyConffer,
    EnsureReplyConffer,
    PayApplyRecallComfirmfer,
    PromptAcceptanceReplySoloConffer,
    PromptPaymentSignforConffer,
    EnsureApplyConffer,
    PromptAcceptanceApplyConffer,
    PromptAcceptanceReplyConffer,
    certificateUpdatefer,
    CancelTicketConffer,
    checkBillConffer,
    timedCancelconfer,
    promptPaymentRevokeConffer,
    jiePledgeRecallComfirmfer,
    discountRevokeConffer,
    discountApplyConffer,
    pwdChangefer,
    informationConffer,
    jiePledgeReplyComfirmfer,
    raConfAgainfer,
    PromptReceiptReplyConffer,
    PromptReceiptApplyConffer,
    EnsureReplySoloConffer,
    agreePayApplyComfirmfer,
    pledgeApplyComffer,
    PromptPaymentApplySoloConffer,
    jiePledgeApplyComfirmfer,
    EndorsementTransferApplySoloConffer,
    DiscountApplySoloConffer,
    EnsureApplySoloConffer,
    pledgeApplyComfirmfer,
    EndorsementTransferApplyConffer,
    TicketRegistrationBatchConffer,
    PromptReceiptApplySoloConffer,
    commonCurrentAccountConf,
    autoFeeSignAlreadyfer,
    noTaxPayConffer,
    depositConffer,
    withdrawalConffer,
    socialSecurityPaymentConffer,
    SingleTransfer,
    confirmCurrentTofer,
    sportsPayConffer,
    fileUploadConffer,
    openAccountConfer,
    rpWithdrawConffer,
    autoFeeSignConfirmfer,
    creditCardPaymentsConffer,
    smallRegularCreditBusfer,
    transConffer,
    comfirmAccountfer,
    openConffer,
    innerCompanyTransConffer,
    financialPurchenConffer,
    confirmRegulaiDrawfer,
    financiaRedeemConfirmfer,
    timedCancelfer,
    smallLimitBorrowfer,
    batchTransferConffer,
    baffleAccountConffer,
    bulkReimbursementConffer,
    multiLevelLedgerBalanceConfer,
    adjustmentConfirmfer,
    withdrawConffer,
    transCancelfer,
    roleConffer,
    setMultLeveLedgerRootsConfirmfer,
    mobilephoneBanlOpenStatusfer,
    opUpdateConffer,
    financialCancelComfirmfer,
    linkCreditCardfer,
    confirmMoneyfer,
    certificateConfirmfer,
    multiLevelLedgerTransferConfirmfer,
    maintenanceConfirmfer,
    passWordResetfer,
    LargeProductBuyfer,
    payFor,
    payAssigne,
    depositWithdrawfer,
    approveProcessSetfer,
    cifAcLimitSettingfer,
    periodicColSergerFer,
    collectPerSetFerAction,
    creditCardDelfer,
    batchBithholdingOfCardConffer,
    TicketRegistrationInnerfer,
    generalCancellation,
    PromptAcceptanceApplySoloConffer,
    generalSignInTransaction,
    telephoneBankApplication
  },
  data () {
    return {
      data: {
        itemWidth: '4',
        resData: {
          group: [
            {
              label: '流水号',
              key: 'jnlNo'
            },
            {
              label: '交易状态',
              key: 'jnlState',
              formatter: (value) => util.handleEnums(operator_state, value)
            },
            {
              label: '交易名称',
              key: 'transCode',
              formatter: (value) => util.handleEnums(business_Type, value)
            },
            {
              label: '交易日期',
              key: 'date'
            },
            {
              label: '操作员姓名',
              key: 'userName'
            },
            {
              label: '操作员号',
              key: 'userId'
            }
          ]
        }
      },
      tableData: [],
      formModel: {
        jnlNo: '',
        transCode: '',
        jnlState: '',
        date: '',
        userName: '',
        userId: ''
      },
      topFormModel: {
        jnlNo: '',
        transCode: '',
        jnlState: '',
        date: '',
        userName: '',
        userId: ''
      },
      titleData: ['企业管理台', '网银日志查询'],
      showBankSelection: false,
      tableData1: [],
      tableData2: [],
      paramsData: {},
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      shownoder: false
    }
  },
  methods: {
    loginAndOut () {
      if (this.formModel.transCode === 'ent.MCLogout' || this.formModel.transCode === 'ent.MCLogin') {
        this.$router.push({
          name: 'logInAndLogOut',
          params: this.$route.params
        })
      }
    },
    queryInterBankJnl () {
      let params = {
        jnlNo: this.$route.params.formModel.jnlNo,
        prdId: this.$route.params.formModel.prdId,
        mgmtFlag: this.$route.params.formModel.mgmtFlags
      }
      // 登录登出跳出
      if (params.prdId === 'ent.MCLogout' || params.prdId === 'ent.MCLogin') {
        return
      }
      httpPost('/eweb-operator.QueryInterBankJnl.do', params).then(res => {
        // 给子组件赋值
        if (this.$route.params.formModel.transCode === 'eweb-enterprise.AutDedFeeRel') {
          this.tableData = res.bodyMap.relFeeList
        }
        if (this.$route.params.formModel.transCode === 'eweb-setting.ApproveProcessSet') {
          this.tableData = res.bodyMap.userList
        }
        this.formModel = res.bodyMap
        if (this.$route.params.formModel.transCode === 'eweb-setting.CheckPassOrRejForNMan' || this.$route.params.formModel.transCode === 'eweb-setting.CheckPassOrRej') {
          this.formModel.transCode = res.bodyMap.commonRequestHead.transCode
        } else {
          this.formModel.transCode = this.$route.params.formModel.transCode
        }
        // 审核详情是否显示
        if (res.taskInfo.length > 0) {
          const taskInfo = res.taskInfo
          if (taskInfo && Array.isArray(taskInfo)) {
            this.tableData1 = [...taskInfo]
          }
          let list = []
          this.tableData1.forEach(e => {
            let obj = {}
            obj.processId = String(e.processId)
            obj.checkTime = e.checkTime
            obj.message = e.message.split(',')[1]
            obj.process = e.message.split(',')[0]
            obj.userId = e.userId
            obj.processState = util.handleEnums(process_state, e.processState)
            list.push(obj)
          })
          this.paramsData.userList = list
          this.showBankSelection = true
        }
        // 操作详情内容
        this.tableData2 = res.bodyMap
        this.formModel.jnlNo = this.tableData2.globalJnlNo
        this.formModel.jnlState = this.$route.params.formModel.jnlState
        this.formModel.transCode = this.tableData2.transCode
        if (this.$route.params.formModel.makeTransTime) {
          this.formModel.date = this.$route.params.formModel.makeTransTime
        } else {
          this.formModel.date = this.$route.params.formModel.transTime
        }
        this.formModel.userName = this.tableData2.userName
        this.formModel.userId = this.tableData2.userId
        if (this.$route.params.formModel.transCode === 'eweb-transfer.SocialSecurityContribution' ||
        this.$route.params.formModel.transCode === 'eweb-cash.MultistageBookAuthSet') {
          this.tableData = res.bodyMap.list
          this.formModel.acNo = res.bodyMap.payerAccount.acNo
          this.formModel.acName = res.bodyMap.payerAccount.acName
        }
        if (this.$route.params.formModel.transCode === 'eweb-edraft.PromptChargeTicketBatch' ||
        this.tableData2.transCode === 'eweb-edraft.SpCurrentSignBatch' ||
        this.$route.params.formModel.transCode === 'eweb-edraft.PledgeReqBatch' ||
        this.tableData2.transCode === 'eweb-edraft.DiscountBatch' ||
        this.tableData2.transCode === 'eweb-edraft.GuaranteeApplyBatch' ||
        this.tableData2.transCode === 'eweb-edraft.BzCurrentSignBatch') {
          this.tableData = res.bodyMap.list
          this.formModel = res.bodyMap
        }
        if (this.$route.params.formModel.transCode === 'eweb-setting.CheckPassOrRej') {
          this.formModel = res.bodyMap
          this.tableData = res.bodyMap.userList
        }
        if (this.tableData2.transCode === 'eweb-transfer.Transfer') {
          this.formModel.payerBankDeptName = res.bodyMap.payerAccount.openBank
        }
        if (this.tableData2.transCode === 'eweb-edraft.PromptChargeTicketBatch' ||
        this.tableData2.transCode === 'eweb-edraft.CdCurrentSignBatch' ||
        this.tableData2.transCode === 'eweb-edraft.AcceptApplicationBatch' ||
        this.tableData2.transCode === 'eweb-edraft.PledgeReqBatch' ||
        this.tableData2.transCode === 'eweb-edraft.BsCurrentSignBatch' ||
        this.tableData2.transCode === 'eweb-edraft.ZyCurrentSignBatch' ||
        this.tableData2.transCode === 'eweb-edraft.EndorsedTransferBatch') {
          this.tableData = res.bodyMap.list
          this.formModel = res.bodyMap
        }
        if (this.tableData2.transCode === 'eweb-edraft.IssueRegisterBatch') {
          this.tableData = res.bodyMap.list
          this.formModel = res.bodyMap
        }
        console.log('111', this.tableData2.transCode)
        this.shownoder = true
      })
    },
    onBack () {
      this.$router.push({
        name: 'onlineBankingLog'
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.topFormModel = this.$route.params.formModel
      this.topFormModel.date = this.topFormModel.makeTransTime || this.topFormModel.transTime
      if (this.$route.params.formModel) {
        this.loginAndOut()
        if (this.topFormModel.transCode !== 'ent.MCLogout' &&
            this.topFormModel.transCode !== 'ent.MCLogin' &&
            this.topFormModel.transCode !== 'eweb-setting.TelephonePswReset') {
          this.queryInterBankJnl()
        }
        console.log(this.topFormModel.transCode)
      } else {
        this.onBack()
      }
    })
  }
}
</script>

<style scoped>
.title{
  padding-top: 20px;
}
.m-form-res{
  box-shadow: none !important;
  border: 0px solid #EEEEEE !important;
}
.form-box /deep/ .m-form-res-show{
  padding: 0 !important;
}
.m-form-btn{
  background: #f8f8f8 !important;
}
</style>
