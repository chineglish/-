<template>
	<div class="header" style="z-index: 100;">
		<div class="topWrap">
			<div class="top clearfix">
				<img @click="goHome" class="logo fll" src="./image/headerLogo.jpg" alt/>
				<span v-if="$route.meta.pageTitle" class="title">{{$route.meta.pageTitle}}</span>
				<span v-else class="title">企业网上银行({{loginType | filterLoginType}})</span>
				<div v-if="!$route.meta.pageTitle" class="flr helpBox fs14">
					<div v-if="isLogin">
						<span class="titleFont border-right" @click="gotoDemoProject">功能演示</span>
						<span class="titleFont">安全提示</span>
					</div>
					<div v-else>
						<span>字体大小：<span @click="changeSize('small')" :class="size === 'small' ? 'fSize' : '' ">小</span>&nbsp;/&nbsp;<span @click="changeSize('big')" :class="size === 'big' ? 'fSize' : '' ">大</span></span>
						<span class="help"><a ref="template" href='/resources/eBankQutions.pdf'>帮助中心</a></span>
						<span class="exit" @click="loseLogin">安全退出</span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!isLogin" class="menuWrap el-menu-wrap">
			<div class="el-menu-innerwrap">
				<el-menu :router="false" :default-active="activeIndex" mode="horizontal" v-if="menuList">
					<template v-for="(menu, idx) in menuList">
						<template v-if="!menu.children || menu.children.length === 0">
							<el-menu-item
								:key="idx"
								:index="'a-' + idx"
								@click="goPage(menu.path)"
								:disabled="menu.disabled"
							>{{menu.name}}</el-menu-item>
						</template>
						<template v-else>
							<el-submenu :key="idx" :index="'a-' + idx">
								<!-- iframe提高菜单层级,避免密码控件遮盖 -->
								<iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
								<template slot="title">{{menu.name}}</template>
								<template v-for="(subMenu, subIdx) in menu.children">
									<template v-if="!subMenu.children || subMenu.children.length === 0">
										<el-menu-item
											:key="subIdx"
											:index="'b-' + subIdx"
											@click="goPage(subMenu.path)"
											:disabled="subMenu.disabled">
											<span style="marginRight: 5px; fontSize: 40px;">·</span>{{subMenu.name}}
										</el-menu-item>
									</template>
									<template v-else>
										<el-submenu :key="subIdx" :index="'b-' + subIdx">
											<!-- iframe提高菜单层级,避免密码控件遮盖 -->
											<iframe id="iframe2" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
											<template slot="title"><span style="marginRight: 5px; fontSize: 40px;">·</span>{{subMenu.name}}</template>
											<el-menu-item
												:key="ssubIdx"
												:index="'c-' + ssubIdx"
												@click="goPage(ssubMenu.path)"
												:disabled="ssubMenu.disabled"
												v-for="(ssubMenu, ssubIdx) in subMenu.children"
											>{{ssubMenu.name}}
											</el-menu-item>
										</el-submenu>
									</template>
								</template>
							</el-submenu>
						</template>
					</template>
				</el-menu>
				<div class="menu-search-box">
					<img src="@/assets/image/search.png" class="menu-search-box-img" style="color:#f0f0f0;width:17px;height:17px;vertical-align:middle;" />
					<el-autocomplete
						v-model="searchKeywords"
						:fetch-suggestions="querySearch"
						placeholder="请输入关键字"
						:trigger-on-focus="false"
						@select="selectMenu"
						@keyup.enter.native="search"
					></el-autocomplete>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { isLoadSuccess } from '@/assets/js/SignMsg'
import { mapMutations } from 'vuex'
import { MessageBox } from 'element-ui'
import util from '@/libs/util'

