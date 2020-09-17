<template>
  <d2-container class="d-form-previewer">
    <m-steps :data="formStruction"></m-steps>
    <div style="background: #fff;">
      <h2 class="title" :style="titleStyle" v-if="titleConfig.title">{{titleConfig.title}}</h2>

      <div :key="idx" v-for="(item, idx) in formStruction.groups">
        <h3 class="form-group-title fs18" v-if="item.title">{{item.title}}</h3>
        <ul class="list">
          <li class="item fs14" :key="subIdx" :style="{'width': (item.width ? item.width : flexBasisNumber) + '%'}" v-for="(subItem, subIdx) in item.formItems" v-show="subItem.show !== false">
            <div class="label" :style="{'width': maxPer((item.labelWidth ? item.labelWidth : labelWidth),20) + '%'}">{{subItem.label}}</div>
            <div class="value" :style="{'width': minPer((100 - (item.labelWidth ? item.labelWidth : labelWidth)),90) + '%'}">{{typeof subItem.formatter === 'function' ? subItem.formatter(subItem.fieldName, formModel[subItem.fieldName]) : typeof subItem.content === 'undefined' ? formModel[subItem.fieldName] :formModel[subItem.fieldName]+subItem.content }}</div>
          </li>
        </ul>
      </div>

      <slot name="footer"></slot>
    </div>
    <!-- 按钮 -->
    <m-btn :btnData="actionData" @click="handleActionClickEvent" ></m-btn>
    <!-- <div class="m-form-btn" v-if="actionData.length > 0">
        <el-button
          :class="item.class"
          @click.native.prevent="handleActionClickEvent(item.handler, formModel)"
          v-for="(item, index) in actionData"
          v-show="item.show !== false"
          :key="index"
          :disabled="item.disabled">
          {{item.btnText}}
        </el-button>
    </div> -->
  </d2-container>
</template>

<script>
export default {
  name: 'd-form-previewer',
  computed: {
    titleStyle () {
      return {
        'padding-left': (this.titleConfig.paddingLeft || 0) + 'px',
        'height': (this.titleConfig.height || 46) + 'px',
        'line-height': (this.titleConfig.height || 46) + 'px',
        'text-align': this.titleConfig.textAlign || (this.titleConfig.paddingLeft ? 'left' : 'center'),
        'font-size': (this.titleConfig.fontSize || 16) + 'px',
        'color': this.titleConfig.color || '#333',
        'background': this.titleConfig.background || '#FDF2F3'
      }
    },
    flexBasisNumber () {
      return (1 / this.config.columns).toFixed(1) * 100
    },
    labelWidth () {
      return this.formStruction.labelWidth ? Number.parseFloat(this.formStruction.labelWidth) : 20
    }
  },
  props: {
    titleConfig: {
      type: Object,
      required: false,
      default () {
        return {
          title: '',
          paddingLeft: 0,
          height: 46,
          textAlign: 'center',
          fontSize: 16,
          color: '#333',
          background: '#FDF2F3'
        }
      }
    },
    config: {
      type: Object,
      required: false,
      default () {
        return {
          columns: 1
        }
      }
    },
    formStruction: {
      type: Object,
      required: true
    },
    formModel: {
      type: Object,
      required: true
    },
    actionData: { // 按钮操作配置
      type: Array,
      default: () => []
    }
  },
  methods: {
    maxPer (x, y) {
      if (x >= y) {
        return x
      } else {
        return y
      }
    },
    minPer (x, y) {
      if (x <= y) {
        return x
      } else {
        return y
      }
    },
    // 处理action操作 点击事件
    handleActionClickEvent (handler = () => {}) {
      if (typeof handler === 'function') {
        handler(this.formModel)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .d-form-previewer {

    .title {
      margin: 0;
      letter-spacing: 0;
    }

    .form-group-title {
      margin: 0;
      padding: 0px 30px;
      width: calc(100% - 60px);
      color: #333;
      font-weight: bold;
      line-height: 60px;
      letter-spacing: 0;
      background: #ffffff;
    }

    .list {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;

      .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 0;
        flex-shrink: 1;
        height: 42px;
        line-height: 42px;
        letter-spacing: 0;
        display: inline-block\9;
        vertical-align: middle\9;
        white-space: nowrap\9;

        .label {
          flex-grow: 1;
          flex-shrink: 1;
          /*flex-basis: 20%;*/
          padding-right: 20px;
          height: 100%;
          color: #333333;
          border: 1px solid #EEEEEE;
          background: #F8F8F8;
          text-align: right;
          display: inline-block\9;
          vertical-align: middle\9;
        }

        .value {
          flex-grow: 1;
          flex-shrink: 1;
          /*flex-basis: 80%;*/
          padding-left: 24px;
          height: 100%;
          color: #666666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          border: 1px solid #EEEEEE;
          background: #FFFFFF;
          display: inline-block\9;
          vertical-align: middle\9;
        }
      }
    }
  }
</style>
