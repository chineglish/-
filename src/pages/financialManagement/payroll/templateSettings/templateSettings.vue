<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
          <d-table
            :table-data="tableData"
            :firstColIndex="firstColIndex"
            :tableHeadData="tableHeadData"
            :actionData="actionData"
            @handleCurrentChange="tableSelectChange"
            @download="download"
            @newTemplate="newTemplate"
            @modifyTemplate="modifyTemplate"
            @deleteTemplate="deleteTemplateConf"
          >
          </d-table>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
  * @name: 模板设置
  * @author: 邓焕
  * @date: 2019-12-13
  */
import { httpPost, downloadFile } from '@/api/sys/http'

export default {
  name: 'templateSettings',
  data () {
    return {
      selected: [],
      promptList: [
        '1.模板设置时，“应发项目”和“应扣项目”中显示的都是默认项，可对默认项就行编辑、修改。模板设置完成后，下载并打开模板，所选项显示顺序从左至右依次为:固定项(序号、账号、户名、实发金额)、应发项目、应扣项目。应发项目和应扣项目在模板中从左至右显示顺序为模板设置时从上到下的顺序。',
        '2.系统最多保存五个模板。'
      ],
      filename: __filename,
      breadData: ['财务管理', '代发工资', '模板设置'],
      firstColIndex: {
        label: '选择',
        type: 'radio',
        width: 'auto'
      },
      tableHeadData: [
        { label: '模板序号', prop: 'templateNo' },
        { label: '模板名称', prop: 'templateName' }
      ],
      tableData: [],
      routerData: {
        JnlStatus: '',
        tradeName: '代发工资模板删除',
        transactionDate: ''
      },
      actionData: [
        {
          btnText: '新增模板',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'newTemplate'
        },
        {
          btnText: '查看/修改模板',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'modifyTemplate'
        },
        {
          btnText: '删除模板',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'deleteTemplate'
        },
        {
          btnText: '模板下载',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'download'
        }
      ]
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    newTemplate () {
      this.$router.push({
        name: 'newTemplate'
      })
    },
    modifyTemplate () {
      if (this.selected.templateNo) {
        this.$router.push({
          name: 'modifyTemplate',
          params: this.selected
        })
      } else {
        this.$msg('请选择一条模板')
      }
    },
    deleteTemplateConf () {
      if (this.selected.templateNo) {
        this.$alert('是否确认删除该模板').then(() => {
          this.deleteTemplate()
        })
      } else {
        this.$msg('请选择一条模板')
      }
    },
    deleteTemplate () {
      //  发送接口删除选择中的模板
      httpPost('/eweb-common.GenToken.do').then(token => {
        let params = {
          _tokenName: token._tokenName,
          templateNo: this.selected.templateNo
        }
        httpPost('/eweb-transfer.PaySalaryTemplateDel.do', params).then(res => {
          this.routerData.transactionDate = res._transTime
          this.routerData.JnlStatus = res._processState
          Object.assign(this.routerData, res)
          this.$router.push({
            name: 'deleteTemplate',
            params: this.routerData
          })
        })
      })
    },
    download (res) {
      //  下载
      if (this.selected.templateNo) {
        const data = {
          templateNo: this.selected.templateNo,
          Download: 'xls'
        }
        downloadFile('/eweb-transfer.PaySalaryTemplateDownload.do', data)
      } else {
        this.$msg('请选择一条模板')
      }
    }
  },
  created () {
    httpPost('/eweb-transfer.PaySalaryTemplateQuery.do').then(res => {
      this.tableData = res.templateList
    })
  }
}
</script>
