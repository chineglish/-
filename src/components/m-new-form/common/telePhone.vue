<template>
    <!-- 电话号码 -->
    <div>
      <el-col style="width: 70px">
        <div class="money-area">
          <el-input
            v-model="areaCode"
            :disabled="item.disabled"
            :maxlength="4"
            :minlength="item.minlength"
            placeholder="区号"
            :oninput="item.oninput"
            style="width: 100%"
            @keydown.native="keydownEvent"
            @input="inputEvent('first')"
            @change="inputEvent('first')"
          >
          </el-input>
        </div>
      </el-col>
      <el-col style="text-align: center; width: 30px">-</el-col>
      <el-col style="width: 130px">
        <div class="money-area">
          <el-input
            v-model="number"
            ref="number"
            :disabled="item.disabled"
            :maxlength="8"
            :minlength="item.minlength"
            placeholder="电话号码"
            :oninput="item.oninput"
            style="width: 100%"
            @keydown.native="keydownEvent"
            @input="inputEvent('second')"
            @change="inputEvent('second')"
          >
          </el-input>
        </div>
      </el-col>
    </div>
</template>

<script>
export default {
  name: 'TelePhone',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      areaCode: '',
      number: ''
    }
  },
  created () {
    const value = this.form[this.item.key]
    const list = value.split('-')
    if (list.length > 1) {
      this.areaCode = list[0]
      this.number = list[1]
    } else if (list.length === 1) {
      this.number = list[0]
    }
  },
  methods: {
    isBackspace (keyCode) {
      return keyCode === 8 || keyCode === 9
    },
    isDot (keyCode) {
      return keyCode === 46 || keyCode === 190 || keyCode === 110 || keyCode === 229
    },
    isNumber (keyCode) {
      return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
    },
    isPinYin (keyCode) {
      // todo 存在bug: 拼音打字输入字母然后会出现输入不了的情况,需要鼠标重新点击输入框获取操作焦点
      return (keyCode === 229)
    },
    keydownEvent (e) {
      const keyCode = e.keyCode
      if (
        !this.isBackspace(keyCode) &&
        !this.isNumber(keyCode) &&
        !this.isPinYin(keyCode)
      ) {
        // 其他按键
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    },
    inputEvent (type) {
      if (type === 'first') {
        this.areaCode = this.areaCode.replace(/[^0-9]/g, '')
        if (this.areaCode.length === 4) {
          this.$refs.number.focus()
        }
      } else if (type === 'second') {
        this.number = this.number.replace(/[^0-9]/g, '')
      }
      this.form[this.item.key] = this.areaCode + '-' + this.number
    },
    jointStr (label) {
      return '请输入' + label
    }
  }
}
</script>
<style lang="scss" scoped>
.money-area{
  .el-input {
    width: 100%;
    .el-input__inner{
      width: 100%;
      text-align: left;
    }
  }
}
</style>
