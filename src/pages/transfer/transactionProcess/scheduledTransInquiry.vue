<template>
  <d2-container>
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="次日交易查询" name="first">
          <order-date v-if="activeName === 'first'"></order-date>
        </el-tab-pane>
        <el-tab-pane label="预约交易查询" name="second">
          <execution-date v-if="activeName === 'second'"></execution-date>
        </el-tab-pane>
      </el-tabs>
    </template>
  </d2-container>
</template>

<script>
/**
 *@name: 预约交易查询
 * @author: 梁文彬
 * @date: 2019-12-13
 */
import orderDate from './components/orderDate'
import executionDate from './components/executionDate'
export default {
  name: 'scheduledTransInquiry',
  components: {
    orderDate,
    executionDate
  },
  data () {
    return {
      activeName: 'first',
      breadData: ['转账汇款', '预约交易查询']
    }
  },
  created () {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName
    }
  }
}
</script>
