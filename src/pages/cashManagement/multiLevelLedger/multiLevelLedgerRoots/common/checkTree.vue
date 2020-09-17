<template>
	<div class="check-tree">
		<tree-item :data="data" :default-show="defaultShow" :disabled="disabled"></tree-item>
	</div>
</template>

<script>
import treeItem from './treeItem'

export default {
  name: 'check-tree',
  components: {
    treeItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    defaultShow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkedList: []
    }
  },
  provide () {
    return {
      checkedList: this.checkedList
    }
  },
  watch: {
    checkedList: {
      deep: true,
      handler: function (arr) {
        this.$emit('change', arr)
      }
    }
  }
}
</script>
