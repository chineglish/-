<template>
    <div v-if="data.stepsActive !== undefined">
        <el-steps v-if="data.stepsData" :active="data.stepsActive" finish-status="success" align-center>
            <el-step  v-for="(item,index) in data.stepsData" :style="{width:100/data.stepsData.length+'%'}" :key="index" :title=item></el-step>
        </el-steps>
        <el-steps v-else :active="data.stepsActive" finish-status="success" align-center>
            <el-step title="信息录入"></el-step>
            <el-step title="交易确认"></el-step>
            <el-step title="提交结果"></el-step>
        </el-steps>
    </div>
</template>

<script>

export default {
  name: 'm-form',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          stepsActive: 0
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
