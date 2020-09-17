<template>
  <d2-container>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :formModel="formModel"
        :btnData="btnData"
        @back="onBack"
        >
      </m-new-form>
    </div>
  </d2-container>
</template>

<script>
import { jnlTrsStatus, filedsName, consignFlag_Type } from '@/assets/js/entity'
import { httpPost } from '@/api/sys/http'
import util from '../../../libs/util'
export default {
  name: 'oldEnterprise0nlineBanking',
  data () {
    return {
      formConfigJson: {
        formWidth: '50%',
        formItems: [
          {
            title: '老网银日志信息查询',
            group: [
              {
                'disable': true,
                'type': 'text',
                'label': '交易流水号',
                'key': '_AuthJnlNo'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易状态',
                'key': 'Trsstatus',
                formatter: (key, value) => util.handleEnums(jnlTrsStatus, value)
              },
              {
                'disable': true,
                'type': 'text',
                'label': '录入时间',
                'key': 'dateTime'
              },
              {
                'disable': true,
                'type': 'text',
                'label': '录入员',
                'key': 'RecordUserId',
                'show': true
              },
              {
                'disable': true,
                'type': 'text',
                'label': '审核员',
                'key': 'CheckList',
                'show': true
              },
              {
                'disable': true,
                'type': 'text',
                'label': '交易授权码',
                'key': 'PagePasswd',
                'show': false
              }
            ]
          }
        ]
      },
      formModel: {
        CheckList: ''
      },
      titleData: ['企业管理台', '老网银日志查询详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    queryInterBankJnl () {
      let params = {
        date: this.$route.params.formModel.date,
        jnlNo: this.$route.params.formModel.jnlNo
      }
      httpPost('/eweb-operator.QryOldJnlDetail.do', params).then(res => {
        this.formModel = res
        if (res._TransName === 'FE070202') {
          this.formConfigJson.formItems[0].group[3].show = false
          this.formConfigJson.formItems[0].group[4].show = false
        } else {
          let ordList = ''
          res.CheckList.forEach(item => {
            ordList = item.UserId + '/' + ordList
          })
          this.formModel.CheckList = ordList.substring(0, ordList.length - 1)
        }
        if (res.PagePasswd !== '' && res.PagePasswd !== null) {
          this.formConfigJson.formItems[0].group[4].show = true
        }
        if (res.Trsstatus <= '99' && res.Trsstatus >= '0' && res.Trsstatus === 'TS') {
          this.formModel.Trsstatus = res.Trsstatus
        }
        if (res.Status === '0' && res.Status === '9') {
          this.formModel.Trsstatus = res.Status
        }
        if (res._JnlData) {
          let key = Object.keys(res._JnlData)
          let values = Object.values(res._JnlData)
          key.forEach((item, index) => {
            const label = util.handleEnums(filedsName, item)
            if (values[index] === null) {
              return
            }
            if (label !== '---') {
              this.formConfigJson.formItems[0].group.push({
                'disable': true,
                'label': label,
                'key': item,
                'type': 'text'
              })
              if (values[index].type === 'java.lang.String') {
                if (item === 'BankType') {
                  this.formModel[item] = util.handleEnums(consignFlag_Type, values[index].data)
                } else {
                  this.formModel[item] = values[index].data
                }
              }
              if (values[index].type === 'java.math.BigDecimal') {
                this.formModel[item] = util.formatCurrency(values[index].data)
              }
            }
          })
        }
      })
    },
    onBack () {
      this.$router.push({
        name: 'oldjnlqry',
        params: this.$route.params
      })
    }
  },
  created () {
    this.$route.params.formModel.date = util.separationStrDateWithLine(this.$route.params.formModel.date)
    this.queryInterBankJnl()
  }
}
</script>
