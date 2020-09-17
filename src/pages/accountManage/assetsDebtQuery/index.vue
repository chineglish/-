<template>
  <div class="assets-debt">
    <m-breadcrumb :data="breadData"></m-breadcrumb>
    <!-- 存款 -->
    <div class="deposit-table">
      <d-table
        class="loan-table"
        :tableTitle="depositTableTitle"
        :table-data="depositTableData"
        :pagesize="20"
        :tableHeadData="depositTableHeadData">
      </d-table>
      <div class="total-amount fs12">人民币存款总计：{{totalAmount | money}}元</div>
    </div>
    <!-- 贷款 -->
    <div class="deposit-table">
      <d-table
        class="loan-table"
        :tableTitle="loanTableTitle"
        :table-data="loanTableData"
        :operateData="operateData"
        :pagesize="20"
        :tableHeadData="loanTableHeadData"
        @handleSelect="handleSelect"
      >
      </d-table>
      <div class="total-amount fs12">人民币负债总计：{{totalAmountSum | money}}元</div>
    </div>
    <!-- 理财产品 -->
    <d-table
      class="financial-table"
      :tableTitle="financialTableTitle"
      :table-data="financialTableData"
      :tableHeadData="financialTableHeadData"
      :pagesize="20"
      :actionData="actionData"
      @handleBack="handleBack"
    >
    </d-table>
    <!-- 按钮 -->
    <!-- <div class="btn">
       <el-button size="mini" type="info">返回</el-button>
    </div> -->
  </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import { acc_status, currency_type, loan_acc_status, currencyMath_type } from '@/assets/js/entity'
