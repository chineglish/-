<template>
  <d2-container>
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <d-form-previewer
      :title-config="titleConfig"
      :form-struction="formStruction"
      :form-model="formModel"
      :action-data="actionData">
      <div class="footer" slot="footer">
        <ul class="list fs14">
          <li class="item" :key="idx" v-for="(item, idx) in others">
            <span class="label">{{item.label}}</span>：<span class="value">{{item.value}}</span>
          </li>
        </ul>
      </div>
    </d-form-previewer>
  </d2-container>
</template>

<script>
import { downloadFile } from '@/api/sys/http'
import util from '@/libs/util'

export default {
  name: 'migrant-workers-security-deposit-download',

  data () {
    return {
      breadcrumb: ['账户管理', '农民工保证金查询', '详情页'],
      titleConfig: {
        title: '到账通知单',
        textAlign: 'center'
      },
      formStruction: {
        groups: [
          {
            formItems: [
              {
                label: '单位名称',
                fieldName: 'dwmc'
              },
              {
                label: '项目名称',
                fieldName: 'xmmc'
              },
              {
                label: '账户',
                fieldName: 'zh'
              },
              {
                label: '金额',
                fieldName: 'jyje',
                formatter: (fieldName, fieldValue) => util.formatCurrency(fieldValue)
              },
              {
                label: '交易币种',
                fieldName: 'field7'
              },
              {
                label: '交易日期',
                fieldName: 'jyrq'
              },
              {
                label: '文书编号',
                fieldName: 'wsbh'
              },
              {
                label: '摘要',
                fieldName: 'zhsmt'
              },
              {
                label: '交易机构代码',
                fieldName: 'jyjg'
              },
              {
                label: '交易机构名称',
                fieldName: 'jgmc'
              }
            ]
          }
        ]
      },
      formModel: {},
      actionData: [
        { btnText: '下载', class: 'm-submit-btn', handler: this.downloadHandler },
        { btnText: '返回', class: 'm-cancel-btn', handler: this.backHandler }
      ],
      others: []
    }
  },

  methods: {
    downloadHandler (data) {
      const params = {
        ...data,
        _Download: 'xls'
      }
      downloadFile('/eweb-special.MigrantWorkerDepositInfoDetDown.do', params)
    },

    backHandler () {
      // this.$router.back()
      this.$router.push({
        name: 'migrantWorkersSecurityDepositQry',
        params: {
          formModel: this.$route.params.formModel
        }
      })
    }
  },

  created () {
    const params = this.$route.params || {}
    this.formModel = { ...params.securityDeposit, field7: '人民币' } || {}
    const now = new Date()
    this.others = [
      {
        label: '流水号',
        value: this.formModel.lsh
      },
      {
        label: '下载日期',
        value: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    padding: 32px 18px;

    .list {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      color: #333;
      font-weight: bold;
      letter-spacing: 0;

      .item {
        margin-right: 28px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
