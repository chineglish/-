<template>
    <div>
      <el-col style="width: 105px">
        <div class="money-area">
          <el-input
            v-model="form[item.firstKey+'copy']"
            :disabled="item.disabled"
            :placeholder="jointStr(item.label)"
            :style="{'width': item.width ? item.width : '100%'}"
            @keydown.native="keydownEvent"
            @blur="event => {
              form[item.firstKey + 'copy' ] = blurCurrency(form[item.firstKey])
            }"
            @input="(value)=>{
              form[item.firstKey] = value.replace(/,/g,'')
              form[item.firstKey + 'copy' ] = formatCurrency(form[item.firstKey])
            }"
            @change="val =>{
              form[item.firstKey] = val.replace(/,/g,'')
            }"
          >
          </el-input>
        </div>
      </el-col>
      <el-col style="text-align: center; width: 20px">-</el-col>
      <el-col style="width: 105px">
        <div class="money-area">
          <el-input
            v-model="form[item.secondKey+'copy']"
            :disabled="item.disabled"
            :placeholder="jointStr(item.label)"
            :style="{'width': item.width ? item.width : '100%'}"
            @keydown.native="keydownEvent"
            @blur="event => {
              form[item.secondKey + 'copy' ] = blurCurrency(form[item.secondKey])
            }"
            @input="(value)=>{
              form[item.secondKey] = value.replace(/,/g,'')
              form[item.secondKey + 'copy' ] = formatCurrency(form[item.secondKey])
            }"
            @change="val =>{
              form[item.secondKey] = val.replace(/,/g,'')
            }"
          >
          </el-input>
        </div>
      </el-col>
    </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'MoneyArea',
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
  methods: {
    // 光标离开金额输入框,格式化金额(带小数)
    blurCurrency (value) {
      if (!value) return ''
      let val = value // 提前保留两位小数
      let value2Array = val.split('.')
      let intPart = value2Array[0] // 获取整数部分
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      let floatPart = '.00'
      if (value2Array.length === 2) { // =2表示数据有小数位
        floatPart = value2Array[1].substr(0, 2) // 拿到小数部分
        if (floatPart.length === 1) { // 补0,实际上用不着
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
    keydownEvent (e) {
      util.limitMoneyInputKeyDown(e)
    },
    jointStr (label) {
      return label
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
