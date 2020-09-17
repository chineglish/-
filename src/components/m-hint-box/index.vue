<template>
    <div class="m-tips no-print" v-if="msgs && msgs.length > 0">
        <p class="hint-title fs16">
          <img class="hint-title-img" src="./prompt.png">
          {{msgsTitle}}
        </p>
        <ul class="hint-box">
            <li v-for="(msg,index) in msgs" class="m-pclass fs14" :key="index">
              <a v-if="typeof msg === 'object'" :href='msg.link' :download="msg.download">{{msg.text}}</a>
              <span v-else>{{msg}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'm-hint-box',
  props: {
    // 温馨提示
    msgsTitle: {
      type: String,
      default: '温馨提示'
    },
    msgs: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
