<template>
  <d2-container>
   <div class="form-box">
      <m-steps :data="stepData"></m-steps>
      <div class="box">
        <div class="download">下载文件
          <span class="link-css" @click="getTokenImg">
            {{$route.params.fileName}}
          </span>
          <!-- <a class="aj" :href="$route.params.fileName" download="下载文件.exe" >{{$route.params.fileName}}</a> -->
          </div>
        <el-button type="info" class="m-cancel-btn" @click="reset">返回</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { downloadFile } from '@/api/sys/http'

export default {
  name: 'fourResult',
  data () {
    return {
      filename: __filename,
      breadcrunb: ['柜面', '柜面批量代收付业务加密'],
      stepData: {
        stepsActive: 3,
        stepsData: ['录入信息', '验证信息', '上传文件', '完成加解密']
      }
    }
  },
  methods: {
    getTokenImg (downData) {
      const data = {
        _Download: 'zip',
        operateFlag: this.$route.params.operateFlag,
        fileName: this.$route.params.fileName
      }
      downloadFile('/eweb-transfer.SalaryFileDownLoad.do', data).then(res => {})
    },
    reset () {
      this.$router.push({
        name: 'oneEntry'
      })
    }
  },
  created () {
  }
}

</script>
<style lang="scss" scoped>
.form-box{
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
  margin-top: 20px;
  min-height: 400px;
  height: 30%;
  .box{
    text-align: center;
    .download {
      margin: 90px 0;
      .link-css{
        border-bottom: 1px solid #009CD8;
      }
    }
    .aj{
      margin-left: 80px;
    }
  }
}
</style>
