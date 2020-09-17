<template>
  <div>
    <div v-if="btnData.length > 0">
      <ul class="error-box" id="error-box"></ul>
      <div class="m-form-btn">
        <!-- 报错信息 -->
        <div class="btn-box" v-for="(item, index) in btnData" :key="index" v-show="item.show !== false">
          <el-button
            v-if="item.printObj"
            :class="item.class"
            v-print="item.printObj"
            :disabled="item.disabled"
            >
            {{item.btnText}}
          </el-button>
          <el-button
            v-else
            :class="item.class"
            @click.native="clickEvent(item)"
            :disabled="item.disabled">
            {{item.btnText}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MBtn',
  props: {
    btnData: {
      default: () => {},
      type: Array
    }
  },
  methods: {
    clickEvent (item) {
      let clickEventName = item.clickEventName || item.eventName || item.handler || ''
      this.$emit('click', clickEventName)
    }
  }
}
</script>
