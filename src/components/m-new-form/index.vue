`<template>
  <div id="m-form">
    <el-form ref="defalutForm" :model="form" :rules="data.rules" class="m-el-form" @validate="formValidate" :show-message="false" :validate-on-rule-change="false">
      <m-steps :data="data"></m-steps>
      <div class="m-form-contianer" v-for="(items, index) in data.formItems" :key="index">
        <h1 class="m-new-form-block-contianer-title" v-if="items.title">
            <span v-if="items.showSeparate" class="m-new-form-block-contianer-title-separate">&nbsp;</span>
            {{items.title}}
        </h1>
        <div class="m-new-form-formTitle" v-if="items.formTitle">{{items.formTitle}}</div>
        <div class="m-new-form-block-contianer-body">
          <template>
            <!-- :label-width="item.labelWidth ? item.labelWidth : items.labelWidth ? items.labelWidth : getLabelWidth(item, items, data)" -->
            <el-form-item
              v-for="(item,index) in items.group"
              v-show="item.show !== false"
              :label-position="item.labelPosition ? item.labelPosition : 'right'"
              :key="index"
              :prop="item.key"
              :label="item.label"
              label-width="200px"
              :style="{
                'width': item.formWidth ? item.formWidth : items.formWidth ? items.formWidth : data.formWidth ? data.formWidth : '50%'
              }">
              <div class="form-item">
                <!--  空白组件,内容全靠插槽传入, bankName    -->
                <template v-if="item.type === 'blank' || item.type === undefined">
                    <slot :name="item.blankSlotName" :data="form[item.key]"></slot>
                </template>
                <!-- input框 -->
                <template v-if="item.type === 'input'">
                  <el-autocomplete
                      v-if="item.options"
                      :disabled="item.disabled || items.disabled"
                      v-model="form[item.key]"
                      :style="{'width': item.width ? item.width : '65%'}"
                      :fetch-suggestions="(queryString, cb) => querySearch(queryString, cb, item.options, item)"
                      :placeholder="getPlaceholder(item)"
                      @select="(option) => selectEvent(item.changeEventName, option)"
                    ></el-autocomplete>
                    <el-input
                      v-else-if="item.inputType === 'money'"
                      v-model="form[item.key + 'copy' ]"
                      :disabled="item.disabled || items.disabled"
                      :maxlength="item.maxlength"
                      :placeholder="getPlaceholder(item)"
                      :oninput="item.oninput"
                      :style="{'width': item.width ? item.width : '65%'}"
                      @keydown.native="e => { keydownEvent(item.keydownEventName, e) }"
                      @blur="event => {
                        form[item.key + 'copy'] = blurCurrency(form[item.key])
                        blurEvent(item.blurEventName, form[item.key])
                      }"
                      @input="(value)=>{
                        form[item.key] = value.replace(/,/g,'')
                        changeEvent(item.inputEventName)
                        form[item.key + 'copy'] = formatCurrency(form[item.key])
                      }"
                      @change="val =>{
                        form[item.key] = val.replace(/,/g,'')
                        changeEvent(item.changeEventName)
                      }"
                    >
                      <!--  对应el-UI input框的原生四个插槽  -->
                      <template slot="append" v-if="item.appendSlotName"><slot :name="item.appendSlotName"></slot></template> // 输入框尾部外面
                      <template slot="suffix" v-if="item.suffixSlotName"><slot :name="item.suffixSlotName"></slot></template> // 输入框尾部里面
                      <template slot="prefix" v-if="item.prefixSlotName"><slot :name="item.prefixSlotName"></slot></template> // 输入框前部里面
                      <template slot="prepend" v-if="item.prependSlotName"><slot :name="item.prependSlotName"></slot></template> // 输入框前部外面
                    </el-input>
                    <el-input
                      v-else-if="item.inputType === 'int'"
                      v-model="form[item.key + 'copy' ]"
                      :disabled="item.disabled || items.disabled"
                      :maxlength="item.maxlength"
                      :placeholder="getPlaceholder(item)"
                      :style="{'width': item.width ? item.width : '65%'}"
                      @keydown.native="intKeyDown"
                      @blur="event => {
                        form[item.key + 'copy'] = formatInt(form[item.key])
                        blurEvent(item.blurEventName, form[item.key])
                      }"
                      @input="(value)=>{
                        form[item.key] = value.replace(/,/g,'')
                        changeEvent(item.inputEventName)
                        form[item.key + 'copy'] = formatInt(form[item.key])
                      }"
                      @change="val =>{
                        form[item.key] = val.replace(/,/g,'')
                        changeEvent(item.changeEventName)
                      }"
                    >
                      <!--  对应el-UI input框的原生四个插槽  -->
                      <template slot="append" v-if="item.appendSlotName"><slot :name="item.appendSlotName"></slot></template> //输入框尾部外面
                      <template slot="suffix" v-if="item.suffixSlotName"><slot :name="item.suffixSlotName"></slot></template> //输入框尾部里面
                      <template slot="prefix" v-if="item.prefixSlotName"><slot :name="item.prefixSlotName"></slot></template> //输入框前部里面
                      <template slot="prepend" v-if="item.prependSlotName"><slot :name="item.prependSlotName"></slot></template> //输入框前部外面
                    </el-input>
                    <el-input
                      v-else
                      v-model="form[item.key]"
                      :type="item.inputType"
                      :disabled="item.disabled || items.disabled"
                      :maxlength="item.maxlength"
                      :max="item.max"
                      :min="item.min"
                      :minlength="item.minlength"
                      :placeholder="item.placeholder ? item.placeholder : jointStr(item.label)"
                      :oninput="item.oninput"
                      :style="{'width': item.width ? item.width : '65%'}"
                      @keydown.native="e => { keydownEvent(item.keydownEventName, e) }"
                      @blur="event => {blurEvent(item.blurEventName, form[item.key])}"
                      @input="changeEvent(item.inputEventName)"
                      @change="val =>{
                        form[item.key] = val
                        changeEvent(item.changeEventName)
                      }"
                    >
                      <!--  对应el-UI input框的原生四个插槽  -->
                      <template slot="append" v-if="item.appendSlotName"><slot :name="item.appendSlotName"></slot></template>
                      <template slot="suffix" v-if="item.suffixSlotName"><slot :name="item.suffixSlotName"></slot></template>
                      <template slot="prefix" v-if="item.prefixSlotName"><slot :name="item.prefixSlotName"></slot></template>
                      <template slot="prepend" v-if="item.prependSlotName"><slot :name="item.prependSlotName"></slot></template>
                    </el-input>
                    <template>
                      <!-- input右方的插槽  -->
                      <slot :name="item.rightSlotName"></slot>
                    </template>
                    <!-- input下方的插槽 -->
                    <slot :name="item.bottomSlotName"></slot>
                </template>
                <template v-if="item.type === 'text'">
                <div v-if="item.isConcatHtml" class="m-new-form-text" :style="item.style ? item.style : ''" v-html="item.formatter(item.key, form[item.key])"></div>
                <div v-else-if="typeof form[item.key] === 'object'" class="m-new-form-text" :style="item.style ? item.style : ''">
                  <div v-for="(textItem, index) in form[item.key]" :key="index">{{typeof item.formatter === 'function' ?
                    item.formatter(item.key, textItem) : textItem}}</div>
                </div>
                <div v-else class="m-new-form-text" :style="item.style ? item.style : ''">
                  {{
                    item.textType === 'shy' && !eyeOpen ?
                    hideMoney(typeof item.formatter === 'function' ?
                    item.formatter(item.key, form[item.key]) :
                    item.options ? item.options[form[item.key]].value :
                    item.content ? (form[item.key]+item.content) : form[item.key])
                    :
                    typeof item.formatter === 'function' ?
                    item.formatter(item.key, form[item.key]) :
                    item.options ? item.options[form[item.key]].value :
                    item.content ? (form[item.key]+item.content) : form[item.key]
                  }}
                  <slot class="shy-png" v-if="item.textSlot" :name="item.textSlot"></slot>
                  <img src="./png/eyeOpen.png" @click="mousedown()" v-if="item.textType === 'shy' && eyeOpen" class="shy-png open">
                  <img src="./png/eyeClose.png" @click="mousedown()" v-else-if="item.textType === 'shy' && !eyeOpen" class="shy-png close">
                </div>
                </template>
                      <!-- 跳转标签 -->
                <template v-if="item.type === 'link'">
                    <div class="m-new-form-link fs16" @click="clickEvent(item.clickEventName)">
                        {{
                          typeof item.formatter === 'function' ?
                          item.formatter(form[item.key]) :
                          form[item.key]
                        }}
                        <!-- <div class="el-icon-arrow-right">{{item.text}}</div> -->
                    </div>
                    <template>
                        <!-- 标签右方的插槽  -->
                        <slot :name="item.rightSlotName"></slot>
                    </template>
                    <!-- 标签下方的插槽  -->
                    <div v-if="item.bottomSlotName" style="width: 100%">
                      <slot :name="item.bottomSlotName"></slot>
                    </div>
                </template>
                <!-- 树型组件 ,当需要使用选择框时其中nodeKey必选  -->
                <template v-if="item.type === 'tree'">
                    <el-tree
                      ref="tree"
                      :id="item.id ? item.id : 'tree'"
                      :data="item.data"
                      :show-checkbox="item.showCheckbox === false ? false : true"
                      :node-key="item.nodeKey"
                      :default-expanded-keys="item.expandedKeys"
                      :default-checked-keys="form[item.key]"
                      :filter-node-method="item.filterNode"
                      :props="item.props ? item.props : {children: 'children',label: 'label'}"
                      :disabled="item.disabled"
                    >
                      <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span>{{ node.label }}</span>
                          <!-- 作用域插槽, 使用方法(slot-scope="{ node, data }")   -->
                          <slot :node="node" :data="data" :ref="$refs.tree"></slot>
                      </span>
                    </el-tree>
                </template>
                <template v-if="item.type === 'select'">
                  <el-select
                    ref="select"
                    v-model="form[item.key]"
                    :placeholder="jointStr(item.label, 1)"
                    :style="{'width': item.width ? item.width : '65%'}"
                    :value="item.defaultVal"
                    @visible-change="(flag)=> selectVisibleChange(flag, item.visibleChangeEventName)"
                    :disabled="item.disabled"
                    :filterable="item.filterable"
                    :filter-method="item.filterMethod"
                  >
                      <!-- el-UI原生自带插槽,位于选项的上方  -->
                      <template v-if="item.defaultSlotName" slot="default">
                          <slot :name="item.defaultSlotName"></slot>
                      </template>
                      <el-option
                        v-show="item.options"
                        v-for="(option,index) in item.options"
                        :key="index"
                        @click.native="changeEvent(item.changeEventName, option)"
                        :label="item.trans ? option[item.trans.value] : option.value"
                        :value="item.trans ? option[item.trans.key] ? option[item.trans.key] : index : option.key">
                      </el-option>
                  </el-select>
                    <!-- 位于选择器右方的插槽 -->
                    <template v-if="item.rightSlotName">
                        <slot :name="item.rightSlotName"></slot>
                    </template>
                    <!-- 位于选择器下方的插槽 -->
                    <div v-if="item.bottomSlotName" style="width: 100%">
                        <slot :name="item.bottomSlotName"></slot>
                    </div>
                </template>
                <!-- 时间域 -->
                <template v-if="item.type === 'dateArea'">
                  <date-area :item="item" :form="form" @changeDate="changeEvent(item.changeEventName)">
                  </date-area>
                </template>
                <!-- 金额区间 -->
                <template v-if="item.type === 'moneyArea'">
                  <money-area :item="item" :form="form" />
                </template>
                <!-- 电话号 -->
                <template v-if="item.type === 'telePhone'">
                  <tele-phone :item="item" :form="form" />
                </template>
                <!-- 输入域 -->
                <template v-if="item.type === 'inputArea'">
                    <el-col style="width: 156px">
                        <el-input
                          type="input"
                          :disabled="form[item.isDisabled]"
                          v-model="form[item.firstKey]"
                          :style="{'width': item.width ? item.width : '100%'}"
                          :maxlength="item.maxlength"
                          :minlength="item.minlength"
                          :oninput="item.oninput"
                          @keydown.native="e => { keydownEvent(item.keydownEventName, e) }"
                          @blur="event => {blurEvent(item.blurEventName, form[item.secondKey])}"
                          @input="changeEvent(item.inputEventName)"
                          @change="val =>{
                            form[item.key] = val
                            changeEvent(item.changeEventName)
                          }">
                        </el-input>
                    </el-col>
                    <el-col style="text-align: center; width: 30px">-</el-col>
                    <el-col style="width: 156px">
                        <el-input
                          :disabled="form[item.isDisabled]"
                          v-model="form[item.secondKey]"
                          :style="{'width': item.width ? item.width : '100%'}"
                          :maxlength="item.maxlength"
                          :minlength="item.minlength"
                          :oninput="item.oninput"
                          @keydown.native="e => { keydownEvent(item.keydownEventName, e) }"
                          @blur="event => {blurEvent(item.blurEventName, form[item.firstKey])}"
                          @input="changeEvent(item.inputEventName)"
                          @change="val =>{
                            form[item.key] = val
                            changeEvent(item.changeEventName)
                          }"></el-input>
                    </el-col>
                </template>
                <!-- 多选框 -->
                <template v-if="item.type === 'checkbox'">
                    <el-checkbox-group v-model="form[item.key]" @change="(val) => {changeEvent(item.changeEvent,val)}">
                        <el-checkbox :label="option.formatter ? option.formatter(option.value, option) : option.value" :disabled="option.disabled ? option.disabled : item.disabled ? item.disabled : false" :key="option.key" v-for="option in item.options"></el-checkbox>
                    </el-checkbox-group>
                </template>
                <!-- 文本域 -->
                <template v-if="item.type === 'textarea'">
                  <el-input
                    type="textarea"
                    autosize
                    :disabled="item.disabled || items.disabled"
                    :rows="item.rows || 2"
                    :maxlength="item.maxlength"
                    :placeholder="jointStr(item.label, 2)"
                    :style="{'width': item.width ? item.width : '65%'}"
                    @change="val =>{
                        form[item.key] = val
                        changeEvent(item.changeEventName)
                      }"
                    v-model="form[item.key]">
                  </el-input>
                  <span v-if="item.len || false" style="font-size: 12px; color: #8f8f8f; margin-left: 15px;">({{ form[item.key].length }} / {{ item.maxlength }})</span>
                </template>
                <template v-if="item.type === 'singerCheck'">
                  <el-checkbox
                    v-model="form[item.key]"
                    :disabled="item.disabled"
                  >{{item.value}}</el-checkbox>
                </template>
                <template v-if="item.type === 'radio'">
                  <el-radio-group
                    v-model="form[item.key]"
                    :disabled="item.disabled"
                    :value="item.defaultVal"
                    @change="changeEvent(item.changeEventName)">
                  <el-radio
                    v-for="option in item.options"
                    :key="item.trans ? option[item.trans.key] ? option[item.trans.key] : index : option.key"
                    :label="item.trans ? option[item.trans.key] ? option[item.trans.key] : index : option.key"
                  >{{item.trans ? option[item.trans.value] : option.value}}</el-radio>
                  </el-radio-group>
                    <!-- 位于单选框右方的插槽 -->
                    <template v-if="item.rightSlotName">
                        <slot :name="item.rightSlotName"></slot>
                    </template>
                </template>
                <template v-if="item.type === 'date'">
                  <el-date-picker
                    :style="{'width': item.width ? item.width : '65%'}"
                    :disabled="item.disabled"
                    :type="item.dateType"
                    :placeholder="jointStr(item.label, 1)"
                    v-model="form[item.key]"
                    :format="item.format ? item.format : 'yyyy - MM - dd'"
                    :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
                    range-separator="-"
                    :defalut-value="item.defaultVal"
                    :default-time="item.defaultTime"
                    :start-placeholder="item.startPlaceholder"
                    :end-placeholder="item.endPlaceholder"
                    :picker-options="item.pickerOptions"
                    @change="changeEvent(item.changeEventName)">
                  </el-date-picker>
                </template>

                <template v-if="item.type === 'quarter'">
                  <!-- 季度选择 -->
                    <quarter
                      spliceValue=''
                      :valueArr='item.valueArr'
                      v-model="form[item.key]"
                      @change="(obj, value)=>{
                        form[item.key] = value
                      }"
                    ></quarter>
                </template>

                <!-- 上传 -->
                <template v-if="item.type === 'upload'">
                  <el-upload
                    :style="{'width': item.width ? item.width : '65%'}"
                    id="upload"
                    ref="upload"
                    class="upload-content"
                    :action="item.action ? item.action : '' "
                    :auto-upload="false"
                    multiple
                    :limit="2"
                    :show-file-list="false"
                    :file-list="form[item.key]"
                    :on-change="(file)=>{
                        uploadFile(item.key,file,item)
                    }"
                  >
                    <!--插槽自定义上传中间的内容-->
                    <slot v-if="item.slotName" :name="item.slotName"></slot>
                    <el-input
                      v-else
                      class="upload-input"
                      :placeholder="form[item.key][0] ? form[item.key][0].name : ''"
                      suffix-icon="el-icon-picture-outline"
                      :disabled="true"
                      :style="{'width': item.inputWidth ? item.inputWidth : '80%'}"
                    >
                    </el-input>
                    <el-button size="small" type="primary">浏览</el-button>
                  </el-upload>
                </template>
                <template v-if="item.type === 'uploadFile'">
                  <vue-file-upload
                    :ref="item.ref || 'fileUpload'"
                    :value="form[item.key]"
                    :url="item.url || ''"
                    :name="item.key"
                    :filters="[{
                      name: 'fileType',
                      fn: (that,file) => filtFileType(file, item)
                    }] || []"
                    :requestOptions="{
                      formData: item.formData || {},
                      headers: {},
                      responseType: 'json',
                      withCredentials: false
                    }"
                    :events="{
                      onErrorUpload: item.faileFun ? (file,response,status,headers)=>{item.faileFun(file,response,status,headers,form)} : ()=>{},
                      onSuccessUpload: item.successFun ? (file,response,status,headers)=>{item.successFun(file,response,status,headers,form)} : ()=>{},
                    }"
                    :max="1"
                    @onAdd="(fileList)=>{
                      form[item.key] = fileList[0].name
                    }"
                  ></vue-file-upload>
                </template>
                <template v-if="item.type === 'time'">
                  <el-time-select
                    :style="{'width': item.width ? item.width : '65%'}"
                    v-model="form[item.key]"
                    v-if="item.pickerOptions"
                    :picker-options="item.pickerOptions"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder ? item.placeholder : '选择时间'"
                    @change="changeEvent(item.changeEventName)"
                  >
                  </el-time-select>
                  <el-time-picker
                    :style="{'width': item.width ? item.width : '65%'}"
                    :disabled="item.disabled"
                    type="fixed-time"
                    v-if="!item.isRange && !item.pickerOptions"
                    :placeholder="jointStr(item.label, 1)"
                    v-model="form[item.key]"
                    :format="item.format ? item.format : 'HH:mm:ss'"
                    :value-format="item.valueFormat ? item.valueFormat : 'HH:mm:ss'"
                    :defalut-value="item.defaultVal"
                    @change="changeEvent(item.changeEventName)">
                  </el-time-picker>
                  <el-time-picker
                    :disabled="item.disabled"
                    type="fixed-time"
                    :style="{'width': item.width ? item.width : '65%'}"
                    v-if="item.isRange && !item.pickerOptions"
                    :placeholder="jointStr(item.label, 1)"
                    v-model="form[item.key]"
                    :format="item.format ? item.format : 'HH:mm:ss'"
                    :value-format="item.valueFormat ? item.valueFormat : 'HH:mm:ss'"
                    is-range
                    range-separator="-"
                    :defalut-value="item.defaultVal"
                    :start-placeholder="item.startPlaceholder"
                    :end-placeholder="item.endPlaceholder"
                    @change="changeEvent(item.changeEventName)">
                  </el-time-picker>
                </template>
                <template v-if="item.type === 'button'">
                  <el-button class="m-submit-btn"  @click="clickEvent(item.clickEventName)" :disabled="isSubmit">查询</el-button>
                </template>
                <span class="check-mark" v-if="data.showRightCheck && item.type !== 'upload' && item.type !== 'radio' && item.type !== 'text' && data.rules[item.key] !== undefined  && data.rules[item.key][0].required">*</span>
                <slot :name="item.slotInnerName"></slot>
                <slot :name="item.slotName" :data="form[item.key]"></slot>
              </div>
            </el-form-item>
          </template>
        </div>
        <slot :name="items.slotName"></slot>
      </div>
      <slot name="otherPanel"></slot>
    </el-form>
    <!-- 按钮 -->
    <m-btn :btnData="btnData" @click="clickEvent" ></m-btn>
    <!-- 温馨提示 -->
    <m-hint-box :msgs="msgs" :msgsTitle="msgsTitle"></m-hint-box>
  </div>
</template>

<script>
import _ from 'lodash'
import Quarter from './common/quarter'
import DateArea from './common/dateArea'
import MoneyArea from './common/moneyArea'
import TelePhone from './common/telePhone'
import util from '../../libs/util'

export default {
  name: 'm-form',
  props: {
    // 季度插件开始
    valueArr: {
      default: () => {
        return ['01-03', '04-06', '07-09', '10-12']
      },
      type: Array
    },
    getValue: {
      default: () => {},
      type: Function
    },
    defaultValue: {
      default: '',
      type: String
    },
    // 季度插件结束
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
  components: {
    MoneyArea,
    Quarter,
    DateArea,
    TelePhone
  },
  data () {
    return {
      eyeOpen: true,
      // 季度插件开始
      showSeason: false,
      season: '',
      year: new Date().getFullYear(),
      showValue: '',
      // 季度插件结束
      form: {},
      filterValue: '',
      isClear: false,
      isSubmit: false,
      oldFormData: {},
      data: {},
      fileList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    // 季度插件开始
    defaultValue: function (value, oldValue) {
      let arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      let arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
    },
    // 季度插件结束
    formModel: {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        // 获取change是为了避免在父组件修改this.formModel导致formModel中未修改的参数将form中已修改的参数覆盖
        let change = this.changes(newVal, this.oldFormData)
        this.oldFormData = _.cloneDeepWith(newVal)
        this.form = _.cloneDeep({ ...this.form, ...change })
      }
    },
    isDisabled (newVal) {
      this.isSubmit = newVal
    }
  },
  methods: {
    filtFileType (file, item) {
      console.log(file.type, item.fileType)
      return item.fileType ? !!item.fileType.find((item) => file.type === item) : true
    },           
    getPlaceholder (item) {
      if (!this.form[item.key + 'copy'] && !!this.form[item.key]) {
        let val = item.inputType === 'int' ? this.formatInt(this.form[item.key]) : this.blurCurrency(this.form[item.key])
        this.$set(this.form, `${item.key}copy`, val)
      }
      return item.placeholder ? item.placeholder : this.jointStr(item.label)
    },
    intKeyDown (e) {
      const keyCode = e.keyCode
      if (
        !util.isBackspace(keyCode) &&
        !util.isNumber(keyCode) &&
        !util.isPinYin(keyCode)
      ) {
        // 其他按键
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    },
    formatInt (value) {
      if (!value) return ''
      let val = value // 提前保留两位小数
      val = val.toString() // 将number类型转为字符串类型，方便操作
      let value2Array = val.split('.')
      let intPart = value2Array[0].replace(/,/g, '') // 获取整数部分
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断 ？？？
      return intPartFormat
    },
    // 光标离开金额输入框,格式化金额(带小数)
    blurCurrency (value) {
      if (!value) return '0.00'
      let val = value // 提前保留两位小数
      let value2Array = val.split('.')
      let intPart = value2Array[0] // 获取整数部分
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      let floatPart = '.00'
      if (value2Array.length === 2 && value2Array[1].substr(0, 2).length > 0) { // =2表示数据有小数位
        floatPart = value2Array[1].substr(0, 2) // 拿到小数部分
        if (floatPart.length === 1) { // 补0
          return intPartFormat + '.' + floatPart + '0'
        } else {
          return intPartFormat + '.' + floatPart
        }
      } else {
        return intPartFormat + floatPart
      }
    },
    // 格式化金额
    formatCurrency (value) {
      if (!value) return ''
      let val = value // 提前保留两位小数
      val = val.toString() // 将number类型转为字符串类型，方便操作
      let value2Array = val.split('.')
      let intPart = value2Array[0].replace(/,/g, '') // 获取整数部分
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断 ？？？
      let float = value2Array[1]
      float = float ? float.substr(0, 2) : ''
      return intPartFormat + (value.indexOf('.') > 0 ? '.' : '') + (float || '')
    },
    // 隐藏金额
    hideMoney (value) {
      return '****'
    },
    // 点击眼睛,控制金额显影
    mousedown (item) {
      this.eyeOpen = !this.eyeOpen
    },
    // 获取ie版本
    getIEVersion () {
      const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE浏览器
      if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1'])
        return fIEVersion
      } else {
        return false
      }
    },
    selectVisibleChange (flag, visibleChangeEventName) {
      if (!flag) {
        this.$refs.select.forEach(item => {
          item.blur()
        })
      }
      if (visibleChangeEventName) {
        this.$emit(visibleChangeEventName, flag)
      }
    },
    // 季度插件开始
    one () {
      this.showSeason = false
    },
    prev () {
      this.year = this.year * 1 - 1
    },
    next () {
      this.year = this.year * 1 + 1
    },
    selectSeason (i) {
      let that = this
      that.season = i + 1
      let arr = that.valueArr[i].split('-')
      that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
      that.showSeason = false
      this.showValue = `${this.year}年${this.season}季度`
    },
    // 季度插件结束

    getLabelWidth (item, items, data) {
      let formWidth = item.formWidth ? item.formWidth : items.formWidth ? items.formWidth : data.formWidth ? data.formWidth : '100%'
      if (formWidth === '50%') {
        return '240px'
      } else if (formWidth === '100%') {
        return '240px'
      }
    },
    blurEvent (eventName, value) {
      if (eventName) {
        this.$emit(eventName, value)
      }
    },
    formValidate (key, boolean, msg) {
      // if (!boolean) {
      //   setTimeout(() => {
      //     this.$message({
      //       message: msg,
      //       type: 'warning',
      //       showClose: true
      //     })
      //   }, 100)
      // }
    },
    selectEvent (changeEventName, option) {
      if (changeEventName) {
        this.$emit(changeEventName, option, this.form)
      }
    },
    querySearch (queryString, cb, options, item) {
      // 调用 callback 返回建议列表的数据
      if (item.filterOptions) {
        this.form[item.key] = queryString
        if (options.value === undefined && item.trans) {
          options.forEach(option => { option.value = option[item.trans.value] })
        }
        let results = queryString ? options.filter(this.createFilter(queryString, item)) : options
        cb(results)
      } else {
        this.form[item.key] = queryString
        if (options.value === undefined && item.trans) {
          options.forEach(option => { option.value = option[item.trans.value] })
        }
        cb(options)
      }
    },
    createFilter (queryString, item) {
      return (restaurant) => {
        let value = restaurant.value === undefined && item.trans ? restaurant[item.trans.value] : restaurant.value
        return (value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    keydownEvent (eventName, e) {
      if (eventName) {
        this.$emit(eventName, e)
      }
    },
    changes (object, base) {
      return _.transform(object, (result, value, key) => {
        if (!_.isEqual(value, base[key])) {
          result[key] = (_.isObject(value) && _.isObject(base[key])) ? this.changes(value, base[key]) : value
        }
      })
    },
    isRender (ifRender) {
      return _.isFunction(ifRender) ? ifRender(this.form) : true
    },
    clickEvent (eventName) {
      // this.isSubmit = true
      if (!eventName) return
      if (eventName === 'submit') {
        console.log(this.form)
        // 提交事件
        this.$refs[this.formRefs].validate((valid, errObj) => {
          this.$msg()
          if (valid) {
            this.$emit(eventName, this.form, this.data)
          } else {
            this.$msg(errObj)
            // this.isSubmit = false
            return false
          }
        })
      } else if (eventName === 'reset') {
        // 重置事件
        // this.form = {}
        // for (const key in this.form) {
        //   this.form[key] = ''
        // }
        // this.isClear = true
        this.$msg()
        this.$refs[this.formRefs].resetFields()
        this.$emit(eventName, this.form, this.data)
      } else {
        // 其他事件
        this.$emit(eventName, this.form, this.data)
      }
    },
    changeEvent (eventName, option) {
      this.$msg()
      if (!eventName) return
      this.$emit(eventName, this.form, option)
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
    //  添加文件
    uploadFile (key, file, obj) {
      file = file.raw
      let fileType = obj.fileType ? obj.fileType : ['xls']
      let str = file.name.split('.')
      if (fileType.some(item => item === str[str.length - 1])) {
        this.form[key].shift()
        this.form[key].unshift(file)
      } else {
        this.$msg('上传文件类型错误')
      }
    }
    // formValidate (callback) {
    //   this.$refs[this.formRefs].validate((valid) => {
    //     if (valid) {
    //       callback(this.form)
    //     } else {
    //       return false
    //     }
    //   })
    // }
  },
  created () {
    // 季度插件开始
    if (this.defaultValue) {
      let value = this.defaultValue
      let arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      let arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
    }
    // 季度插件结束
    // 对formModel进行浅遍历，用于表单重置，清空数据
    this.form = Object.assign({}, this.formModel)
    // this.data = this._deepCopyList(this.componentJson)
    if (this.componentJson && this.componentJson.formItems) {
      this.data = Object.assign({}, this.componentJson)
      this.data.formItems.forEach(formItem => {
        if (formItem.single || (!(formItem.formWidth !== '50%' && this.data.formItems.formWidth !== '50%' && this.data.formWidth !== '50%') && (formItem.group.length % 2 !== 0))) {
          formItem.group.push({
            label: ' '
          })
        }
      })
    }
    // this.cityList = this.form['selectCity'].options[this.provinceKey].list
  },
  mounted () {
    // 修改form表单labe前面的伪类
    if (this.data.showRightCheck) {
      document.styleSheets[0].addRule('.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before', 'display:none')
    }
    this.$nextTick(() => {
      this.$emit('montedNext')
    })
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/unit/color.scss';

    #m-form {
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		/*.m-form-btn {
			.m-submit-btn:focus, .m-submit-btn:hover {
				border-color: $color-primary;
				background-color: $color-primary;
				background-image: linear-gradient(0deg, #530001 0%, #7D0405 17%, #BB0B0D 86%, #FFA1A3 100%);
			}
			.m-submit-btn:active {
				border-color: $color-primary-active;
				background-color: $color-primary-active;
				background-image: linear-gradient(0deg, #8a0203 0%, #b30608 17%, #de1f21 86%, #fdcecf 100%)
			}
			.m-cancel-btn:active {
				background-image: linear-gradient(0deg, #ad9292 0%, #d4baba 10%, #eadede 86%, #f9f1f1 99%);
			}
		}*/
        .m-el-form {
            background: #fff;
            .ie9-label{
                display: none;
                display: inline-block\9;
                .ie9-label-span{
                    opacity: 0;
                }
            }
            .el-radio__label{
              margin-right: 10px;
            }
            .el-input {
              width: 65%;
            }
            .date-area{
              .el-input {
                width: 100%;
                .el-input__inner{
                  width: 100%;
                  text-align: center;
                }
              }
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
                min-width: 300px;
            }
            .el-select {
                width: 65%;

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
                cursor: pointer;

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
                width: calc(100% - 201px);
                float: left;
                // width: auto/0;
                margin-left: 0px !important;
            }
            .m-form-contianer {
                .m-form-block-contianer-body {
                    display: flex;
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
