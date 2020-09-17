<template>
    <div>
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
              :componentJson="formConfigJson"
              :btnData="btnData"
              :formModel="formModel"
              @submit="inquire"
            >
            </m-new-form>
        </div>
        <div class="form-box" v-if="showTable">
          <d-table
            :table-data="tableData"
            :pagesize="8"
            :firstColIndex="firstColIndex"
            :tableHeadData="tableHeadData"
            :actionData="actionData"
            @clickTableLink="clickTableLink"
            @handleCurrentChange="tableSelectChange"
            @downloadAll="download('0')"
            @downloadSucceed="download('1')"
            @downloadFailed="download('2')"
            @handleBack="handleBack"
          >
          </d-table>
        </div>
        <m-hint-box :msgs="promptList"></m-hint-box>
    </div>
</template>

<script>
/**
 * @name: 历史代发工资记录查询
 * @author: 邓焕
 * @date: 2019-12-10
 */
import { httpPost, downloadFile } from '@/api/sys/http'
import util from '@/libs/util'
import { business_type } from '@/assets/js/entity'
export default {
  name: 'queryHistoricalPayrollRecords',
  data () {
    return {
      showTable: false,
      selected: {},
      promptList: ['1.通过该交易可查询上传文件处理状态和员工工资发放结果明细。', '2.“处理状态”分为处理失败、处理成功。如果处理 状态”显示为“处理失败”，可能由于核心系统繁忙，请稍后再重新进行文件上传，如果“处理状态”显示为“处理成功”，并不表示上传文件中所有员工工资发放成功，您可通过点击“代发状态”下的“全部”、“成功”、“失败”按钮查询相应代发状态的笔数和金额，并下载相应明细。'],
      filename: __filename,
      breadData: ['财务管理', '代发工资', '历史代发工资记录查询'],
      formModel: {
        beginDate: '',
        endDate: ''
      },
      formConfigJson: {
        formWidth: '100%',
        // labelWidth: '100%',
        rules: {
          beginDate: [
            { required: true, message: '请选择开始日期', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.formModel.beginDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.endDate !== '' && value > this.formModel.endDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ],
          endDate: [{ required: true, message: '请选择结束日期', trigger: 'submit' },
            { validator: (rule, value, callback) => {
              this.formModel.endDate = value
              if (value === '') {
                callback(new Error('请选择开始日期'))
              } else if (this.formModel.beginDate !== '' && value < this.formModel.beginDate) {
                callback(new Error('开始日期大于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
          ]
        },
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '查询日期',
                'type': 'dateArea',
                'firstKey': 'beginDate',
                'secondKey': 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      firstColIndex: {
        type: 'radio',
        label: '选择'
      },
      tableHeadData: [
        { label: '批次号', prop: 'salaryNo', clickEventName: 'clickTableLink' }, // 委托号
        { label: '付款账号', prop: 'payAccount' },
        { label: '总笔数', prop: 'salaryCount' },
        { label: '总金额', prop: 'salaryAmount', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '业务类型',
          prop: 'salaryRemain',
          formatter: (row, column, cellValue, index) => {
            return util.handleEnums(business_type, cellValue)
          } },
        { label: '发放日期',
          prop: 'salaryDate',
          formatter: (row, column, cellValue, index) => {
            return cellValue.substring(0, 10)
          } }
      ],
      tableData: [],
      actionData: [
        {
          btnText: '下载全部',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadAll'
        },
        {
          btnText: '下载成功明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadSucceed'
        },
        {
          btnText: '下载失败明细',
          type: 'info',
          class: 'm-submit-btn',
          eventName: 'downloadFailed'
        },
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          type: 'info',
          eventName: 'handleBack'
        }
      ]
    }
  },
  methods: {
    tableSelectChange (selection) {
      // 监听表格选择事件触发
      this.selected = selection
    },
    inquire (res) {
      this.showTable = false
      this.selected = {}
      let _params = {
        beginDate: res.beginDate.replace(/-/g, ''),
        endDate: res.endDate.replace(/-/g, '')
      }
      // 发送接口重新查询
      httpPost('/eweb-transfer.PaySalaryHisQuery.do', _params).then(result => {
        this.tableData = result.list
        this.showTable = true
      }).catch((result) => {
        this.$msg('获取数据失败')
      })
    },
    download (queryFlag) {
      //  下载全部
      if (this.selected.salaryNo) {
        downloadFile('/eweb-transfer.PaySalaryHisDetailsDownload.do', {
          mandateNum: this.selected.salaryNo,
          _Download: 'xls',
          queryFlag: queryFlag
        })
      } else {
        this.$msg('请选择一条记录')
      }
    },
    handleBack () {
      this.showTable = false
    },
    clickTableLink (data) {
      // 点击批次号
      this.$router.push({
        name: 'payrollRecordsDetails',
        params: {
          data: data,
          formModel: this.formModel,
          tableData: this.tableData
        }
      })
    }
  },
  created () {
    if (this.$route.params.tableData) {
      this.tableData = this.$route.params.tableData
      this.formModel = this.$route.params.formModel
      this.showTable = true
    } else {
      let filterDate = util.filterDate('1')
      this.formModel.beginDate = filterDate.startDate
      this.formModel.endDate = filterDate.endDate
    }
  }
}
</script>
