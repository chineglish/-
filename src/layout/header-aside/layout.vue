<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" style="background: #fff;" flex="dir:top">
      <!-- 新手引导 -->
      <!--  && showGuide" -->
      <div class="guide" id="guide" v-show="$route.name === 'index' && $store.state.common.showGuide">
      <img class="guide-close" src="./image/guideClose.png" @click="closeGuide" alt="跳过">
      <img class="guide-img guide-img1" v-if="guideIndex === 1" src="./image/guide1@3x.png" alt="guide1">
      <img class="guide-img guide-img2" v-if="guideIndex === 2" src="./image/guide2@3x.png" alt="guide1">
      <img class="guide-img guide-img3" v-if="guideIndex === 3" src="./image/guide3@3x.png" alt="guide1">
      <img class="guide-img guide-img4" v-if="guideIndex === 4" src="./image/guide4@3x.png" alt="guide1">
        <div>
          <img class="guide-btn" src="./image/guideSuc@3x.png" @click="closeGuide" v-if="guideIndex === 4" alt="完成">
          <img class="guide-btn" src="./image/guideNext@3x.png" @click="clickGuideImg" v-else alt="下一步">
        </div>
      </div>
      <!-- 顶栏 -->
      <Header class="no-print"></Header>
      <div class="changeCss">
        <div class="main-body">
          <div v-if="$store.state.d2admin.menu.showAsideCollapse" id="shortcutMenu" class="shortcutMenu no-print">
            <div class="shortcut-menu-item" v-show="!asideCollapse" v-for="(item, index) in $store.state.d2admin.menu.aside" :key="index" @click="gotoPage(item)">
                <img slot="reference" :src="getSrc(item.menuId)">
                <span class="fs14" style="text-align: left; padding-left: 20px;">{{item.name}}</span>
            </div>
          </div>
          <div v-if="!$store.state.d2admin.menu.showAsideCollapse && $store.state.d2admin.menu.showElectronicBill" class="electronic-bill-menu no-print">
            <el-menu
              default-active="0-0-0"
              :default-openeds="['0-0-0']"
              class="menu">
            <el-submenu index= "0-0-0" v-if="$store.state.d2admin.menu.billMenu">
                <template slot="title">
                  <span>{{'电子票据'}}</span>
                </template>
              <div v-for="(menu, index) in $store.state.d2admin.menu.billMenu" :key="index">
                <el-submenu :index="`${index}`" v-if="menu.children">
                  <template slot="title">
                    <span>{{menu.name}}</span>
                  </template>
                  <el-menu-item v-for="(menuItem, menuIndex) in menu.children" :key="menuIndex" :index="`${index}-${menuIndex}`" @click="gotoPage(menuItem)">
                    <span slot="title">{{menuItem.name}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item :index="`${index}`" @click="gotoPage(menu)" v-else>
                  <span slot="title">{{menu.name}}</span>
                </el-menu-item>
              </div>
            </el-submenu>
            </el-menu>
          </div>
          <div id="router-view" :class="$store.state.d2admin.menu.showElectronicBill ? 'router-view electronic-bill' : $route.meta.noLogin ? 'router-view no-login' : 'router-view'">
            <transition :name="transitionActive ? 'fade-transverse' : ''">
              <keep-alive :include="keepAliveList">
                <router-view :style="bodyStyle"/>
              </keep-alive>
            </transition>
          </div>
        </div>
      </div>
      <Footer class="no-print"></Footer>
	</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import mixinSearch from './mixins/search'
import Header from '@/components/header'
import Footer from '@/components/footer'
import util from '../../libs/util'

export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    Header,
    Footer,
    'd2-menu-side': () => import('./components/menu-side'),
    'd2-menu-header': () => import('./components/menu-header'),
    'd2-tabs': () => import('./components/tabs'),
    'd2-header-fullscreen': () => import('./components/header-fullscreen'),
    'd2-header-search': () => import('./components/header-search'),
    'd2-header-theme': () => import('./components/header-theme'),
    'd2-header-user': () => import('./components/header-user'),
    'd2-header-error-log': () => import('./components/header-error-log')
  },
  data () {
    return {
      guideIndex: 1,
      showShortcutMenuList: true,
      bodyStyle: {
        width: '100%',
        minHeight: this.getMinHeight()
      },
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('d2admin', {
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      keepAliveList: state => state.page.keepAliveList
    }),
    ...mapGetters('d2admin', {
      // keepAliveList: 'page/keepAliveList',
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
       * @description 最外层容器的背景图片样式
       */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  mounted () {
    console.log(this.$store.state.d2admin.menu.billMenu)
  },
  methods: {
    // 关闭新手引导
    closeGuide () {
      this.$store.commit('common/setShowGuide', false)
    },
    // 点击新手引导下一个
    clickGuideImg () {
      this.guideIndex += 1
    },
    getAside () {
      if (this.$store.state.d2admin.menu.aside) {
        return this.$store.state.d2admin.menu.aside
      } else if (localStorage.aside) {
        let aside = JSON.parse(localStorage.aside)
        this.$store.commit('d2admin/menu/asideSet', aside)
        return this.$store.state.d2admin.menu.aside
      }
    },
    gotoPage (item) {
      this.$router.push({ name: item.path })
    },
    changeAsideCollapse () {
      this.$store.commit('d2admin/menu/asideCollapseToggle')
      this.changeShortcutMenuStyle()
    },
    getSrc (menuId) {
      return `${util.getUrl()}icon/${menuId}@2x.png`
    },
    ...mapMutations({
      menuAsideCollapseToggle: 'd2admin/menu/asideCollapseToggle'
    }),
    shortcutMenuList (item) {
      return ``
    },
    getMinHeight () {
      return this.$route.meta.noLogin ? (document.body.clientHeight - 151) + 'px' : (document.body.clientHeight - 201) + 'px'
    },
    /**
       * 接收点击切换侧边栏的按钮
       */
    handleToggleAside () {
      this.menuAsideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
  // 注册主题
  @import '~@/assets/style/theme/register.scss';
  .guide{
    display: block;
    z-index: 999;
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.7);
    text-align: center;
    .guide-close{
      width: 30px;
      height: auto;
      position: fixed;
      right: 150px;
      top: 100px;
    }
    .guide-img{
      width: 1200px;
      height: auto;
      margin: 0 calc(50% - 600px);
    }
    .guide-btn{
        width: 120px;
        height: auto;
        margin-top: 20px;
      }
    .guide-img1{
      margin-top: 120px;
    }
    .guide-img2{
      margin-top: 100px;
    }
    .guide-img3{
      margin-top: 280px;
    }
    .guide-img4{
      margin-top: 400px;
    }
  }
  .shortcut-menu {
    width: 100px;
    float: left;
  }
  .changeCss {
    background: #f8f8f8;
    min-width: 1200px;
    height: auto;
    text-align: center\9;
    // min-height: calc(100% - 140px - 50px - 100px);
    // overflow: hidden\9; //ie9下重新计算float元素的高度
    .main-body{
      width: 1200px;
      margin: auto;
      display: flex;
      background: #fff;
      display: inline-block\9;
      // white-space: nowrap\9;
      .shortcutMenu{
        width: 49px;
        // height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 50px;
        background: #fff;
        float: left;
        border-left: 1px solid #EEEEEE;
        border-top: 1px solid #EEEEEE;
        .shortcut-menu-item{
          width: 100%;
          background: #F8F8F8;
          border-bottom: 1px solid #EEEEEE;
          cursor: pointer;
          img{
            width: 20px;
            height: 20px;
          }
          img:hover{
            width: 25px;
            height: 25px;
          }
          span {
            display: none;
            position: absolute;
            height: 49px;
            margin-left: 5px;
            border: 1px solid #EEEEEE;
            border-left: 0;
            width: 150px;
            background: #F8F8F8;
          }
        }
      }
      .shortcutMenu:hover{
        .shortcut-menu-item{
          span {
            z-index: 20;
            display: inline;
          }
        }
      }
      .electronic-bill-menu{
        width: 240px;
        .menu{
          width: 100%;
          height: 100%;
        }
      }
      .router-view{
        float: right;
        width: 1150px;
      }
      .no-login{
        width: 1200px;
      }
      .electronic-bill{
        width: 960px;
        .m-breadcrumb{
          width: 100%;
          margin-left: 0;
        }
      }
    }

    .content {
      margin: 0 auto;
      width: 1200px;
    }
  }
</style>
