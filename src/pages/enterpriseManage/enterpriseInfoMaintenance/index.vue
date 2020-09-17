<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        :msgs="msgs"
        @back="back"
        @submit="submit">
      </m-new-form>
    </div>
  </div>
</template>
<script>

import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { id_type } from '@/assets/js/entity'
import { mapMutations } from 'vuex'

export default {
  name: 'enterpriseInfoMaintenance',
  data () {
    return {
      titleData: ['企业管理台', '企业信息维护'],
      msgs: [
        '可实现企业用户修改企业详细信息的操作。'
      ],
      formModel: {
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
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '60%',
            group: [
              {
                'disabled': true,
                'label': '通讯地址',
                'type': 'text',
                'key': 'addr'
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
                'key': 'idTypeShow'
              },
              {
                'disabled': true,
                'label': '联系人证件号码 ',
                'type': 'text',
                'key': 'idNo',
                formatter: (key, value) => util.hideMsg(value, 6, 4)
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
        { btnText: '修改', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    submit (res) {
      this.$router.push({
        name: 'maintenancePage',
        params: res
      })
    },
    back (res) {
      this.$router.push('/index')
    }
  },
  created () {
    httpPost('/eweb-enterprise.QryEcorgInfo.do').then(res => {
      this.formModel = res
      this.formModel.detailAddress = res.addr
      this.formModel.idTypeShow = util.handleEnums(id_type, this.formModel.idType)
      this.removeKeepAliveList()
    })
  }
}
</script>
