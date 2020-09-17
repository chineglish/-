<template>
    <div class="assets-debt">
			<m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-steps :data="stepsData"></m-steps>
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
					<m-new-form
							:btnData="btnData"
							@confirm="confirm"
							@back="back"
					></m-new-form>
				</template>
			</div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadRule from './component/uploadRule'
import uploadCycle from './component/uploadCycle'
import dialDownRule from './component/dialDownRule'
import dialDownCycle from './component/dialDownCycle'
export default {
  name: 'periodicColSetConf',
  components: {
    uploadRule,
    uploadCycle,
    dialDownRule,
    dialDownCycle
  },
  data () {
    return {
      propData: {},
      stepsData: {
        stepsActive: 1,
        stepsData: [
          '信息录入',
          '交易确认',
          '提交结果'
        ]
      },
      activeName: '0',
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '定时归集设置'],
      btnData: [
        { btnText: '确定', class: 'm-submit-btn', clickEventName: 'confirm' },
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ],
      data: {}
    }
  },
  methods: {
    confirm (params) {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-cash.TimingCollectSet.do', {
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _dataMapKey: this.$route.params._dataMapKey,
          _tokenName: token._tokenName,
          ...this.$route.params.data
        }).then(res => {
          this.$router.push({
            name: 'periodicColSetRes',
            params: {
              ...this.propData,
              _transTime: res._transTime,
              _JnlStatus: res._processState,
              _jnlNo: res._jnlNo
            }
          })
        })
      })
    },
    back () {
      this.$router.push('/periodicColSet')
    }
  },
  created () {
    this.propData = this.$route.params
    this.data = JSON.parse(JSON.stringify(this.$route.params))

    // let flagArr = ['timeCode', 'dTimeCode']
    // flagArr.forEach(e => {
    //   let arr = []
    //   this.data[e].forEach(item => {
    //     item ? arr.push(item) : arr.push('000000')
    //   })
    //   this.data[e] = arr.join('')
    // })
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
