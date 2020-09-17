<template>
  <div class="trade-result-page">
    <div class="preview">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="2">
          <i class="result-status" :class="data.iconClass"></i>
        </el-col>
        <el-col :span="4">
          <p class="result-status-desc">{{data.message}}</p>
        </el-col>
      </el-row>
    </div>

    <div class="result-details">
      <el-row type="flex" justify="center" align="middle" :key="idx" v-for="(item, idx) in list">
        <el-col :span="2">{{item.label}}：</el-col>
        <el-col :span="4">{{item.value}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-result-page',

  props: {
    result: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    data () {
      const data = {}
      if (this.result === 1 || this.result === '1') {
        data.message = '交易成功'
        data.iconClass = ['el-icon-success']
      } else {
        data.message = '交易失败'
        data.iconClass = ['el-icon-error']
      }
      return data
    }
  }
}
</script>

<style scoped>
  .trade-result-page {
    padding-top: 100px;
    width: 100%;
    line-height: 1;
  }

  .trade-result-page .result-status {
    font-size: 68px;
  }

  .trade-result-page .result-status-desc {
    margin: 0;
    font-size: 26px;
    color: #333;
  }

  .trade-result-page .result-details {
    margin-top: 38px;
    font-size: 14px;
    color: #666;
  }

  .trade-result-page .result-details .el-row {
    margin-bottom: 12px;
  }
</style>
