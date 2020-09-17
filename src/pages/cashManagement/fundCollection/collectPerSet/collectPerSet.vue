<template>
    <div class="assets-debt">
        <m-breadcrumb :data="breadData"></m-breadcrumb>
        <div style="clear: both"></div>
        <m-new-form
                :componentJson="formConfigJson"
                :btnData="btnData"
                :formModel="formModel"
                @inquire="inquire"
                @selectAcc="selectAcc"
                @reset="reset"
        >
        </m-new-form>
        <div class="search-result" v-if="showResult">
          <div class="search-result-title fs20">
            <span>设置</span>
          </div>
          <template>
            <el-tabs v-model="activeName">
              <el-tab-pane label="上存周期" name="0">
                <upload-cycle ref="uploadCycle" @submit="confirm" :propData="propData"></upload-cycle>
              </el-tab-pane>
              <el-tab-pane label="下拨周期" name="1">
                <dial-down-cycle ref="dialDownCycle" @submit="confirm" :propData="propData"></dial-down-cycle>
              </el-tab-pane>
            </el-tabs>
          </template>
        <m-new-form
            :btnData="btnData1"
            @submit="onSubmit"
			@reset="onReset"
        >
        </m-new-form>
        </div>
    </div>
</template>

<script>
import { httpPost } from '@/api/sys/http'
import uploadCycle from './components/uploadCycle'
import dialDownCycle from './components/dialDownCycle'
import util from '@/libs/util'
import { currency_type } from '@/assets/js/entity'
export default {
  name: 'collectPerSet',
  components: {
    uploadCycle,
    dialDownCycle
  },
  data () {
    return {
      propData: {},
      payerAccNoList: [], // 付款账户信息列表
      activeName: '0',
      // 面包屑导航
      breadData: ['现金管理', '资金归集', '归集周期设置'],
      showResult: false,
      formModel: {
        acc: '',
        currency: '',
        accName: ''
      },
      formConfigJson: {
        stepsActive: 0,
        rules: {
          acc: [{ required: false, message: '', trigger: 'change' }]
        },
        formItems: [
          {
            // title: '到账通知单',
            formWidth: '50%',
            labelWidth: '30%',
            title: '归集周期查询',
            showSeparate: true,
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                'options': [],
                'key': 'acc',
                trans: { value: 'acNoShow', key: 'acNo' },
                'changeEventName': 'selectAcc'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (key, value) => util.handleEnums(currency_type, value)
              },
              {
                'disabled': false,
                'label': '户名',
                'type': 'text',
                'key': 'accName'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'inquire' },
        { btnText: '重置', class: 'm-cancel-btn', clickEventName: 'reset' }
      ],
      btnData1: [
        { btnText: '提交', class: 'm-submit-btn', clickEventName: 'submit' },
        { btnText: '取消', class: 'm-cancel-btn', clickEventName: 'reset' }
      ]
    }
  },
  methods: {
    onSubmit () {
      httpPost('/eweb-cash.CollectDateSetConfirm.do', this.propData).then(res => {
        let obj = {
          _Data2Sign: res._Data2Sign,
          _authenticateType: res._authenticateType,
          currencyCode: this.propData.currencyCode,
          _dataMapKey: res._dataMapKey,
          acNo: this.propData.acNo,
          acName: this.propData.asName
        }
        obj = Object.assign(obj, this.propData)
        this.$router.push({
          name: 'collectPerSetConf',
          params: obj
        })
      })
    },
    onReset () {
      let list = ['uploadCycle', 'dialDownCycle']
      this.$refs[list[this.activeName]].reset()
    },
    /**
     * 交易账户获取
     */
    accNoListQry () {
      httpPost('eweb-query.PayerAccountListQry.do', { TransCode: '' }).then(res => {
        this.payerAccNoList = res.AcList || []
        this.formConfigJson.formItems[0].group[0].options = this.payerAccNoList
        this.payerAccNoList.forEach(item => {
          item.acNoShow = util.getPayerAccount(item)
        })
        this.selectAcc(this.formModel, this.payerAccNoList[0])
      })
    },
    /**
     * 显示选择账户的余额与账户名称
     */
    selectAcc (data, obj) {
      this.$set(data, 'acc', obj.acNo)
      this.$set(data, 'accName', obj.acName)
      this.$set(data, 'currency', obj.currency)
    },
    inquire (data) {
      const params = {
        acNo: data.acc,
        currencyCode: 'CNY'
      }
      httpPost('/eweb-cash.CollectDateQry.do', params).then(res => {
        if (res.list.length > 0) {
          this.propData = res.list[0]
          this.showResult = true
        }
      })
    },
    confirm (obj) {
      this.propData = {
        ...this.propData,
        ...obj
      }
      // Object.assign(this.propData, obj)
      console.log(obj, this.propData)
    },
    reset (res) {
      this.selectAcc(res, this.payerAccNoList[0])
      this.showResult = false
    }
  },
  created () {
    this.accNoListQry()
  }
}
</script>

<style lang="scss" scoped>
	.search-result{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
		margin: 20px 0px;
		.search-result-title{
			padding-left: 30px;
			line-height: 60px;
			font-weight: bold;
			color: #333333;
			span{
				margin-left: 10px;
				padding-left: 5px;
				border-left: #d41618 8px solid;
			}
		}
		.search-result-content{
			.queryDate{
				width: 100%;
				tr{
					text-align: center;
					td{
						height: 50px;
					}
					.icon{
						text-align: right
					}
				}
			}
		}
	}
</style>
