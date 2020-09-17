<template>
  <div class="form-box">
    <m-new-form
      :componentJson="formConfigJson"
      :formModel="formModel"
      >
    </m-new-form>
    <div class="search-result">
				<template>
					<el-tabs v-model="activeName">
						<el-tab-pane label="上存规则" name="0">
							<upload-rule :propData="propData"></upload-rule>
						</el-tab-pane>
						<el-tab-pane label="上存周期" name="1">
							<upload-cycle :propData="propData"></upload-cycle>
						</el-tab-pane>
						<el-tab-pane label="下拨规则" name="2">
							<dial-down-rule :propData="propData"></dial-down-rule>
						</el-tab-pane>
						<el-tab-pane label="下拨周期" name="3">
							<dial-down-cycle :propData="propData"></dial-down-cycle>
						</el-tab-pane>
					</el-tabs>
				</template>
			</div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
import uploadRule from './component/uploadRule'
import uploadCycle from './component/uploadCycle'
import dialDownRule from './component/dialDownRule'
import dialDownCycle from './component/dialDownCycle'
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
    uploadRule,
    uploadCycle,
    dialDownRule,
    dialDownCycle
  },
  name: 'financialPurchenConffer',
  data () {
    return {
      data: {},
      activeName: '0',
      // data: ['现金管理', '资金归集', '归集周期设置']
      formConfigJson: {
        formItems: [
          {
            title: '定时归集设置',
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
  },
  created () {
    this.formModel.acName = this.formModel.payerAccount.acName
    this.formModel.timeCode = this.formModel.timeCode.substring(0, 6)
    this.formModel.dTimeCode = this.formModel.dTimeCode.substring(0, 6)
    this.propData = this.formModel
    this.formModel.timeCode = this.formModel.timeCode.split(',')
    this.formModel.dTimeCode = this.formModel.dTimeCode.split(',')
    this.data = JSON.parse(JSON.stringify(this.formModel))
    let flagArr = ['timeCode', 'dTimeCode']
    flagArr.forEach(e => {
      let arr = []
      this.data[e].forEach(item => {
        item ? arr.push(item) : arr.push('000000')
      })
      this.data[e] = arr.join('')
    })
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
