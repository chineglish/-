<template>
  <div>
    <m-breadcrumb :data="data"></m-breadcrumb>
    <div>
      <!-- <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :first-col-index="firstColIndex"
        @handleCurrentChange="handleSelectionChange"
      ></d-table> -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        row-key="ledgerNo">
        <el-table-column label="选择" width="55">
          <template>
            <el-radio v-model="radio" label=""></el-radio>
          </template>
        </el-table-column>
        <el-table-column
            label="操作员号"
            prop="userId">
        </el-table-column>
        <el-table-column
            label="操作员姓名"
            prop="userName">
        </el-table-column>
        <el-table-column
            label="USBKeyID"
            prop="keyId">
        </el-table-column>
        <el-table-column
            label="起始日期"
            prop="beginDate">
        </el-table-column>
        <el-table-column
            label="到期日期"
            prop="expireDate">
        </el-table-column>
        <el-table-column
            label="证书状态"
            prop="certState">
          <template slot-scope="scope">{{certState(scope.row.certState)}}</template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 10px 0;">
        <!-- :disabled="disabled" -->
        <el-button size="medium"  @click="gopayment" class="upDateBtn fs18">更新</el-button>
      </div>
      <m-hint-box :msgs="msgs"></m-hint-box>
    </div>
  </div>
</template>

<script type="text/javascript">
import { httpPost } from '../../../api/sys/http'
import { cert_state } from '@/assets/js/entity'
import { getSignCertInfo } from '@/assets/js/SignMsg.js'
import util from '@/libs/util'

export default {
  name: 'certificateUpdate',
  data: function () {
    return {
      disabled: true,
      radio: '',
      firstColIndex: {
        type: 'radio',
        label: '选择'
      },
      msgs: [
        '可实现对操作员证书的更新管理。'
      ],
      clientCertDN: '',
      data: ['企业管理', '证书管理', '证书更新'],
      // 以下为动态数据
      tableData: []
    }
  },
  methods: {
    certState (certState) {
      return util.handleEnums(cert_state, certState)
    },
    CertInfoQry () {
      httpPost('/eweb-enterprise.CertInfoQry.do', {
      }).then(res => {
        this.tableData = res.list
        if (this.tableData[0].promptFlag === '1') {
          this.disabled = false
        }
      })
    },
    CertUpdate (data) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        httpPost('/eweb-enterprise.CertUpdate.do', {
          _tokenName: token._tokenName,
          _dataMapKey: data._dataMapKey,
          clientCertDN: this.clientCertDN
        }).then(res => {
          this.$router.push({
            name: 'certificateUpdateRes',
            params: { res }
          })
        }).catch(res => {
        })
      })
    },
    gopayment () {
      if (util.getLoginType() !== 'C') {
        this.clientCertDN = getSignCertInfo('SubjectDN')
      }
      if (this.clientCertDN !== 'uninstall') {
        httpPost('/eweb-enterprise.CertUpdateConfirm.do', {
          clientCertDN: this.clientCertDN
        }).then(res => {
          this.CertUpdate(res)
        })
      }
    }
  },
  created () {
    this.CertInfoQry()
  }
}
</script>
<style lang="scss" scope>
  .upDateBtn {
    padding: 8px 38px !important;
    border-radius: 6px !important;
    background:  #BB0B0D !important;
    background-image: linear-gradient(0deg, #530001 0%, #7D0405 17%, #BB0B0D 86%, #FFA1A3 100%) !important;
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#7D0405',endColorStr='#BB0B0D',gradientType='1');
    color: #fff !important;
    border-color: #cc444d !important;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table th{
    background: rgb(253, 242, 243);
    color: rgb(61, 60, 60);
  }
  .el-button.is-disabled{
    // 兼容IE9
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#c6c6c6',endColorStr='#c6c6c6',gradientType='1');
  }
</style>
