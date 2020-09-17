<template>
    <div class="m-table">
        <el-table
                :data="data"
                :stripe="stripe"
                :border="border"
                :row-class-name="rowClassName"
                :height="height"
                style="width: 100%">
            <el-table-column
                    v-for="head in headerData"
                    :key="head.prop"
                    :prop="head.prop"
                    :label="head.label"
                    :align="head.align || 'left'"
                    :header-align="head.headerAlign || 'left'"
                    :fixed="head.fixed || true"
                    :width="head.width || null">
            </el-table-column>
            <el-table-column
                    v-if="operateConfig instanceof Object"
                    :fixed="operateConfig.fixed || false"
                    :label="operateConfig.label || '操作'"
                    :width="operateConfig.width || null">
                <template slot-scope="scope">
                    <el-button
                            v-for="item in operateConfig.btnData"
                            :key="item.eventName"
                            @click.native.prevent="clickEvent(item.eventName, scope.$index, tableData)"
                            type="text"
                            size="small">
                        {{ item.btnText }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'm-table',
  props: {
    // 是否带带斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 表格是否带边框
    border: {
      type: Boolean,
      default: false
    },
    // 表格是否带状态
    rowClassName: {
      type: Function,
      default: () => {
      }
    },
    tableHeight: {
      type: [String, Number],
      default: ''
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表头数据
    tableHeadData: {
      type: Array,
      default: () => []
    },
    // 操作配置
    operateConfig: {
      type: Object,
      defalut: null
    }
  },
  data () {
    return {
      data: [],
      headerData: [],
      height: null
    }
  },
  watch: {
    /* operateConfig: {
          deep: true,
          handler (newVal) {
              this.operate = this._deepCopyList(newVal)
          }
      }, */
    tableData: {
      deep: true,
      handler (newArr) {
        if (newArr.length === 0) return
        this.data = this._deepCopyList(newArr)
      }
    },
    /* tableHeadData: {
        deep: true,
        handler (newArr) {
          if (newArr.length === 0) return
          this.headerData = this._deepCopyList(newArr)
        }
      }, */
    tableHeight (newVal) {
      this.height = newVal
    }
  },
  methods: {
    clickEvent (eventName, index, data) {
      if (!eventName) return
      this.$emit(eventName, { index: index, data: data })
    },
    // 深度遍历
    _deepCopyList (list) {
      let ret = list instanceof Array ? [] : {}
      for (let i in list) {
        ret[i] = typeof list[i] === 'object' ? this._deepCopyList(list[i]) : list[i]
      }
      return ret
    }
  },
  created () {
    this.headerData = this.tableHeadData
    this.data = this._deepCopyList(this.tableData)
  }
}
</script>
