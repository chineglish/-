<template>
  <el-button class="d2-mr btn-text can-hover" type="text" @click="handleClick">
    <d2-icon name="search" class="fs18"/>
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
