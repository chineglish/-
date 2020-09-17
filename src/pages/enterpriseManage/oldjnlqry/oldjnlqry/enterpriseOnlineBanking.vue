<template>
  <div class="form-box" style="width: 100%">
    <d-table
      :tableData="tableData"
      :pageInformation="pageInformation"
      :operateData="operateData"
      :tableHeadData="tableHeadData"
      :pageNation="pageNation"
      @goToDetailDaYin="goToDetailDaYin"
      @clickLink="clickLink"
      >
    </d-table>
  </div>
</template>
<script>
/**
 *@name: 老企业网银,企业数据
 * @author: 陈天浩
 * @date:
 */
import { httpPost } from '@/api/sys/http'
import PageNation from '@/components/d-table/PageNation'
import { trsEntity, jnlTrsStatus } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  props: {
    // tableData: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    pageInformation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    resultList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'enterpriseOnlineBanking',
  data () {
    return {
      tableData: [],
      // breadData: ['老企业网银']
      tableHeadData: [
        {
          width: '220px',
          label: '交易流水号',
          prop: 'jnlNo',
          clickEventName: 'clickLink'
        },
        {
          label: '交易日期',
          prop: 'date',
          formatter: (row, column, cellValue, index) => util.separationStrDateWithLine(cellValue)
        },
        {
          label: '交易类型',
          prop: 'transName',
          formatter: (row, column, cellValue, index) => util.handleEnums(trsEntity, cellValue)
        },
        {
          label: '交易状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => util.handleEnums(jnlTrsStatus, cellValue)
        },
        {
          width: '170px',
          label: '付款账号',
          prop: 'acNo'
        },
        {
          width: '210px',
          label: '收款账号',
          prop: 'acNo2'
        },
        {
          width: '170px',
          label: '付款金额',
          prop: 'amount',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '回单打印',
            pick: (obj) => this.getPick(obj),
            // obj.transName === 'EE0112' || obj.transName === 'EE0122' || obj.transName === 'EP012002' || obj.transName === 'EP013002' ，
            eventName: 'goToDetailDaYin'
          }
        ]
      },
      currentPage: 1,
      pageNation: '',
      msg: []
    }
  },
  methods: {
    getPick (obj) {
      const value = obj.transName
      const arr = ['FE040103', 'FE040203', 'FE040403', 'FE380103', 'FE380503', 'FE380603']
      const statusValue = obj.status
      const statusArr = [
        '0',
        'TS'
      ]
      return arr.filter(item => item === value).length > 0 && statusArr.filter(item => item === statusValue).length > 0 
    },
    goToDetailDaYin (obj) {
      let params = {
        date: util.separationStrDateWithLine(obj.data.date),
        jnlNo: obj.data.jnlNo
      }
      httpPost('/eweb-operator.QryOldJnlDetail.do', params).then(res => {
        // console.log(77777777777, res)
        this.$router.push({
          name: 'oldDaYin',
          params: {
            data: res,
            formModel: this.formModel
          }
        })
        // FE380503 行内
        // FE380603 行内次日
        // FE380103 证书
        // if (obj.data.transName === 'FE380503' || obj.data.transName === 'FE380603' || obj.data.transName === 'FE380103') {
        //   this.$router.push({
        //     name: 'oldDaYin1',
        //     params: {
        //       data: res,
        //       formModel: this.formModel
        //     }
        //     })
        // } else {
        //   this.$router.push({
        //     name: 'oldDaYin',
        //     params: {
        //       data: res,
        //       formModel: this.formModel
        //     }
        //   })
        // }
        // FE040103 跨行
        // FE040203 跨行定时
        // FE040403 上海同城
      })
    },
    clickLink (res) {
      // 跳转详情页
      this.$router.push({
        name: 'oldEnterprise0nlineBanking',
        params: {
          condition: this.formModel,
          formModel: res,
          pageIndex: this.pageIndex,
          currentPage: this.currentPage
        }
      })
    },
    pageChangeHandler (currentPage, pageSize) {
      let data = {
        ...this.pageInformation,
        pageSize: pageSize || 20,
        currentPage: currentPage
      }
      httpPost('/eweb-operator.QryOldJnlList.do', data).then(result => {
        this.tableData = result.list
        // this.pageNation = new PageNation(result.pageSize, result.currentPage, result.totalCount, (currentPage, size) => {
        //   data.currentPage = currentPage
        //   if (size) { data.pageSize = size }
        //   this.pageChangeHandler(data)
        // })
      })
    }
  },
  created () {
    this.tableData = this.resultList.list
    if (this.resultList) {
      this.pageNation = new PageNation(20, 1, this.resultList.totalCount, (currentPage, pageSize) => {
        this.pageChangeHandler(currentPage, pageSize)
        // this.pageChangeHandler(...this.pageInformation, currentPage, this.resultList.totalCount)
      })
    }
    // this.formModel = this.pageInformation
    // this.result = this.resultList
    // this.currentPage = this.$route.params.currentPage ? this.$route.params.currentPage : 1
    // this.pageChangeHandler()
  }
}
</script>
<style scoped>
  .form-box{
    width :1120px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  }
</style>
