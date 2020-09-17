<template>
  <div class="assets-debt">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本属性" name="0">
          <basic-attr :data="data"></basic-attr>
        </el-tab-pane>
        <el-tab-pane label="计息规则" name="1">
          <rate-rules :data="data"></rate-rules>
        </el-tab-pane>
        <el-tab-pane v-if="data.gatherType === '2'" label="上存规则" name="2">
          <upload-rules :data="data"></upload-rules>
        </el-tab-pane>
        <el-tab-pane v-if="data.gatherType === '2'" label="上存周期" name="3">
          <upload-cy :data="data"></upload-cy>
        </el-tab-pane>
        <el-tab-pane v-if="data.gatherType === '2'" label="下拨规则" name="4">
          <allocate-rules :data="data"></allocate-rules>
        </el-tab-pane>
        <el-tab-pane v-if="data.gatherType === '2'" label="下拨周期" name="5">
          <allocate-cy :data="data" ></allocate-cy>
        </el-tab-pane>
        <el-tab-pane v-if="data.gatherType === '1'" label="支控规则" name="6">
          <control-rules :data="data" ></control-rules>
        </el-tab-pane>
      </el-tabs>
    </template>
    <m-btn :btnData="btnData" @click="goBack" />
  </div>
</template>

<script>
import basicAttr from './components/basicAttr'
import rateRules from './components/rateRules'
import uploadRules from './components/uploadRules'
import uploadCy from './components/uploadCy'
import allocateRules from './components/allocateRules'
import allocateCy from './components/allocateCy'
import controlRules from './components/controlRules'
export default {
  name: 'collectRetQuery',
  components: {
    basicAttr,
    rateRules,
    uploadRules,
    uploadCy,
    allocateRules,
    allocateCy,
    controlRules
  },
  data () {
    return {
      data: {},
      activeName: '0',
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集关系查询'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'goBack' }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 'collectRetQuery'
      })
    }
  },
  created () {
    this.data = this.$route.params
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
    .search-result-acc{
      width: 100%;
      height: 40px;
      line-height: 40px;
      .title{
        display: inline-block;
        width: 30%;
        text-align: center;
        background: #EFF3F6;
      }
      .data{
        display: inline-block;
        width: 70%;
        text-align: center;
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
  .accColor{
    color:blue;
  }
</style>
