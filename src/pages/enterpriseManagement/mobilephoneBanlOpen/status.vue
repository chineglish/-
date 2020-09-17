<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="msgs"
              @submit="submit"
              @back="back">
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'mobilephoneBanlOpenStatus',
  data () {
    return {
      titleData: ['企业管理台 ', '手机银行开通'],
      msgs: [
        '可实现企业用户开通手机银行。'
      ],
      formModel: {
        isOpenMchFlag: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '开通状态',
                'type': 'text',
                'key': 'isOpenMchFlag',
                formatter: (key, value) => {
                  return value === 'EMBS' ? '已开通' : '未开通'
                }
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '开通', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (data) {
      httpPost('/eweb-setting.MobilphoneBankApplicationConfirm.do', {
        userSeq: data.userSeq,
        mchannelId: data.mchannelId
      }).then(conf => {
        httpPost('/eweb-common.GenToken.do').then(token => {
          const singMsg = this.isSign({ _Data2Sign: conf._Data2Sign, _authenticateType: conf._authenticateType })
          httpPost('/eweb-setting.MobilphoneBankApplication.do', {
            userSeq: data.userSeq,
            mchannelId: data.mchannelId,
            _dataMapKey: conf._dataMapKey,
            _authenticateTypeChoose: conf._authenticateType ? conf._authenticateType[0] : '',
            CSIISignature: singMsg,
            _tokenName: token._tokenName
          }).then(res => {
            this.$router.push({
              name: 'mobilephoneBanlOpenRes',
              params: {
                res,
                _JnlStatus: '1',
                formModel: {
                  transName: '手机银行开通',
                  submitTime: res._transTime,
                  operatorName: this.getUser().userName,
                  operatorNum: this.getUser().userId
                }
              }
            })
          })
        })
      })
    },
    back () {
      this.$router.push('/index')
    }
  },
  created () {
    httpPost('/eweb-setting.MobilphoneBankQuery.do', {
      mChannelId: 'EMBS'
    }).then(res => {
      if (res.mChannels.length > 0) {
        this.formModel.isOpenMchFlag = res.mChannels[0]
        if (this.formModel.isOpenMchFlag === 'EMBS') {
          this.btnData = []
        }
      }
    })
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
