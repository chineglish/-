<template>
  <div>
    <m-breadcrumb :data="titleData" style="margin-left: 0px;"></m-breadcrumb>
    <div>
      <div class="title">
      </div>
      <div>
        <h4 style="text-indent:2em;">1. 网银助手介绍</h4>
        <p class="fs14" style="text-indent:2em;">网银助手能够对用户电脑的网银环境进行全面检测，并可对检测到的异常项进行一键修复；同时网银助手提供USBKey管理、证书更新、证书下载和使用帮助等功能，帮助用户能够更好地使用网银系统。</p>
        <h4 style="text-indent:2em;">2. 什么是全面检测？</h4>
        <p class="fs14" style="text-indent:2em;">全面检测即是对用户电脑的网银环境的一个全面体检，包括用户系统环境、IE浏览器设置、用户网络配置、浏览器控件、用户USBKey相关信息以及用户证书应用相关，网银助手会将检测结果反馈给用户。</p>
        <h4 style="text-indent:2em;">3. 什么是一键修复？</h4>
        <p class="fs14" style="text-indent:2em;">一键修复可对检测到的异常项进行修复，使用户的系统环境符合证书正常进行使用的条件；同时，为满足不同用户的修复需求，用户可选择某个异常项进行单项修复。另外，可优化项提供解决方案查看，帮助客户自行修复相关问题。</p>
        <h4 style="text-indent:2em;">4. 什么是查看证书？</h4>
        <p class="fs14" style="text-indent:2em;">查看证书即是在证书管理功能中的证书更新页面，选择已下载证书的USBKey序列号，然后在证书列表中选择要查看的证书，点击列表右侧的“查看证书”按钮可以查看证书的详细信息。</p>
        <h4 style="text-indent:2em;">5. 如何进行证书验证？</h4>
        <p class="fs14" style="text-indent:2em;">证书验证即是在证书管理功能中的证书验证页面，选择用户插入的USBKey，选中需要进行验证的证书，点击证书验证按钮，在弹出的PIN码框中输入正确的PIN码，验证成功则证明用户的USBKey可以在网银系统中正常使用，否则可能USBKey中的证书遭到了破坏，请联系客服人员。</p>
        <h4 style="text-indent:2em;">6. 如何处理“系统时间异常”？</h4>
        <p class="fs14" style="text-indent:2em;">客户端时间与标准的服务器时间相差5分钟以上，提示系统时间异常，为了防止影响证书相关功能的正常使用，请用户手动修改本地的时间。</p>
        <h4 style="text-indent:2em;">7. 如何开启“系统防火墙”？</h4>
        <p class="fs14" style="text-indent:2em;">系统防火墙是系统保护用户安全使用网银系统的一个基本功能。</p>
        <p class="fs14" style="text-indent:2em;">打开防火墙的步骤如下：</p>
        <p class="fs14" style="text-indent:2em;">点击电脑上开始按钮->控制面板->防火墙->选择打开Windows防火墙->点击确定按钮。</p>
        <h4 style="text-indent:2em;">8. 如何解决“重要系统服务状态异常”？</h4>
        <p class="fs14" style="text-indent:2em;">重要系统服务包含Windows Update服务和WMI服务，其中Windows Update正常是系统安全的一个重要保证，WMI服务正常是保证助手获取安装软件运行状态的基础。</p>
        <p class="fs14" style="text-indent:2em;">开启Windows Update服务的步骤如下：</p>
        <p class="fs14" style="text-indent:2em;">点击电脑上开始按钮->控制面板->Windows Update->选择自动安装更新->点击确定按钮。</p>
        <p class="fs14" style="text-indent:2em;">开启WMI服务的步骤如下：</p>
        <p class="fs14" style="text-indent:2em;">点击电脑上开始按钮->控制面板->管理工具->服务->选中WMI服务->点击启动按钮。</p>
        <h4 style="text-indent:2em;">9. 如何解决“IE浏览器网络代理”？</h4>
        <p class="fs14" style="text-indent:2em;">网络代理是代理服务器在网上提供转接功能，帮助代理用户获取网络信息。使用代理服务器可能会带来安全风险，请谨慎使用。</p>
        <p class="fs14" style="text-indent:2em;">取消IE浏览器网络代理的步骤如下：</p>
        <p class="fs14" style="text-indent:2em;">点击IE浏览器->工具->Internet选项->连接->局域网设置。取消“为LAN使用代理服务器”选项</p>
        <h4 style="text-indent:2em;">10. 何为“DNS解析状态异常”？</h4>
        <p class="fs14" style="text-indent:2em;">指定的域名解析后不在可信任的IP列表中，用户的系统环境可能存在风险，请注意风险的防范。</p>
        <h4 style="text-indent:2em;">11. 如何处理“本地网络连接状态异常”？</h4>
        <p class="fs14" style="text-indent:2em;">首先查看本地的网络连接是否正常；如果本地网络连接正常，网银助手显示的连接异常可能是因为无法连接到网银助手服务器或者银行网站造成的。</p>
        <h4 style="text-indent:2em;">12. 如何处理“网银服务连接状态异常”？</h4>
        <p class="fs14" style="text-indent:2em;">首先查看本地的网络连接是否正常；如果本地网络连接正常，网银助手显示的连接异常可能是因为网速原因造成网银连接状态异常。如果不正常则请进行本地网络的修复，再进行环境检测。</p>
        <h4 style="text-indent:2em;">13. 用户证书即将过期或已经过期怎么办？</h4>
        <p class="fs14" style="text-indent:2em;">如果用户证书的状态提示即将过期或已经过期，请尽快使用证书管理中的证书更新功能更新证书以延长证书的有效时间。若存在过期证书无法更新的情况，请携带USBKey和相关证件到大连银行柜台办理。</p>
        <h4 style="text-indent:2em;">14. 用户USBKey的PIN已锁定怎么办？</h4>
        <p class="fs14" style="text-indent:2em;">若您的USBKey已经被锁定，请携带有效身份证件到柜台办理解锁。</p>
        <h4 style="text-indent:2em;">15. USBKey内未检测到数字证书怎么办？</h4>
        <p class="fs14" style="text-indent:2em;">目前USBKey内的数字证书通过USBKey驱动的管理工具或者证书注册工具被导入到本地证书库中。如果助手未检测到您手中USBKey的数字证书，解决该问题的步骤如下：</p>
        <p class="fs14" style="text-indent:2em;">1、请检查USBKey驱动是否安装，是否正常运行；可利用助手进行环境检测，检测USBKey驱动项是否正常。</p>
        <p class="fs14" style="text-indent:2em;">2、确认USBKey是否下载过数字证书；如没有下载证书请先下载数字证书到USBKey中。</p>
        <p class="fs14" style="text-indent:2em;">3、请检查证书是否导入本地证书库；查看的方法为：打开IE浏览器，点击工具->选项->内容->证书，在个人证书列表中查看。如果证书存在个人证书列表中，请在助手USBKey管理页面点击“重新加载”按钮，或者重新插拔USBKey，以便助手重新读取个人数字证书信息；如果证书不存在，请利用助手检测结果列表中点击“重新安装”按钮，重新安装USBKey驱动。</p>
      </div>
      <m-btn :btnData="btnData" @click="back"></m-btn>
      <!-- <m-new-form
              :btnData="btnData"
              @back="back">
      </m-new-form> -->
    </div>
  </div>
</template>
<script>
import util from '@/libs/util'
export default {
  name: 'lookProblem',
  data () {
    return {
      titleData: ['企业网银', '常见问题'],
      btnData: [
        { btnText: '返回', class: 'm-cancel-btn', clickEventName: 'back' }
      ]
    }
  },
  methods: {
    back (res) {
      util.ReLogin(() => {
        this.$router.push(util.getLoginRouter())
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
.title{
  text-align: center;
}
p{
  margin: 0 30px;
}
</style>
