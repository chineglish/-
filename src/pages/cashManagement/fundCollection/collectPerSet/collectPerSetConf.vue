<template>
    <div class="assets-debt">
			<m-breadcrumb :data="breadData"></m-breadcrumb>
      <m-steps :data="stepsData"></m-steps>
			<div class="search-result">
				<template>
					<el-tabs v-model="activeName">
						<el-tab-pane label="上存周期" name="0">
							<upload-cycle :propData="propData"></upload-cycle>
						</el-tab-pane>
						<el-tab-pane label="下拨周期" name="1">
							<dial-down-cycle :propData="propData"></dial-down-cycle>
						</el-tab-pane>
					</el-tabs>
				</template>
				<div style="text-align: center; padding: 5px 0 30px;">
					<button class='el-button m-submit-btn' @click="confirm">确定</button>
					<button class='el-button m-cancel-btn' @click="back">返回</button>
				</div>
			</div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadCycle from './component/uploadCycle'
import dialDownCycle from './component/dialDownCycle'
export default {
  name: 'collectPerSetConf',
  components: {
    uploadCycle,
    dialDownCycle
  },
  data () {
    return {
      propData: {},
      dpropData: {},
      upropData: {},
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
      breadData: ['现金管理', '资金归集', '归集周期设置']
    }
  },
  methods: {
    confirm () {
      httpPost('/eweb-common.GenToken.do').then(token => {
        const singMsg = this.isSign({ _Data2Sign: this.$route.params._Data2Sign, _authenticateType: this.$route.params._authenticateType })
        httpPost('/eweb-cash.CollectDateSet.do', {
          _authenticateTypeChoose: this.$route.params._authenticateType ? this.$route.params._authenticateType[0] : '',
          CSIISignature: singMsg,
          _dataMapKey: this.$route.params._dataMapKey,
          ...this.propData,
          _tokenName: token._tokenName
        }).then(res => {
          this.$router.push({
            name: 'collectPerSetRes',
            params: {
              ...this.propData,
              acName: this.$route.params.acName,
              acNo: this.$route.params.acNo,
              _JnlStatus: res._processState,
              _jnlNo: res._jnlNo,
              _transTime: res._transTime
            }
          })
        }).catch(e => {
        })
      })
    },
    back () {
      this.$router.push('/collectPerSet')
    }
  },
  created () {
    console.log(this.$route.params)
    this.propData = this.$route.params
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
