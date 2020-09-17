<template>
    <div id="m-form">
      <el-form :ref="formRefs" :model="form" :label-width="labelWidth" :rules="data.rules" class="m-el-form" :validate-on-rule-change="false">
        <div v-if="data.stepsActive !== undefined">
          <el-steps v-if="data.stepsData" :active="data.stepsActive" finish-status="success" align-center>
            <el-step  v-for="(item,index) in data.stepsData" :key="index" :title=item></el-step>
          </el-steps>
          <el-steps v-else :active="data.stepsActive" finish-status="success" align-center>
            <el-step title="信息录入"></el-step>
            <el-step title="交易确认"></el-step>
            <el-step title="提交结果"></el-step>
          </el-steps>
        </div>
        <div class="m-form-contianer" v-for="(items, index) in data.formItems" :key="index" :class="items.class">
          <div class="m-msg-split"></div>
          <h1 class="m-form-block-contianer-title m-form-block-contianer-title-1 fs14" v-if="items.title">
            <div class="m-form-block-contianer-title-left-border">{{items.title}}</div>
          </h1>
          <div class="m-form-block-contianer-body">
            <template v-if="items.edit ? items.edit : true">
              <template v-for="item in items.group">
                <el-form-item
                  :key="item.key"
                  v-if="isRender(item.ifRender) && item.show !== false"
                  :prop="item.key"
                  :label="item.label"
                  :style="{'width': items.formWidth ? items.formWidth : '50%'}">
                  <div>
                    <!-- 账户列表 -->
                    <template v-if="item.type === 'actList'">
                      <m-account-list
                        @change-item="selectItemEvent"
                        :defaultVal="form[key]"
                        :isClear= "isClear"
                        :defaultKey="item.key"
                        :transParams="item.transParams"
                        :placeholder="jointStr(item.label, 1)">
                      </m-account-list>
                    </template>
                    <!--  空白组件,内容全靠插槽传入, bankName    -->
                    <template v-if="item.type === 'blank'">
                    </template>
                    <!-- 后面带文字的input框 -->
                    <template v-if="item.type === 'input'">
                      <el-input v-model="form[item.key]"
                                :disabled="item.disabled || items.disabled"
                                :placeholder="jointStr(item.label)"
                                @input="changeEvent(item.changeEventName)">
                      </el-input>
                      <template v-if="item.content"
                                class="el-input-group__append">
                        <span class="fs14" @click="clickEvent(item.slotInpFunc)" style="margin-left: 10px; background: #ffffff; color: #009CD8;">{{item.content}}</span>
                      </template>
                      <div><slot :name="item.slotName"></slot></div>
                    </template>
                    <template v-if="item.type === 'select'">
                      <el-select
                        v-model="form[item.key]"
                        :placeholder="jointStr(item.label, 1)"
                        :value="item.defaultVal"
                        :filterable="item.filterable"
                        @change="changeEvent(item.changeEventName)"
                        :disabled="item.disabled || items.disabled">
                        <el-option v-for="option in item.options"
                                   :key="option.value"
                                   :label="option.value"
                                   :value="option.key">
                        </el-option>
                      </el-select>
                      <template
                        v-if="item.content"
                        class="el-input-group__append">
                        <span class="fs14" @click="clickEvent(item.slotInpFunc)" style="margin-left: 10px; background: #ffffff; color: #009CD8;">{{item.content}}</span>
                      </template>
                    </template>
                    <!-- 跳转标签 -->
                    <template v-if="item.type === 'link'">
                      <div class="m-new-form-link fs16" @click="clickEvent(item.clickEventName)">
                        {{form[item.key]}}
                        <div class="el-icon-arrow-right fs30"></div>
                      </div>
                    </template>
                    <!-- 时间区域 -->
                    <!-- 不建议使用,推荐使用time 的type为dateRange   -->
                    <!-- 存在清空操作无法清空时间选择器的bug   -->
                    <template v-if="item.type === 'dateArea'">
                      <el-col :span="8">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="form[item.key].date1"
                          style="width: 100%;"
                          @change="changeEvent(item.changeEventName)">
                        </el-date-picker>
                      </el-col>
                      <el-col style="text-align: center" :span="1">-</el-col>
                      <el-col :span="8">
                        <el-date-picker
                          placeholder="选择时间"
                          v-model="form[item.key].date2"
                          style="width: 100%;"
                          @change="changeEvent(item.changeEventName)">
                        </el-date-picker>
                      </el-col>
                    </template>
                    <!-- 多个选择框 -->
                    <!-- 不建议使用,推荐使用空白插槽自定义  -->
                    <!--  处理逻辑将会非常麻烦  -->
                    <template v-if="item.type === 'multipleSelection'">
                      <div v-for="(single,index) in item.options" :key="index">
                        <el-col :span="7">
                          <el-select
                            v-model="form[single.key]"
                            style="width: 100%"
                            :placeholder="jointStr(item.label, 1)"
                            :value="single.defaultVal"
                            @change="changeEvent(item.changeEventName)"
                            :disabled="item.disabled || items.disabled">
                            <el-option
                              v-for="option in single.options"
                              :key="option.value"
                              :label="option.value"
                              :value="option.key">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col style="text-align: center" :span="1">&nbsp;</el-col>
                      </div>
                    </template>
                    <!--   不建议使用,推荐使用空白插槽自定义        -->
                    <!--   仅适用于省市选择   -->
                    <template v-if="item.type === 'selectCity'">
                      <div class="select-city">
                      <el-select
                              v-model="form[item.key]"
                              :placeholder="jointStr(item.label, 1)"
                              :value="item.defaultVal"
                              @change="changeEvent(item.changeEventName)"
                              :disabled="item.disabled || items.disabled">
                        <el-option
                                v-for="option in item.options"
                                :key="option.value"
                                :label="option.value"
                                :value="option.key">
                        </el-option>
                      </el-select>
                      <el-select
                              v-model="form['city']"
                              :placeholder="jointStr(item.label, 1)"
                              :value="item.defaultVal"
                              @change="changeEvent(item.changeEventName)"
                              :disabled="item.disabled || items.disabled">
                        <el-option
                                v-for="city in item.options[form[item.key] ? form[item.key] : 0].list"
                                :key="city.value"
                                :label="city.value"
                                :value="city.key">
                        </el-option>
                      </el-select>
                      </div>
                    </template>
                    <template v-if="item.type === 'radio'">
                      <el-radio-group
                        v-model="form[item.key]"
                        :disabled="item.disabled || items.disabled"
                        :value="item.defaultVal"
                        @change="changeEvent(item.changeEventName)">
                        <el-radio
                          v-for="option in item.options"
                          :key="option.key"
                          :label="option.key">
                          {{option.value}}
                        </el-radio>
                      </el-radio-group>
                    </template>
                    <template v-if="item.type === 'date'">
                      <el-date-picker
                        :disabled="item.disabled || items.disabled"
                        :type="item.dateType"
                        :placeholder="jointStr(item.label, 1)"
                        v-model="form[item.key]"
                        unlink-panels
                        :format="item.format ? item.format : 'yyyy - MM - dd'"
                        :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                        range-separator="-"
                        :defalut-value="item.defaultVal"
                        :default-time="item.defaultTime"
                        :start-placeholder="item.startPlaceholder"
                        :end-placeholder="item.endPlaceholder"
                        @change="changeEvent(item.changeEventName)">
                      </el-date-picker>
                    </template>
                    <template v-if="item.type === 'upload'">
                      <el-upload
                        :disabled="item.disabled"
                        class="upload-content"
                        action="item.action"
                        :auto-upload="false"
                        :file-list="form[item.key]"
                        :on-change="(file)=>{
                                form[item.key].push(file)
                              }"
                      >
                        <el-input
                          class="upload-input"
                          placeholder="预览"
                          suffix-icon="el-icon-picture-outline"
                          :disabled="true">
                        </el-input>
                        <div slot="tip" class="el-upload__tip">支持pdf、jpg、png文件格式，单个文件不超过10M</div>
                      </el-upload>
                    </template>
                    <template v-if="item.type === 'time'">
                      <el-time-picker
                        :disabled="item.disabled || items.disabled"
                        type="fixed-time"
                        v-if="!item.isRange"
                        :placeholder="jointStr(item.label, 1)"
                        v-model="form[item.key]"
                        :format="item.format"
                        :value-format="item.valueFormat"
                        :defalut-value="item.defaultVal"
                        @change="changeEvent(item.changeEventName)">
                      </el-time-picker>
                      <el-time-picker
                        :disabled="item.disabled || items.disabled"
                        type="fixed-time"
                        v-if="item.isRange"
                        :placeholder="jointStr(item.label, 1)"
                        v-model="form[item.key]"
                        :format="item.format ? item.format : 'yyyy - MM - dd HH:mm:ss'"
                        :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                        is-range
                        range-separator="-"
                        :defalut-value="item.defaultVal"
                        :start-placeholder="item.startPlaceholder"
                        :end-placeholder="item.endPlaceholder"
                        @change="changeEvent(item.changeEventName)">
                      </el-time-picker>
                    </template>
                    <template v-if="item.type === 'button'">
                      <el-button
                        class="m-submit-btn"
                        @click="clickEvent('submit')"
                        :disabled="isSubmit">
                        查询
                      </el-button>
                      <el-button
                        class="m-cancel-btn"
                        @click="clickEvent('reset')">
                        重置
                      </el-button>
                    </template>
                    <slot :name="item.slotInnerName"></slot>
                  </div>
                  <slot :name="item.slotName"></slot>
                </el-form-item>
              </template>
            </template>
          </div>
        </div>
        <slot name="otherPanel"></slot>
      </el-form>
      <!-- 按钮 -->
      <div class="m-form-btn" v-if="btnData.length > 0">
        <el-button
                v-for="(item, index) in btnData"
                :key="item.btnText"
                :class="item.class"
                @click="clickEvent(item.clickEventName, index)"
                :disabled="isSubmit">
            {{item.btnText}}
        </el-button>
      </div>
      <!-- 温馨提示 -->
      <m-hint-box :msgs="msgs" :msgsTitle="msgsTitle"></m-hint-box>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'm-form',
  props: {
    // 组件渲染的配置对象
    componentJson: {
      type: Object,
      default: null
    },
    // 按钮组件配置项
    btnData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // ref
    formRefs: {
      type: String,
      default: 'defalutForm'
    },
    Watchkey: {
      type: String,
      default: ''
    },
    // 按钮禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 表单的初始数据
    formModel: {
      type: Object,
      default: null
    },
    // 表单域标签的宽度
    labelWidth: {
      type: String,
      default: '30%'
    },
    // 温馨提示
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
    return {
      form: {},
      isClear: false,
      isSubmit: false,
      data: {},
      fileList: []
    }
  },
  watch: {
    formModel: {
      deep: true,
      handler: function (newVal) {
        this.form = _.cloneDeepWith(this.form, this.formModel)
      }
    },
    form: {
      deep: true,
      handler: function () {
        // 重置为空时，组件不重新渲染
        var arr = Object.keys(this.form)
        if (arr.length === 0) {
          return
        }
        this.data = this._deepCopyList(this.componentJson)
      }
    },
    componentJson: {
      deep: true,
      handler: function (newVal) {
        this.data = this._deepCopyList(newVal)
      }
    },
    isDisabled (newVal) {
      this.isSubmit = newVal
    }
  },
  methods: {
    isRender (ifRender) {
      return _.isFunction(ifRender) ? ifRender(this.form) : true
    },
    clickEvent (eventName) {
      // this.isSubmit = true
      if (!eventName) return
      if (eventName === 'submit') {
        // 提交事件
        this.$refs[this.formRefs].validate((valid) => {
          if (valid) {
            this.$emit(eventName, this.form)
          } else {
            // this.isSubmit = false
            return false
          }
        })
      } else if (eventName === 'reset') {
        // 重置事件
        // this.form = {}
        // for (const key in this.form) {
        //   if (typeof this.form[key] === 'string') {
        //     this.form[key] = ''
        //   } else if (typeof (this.form[key]) === 'object') {
        //     this.form[key] = {}
        //   }
        // }
        // this.isClear = true
        this.$refs[this.formRefs].resetFields()
        this.$emit(eventName, this.form)
      } else {
        // 其他事件
        this.$emit(eventName, this.form)
      }
    },
    changeEvent (eventName) {
      if (!eventName) return
      this.$emit(eventName, this.form)
    },
    jointStr (label, type) {
      return type === 1 ? '请选择' + label : '请输入' + label
    },
    // 深度遍历
    _deepCopyList (list) {
      let ret = list instanceof Array ? [] : {}
      for (let i in list) {
        ret[i] = typeof list[i] === 'object' ? this._deepCopyList(list[i]) : list[i]
      }
      return ret
    },
    // 账户列表change事件
    selectItemEvent (item) {
      this.isClear = false
      this.form[item.defaultKey] = item.id
      this.$emit('select-item', item)
    },
    formValidate (callback) {
      this.$refs[this.formRefs].validate((valid) => {
        if (valid) {
          callback(this.form)
        } else {
          return false
        }
      })
    }
  },
  created () {
    // 对formModel进行浅遍历，用于表单重置，清空数据
    this.form = Object.assign({}, this.formModel)
    this.data = this._deepCopyList(this.componentJson)
    // this.cityList = this.form['selectCity'].options[this.provinceKey].list
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/unit/color.scss';
    #m-form {
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);

        .m-submit-btn:focus, .m-submit-btn:hover {
            color: $color-fill;
            border-color: $color-primary;
            background-color: $color-primary;
        }

        .m-el-form {
            background: #fff;
            padding-bottom: 18px;
            .el-input {
                width: 65%;
            }
            .el-input__icon {
                line-height: 24px;
            }
            .el-input.is-disabled .el-input__inner {
                cursor: default;
            }

            .el-date-editor .el-range-separator {
                line-height: 24px;
            }

            .el-range-editor.el-input__inner {
                width: 65%;
            }
            .el-select {
                width: 50%;

                .el-input {
                    width: 100%;
                }
            }
            .select-city{
                .el-select{
                  width: 30%;
                  margin-right: 5%;
                }
            }

          .m-new-form-link{
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            color: #2bb0f1;

            .el-icon-arrow-right{
              color: #666666;
            }
          }

            .m-form-buttom-msg{
                color: #333333;
                height: 20px;
                line-height: 20px;
                margin: 0;
            }
            .el-form-item__content {
                width: 100%;
                margin-left: 0px !important;
            }
            .m-form-contianer {
                .m-form-block-contianer-body {
                    display: flex;
                    width: 100%;
                    justify-content: flex-start;
                    flex-wrap: wrap;

                    .el-form-item {
                        display: flex !important;
                        justify-content: flex-start !important;
                    }
                    .m-event-check {
                        margin-left: 12px;
                    }
                }
            }
        }

        // 列表页、弹框特殊样式
        .m-el-form-long {
            padding-bottom: -18px;
            .el-input {
                width: 100%;
            }
            .m-submit-btn {
              margin: 0 20px 5px 0;
            }
            .m-form-block-contianer-title-1 {
                padding: 0px;
            }
            .el-date-editor .el-range-separator {
                line-height: 26px;
                padding: 0px 2px;
            }
            .el-input__icon {
                line-height: 32px;
            }
            .el-range-editor.el-input__inner {
                width: 100%;
                padding: 0px 0px 0px 10px;
            }

            .el-select {
                width: 100%;

                .el-input {
                    width: 100%;
                }
            }

            .el-form-item__content {
                width: 70%;
                margin-left: 0px !important;
            }
            // 双输入框的el-form-item下input的width
            .m-form-item-double {
                .el-form-item__content {
                    width: 100%;
                    margin-left: 0px !important;
                }
            }
        }
        // 弹框特殊样式
        .m-el-form-dialog {
          .m-form-block-contianer-title-1 {
            padding-bottom: 20px;
          }
        }
        .m-panel-split-20 {
            .m-msg-split {
                height: 20px;
                background: #fafafa;
                margin-top: 18px;
            }
        }
        // 短信验证板块
        .m-msg-panel {
            .m-msg-split {
                height: 20px;
                background: #fafafa;
                margin-top: 18px;
            }

            .m-form-block-contianer-body {
                width: 50% !important;

                .el-form {
                    .el-form-item {
                        width: 100% !important;
                    }
                }
            }
        }
    }
</style>
