<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        :msgs="promptList"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>

import { httpPost } from '@/api/sys/http'
import { id_type } from '@/assets/js/entity'
import util from '@/libs/util'

export default {
  name: 'maintenanceConfirm',
  data () {
    return {
      titleData: ['企业管理台', '企业信息维护'],
      promptList: [
        '1.如果交易出现异常情况，请立即查询“账户明细”确认交易是否成功。'
      ],
      formModel: {
        // officeAddress: '',
        addr: '',
        postCode: '',
        name: '',
        idType: '',
        idNo: '',
        telphone: '',
        mobile: '',
        email: ''
      },
      formConfigJson: {
        stepsActive: 1,
        formItems: [
          {
            formWidth: '50%',
            group: [
              {
                'disabled': true,
                'label': '通讯地址',
                'type': 'text',
                'key': 'detailAddress'
              },
              {
                'disabled': true,
                'label': '邮编',
                'type': 'text',
                'key': 'postCode'
              },
              {
                'disabled': true,
                'label': '联系人姓名',
                'type': 'text',
                'key': 'name'
              },
              {
                'disabled': true,
                'label': '联系人证件类型',
                'type': 'text',
                'key': 'idType',
                formatter: (key, value) => util.handleEnums(id_type, value)
              },
              {
                'disabled': true,
                'label': '联系人证件号码 ',
                'type': 'text',
                'key': 'idNo'
              },
              {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'telphone'
              },
              {
                'disabled': true,
                'label': '联系人手机 ',
                'type': 'text',
                'key': 'mobile'
              },
              {
                'disabled': true,
                'label': '联系人Email地址',
                'type': 'text',
                'key': 'email'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    submit (res) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        httpPost('/eweb-enterprise.UpdEcorgInfo.do', {
          cityCode: res.city,
          _tokenName: token._tokenName,
          _dataMapKey: res._dataMapKey,
          cityAreaCode: res.area,
          addr: res.detailAddress,
          postCode: res.postCode,
          name: res.name,
          idType: res.idType,
          idNo: res.idNo,
          telePhone: res.telphone,
          mobile: res.mobile,
          email: res.email
        }).then(result => {
          this.$router.push({
            name: 'maintenanceRes',
            params: {
              formModel: res,
              result: result
            }
          })
        })
      })
    },
    back () {
      this.$router.push({
        name: 'maintenancePage'
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
    } else {
      this.back()
    }
  }
}
</script>
