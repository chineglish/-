<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @goSign="goSign"
        @goUpdate="goUpdate"
        >
      </m-new-form>
    </div>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
import { mapMutations } from 'vuex'
export default {
  name: 'notSign',
  data () {
    return {
      titleData: ['企业管理台', '证书管理', '证书自动扣费签约'],
      formModel: {
        payName: ''
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '40%',
            group: [
              {
                'disabled': true,
                'label': '签约状态',
                'type': 'text',
                'key': 'payName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '签约', class: 'm-submit-btn', clickEventName: 'goSign', disabled: false },
        { btnText: '维护', class: 'm-submit-btn', clickEventName: 'goUpdate', disabled: false }
      ]
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    whetherSign () {
      httpPost('/eweb-enterprise.AutDedFeeSignQry.do', { signFlag: '2' }).then(res => { // 查询签约的
        if (res.userSignNum === 0) {
          this.formModel.payName = '未签约'
          this.btnData[1].disabled = true
        } else if (res.userNoSignNum === 0) {
          this.formModel.payName = '全部签约'
          this.btnData[0].disabled = true
        } else {
          this.formModel.payName = '部分签约'
        }
      })
    },
    goSign (res) {
      this.removeKeepAliveList() // 清除页面缓存
      this.$router.push({
        name: 'innerSign'
      })
    },
    goUpdate (res) {
      this.$router.push({
        name: 'autoFeeSignAlready'
      })
    }
  },
  created () {
    this.whetherSign()
  }
}
</script>
