<template>
    <d2-container id="mng-list" :filename="filename">
        <template slot="header">
            <slot name="header"></slot>
        </template>
        <div class="body-content">
        <slot name="search-box">
            <el-row id="search-box-from">
                <el-col>
                    <slot name="search-inner-box">
                    </slot>
                </el-col>
            </el-row>
        </slot>
        <slot name="option-box" v-if="showOptionBoxDef">
            <el-row class="mng-list-option-box">
                <el-col>
                    <slot name="option-inner-box">
                    </slot>
                </el-col>
            </el-row>
        </slot>

        <slot>
            <el-table
                    :data="page.records"
                    stripe
                    :height="listHeight"
                    border
                    style="width: 100%">
                <!--实现自己需要定义table-->
            </el-table>
        </slot>

        <!--<template slot="footer">-->
        <!-- <template>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.current"
                    :page-sizes="pageSizes"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </template> -->

        </div>
        <slot name="msgsbox" v-if="showSmgBox">
            <!-- 温馨提示 -->
            <div class="m-msg-box">
                <m-hint-box :msgs="msgs" :msgsTitle="msgsTitle"></m-hint-box>
            </div>
        </slot>
    </d2-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'd2-mng-page',
  props: {
    // 针对d2-admin 查看源码功能的属性配置
    filename: {
      type: String,
      default: __filename
    },
    showOptionBoxDef: false,
    showSmgBox: false,
    showPagination: true,
    page: {
      type: Object,
      default () {
        return {
          records: [],
          total: 0,
          size: this.$store.state.d2admin.page.defSize,
          current: this.$store.state.d2admin.page.defCurrent
        }
      }
    },
    msgsTitle: {
      type: String,
      default: '温馨提示'
    },
    // 温馨提示配置项
    msgs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('d2admin', {
      listHeight: state => state.page.listHeight,
      pageSizes: state => state.page.pageSizes
    })
  },
  methods: {
    handleSizeChange (val) {
      this.page.size = val
      // 混合组件实现
      // this.qryData()
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.page.current = val
      // 混合组件实现
      // this.qryData()
      this.$emit('currentSizeChange', val)
    },
    qryData () {
      this.$emit('qry-data')
    }
  }
}
</script>

<style lang="scss">
    @import '~@/assets/style/unit/color.scss';

    #mng-list {
      max-width: 1200px;
      width: 1200px;
      box-sizing: border-box;
      background-color: #fff;
      margin: 0 auto;

      .d2-container-full {
          .body-content {
              background-color: #ffffff;
          }
      }

      #search-box-from {
          .el-form {
              margin-top: 0px !important;
              .el-form-item__label {
                  width: auto;
              }
          }
      }

      .mng-list-option-box {
          margin-bottom: 20px;
      }

      .el-pagination {
          padding: 0px;
          padding-top: 20px;
      }
      .el-table::before {
          height: 0;
      }
      .el-table__fixed-right::before, .el-table__fixed::before {
          height: 0;
      }

      .el-form--inline {
          .el-form-item {
              margin-right: 24px;
          }
      }
      .el-table--border {
          border-bottom: 1px solid #ebeef5;
      }
      .dialog-form-submit-inner-container {
          width: 180px;
      }
      .m-msg-box {
          padding-top: 30px;
          padding-bottom: 30px;
      }
    }
</style>
