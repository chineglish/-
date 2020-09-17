<template>
    <div class="scheduledTransInquiry">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单笔转账" name="first">
              <single v-if="activeName === 'first'"></single>
            </el-tab-pane>
            <el-tab-pane label="批量转账" name="second">
              <batch v-if="activeName === 'second'"></batch>
            </el-tab-pane>
          </el-tabs>
        </template>
    </div>
</template>

<script>
/**
 *@name: 网银转账结果查询
 * @author: 梁文彬
 * @date: 2019-12-16
 */
import single from './components/single'
import batch from './components/batch'
export default {
  name: 'onlineBankTransInquiry',
  components: {
    single,
    batch
  },
  data () {
    return {
      activeName: 'first',
      breadData: ['转账汇款', '网银转账结果查询']
    }
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  created () {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName
    }
  }
}
</script>
