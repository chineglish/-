<template>
	<div>
		<div class="tree-item" v-for="item in list" :key="item.asAcNo">
			<span class="sanjiaoxing">
				<i class="el-icon-caret-right"
					v-if="item.subLevel && item.subLevel.length > 0"
					:style="{ transform: `rotate(${deg}deg)` }"
					@click="showHide"
				></i>
			</span>
			<el-checkbox v-model="item.disabled" @change="isChecked(item)" :disabled="disabled"></el-checkbox>
			<span class="item-label" @click="showHide">{{ item.asAcNo }} - {{ item.asAcName }}</span>
			<tree-item class="container" v-show="show" :data="item.subLevel" :default-show="defaultShow" :disabled="disabled"></tree-item>
		</div>
	</div>
</template>

<script>
import treeItem from './treeItem'

export default {
  name: 'treeItem',
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
      list: [],
      deg: this.defaultShow ? 90 : 0,
      show: this.defaultShow
    }
  },
  inject: ['checkedList'],
  methods: {
    isChecked (obj) {
      if (obj.disabled) {
        let dataObj = JSON.parse(JSON.stringify(obj))
        delete dataObj.disabled
        delete dataObj.subLevel
        this.checkedList.push(dataObj)
      } else {
        let n = this.checkedList.findIndex(item => item.asAcNo === obj.asAcNo)

        this.checkedList.splice(n, 1)
      }
    },
    showHide () {
      this.deg = this.deg === 0 ? 90 : 0
      this.show = Boolean(this.deg)
    }
  },
  created () {
    this.list = this.data
  }
}
</script>

<style lang="scss" scoped>
	.sanjiaoxing {
		display: inline-block;
		width: 15px;
		height: 15px;
		padding: 2px;
		margin-right: 5px;
	}
	.el-icon-caret-right {
		font-size: 18px;
		color: #b1b1b1;

		transition: transform 200ms;
	}
	.item-label {
		margin-left: 10px;
	}
	.tree-item {
		line-height: 30px;
		color: #606266;
		font-size: 14px;
		cursor: pointer;
	}
	.tree-item .tree-item {
		padding-left: 20px;
	}
</style>