export default {
  computed: {
    menuList () { return this.getMenuList() },
    hasNoData () {
      return !this.searchList.length
    }
  },
  filters: {
    filterLoginType (value) {
      return value === 'C' ? '证书版' : '普通版'
    }
  },
  data () {
    return {
      breadData: ['贷款业务', '贷款信息查询'],
      fontSize: 'middle',
      size: 'small',
      menuState: 0,
      loginType: 'R',
      searchKeywords: '',
      activeIndex: 'a-0',
      // 展示联级菜单
      showMoreMenu: false,
      // 是否需要登录
      isLogin: true,
      // 暂存二级菜单
      secMenuList: [],
      searchList: [],
      timer: null
    }
  },
  methods: {
    ...mapMutations({
      removeKeepAliveList: 'd2admin/page/removeKeepAliveList'
    }),
    gotoDemoProject () {
      // 跳转演示项目
      // 现在使用的是sit内网地址,后期需要修改
      window.open('https://ibank.bankofdl.com/EBankFrontEnd/demo/index.html#/login')
    },
    getLoginType () {
		if (this.$route.name === 'login') {
			let str = location.hash.split('?')[1]
			if (str) {
				let msgs = str.split('&')
				let obj = {}
				msgs.forEach(item => {
					let key = item.split('=')[0]
					obj[key] = item.split('=')[1]
				})
				if (msgs.length > 0 && obj.loginType === 'C') {
					this.loginType = 'C'
				} else {
					this.loginType = 'R'
				}
			} else {
				this.loginType = 'R'
			}
			if (process.env.NODE_ENV === 'production') {
				if (location.port === '444') { this.loginType = 'C' } else {
					this.loginType = 'R'
				}
			}
		} else {
			this.loginType = util.getLoginType()
		}
    },
    goPage (path) {
      if (!path) {
        MessageBox('你没有使用该功能的权限', '错误信息', {
          confirmButtonText: '确定',
          center: true
        })
      } else if (path !== this.$route.name) {
        this.removeKeepAliveList()
        this.$router.push(`/${path}`)
      } else {
        window.location.reload()
      }
    },
    // 退出登录
    loseLogin () {
      const path = util.getLoginRouter()
      if (util.getLoginType() === 'C') {
        this.$confirm('您是否要退出网上银行?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (isLoadSuccess()) {
            this.$confirm('建议您退出后拔除USBKEY', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const callback = () => {
                this.$router.push(path)
              }
              const data = {
                successCallback: callback
              }
              this.$store.dispatch('common/logout', data)
            })
          } else {
            const callback = () => {
              this.$router.push(path)
            }
            const data = {
              successCallback: callback
            }
            this.$store.dispatch('common/logout', data)
          }
        })
      } else {
        this.$confirm('确定要退出系统吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const callback = () => {
            this.$router.push(path)
          }
          const data = {
            successCallback: callback
          }
          this.$store.dispatch('common/logout', data)
        })
      }
    },
    // 更换字体
    changeSize (str) {
      this.size = str
      let fontSizeLink = document.getElementById('fontSizeLink')
      if (str === 'big') {
        fontSizeLink.href = 'big.css'
      }
      if (str === 'small') {
        fontSizeLink.href = 'small.css'
      }
    },
    // 切换一级菜单，将二级菜单暂存
    changeMenu (index) {
      this.showMoreMenu = false
      this.menuState = index
      if (this.menuList[index].children !== [] && this.menuList[index].children !== undefined) {
        this.secMenuList = this.menuList[index].children
      }
      if (index === 0) {
        this.$router.push(`${this.menuList[index].path}`)
      } else {
        if (this.menuList[index].children !== undefined && this.menuList[index].children !== []) {
          this.showMoreMenu = true
        } else {
          this.$router.push(`${this.menuList[index].path}`)
        }
      }
    },
    // 二级菜单下没有三级，直接跳转方法
    goSecMenu (index) {
      this.$router.push(`${this.secMenuList[index].path}`)
      this.showMoreMenu = false
    },
    // 三级菜单跳转方法
    goThreeMenu (i, j) {
      this.$router.push(`${this.secMenuList[i].children[j].path}`)
      this.showMoreMenu = false
    },
    // 搜索菜单
    search () {
      if (this.searchKeywords) {
        this.searchList.forEach(item => {
          if (this.searchKeywords.indexOf(item.value) === 0) {
            this.$router.push({
              name: item.path
            })
          }
        })
      }
      this.searchKeywords = ''
    },
    selectMenu (item) {
      this.removeKeepAliveList()
      if (item.path) {
        this.$router.push(`/${item.path}`)
      }
      this.searchKeywords = ''
    },
    // 获取所有的路由
    List (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].children) {
          this.List(array[i].children)
        } else {
          this.searchList.push({
            value: array[i].name,
            path: array[i].path
          })
        }
      }
      return this.searchList
    },
    // querySearch 是一个返回输入建议的方法，在该方法中你可以在输入建议数据准备好时通过 callback(data) 返回到 autocomplete 组件中
    querySearch (queryString, callback) {
      var searchList = this.searchList
      var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList
      // 调用 callback 返回建议列表的数据
      callback(results)
    },
    // 进行筛选
    createFilter (queryString) {
      return searchList => {
        return (searchList.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    goHome () {
      if (!this.isLogin) {
        this.$router.push({ name: 'index' })
      }
    }
  },
  mounted () {
    this.getLoginType()
    if (this.$route.meta.noLogin) {
      this.isLogin = true
    } else {
      this.isLogin = false
      this.List(this.menuList)
    }
    this.$nextTick(() => {
      !this.isLogin && (this.$refs.template.href = `${util.getUrl()}resources/eBankQutions.pdf`)
    })
  }
}
</script>

<style lang="scss">
	.header {
		.el-menu-wrap {
			background: #B51011;
		}
		.el-menu--horizontal {
			.el-menu-item {
				background: #B51011;
				color: #fff;
				height: 50px;
				line-height: 50px;
			}
			.el-submenu__title:focus, .el-submenu__title:hover {
				background: #8C0506;
			}
			// 修改一级标题无子菜单点击后样式
			.el-menu-item.is-active {
				border-bottom: 0px;
				color: #fff;
			}
			// 修改一级标题无子菜单点击后样式
			.el-menu-item:not(.is-disabled):focus{
				background: #B51011;
				color: #fff;
			}
			.el-submenu {
				background: #B51011;
				color: #fff;
				.el-submenu__title {
					color: #fff;
				}
			}
			.is-opened {
				background: #8C0506;
			}
			.el-submenu.is-active .el-submenu__title {
				background: #B51011!important;
				color: #fff;
			}
			.el-submenu:focus{
				color: #fff;
				.el-submenu__title{
					color: #fff;
				}
			}

			.el-submenu .el-submenu__title {
				height: 50px;
				line-height: 50px;
				i {
					display: none;
				}

				&:hover {
					background: #B51011 !important;
					color: #fff !important;
				}

				&:focus {
					background: #B51011 !important;
					color: #fff !important;
				}
			}

			.el-submenu.is-active .el-submenu__title {
				border: none;
				background: #fff;
			}

			.el-menu-item {
				border: none;
			}
		}
	}
	.el-menu--horizontal {
		.el-menu--popup{
			.el-submenu {
				.el-submenu__title {
					color: #666666!important;
					.el-submenu__icon-arrow{
						right: 10px;
						color: #666666!important;
					}
				}
				.el-submenu__title:hover{
					background: #F8F8F8;
					color: #000000!important;
				}
				.el-submenu__title:hover .el-submenu__icon-arrow{
					display: none;
				}
			}
			.is-opened {
				.el-submenu__title {
					background: #ecf5ff!important;
					color: #B51011!important;
				}
				.el-submenu__icon-arrow{
					display: none;
					background: #F8F8F8;
					color: #B51011!important;
				}
			}
			.el-menu-item{
				color: #666666!important;
			}
			.el-menu-item:hover {
				color: #B51011!important;
			}
		}
	}
	.menu-search-box {
		height: 33px;
		line-height: 33px;
		padding: 1px;
		.menu-search-box-img{
			width: 17px;
			height: 17px;
			color: rgb(240, 240, 240);
			float: left;
			margin: 8px 0 0 10px;
		}
		.el-input__inner {
			background-color: #B51011;
			border: 0px solid #B51011;
			color: #ffffff!important;
			width: 175px;
			height: 30px!important;
			line-height: 35px!important;
			caret-color: #ffffff;
		}
		input::-webkit-input-placeholder {
			color: #fff !important;
		}

		input:-moz-placeholder {
			color: #fff !important;
		}
		input::-moz-placeholder {
			color: #fff !important;
		}
		input:-ms-input-placeholder {
			color: #fff !important;
		}
	}
</style>
<style lang="scss" scoped>
	.el-menu--horizontal .el-menu .el-submenu__title{
		color: #fff!important;
	}
	.header {
		width: 100%;
		min-width: 1200px;
		height: auto;
		background: #fff;

		.top {
			/* display: flex; */
			/* justify-content: space-between; */
			width: 1200px;
			height: 100px;
			line-height: 100px;
			margin: 0 auto;
			display: inherit;

			.logo {
				width: 215px;
				height: 100px;
				cursor: pointer;
			}

			.title {
				border-left: 1px solid #ddd;
				padding-left: 10px;
				margin-left: 10px;
			}

			.helpBox {
				cursor: pointer;

				.fontColor {
					color: #999;
				}
				.border-right{
					border-right: 1px solid #999;
				}
				.titleFont {
					padding-right: 5px;
					margin-left: 5px;
				}

				.titleFont:hover {
					color: #B51011;
				}

				.lastFont {
					border-right: none;
				}

				.fSize {
					color: #B51011;
				}

				.help {
					border-left: 1px solid #999;
					margin-left: 5px;
					padding-left: 5px;
					a {
						color: #000000;
					}
				}

				.help:hover {
					color: #B51011;
				}

				.exit {
					border-left: 1px solid #999;
					margin-left: 5px;
					padding-left: 5px;
				}

				.exit:hover {
					color: #B51011;
				}
			}
		}

		.menuWrap {
			height: 50px;
			background: #B51011;

			.menuUi {
				margin: 0 auto;
				width: 1200px;
				color: #fff !important;
				background: #B51011;
				position: relative;
			}

			.menuList {
				margin: 0 auto;
				width: 1200px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				display: flex;
				color: #fff;

				li {
					flex: 1;
					cursor: pointer;

					.secMenuList {
						position: absolute;
						z-index: 10;
						margin: 0 auto;
						padding: 0 30px 10px;
						width: 1140px;
						height: 190px;
						top: 150px;
						left: 0;
						right: 0;
						background: #fff;
						box-shadow: 0px 2px 6px #ccc;
						overflow: scroll;
						color: #666;
						text-align: left;

						.secWrap {
							/* max-height: 60px; */
							padding-bottom: 10px;

							.secMenuName {
								height: 40px;
								cursor: pointer;
							}

							.secMenuName:hover {
								color: #e50000;
							}

							.threeMenuList {
								color: #999;
								min-height: 20px;
								line-height: 20px;

								span {
									margin-right: 16px;
									cursor: pointer;
								}

								span:hover {
									color: #e50000;
									text-decoration: underline;
								}
							}
						}
					}
				}

				.searchWrap {
					flex: 3;
					text-align: right;
					position: relative;

					.searchInput {
						margin-right: 20px;
						width: 210px;
						height: 25px;
						border-radius: 20px;
						padding-left: 40px;
						outline: none;
						color: #fff !important;
						border: 1px solid #fff;
						background: #B51011 !important;
					}

					.searchIcon {
						position: absolute;
						top: 32%;
						left: 35%;
					}
				}
			}
		}

		.el-menu-wrap {
			width: 100%;
			background: #B51011;

			.el-menu-innerwrap {
				margin: auto;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				width: 1200px;
				position: relative;

				.menu-search-box {
					/*position: relative;*/
					position: absolute;//居中
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					float: right;
					width: 220px;
					// padding-right: 5px;
					border-radius: 20px;
					background: #B51011;
					border: 1px solid #fff;
					text-align: center;
					// .form-control-icon {
					//   position: absolute;
					//   top: 50%;
					//   left: 12px;
					//   transform: translateY(-50%);
					//   width: 17px;
					//   height: 17px;
					//   background: url("~@/assets/image/search.png") no-repeat;
					// }

					// .form-control {
					//   box-sizing: border-box;
					//   padding: 0 32px;
					//   width: 252px;
					//   height: 32px;
					//   line-height: 32px;
					//   border-radius: 100px;
					//   color: #fff;
					//   background: #B51011;
					//   outline: none;
					//   border: 1px solid #fff;
					// }
				}
			}
		}

		.bread {
			background-color: #f5f5f5;
			height: 40px;
			line-height: 40px
		}
	}

	.fontActive {
		color: #333;
	}

	.menuActive {
		background: #8C0506;
	}

	input::-webkit-input-placeholder {
		/* placeholder颜色  */
		color: #fff;
	}
</style>

<style lang="scss">
	.header {
		.el-menu--horizontal {
			.el-menu-item,
			.el-submenu .el-submenu__title {
				height: 50px;
				line-height: 50px;
				max-width: 100px;
				padding: 0 13px;

				&:hover {
					background: #8C0506 !important;
					color: #fff !important;
				}

				i {
					color: #eee;
				}
			}

			.el-submenu.is-active .el-submenu__title {
				border: none;
				background: #8C0506;
			}

			.el-menu-item {
				border: none;
			}
		}
	}
</style>
