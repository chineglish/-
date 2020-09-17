<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJsonName"
      :formModel="objName">
    </m-new-form>
    <div class="search-result">
      <div class="search-result-title fs20">
        <span>设置</span>
      </div>
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="上存周期" name="0">
            <upload-cycle ref="uploadCycle" @submit="confirm" :propData="propData"></upload-cycle>
          </el-tab-pane>
          <el-tab-pane label="下拨周期" name="1">
            <dial-down-cycle ref="dialDownCycle" @submit="confirm" :propData="propData"></dial-down-cycle>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import uploadCycle from './components/uploadCycle'
import dialDownCycle from './components/dialDownCycle'
// import MonTable from './monTable'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
export default {
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    uploadCycle,
    dialDownCycle
  },
  name: 'financialPurchenConffer',
  data () {
    return {
      activeName: '0',
      // data: ['现金管理', '资金归集', '归集周期设置']
      // obj: {
      //   weeksCode: [],
      //   month: {},
      //   gatherFlag: ''
      // },
      // objDate: {
      //   month: {},
      //   dweeksCode: []
      // },
      objName: {
        acNo: '',
        currencyCode: '',
        acName: ''
      },
      formConfigJsonName: {
        formItems: [
          {
            title: '现金管理 > 归集周期设置用户信息',
            formWidth: '100%',
            group: [
              {
                'disabled': false,
                'label': '账号',
                'type': 'text',
                'key': 'acNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currencyCode',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'acName'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    confirm (obj) {
      this.propData = Object.assign(this.propData, obj)
    }
    // 上存
    // initData (obj) {
    //   this.obj.acName = obj.payerAccount.acName
    //   this.obj.gatherFlag = obj.gatherFlag
    //   this.obj.tertianStart = obj.tertianStart
    //   this.obj.tertianDays = obj.tertianDays
    //   // this.obj.monthEndFlag = obj.monthEndFlag
    //   let str = obj.weeksCode
    //   for (let i = 0; i < str.length; i++) {
    //     str[i] > 0 && this.obj.weeksCode.push(this.weeks[i])
    //   }
    //   this.monthList.forEach(item => {
    //     this.obj.month[item] = obj[item].split('')
    //   })
    // },
    // 下拨
    // initDataD (objDate) {
    //   this.objDate.acName = objDate.payerAccount.acName
    //   this.objDate.gatherFlag = objDate.dGatherFlag
    //   this.objDate.tertianStart = objDate.tertianStart
    //   this.objDate.tertianDays = objDate.tertianDays
    //   // this.objDate.dMonthEndFlag = objDate.dMonthEndFlag
    //   let str = objDate.dWeeksCode
    //   for (let i = 0; i < str.length; i++) {
    //     str[i] > 0 && this.objDate.dweeksCode.push(this.weeks[i])
    //   }
    //   this.dMonthList.forEach(item => {
    //     this.obj.month[item] = objDate[item].split('')
    //   })
    // }
  },
  created () {
    this.propData = this.formModel
    this.objName.acNo = this.formModel.acNo
    this.objName.currencyCode = this.formModel.currencyCode
    this.objName.acName = this.formModel.payerAccount.acName
    // this.obj = Object.assign(this.obj, this.formModel)
    // this.initData(this.obj)
    // this.objDate = Object.assign(this.objDate, this.formModel)
    // this.initDataD(this.objDate)
  }
}
</script>

<style lang="scss" scoped>
	.search-result{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		margin: 20px 0px;
		.search-result-title{
			padding-left: 30px;
			line-height: 60px;
			font-weight: bold;
			color: #333333;
			span{
				margin-left: 10px;
				padding-left: 5px;
				border-left: #d41618 8px solid;
			}
		}
		.search-result-content{
			.queryDate{
				width: 100%;
				tr{
					text-align: center;
					td{
						height: 50px;
					}
					.icon{
						text-align: right
					}
				}
			}
		}
	}
</style>
