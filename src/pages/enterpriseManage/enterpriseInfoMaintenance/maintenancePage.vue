<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              :msgs="promptList"
              @submit="onSubmit">
            </m-new-form>
        </div>
    </div>
</template>
<script>

import { id_type } from '@/assets/js/entity'
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'

export default {
  name: 'maintenancePage',
  data () {
    return {
      provinces: [],
      cities: [],
      areas: [{
        areaCd: '1',
        areaName: '15'
      }, {
        areaCd: '2',
        areaName: '16'
      }],
      titleData: ['企业管理台', '企业信息维护'],
      promptList: [
        '1.如果交易出现异常情况，请立即查询“账户明细”确认交易是否成功。'
      ],
      province: '',
      city: '',
      area: '',
      formModel: {
        // officeAddress: '',
        detailAddress: '',
        postCode: '',
        name: '',
        idType: '',
        idNo: '',
        telphone: '',
        mobile: '',
        email: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          // officeAddress: [{ required: true, message: '请输入办公地址', trigger: 'change' }],
          detailAddress: [{ required: true, message: '请输入通讯地址', trigger: 'change' }],
          postCode: [{ validator: (rule, value, callback) => util.verifyPostcode(value, callback), trigger: 'submit' }],
          name: [{ required: false, message: '请输入联系人姓名', trigger: 'change' }],
          idType: [{ required: false, message: '请输入联系人证件类型', trigger: 'change' }],
          idNo: [{ required: false, message: '请输入联系人证件号码', trigger: 'change' }],
          telphone: [{ validator: (rule, value, callback) => util.verifyTelePhone(value, callback), trigger: 'submit' }],
          mobile: [{ required: true, message: '请输入联系人手机号', trigger: 'submit' }, {
            validator: (rule, value, callback) => util.verifyMobile(value, callback), trigger: 'submit'
          }],
          email: [{ validator: (rule, value, callback) => util.verifyEmail(value, callback), trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '60%',
            group: [
              {
                'disabled': false,
                'label': '通讯地址',
                'type': 'input',
                'key': 'detailAddress'
              },
              {
                'disabled': false,
                'label': '邮编',
                'type': 'input',
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
                'disabled': false,
                'label': '联系人电话',
                'type': 'telePhone',
                'key': 'telphone'
              },
              {
                'disabled': false,
                'label': '联系人手机 ',
                'type': 'input',
                'key': 'mobile'
              },
              {
                'disabled': false,
                'label': '联系人email地址',
                'type': 'input',
                'key': 'email'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    onSubmit (res) {
      res.province = this.province
      res.city = this.city
      res.area = this.area
      res.provinces = this.provinces
      res.cities = this.cities
      res.areas = this.areas
      httpPost('/eweb-enterprise.UpdEcorgInfoConfirm.do').then(conf => {
        res._dataMapKey = conf._dataMapKey
        this.$router.push({ name: 'maintenanceConfirm', params: { formModel: res } })
      })
    }
  },
  created () {
    if (this.$route.params.formModel) {
      this.formModel = Object.assign(this.$route.params.formModel)
      this.provinces = this.formModel.provinces
      this.cities = this.formModel.cities
      this.areas = this.formModel.areas
      this.province = this.formModel.province
      this.city = this.formModel.city
      this.area = this.formModel.area
    } else {
      this.formModel = Object.assign(this.$route.params)
    }
  }
}
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
    .address{
        width: 87%;
        display: flex;
        justify-content: space-around;
    }
    .address >>> .el-select{
        width: 20%!important;
    }
</style>
