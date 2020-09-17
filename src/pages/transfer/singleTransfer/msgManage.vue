<template>
  <div>
    <m-breadcrumb :data="titleData"></m-breadcrumb>
    <div class="form-box">
      <m-new-form
        :componentJson="formConfigJson"
        :btnData="btnData"
        :formModel="formModel"
        @back="back"
        @addMsg="addMsg"
        >
        <div style="margin-left: 10%" slot="rightSlotName">
          <el-button class="el-button m-submit-btn" size="mini" type="info" @click="add">新增</el-button>
        </div>
        <div style="width: 80%;text-align: center" slot="timeMark">
          <div class="nowMsg">
            <div class="existMsg">
              <ul>
                <li v-for="(item,index) in existMsg" :key="index" :id="index" class="remake fs14"  @click="select(index)">{{item}}</li>
              </ul>
            </div>
            <div class="nowMsg-right">
              <el-button class="el-button m-cancel-btn" size="mini" type="info" @click="deleteMsg">删除</el-button>
              <el-button class="el-button m-submit-btn" size="mini" type="info" @click="up">向上</el-button>
              <el-button class="el-button m-submit-btn" size="mini" type="info" @click="down">向下</el-button>
            </div>
           </div>
        </div>
      </m-new-form>
    </div>
    <m-hint-box :msgs="promptList"></m-hint-box>
  </div>
</template>
<script>
import { httpPost } from '@/api/sys/http'
export default {
  name: 'msgManage',
  data () {
    return {
      titleData: ['转账汇款', '转账附言管理'],
      selected: '',
      existMsg: [],
      formModel: {
        newMsg: ''
      },
      promptList: [
        '1、用户登录后，选择转账汇款功能下的转账附言管理功能，可以新增和删除附言，并对已有附言进行排序操作。',
        '2、附言可最多支持70位字符。',
        '3、附言不支持下列字符，<>“&‘'
      ],
      formConfigJson: {
        rules: {
          // signAccount: [{ required: true, message: '续费签约账户', trigger: 'change' }]
        },
        formItems: [
          {
            formWidth: '100%',
            // labelWidth: '40%',
            group: [
              {
                'disabled': false,
                'label': '新增附言备注',
                'type': 'input',
                'key': 'newMsg',
                'width': '41%',
                'inputEventName': 'addMsg',
                maxlength: 70,
                'rightSlotName': 'rightSlotName'
              }, {
                'disabled': false,
                'label': '我的附言',
                'type': 'blank',
                'blankSlotName': 'timeMark'
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    addMsg (res) {
      this.formModel = res
    },
    /**
     * 增加备注
     */
    add () {
      httpPost('/eweb-transfer.TransferRemarkManage.do', {
        trsFlag: '1',
        remarkName: this.formModel.newMsg
      }).then(res => {
        if (this.formModel.newMsg) {
          this.existMsg.unshift(this.formModel.newMsg)
        }
        this.formModel.newMsg = ''
      })
    },
    /**
     * 删除选中的备注
     */
    deleteMsg () {
      httpPost('/eweb-transfer.TransferRemarkManage.do', {
        trsFlag: '2',
        remarkName: this.existMsg[this.selected]
      }).then(res => {
        this.existMsg.splice(this.selected, 1)
      })
      for (let i = 0; i < this.existMsg.length; i++) {
        document.getElementById(i).style.color = '#000'
        document.getElementById(i).style.background = '#fff'
      }
    },
    /**
     * 将选中的备注上移
     */
    up () {
      let i = this.selected
      if (i > 0 && i <= this.existMsg.length) {
        let n = this.existMsg[i - 1]
        this.$set(this.existMsg, i - 1, this.existMsg[i])
        this.$set(this.existMsg, i, n)
        document.getElementById(this.selected).style.background = '#fff'
        this.selected = this.selected - 1
        document.getElementById(this.selected).style.background = '#ededed'
      }
    },
    /**
     * 将选中的备注下移
     */
    down () {
      let i = this.selected
      if (i < this.existMsg.length - 1 && i >= 0) {
        let n = this.existMsg[i + 1]
        this.$set(this.existMsg, i + 1, this.existMsg[i])
        this.$set(this.existMsg, i, n)
        document.getElementById(this.selected).style.background = '#fff'
        this.selected = this.selected + 1
        document.getElementById(this.selected).style.background = '#ededed'
      }
    },
    /**
     * 标记选中的备注
     */
    select (index) {
      this.selected = index
      if (document.getElementById(this.selected).style.background === 'rgb(237, 237, 237)') {
        document.getElementById(this.selected).style.background = '#fff'
      } else {
        for (let i = 0; i < this.existMsg.length; i++) {
          if (document.getElementById(i).style.background !== '#fff') {
            document.getElementById(i).style.background = '#fff'
          }
        }
        document.getElementById(this.selected).style.background = '#ededed'
      }
    },
    getExistMsg () {
      httpPost('/eweb-transfer.TransferRemarkManage.do', {
        trsFlag: '0',
        remarkName: ''
      }).then(res => {
        const post = res.remrkNameList.map(item => (item.remarkName))
        for (let i = 0; i < post.length; i++) {
          this.existMsg.push(post[i])
        }
      }).catch(err => {
        console.error(err)
      })
    },
    back () {
      this.$router.push('/index')
    }
  },
  created () {
    this.getExistMsg()
  }
}
</script>

<style lang="scss" scope>
.nowMsg {
  display: flex;
  margin: 10px 0;
  width: 100%;
}
.existMsg {
  height: 120px;
  overflow-y: scroll;
  width: 401px;
  border: 1px #efefef solid;
  background: #ffffff;
  padding: 5px 0;
  overflow: auto;
}
.nowMsg-right {
  width: 9%;
  margin-left: 72px;
  .el-button + .el-button {
    margin-left: 0;
    margin-top: 10px
  }
}
.remake{
  color: #666;
  padding: 0 15px;
  text-align: left;
}
</style>
