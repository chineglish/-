<template>
  <div>
    <div class="form-box">
      <m-new-form
              :componentJson="formConfigJson"
              :formModel="formModel">
      </m-new-form>
    </div>
  </div>
</template>
<script>
/**
 *@name: 定期通开户-确认
 * @author: 梁文彬
 * @date: 2019-12-20
 */
// import { httpPost } from '@/api/sys/http'
import { id_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'openConffer',
  data () {
    const userState = [
      { value: 'N', label: '正常' },
      { value: 'C', label: '销户' },
      { value: 'L', label: '锁定' },
      { value: 'U', label: '待激活' },
      { value: 'F', label: '冻结' },
      { value: 'S', label: '停用' },
      { value: 'T', label: '手机银行首次登录' }
    ]
    return {
      // titleData: ['理财服务 ', '定期通', '定期通开户'],
      formConfigJson: {
        // stepsActive: 1,
        formItems: [
          {
            formWidth: '100%',
            title: '操作员管理',
            // labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '操作员编号',
                'type': 'text',
                'key': 'userId'
              }, {
                'disabled': true,
                'label': '操作员姓名',
                'type': 'text',
                'key': 'userName'
              }, {
                'disabled': true,
                'label': '操作员状态',
                'type': 'text',
                'key': 'userState',
                formatter: (row, colunm, cellValue, index) => util.handleEnums(userState, cellValue)
              }, {
                'disabled': true,
                'label': '是否为管理员',
                'type': 'text',
                'key': 'isAdminUser'
              }, {
                'disabled': true,
                'label': '是否开通手机银行',
                'type': 'text',
                'key': 'isOpenEmbs',
                formatter: (row, colunm, cellValue, index) => cellValue === 'Y' ? '是' : '否'
              }, {
                'disabled': true,
                'label': '证件类型',
                'type': 'text',
                'key': 'idType',
                formatter: (row, colunm, cellValue, index) => util.handleEnums(id_type, cellValue)
              }, {
                'disabled': true,
                'label': '证件号码',
                'type': 'text',
                'key': 'idNo'
              }, {
                'disabled': true,
                'label': '对账联系人',
                'type': 'text',
                'key': 'contactName'
              }, {
                'disabled': true,
                'label': '联系人电话',
                'type': 'text',
                'key': 'contactTel'
              }, {
                'disabled': true,
                'label': '联系人手机',
                'type': 'text',
                'key': 'contactMobile'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
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
