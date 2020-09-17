<template>
  <d2-container class="migrant-workers-security-deposit-statistical-table">
    <m-breadcrumb :data="breadcrumb"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @submit="submit"
    ></m-new-form>
    <div class="table-container">
      <h2 class="table-title fs16">区间变动情况</h2>
      <table class="table">
        <thead class="thead">
          <tr class="tr">
            <th class="th" colspan="3">预存</th>
            <th class="th" colspan="3">划支</th>
            <th class="th" colspan="3">补足</th>
            <th class="th" colspan="3">解除监管</th>
          </tr>
          <tr class="tr">
            <th class="th">单位数</th>
            <th class="th">项目数</th>
            <th class="th">金额（万元）</th>

            <th class="th">单位数</th>
            <th class="th">项目数</th>
            <th class="th">金额（万元）</th>

            <th class="th">单位数</th>
            <th class="th">项目数</th>
            <th class="th">金额（万元）</th>

            <th class="th">单位数</th>
            <th class="th">项目数</th>
            <th class="th">金额（万元）</th>
          </tr>
        </thead>
        <tbody class="tbody">
        <tr class="tr">
          <td class="td">{{dataObj.ycdws}}</td>
          <td class="td">{{dataObj.ycxms}}</td>
          <td class="td">{{dataObj.ycje}}</td>

          <td class="td">{{dataObj.hzdws}}</td>
          <td class="td">{{dataObj.hzxms}}</td>
          <td class="td">{{dataObj.hzje}}</td>

          <td class="td">{{dataObj.bzdws}}</td>
          <td class="td">{{dataObj.bzxms}}</td>
          <td class="td">{{dataObj.bzje}}</td>

          <td class="td">{{dataObj.jcjgdws}}</td>
          <td class="td">{{dataObj.jcjgxms}}</td>
          <td class="td">{{dataObj.jcjgje}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container">
      <h2 class="table-title fs16">截止日账户情况</h2>
      <table class="table">
        <thead class="thead">
        <tr class="tr">
          <th class="th" colspan="3">未补足</th>
          <th class="th" colspan="3">未解除监管</th>
        </tr>
        <tr class="tr">
          <th class="th">单位数</th>
          <th class="th">项目数</th>
          <th class="th">金额（万元）</th>

          <th class="th">单位数</th>
          <th class="th">项目数</th>
          <th class="th">金额（万元）</th>
        </tr>
        </thead>
        <tbody class="tbody">
        <tr class="tr">
          <td class="td">{{dataObj.wbzdws}}</td>
          <td class="td">{{dataObj.wbzxms}}</td>
          <td class="td">{{dataObj.wbzje}}</td>

          <td class="td">{{dataObj.mqzhdws}}</td>
          <td class="td">{{dataObj.mqzhxms}}</td>
          <td class="td">{{dataObj.mqzhje}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <m-btn :btnData="btnData2" @click="back"></m-btn>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </d2-container>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util.js'

export default {
  name: 'migrant-workers-security-deposit-statistical-table',

  data () {
    return {
      breadcrumb: ['账户管理', '农民工保证金统计表'],
      formModel: {
        startDate: '',
        endDate: ''
      },
      formConfigJson: {
        rules: {
          startDate: [
            { required: true, message: '请选择起止日期', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请选择起止日期', trigger: 'blur' }
          ]
        },
        formItems: [
          {
            formWidth: '100%',
            labelWidth: '30%',
            group: [
              {
                type: 'dateArea',
                label: '查询日期',
                changeEventName: 'changeDate',
                firstKey: 'startDate',
                secondKey: 'endDate'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      btnData2: [
        {
          btnText: '返回',
          class: 'm-cancel-btn',
          eventName: 'back'
        }
      ],
      msgs: ['1.用户选择账户管理-农民工保证金查询-农民工保证金统计表，用于企业用户查询农民工保证金统计表信息。'],
      dataObj: {}
    }
  },

  methods: {
    back () {
      this.$router.push('/index')
    },
    listQry (data) {
      const params = {
        startDate: util.standardDate(data.startDate),
        endDate: util.standardDate(data.endDate)
      }
      httpPost('eweb-special.MigrantWorkerDepositDetailQry.do', params).then(res => {
        this.dataObj = res
      }).catch(err => {
        console.error(err)
        this.tableData = []
      })
    },
    submit (res) {
      // 查询
      this.listQry(res)
    }
  },
  created () {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 30)
    this.formModel.projectType = '88'
    this.formModel.startDate = startDate
    this.formModel.endDate = endDate
    this.listQry(this.formModel)
  }
}
</script>

<style lang="scss">
.migrant-workers-security-deposit-statistical-table {
	.d2-container-full {
		background: #fff;
		.table-container + .table-container {
			margin-top: 15px;
		}
		.table-container {
			padding-top: 15px;

			.table-title {
				margin: 0 0 10px 15px;
				padding: 0 6px;
				border-left: 4px solid #d41618;
				font-weight: normal;
				color: #333;
			}

			.table {
				width: 100%;
				border-collapse: collapse;
				border: 1px solid #EBEEF5;
				text-align: center;

				.tr {
					height: 42px;
					line-height: 42px;
				}

				.td,
				.th {
					border: 1px solid #EBEEF5;

					&.th {
						color: #333;
						font-weight: normal;
						background: #FDF2F3;
					}
					&.td {
						color: #666;
					}
				}
			}
		}
	}
}
</style>
