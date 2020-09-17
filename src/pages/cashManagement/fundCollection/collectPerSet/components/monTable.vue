<template>
    <table width="80%" border="1px">
        <thead>
            <tr>
                <th v-for="(item, index) in headArr" :key="index">{{ item }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in 31" :key="index">
                <td>{{index+1}}</td>
                <td v-for="(str, ind) in monthList" :key="ind">
					<el-checkbox :disabled="disabled" v-if="monthData[str][index] !== undefined" :true-label="'1'" :false-label="'0'" v-model="monthData[str][index]" @change="changeMonth"></el-checkbox>
				</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
  name: 'monTable',
  props: {
    monthData: {
      default: () => {},
      type: Object
    },
    monthList: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      disabled: true,
      headArr: ['日', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  methods: {
    changeMonth () {
      this.$emit('change')
    }
  }
}
</script>
<style scoped>
table {
    /*设置相邻单元格的边框间的距离*/
    border-spacing: 0;
    /*表格设置合并边框模型*/
    border-collapse: collapse;
    text-align: center;
	margin: 15px 0;
}
tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
tbody tr td {
  padding: 5px;
  text-align: center;
  min-width: 35px;
}
table thead {
    display: block;
    width: 100%;
}
table thead tr {
    width: calc( 100% - 16px);
    display:table;
}
table thead tr th {
    padding: 5px;
    text-align: center;
    min-width: 45px;
    display: table-cell;
}
table tbody {
    display: block;
    height: 200px;
    overflow-y: scroll;
}
</style>
