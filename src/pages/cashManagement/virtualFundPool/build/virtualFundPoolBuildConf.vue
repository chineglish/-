<template>
    <div>
        <m-breadcrumb :data="titleData"></m-breadcrumb>
        <div class="form-box">
            <m-new-form
                    :componentJson="formConfigJson"
                    :btnData="btnData"
                    :formModel="formModel"
                    @submit="submit">
            </m-new-form>
        </div>
    </div>
</template>
<script>
    /**
     *@name: 虚拟资金池建立-录入
     * @date: 2020-2-4
     */
    export default {
        name: 'virtualFundPoolBuildPre',
        data () {
            return {
                titleData: ['现金管理 ', '虚拟资金池', '虚拟资金池建立'],
                formModel: {
                    poolAccount: '',
                    poolAccountCurrency: '',
                    fundPoolModel: '',
                    internalInterestCalculation: '',
                    interestDistributionIndicator: '',
                    lenderInterestRate: '',
                    debitRate: ''
                },
                formConfigJson: {
                    stepsActive: 0,
                    rules: {},
                    formItems: [
                        {
                            formWidth: '100%',
                            labelWidth: '50%',
                            group: [
                                {
                                    'label': '池账户',
                                    'type': 'text',
                                    'key': 'poolAccount'
                                },
                                {
                                    'label': '池账户币种',
                                    'type': 'text',
                                    'key': 'poolAccountCurrency'
                                },
                                {
                                    'label': '资金池模式',
                                    'type': 'text',
                                    'key': 'fundPoolModel'
                                },
                                {
                                    'label': '内部计息表示',
                                    'type': 'text',
                                    'key': 'internalInterestCalculation'
                                },
                                {
                                    'label': '利息分配标识',
                                    'type': 'text',
                                    'key': 'interestDistributionIndicator'
                                },
                                {
                                    'label': '借方利率（%）',
                                    'type': 'text',
                                    'key': 'debitRate'
                                },
                                {
                                    'label': '贷方利率（%）',
                                    'type': 'text',
                                    'key': 'lenderInterestRate'
                                }
                            ]
                        }
                    ]
                },
                btnData: [
                    { btnText: '确定', class: 'm-submit-btn', clickEventName: 'submit' }
                ]
            }
        },
        methods: {
            submit (params) {
                params.tradeName = '虚拟资金池建立'
                params.tradeDate = '2020-2-4'
                params.operatorName = '张三'
                params.operatorNum = '1234'
                this.$router.push({
                    name: 'virtualFundPoolBuildRes',
                    params: {formModel: params,
                        _JnlStatus: '1'}
                })
            }
        },
        created() {
            if(this.$route.params.formModel) {
                this.formModel = this.$route.params.formModel
            }
        }
    }
</script>

<style scoped>
    .form-box{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
        margin-top: 20px;
    }
</style>
