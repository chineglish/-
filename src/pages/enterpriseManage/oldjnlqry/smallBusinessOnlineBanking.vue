<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      :btnData="btnData"
      @back="onBack"
      >
    </m-new-form>
  </div>
</template>
<script>
/**
 *@name: 小企业
 * @author: 陈天浩
 * @date: 2020
 */
import util from '@/libs/util'
import { httpPost } from '@/api/sys/http'
import { trsEntity, jnlTrsStatus } from '@/assets/js/entity'
// import { httpPost } from '@/api/sys/http'
export default {
  name: 'smallBusinessOnlineBanking',
  data () {
    return {
      formModel: {
      },
      formConfigJson: {
        formItems: [
          {
            formWidth: '100%',
            title: '小企业网银查询 > 交易信息',
            group: [
              {
                'disabled': true,
                'label': '操作名称',
                'type': 'text',
                'key': '_TransName',
                'show': true,
                formatter: (key, value) => util.handleEnums(trsEntity, value)
              },
              {
                'disabled': true,
                'label': '交易状态',
                'type': 'text',
                'key': 'trsStatus',
                formatter: (key, value) => util.handleEnums(jnlTrsStatus, value)
              },
              {
                'disabled': true,
                'label': '交易流水号',
                'type': 'text',
                'key': '_AuthJnlNo'
              },
              {
                'disabled': true,
                'label': '操作日期',
                'type': 'text',
                'key': 'dateTime',
                'show': true
              }
            ]
          }
        ]
      },
      titleData: ['企业管理台', '小企业网银日志查询详情'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    judgmentResult () {
      let params = {
        date: this.$route.params.formModel.date,
        jnlNo: this.$route.params.formModel.jnlNo,
        tableName: this.$route.params.formModel.tableName
      }
      httpPost('/eweb-operator.QryOldJnlDetail.do', params).then(res => {
        if (res.tableName !== 'jnl') {
          this.formConfigJson.formItems[0].group[0].show = false
          this.formConfigJson.formItems[0].group[3].show = false
        }
        this.formModel = res
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
    if (this.$route.params) {
      Object.assign(this.formModel, this.$route.params)
      this.$route.params.formModel.date = util.separationStrDateWithLine(this.$route.params.formModel.date)
      this.judgmentResult()
    }
  }
}
</script>

<style scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
}
</style>
