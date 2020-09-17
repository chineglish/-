<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkQueryDetails',
  data () {
    return {
      titleData: ['企业管理台', '管理类交易查询', '审核记录查询'],
      formModel: {
        operaName: '小馋猫食品有限公司',
        operaNum: '测试公司',
        IdType: '二代身份证',
        IdNum: '35747566488494',
        sex: '男',
        tel: '8782333',
        phone: '15077430000',
        manegeMan: '是',
        email: '11587778778@qq.com',
        payWaterAccount: '183498109302139',
        payName: '操作员管理',
        useFunction: '转账',
        add: 'XXXXXX',
        makeMan: '张三',
        makeDate: '2020-01-25',
        operaType: [],
        operaAccount: [],
        idea: '拒绝',
        refuse: '交易金额有误'
      },
      formConfigJson: {
        rules: {
          operaType: [{ required: true, message: '请选择', trigger: 'change' }],
          operaAccount: [{ required: true, message: '请选择', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '操作员号',
                'type': 'text',
                'key': 'operaNum'
              },
              {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'operaName'
              },
              {
                'disabled': true,
                'label': '证件类型',
                'type': 'text',
                'key': 'IdType'
              },
              {
                'disabled': true,
                'label': '证件号码',
                'type': 'text',
                'key': 'IdNum'
              },
              {
                'disabled': true,
                'label': '性别',
                'type': 'text',
                'key': 'sex'
              },
              {
                'disabled': true,
                'label': '联系电话',
                'type': 'text',
                'key': 'tel'
              },
              {
                'disabled': true,
                'label': '手机号码',
                'type': 'text',
                'key': 'phone'
              },
              {
                'disabled': true,
                'label': 'Email地址',
                'type': 'text',
                'key': 'email'
              },
              {
                'disabled': true,
                'label': '是否管理员',
                'type': 'text',
                'key': 'manegeMan'
              },
              {},
              {
                'disabled': true,
                'label': '交易流水号',
                'type': 'text',
                'key': 'payWaterAccount'
              },
              {
                'disabled': true,
                'label': '交易名称',
                'type': 'text',
                'key': 'payName'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'disabled': false,
                'label': '操作员角色',
                'type': 'checkbox',
                'options': [{ 'value': '默认管理员', 'key': '2' }, { 'value': '默认录入员', 'key': '3' }],
                'key': 'operaType'
              },
              {
                'disabled': false,
                'label': '可操作账户',
                'type': 'checkbox',
                'options': [{ 'value': '03001078347 ／小馋猫食品公司／金州支行   任意转出', 'key': '2' }, { 'value': '03001078347 ／小馋猫食品公司／金州支行   指定收款人', 'key': '3' }, { 'value': '03001078347 ／小馋猫食品公司／金州支行   指定收款', 'key': '1' }],
                'key': 'operaAccount'
              }
            ]
          },
          {
            formWidth: '50%',
            labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '制单人',
                'type': 'text',
                'key': 'makeMan'
              },
              {
                'disabled': true,
                'label': '制单日期',
                'type': 'text',
                'key': 'makeDate'
              }
            ]
          },
          {
            formWidth: '100%',
            labelWidth: '16.5%',
            group: [
              {
                'disabled': false,
                'label': '审核意见',
                'type': 'text',
                'key': 'idea'
              },
              {
                'disabled': false,
                'label': '拒绝原因',
                'type': 'text',
                'key': 'refuse'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    // 返回
    back (res) {
      this.$router.push({
        name: 'manageTransactionCheck'
        // params: {
        //   formModel: res
        // }
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .form-box{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    margin-top: 20px;
  }
</style>
