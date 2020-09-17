<template>
    <d2-container>
      <m-breadcrumb :data="titleData"></m-breadcrumb>
      <div class="form-box">
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                :msgs="msgs"
                @download="download"
                @submit="submit"
                @reset="reset">
        </m-new-form>
        <a ref="downloadBill" href="" download="BillTemplate.xls" style="display: none">></a>
      </div>
    </d2-container>
</template>
<script>
/**
 * @
 */
import { httpPost, downloadFile } from '@/api/sys/http'
import { bill_Type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'TicketRegistrationBatch',
  data () {
    return {
      titleData: ['电子商业汇票', '出票登记', '出票登记'],
      formModel: {
        templateDownload: '',
        batchFile: [],
        stdDrwrCod: '',
        stdDrwrBnm: '',
        stdDrwrBnam: ''
      },
      // 以下为动态数据
      formConfigJson: {
        rules: {
          batchFile: [{ required: true, message: '上传文件', trigger: 'submit' }]
        },
        formItems: [
          {
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '票据类型',
                'type': 'text',
                'key': 'stdBillTyp',
                formatter: (key, value) => util.handleEnums(bill_Type, value)
              },
              {
                'disabled': false,
                'label': '模板下载',
                'type': 'link',
                'clickEventName': 'download',
                formatter: value => value || '点击下载',
                'key': 'templateDownload'
              },
              {
                'disabled': false,
                'label': '上传文件',
                'type': 'upload',
                fileType: ['xls', 'xlsx'],
                'key': 'batchFile'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      msgs: []
    }
  },
  methods: {
    // Organization () {
    //   let params = {
    //     custAcc: this.$route.params.formModel.stdDrwrAcc
    //   }
    //   httpPost('eweb-edraft.OrganizationCode.do', params).then(res => {
    //     this.formModel.stdDrwrCod = res.custCod
    //     this.formModel.stdDrwrBnm = res.stdDrwrbNm
    //     this.formModel.stdDrwrBnam = res.stdDrwrbNam
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },
    submit (data) {
      let fileData = new window.FormData()
      fileData.append('stdDrwrNam', data.stdDrwrNam)
      fileData.append('stdDrwrCod', data.stdDrwrCod)
      fileData.append('stdDrwrAcc', data.stdDrwrAcc)
      fileData.append('stdDrwrBnm', data.stdDrwrBnm)
      fileData.append('stdDrwrBnam', data.stdDrwrBnam)
      fileData.append('stdBillTyp', data.stdBillTyp)
      fileData.append('fileType', 'xls')
      fileData.append('uploadFile', data.batchFile[0])
      httpPost('/eweb-edraft.IssueRegisterBatchFile.do', fileData).then(res => {
        if (res.list) {
          this.$router.push({
            name: 'TicketRegistrationBatchDetail',
            params: {
              formModel: res
            }
          })
        }
        if (res.Flag === '1') {
          let param = {
            fileName: 'problem.xls',
            filePath: res.PathURL
          }
          downloadFile('/eweb-common.DownloadFile.do', param)
        }
      })
    },
    reset (res) {
      res = this.formModel
    },
    download () {
      this.$refs.downloadBill.href = util.getUrl() + 'resources/BillTemplate.xls'
      this.$refs.downloadBill.click()
    }
  },
  created () {
    this.formModel.stdDrwrAcc = this.$route.params.formModel.stdDrwrAcc
    this.formModel.stdDrwrNam = this.$route.params.formModel.stdDrwrNam
    this.formModel.stdBillTyp = this.$route.params.formModel.stdBillTyp
    this.formModel.stdDrwrCod = this.$route.params.stdDrwrCod
    this.formModel.stdDrwrBnm = this.$route.params.stdDrwrBnm
    this.formModel.stdDrwrBnam = this.$route.params.stdDrwrBnam
  }
}
</script>

<style  scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    }
</style>
