<template>
    <div class="m-breadcrumb no-print">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item
              v-for="(item, index) in breadData"
              :key="index"
              :to="{ path: item.path }"
              :class="index == breadData.length-1 ? 'm-actived-bread' : ''">{{item.text}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="clear: both"></div>
    </div>
</template>

<script>

export default {
  name: 'm-breadcrumb',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      breadData: []
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function (arr) {
        this.breadData = []
        this.handleData(arr)
      }
    }
  },
  methods: {
    handleData (arr) {
      arr.forEach((item) => {
        if (typeof item === 'object') {
          this.breadData.push(item)
        } else {
          this.breadData.push({ text: item })
        }
      })
    }
  },
  created () {
    this.handleData(this.data)
  }
}
</script>

<style lang="scss" scoped>
  .m-breadcrumb {
    margin-left: -50px;
    width: calc(100% + 30px);
    padding: 0 10px;
  }
</style>