import util from '@/libs/util'
export default {
  name: 'assetsDebtQuery',
  data () {
    const kzState = [
      { value: '0000', label: '正常' },
      { value: '1000', label: '金额冻结' },
      { value: '0100', label: '封闭冻结' },
      { value: '0010', label: '只收不付' },
      { value: '0001', label: '只付不收' },
      { value: '1001', label: '金额冻结/只付不收' },
      { value: '1010', label: '金额冻结/只收不付' },
      { value: '1100', label: '金额冻结/封闭冻结' },
      { value: '1011', label: '金额冻结/只收不付/只付不收' },
      { value: '1101', label: '金额冻结/封闭冻结/只付不收' },
      { value: '1110', label: '金额冻结/封闭冻结/只收不付' },
      { value: '1111', label: '金额冻结/封闭冻结/只收不付/只付不收' },
      { value: '0101', label: '封闭冻结/只付不收' },
      { value: '0110', label: '封闭冻结/只收不付' },
      { value: '0111', label: '封闭冻结/只收不付/只付不收' },
      { value: '0011', label: '只收不付/只付不收' }
    ]
    return {
      // 面包屑导航
      breadData: ['账户管理', '资产负债查询'],
      // 存款数据
      totalAmount: '',
      totalAmountSum: '',
      // depositTableFields: {
      //   parentTypeField: 'KeepOrLendType',
      //   typeField: 'depositType'
      // },
      depositTableTitle: {
        isBorder: false,
        leftInfo: {
          title: '存款'
        }
      },
      depositTableHeadData: [
        { label: '存款种类', prop: 'keepOrLendType', formatter: (row, column, cellValue, index) => this.keepOrLendType[cellValue] },
        { label: '账号', prop: 'acNo', width: '180' },
        { label: '账户名称', prop: 'acName', width: '180' },
        { label: '子账户序号', sortable: 'custom', prop: 'subAcNo' },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        {
          label: '金额',
          prop: 'balance',
          width: '150',
          sortable: 'custom',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '账户状态',
          prop: 'acNoFlag',
          style: (value) => value === 'A' ? 'color: #03AF3A;' : '',
          filters: [
            { text: '正常', value: 'A' },
            { text: '销户', value: 'C' },
            { text: '不动户', value: 'B' },
            { text: '不动户', value: 'D' },
            { text: '金额冻结', value: 'F' },
            { text: '封闭冻结', value: 'E' },
            { text: '待启用', value: 'H' },
            { text: '未启用', value: 'G' },
            { text: '预销户', value: 'Y' }
          ],
          filterHandler: (value, row, column) => {
            return row['acNoFlag'] === value
          },
          formatter: (row, column, cellValue, index) => util.handleEnums(acc_status, cellValue)
        },
        {
          label: '限制类型',
          prop: 'kzState',
          formatter: (row, column, cellValue, index) => util.handleEnums(kzState, cellValue)
        }
      ],
      depositTableData: [],
      // 贷款数据
      loanTableTitle: {
        isBorder: false,
        leftInfo: {
          title: '贷款'
        }
      },
      loanTableHeadData: [
        { label: '贷款种类', prop: 'keepOrLendType' },
        { label: '账号', prop: 'acNo', width: '180' },
        {
          label: '币种',
          prop: 'currency',
          formatter: (row, column, cellValue, index) => util.handleEnums(currency_type, cellValue)
        },
        { label: '金额', prop: 'balance', sortable: 'custom', width: '150', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '到期日期', prop: 'eloanEndDate', sortable: 'custom', formatter: (row, column, cellValue, index) => util.separationDate(cellValue) },
        {
          label: '账户状态',
          prop: 'acNoFlag',
          style: (value) => value === 'A' ? 'color: #03AF3A;' : '',
          filters: [
            { text: '正常', value: 'A' },
            { text: '销户', value: 'C' },
            { text: '不动户', value: 'B' },
            { text: '不动户', value: 'D' },
            { text: '金额冻结', value: 'F' },
            { text: '封闭冻结', value: 'E' },
            { text: '待启用', value: 'H' },
            { text: '未启用', value: 'G' },
            { text: '预销户', value: 'Y' }
          ],
          filterHandler: (value, row, column) => {
            return row['acNoFlag'] === value
          },
          formatter: (row, column, cellValue, index) => util.handleEnums(loan_acc_status, cellValue)
        }
      ],
      operateData: {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'handleSelect'
          }
        ]
      },
      loanTableData: [],
      // 理财产品数据
      financialTableTitle: {
        isBorder: false,
        leftInfo: {
          title: '理财产品'
        }
      },
      financialTableHeadData: [
        { label: '产品名称', prop: 'prdName' },
        {
          label: '持仓金额/份额',
          prop: 'vol',
          sortable: 'custom',
          width: '150',
          formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue)
        },
        {
          label: '起息日期',
          prop: 'interestDate',
          sortable: 'custom',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        {
          label: '到期日期',
          prop: 'endDate',
          sortable: 'custom',
          formatter: (row, column, cellValue, index) => util.separationDate(cellValue)
        },
        { label: '预期年化收益率/净值', sortable: 'custom', prop: 'modelComment' },
        {
          label: '币种',
          prop: 'currType',
          formatter: (row, column, cellValue, index) => util.handleEnums(currencyMath_type, cellValue)
        }
      ],
      financialTableData: [],
      actionData: [
        {
          class: 'm-cancel-btn',
          btnText: '返回',
          eventName: 'handleBack'
        }
      ],
      keepOrLendType: {
        '00': '单位活期存款',
        '01': '财政集中支付零余额账户',
        '02': '单位定期存款',
        '03': '单位一般定期存款(自定义存期)',
        '04': '国库定期存款',
        '05': '单位通知存款',
        '06': '单位保证金活期存款',
        '07': '单位保证金定期存款',
        '08': '单位大额存单',
        '09': '单位协议存款',
        '10': '单位结构性存款',
        '11': '单位账户通存款(B账户)',
        '12': '单位天添利A',
        '13': '单位天添利B',
        '14': '同业存放活期',
        '15': '同业存放定期',
        '16': '个人活期存款',
        '17': '个人银行卡活期存款',
        '18': '个人银行卡电子钱包存款',
        '19': '个人金融IC(复合)卡电子钱包存款',
        '20': '个人定活两便储蓄存款',
        '21': '个人定活两便储蓄存款(固定面额)',
        '22': '个人银行卡定活两便储蓄存款',
        '23': '个人贺喜存单定活两便储蓄存款',
        '24': '个人老通知存款',
        '25': '个人整存整取存款',
        '26': '个人银行卡整存整取存款',
        '27': '个人银行卡整存整取理财',
        '28': '个人零存整取存款',
        '29': '个人银行卡零存整取存款',
        '30': ' 个人存本取息存款',
        '31': '个人银行卡存本取息存款',
        '32': '个人教育储蓄存款',
        '33': '个人银行卡教育储蓄存款',
        '34': '个人整存零取存款',
        '35': '个人银行卡整存零取存款',
        '36': '个人通知存款',
        '37': '个人银行卡通知存款',
        '38': '个人银行卡自动通知存款',
        '39': '个人存单自动通知存款',
        '40': '个人大额存单',
        '41': '易得利升级版1号',
        '42': '易得利升级版2号',
        '43': '个人结构性存款',
        '44': '单位通知存款(自动转存)',
        '45': '单位保证金定期存款(自定义存期)',
        '46': '单位通知存款(挂牌)',
        '80': '单位组合产品(虚拟)',
        '47': '账户透支',
        '50': '泰隆一本通',
        '51': '个人随心乐',
        '52': '单位随心乐',
        '53': '个人成长乐',
        '54': '个人长寿乐',
        '55': '个人老节节高',
        '56': '个人新节节高'
      }
    }
  },
  methods: {
    AssertDebt () {
      httpPost('/eweb-acmgmt.AssertDebtQry.do').then(res => {
        // this.formModel = res
        // this.depositTableData = res.zCList
        this.loanTableData = res.fZList
        this.financialTableData = res.pCList || []
        this.totalAmount = res.zcTotal
        this.totalAmountSum = res.fzTotal
        res.zCList.forEach(item => {
          // console.log(res.zCList)
          if (item.acNoFlag !== 'C' && item.cashSignFlag !== 0 && item.acTypeFlag !== 1) {
            this.depositTableData.push(item)
          }
        })
        // this.financialTableData = res.pclist
      })
    },
    handleBack () {
      this.$router.push('/index')
    },
    handleSelect (data) {
      httpPost('/eweb-query.EloanAcNoInfoQuery.do', {
        loanAcNo: data.data.acNo,
        loanTermSerialNum: data.data.loanTermSerialNum
      }).then(res => {
        this.$router.push({
          name: 'loanInquiry',
          params: { formModel: res }
        })
      })
    }
  },
  created () {
    this.AssertDebt()
  }
}
</script>

<style lang="scss" scoped>
  .deposit-table {
    .total-amount {
      padding: 12px;
      color: #333333;
      letter-spacing: 0;
      text-align: right;
    }
  }

  .loan-table {
    // margin: 10px 0;
  }

  .financial-table {
    padding-bottom: 20px;
  }
  .financial-table .action-btn {
    margin-top: 30px;
  }

  .btn {
    text-align: center;
  }

  .loan-table-header-class, .financial-table-header-class {
    background-color: #f00;
  }

</style>
