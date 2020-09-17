<template>
	<div id="financialPurchase">
		<m-breadcrumb :data="data"></m-breadcrumb>
		<el-card>
			<el-tabs v-model="activeName">
				<el-tab-pane label="理财产品信息" name="first">
					<product-info v-if="activeName === 'first'"></product-info>
				</el-tab-pane>
				<el-tab-pane label="理财产品说明书" name="second">
          <explanation v-if="activeName === 'second'"></explanation>
        </el-tab-pane>
				<el-tab-pane label="客户权益须知" name="third">
          <rights-notice v-if="activeName === 'third'"></rights-notice>
        </el-tab-pane>
				<el-tab-pane label="理财产品协议书" name="fourth">
          <protocol v-if="activeName === 'fourth'"></protocol>
        </el-tab-pane>
				<el-tab-pane label="风险揭示书" name="fifth">
          <risk-disclosure v-if="activeName === 'fifth'"></risk-disclosure>
        </el-tab-pane>
			</el-tabs>
		</el-card>
    <div class="footer" >
      <el-button v-if="activeName !== 'first'" class="m-cancel-btn but" @click="backHandler">返回</el-button>
    </div>
	</div>
</template>

<script>
import productInfo from './comm/productInfo'
import explanation from './comm/explanation'
import protocol from './comm/protocol'
import rightsNotice from './comm/rightsNotice'
import riskDisclosure from './comm/riskDisclosure'

export default {
  name: 'financialPurchase',
  components: {
    productInfo,
    explanation,
    protocol,
    rightsNotice,
    riskDisclosure
  },
  data () {
    return {
      data: ['理财服务', '理财产品', '理财产品详情'],
      activeName: 'first'
    }
  },
  methods: {
    backHandler () {
      this.activeName = 'first'
    }
  }
}
</script>

<style lang="scss">
	#financialPurchase {
		.el-card__body {
			padding: 0;
			.el-tabs__header {
				margin-bottom: 0;
				padding: 0 20px;
				background: #FDF2F3;
				.el-tabs__item {
					height: 60px;
					line-height: 60px;
					color: #333;
				}
				.el-tabs__item.is-active {
					color: #D41618;
				}
				.el-tabs__nav-wrap::after {
					height: 0;
				}
				.el-tabs__active-bar {
					height: 4px;
					background: #D41618;
				}
			}
		}
		.el-card, .el-tabs__content {
			overflow: visible;
		}
    .footer {
      text-align: center;
      .but {
        width: 100%;
        padding: 20px 38px;
      }
    }
	}
</style>
