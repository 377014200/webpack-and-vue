<template>
    <div :class="['wrapper', classes]">
        <header class="main-header">
            <a class="logo">
       <span class="logo-mini">
          <a href="/">
            <img
               :src=" require('assets/img/logo/qdfHead.png')"
               alt="Logo"
               class="img-responsive center-block logo"
               :style="logoStyle">
          </a>
           <!--千代福logo<a href="/"><span class="center-block logo" :class="{'mini-text-logo':minibar}">{{minibar?"QDF":"面签系统aa"}}</span></a>-->
        </span>
                <span class="logo-lg">
          <a href="/">
            <img
               :src="require('assets/img/logo/qdfLogo1.png')"
               alt="Logo"
               class="img-responsive center-block logo"
               :style="logoStyle">
          </a>
        </span>
            </a>
            <!-- Header Navbar -->
            <nav class="navbar navbar-static-top" role="navigation">
                <!-- Sidebar toggle button-->
                <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button" @click="toggleSidebar()">
                    <span class="sr-only">Toggle navigation</span>
                </a>
                <span class="navbar-title">{{visaName}}</span>
                <span class="navbar-timer ">{{date}}</span>
                <!-- Navbar Right Menu -->
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <!--<li><router-link :to="{path:'/home'}"  class="fa fa-home" style="font-size: 22px"></router-link></li>-->
                        <!-- User Account Menu -->
                        <li class="dropdown user user-menu">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                                <!-- The user image in the navbar-->
                                <!--<img v-bind:src="demo.avatar" class="user-image" alt="User Image">-->
                                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                                <span class="hidden-xs">{{getCurrentUser?getCurrentUser.username: "Loding..."}}</span>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a @click="showEditPass">{{$t('amendPassword')}}</a></li>
                                <li class="divider"></li>
                                <li><a @click="logout">{{$t('logout')}}</a></li>
                            </ul>
                        </li>
                        <li class="dropdown user user-menu" style="height: 50px;">
                            <div href="#" class="dropdown-toggle language" data-toggle="dropdown">
                                <!--<i class="fa  fa-font"></i>-->
                                <span class="hidden-xs">{{lang}}</span>
                                <span class="caret"></span>
                            </div>
                            <ul class="dropdown-menu" role="menu">
                                <li v-for="(item, key, index) in $i18n.messages" :key="index">
                                    <a @click="onToggleLang(key,item.title)">{{item.title}}</a>
                                    <p class="divider" v-if="index !== langLength - 1"> </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <sidebar :display-name="demo.displayName" :picture-url="demo.avatar"  />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style="padding-right: 17px;margin-left:210px">
            <!--Content Header (Page header)-->
            <!--<section class="content-header">-->
            <!--<h3>-->
            <!--{{$route.meta && $route.meta.title?$t($route.meta.title):$route.name}}-->
            <!--<small>{{ $route.meta.description }}</small>-->
            <!--</h3>-->
            <!--<ol class="breadcrumb" style="font-size: 12px;color:#FFAAAAAA">-->
            <!--<li :class="{'active':index==(routeTree.length-1)}" v-for="(item,index) in routeTree" :key='index'>-->
            <!--<a @click="$router.push(item.path)">{{item.name}}</a>-->
            <!--</li>-->
            <!--</ol>-->
            <!--</section>-->
            <section class="content" style="padding: 0px;padding-bottom: 8px">
                <router-view :key="viewKey"></router-view>
            </section>
        </div>
        <!-- /.content-wrapper -->
        <!--修改密码-->
        <modify-password-modal v-model="modifyPassModal.showModal"></modify-password-modal>
        <!-- Main Footer -->
        <!--<a href="javascript:;">Smart Ark Technology</a>-->
        <footer class="main-footer" style="border-top:0px;margin-left:195px">
            <strong>Copyright &copy; {{year}}.</strong> All rights reserved.

        </footer>
    </div>
    <!-- ./wrapper -->
</template>

<script>
	import faker from 'faker'
	import { mapState, mapGetters } from 'vuex'
	import config from '../config'
	import Sidebar from './Sidebar'
	import modifyPasswordModal from './modifyPasswordModal.vue'
	import 'hideseek'
	import util from "../assets/js/util.js"
	export default {
		name: 'Dash',
		components: {
			Sidebar,
			modifyPasswordModal
		},
		data: function() {
			return {
				    timer: null,
				date: util.dateFormat('hh : mm : ss', new Date().getTime()),
				languageKey: localStorage.getItem('CRMLang') || 'zh',
				lang: this.$i18n.messages[localStorage.getItem('CRMLang') || "zh"].title,
				year: new Date().getFullYear(),
				classes: {
					fixed_layout: config.fixedLayout,
					hide_logo: config.hideLogoOnMobile
				},
				error: '',
				modifyPassModal:{
					showModal:false,
				},
				minibar:false,
				logoStyle:{
				}
			}
		},
		created:function(){
			var path = this.$route.path;
			// if (!path.slice(1)){ //如果路径为空就跳转 home 页,  暂时去掉这个代码, 2019-05-27 DBL
			//   console.log(path.slice(1))
			//   this.$router.push('/home')
			// }
			this.showDate()
		},
		beforeDestroy: function () {
			clearInterval( this.timer)
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters({
				getCurrentUser: 'getCurrentUser'
			}),
			visaName() {
				if (!this.getCurrentUser) return
				return {
					'zh': this.getCurrentUser.visaCnName ,
					'en': this.getCurrentUser.visaEnName
				}[this.languageKey]
			},
			time(){
				return util.dateFormat("yyyy-MM-dd",new Date().getTime())
			},
			demo() {
				return {
					displayName: faker.name.findName(),
					avatar: faker.image.avatar(),
					email: faker.internet.email(),
					randomCard: faker.helpers.createCard()
				}
			},
			// routeTree(){ // 貌似没有用的代码 2019-05-27 DBL
			//   let $route=this.$route
			//   let matched=$route.matched
			//   matched=matched.map((item) =>{
			//     return {
			//       path:($route.name && $route.name==item.name)?item.fullPath:(item.path?item.path:"/home"),
			//       name:(item.meta && this.$t(item.meta.title))||this.$t("home")
			//     }
			//   })

			viewKey(){
				return this.$route.name !== undefined ? this.$route.name + new Date(): this.$route + new Date()
			},
			langLength(){
				return Object.getOwnPropertyNames(this.$i18n.messages).length
			},
		},
		methods: {
			showDate() {
				this.timer = setInterval(() => {
					this.date = util.dateFormat('hh : mm : ss', new Date().getTime())
				}, 1000)
			},
			changeloading() {
				this.$store.commit('TOGGLE_SEARCHING')
			},
			showEditPass(){
				this.modifyPassModal.showModal=true;
			},
			toggleSidebar(){
				this.minibar=!this.minibar
			},
			logout(){
				/** 这是原来的代码
				 * this.$store.dispatch('logout', this.$store.getters.getSessionId)
				 * */
				this.$store.dispatch('logout', "/login")
				var palyobj = document.getElementById('processmsg');
				palyobj.StopProcess()
			},
			onToggleLang(key, lang){
				this.$i18n.locale = key;
				this.lang = lang
				localStorage.setItem('CRMLang', key);
				this.languageKey = key
				// 改变 vuex 里面保存的 language 值
				this.$store.commit("CRM_LANG", key)
			}
		},
		watch:{
			"sessionId":function (val) {
				if(!val){

				}
			},
			// minibar(val){
			//       if(val){
			//           this.logoStyle={
			//             padding: "7px!important"
			//           }
			//       }else{
			//         this.logoStyle={
			//           padding: "2px 53px!important"
			//       }
			//       }
			// }
		},

		provide: function () {
			return {
				dash: this
			}
		}
	}
</script>

<style lang="scss">
    .wrapper.fixed_layout {
        .main-header {
            position: fixed;
            width: 100%;
        }

        .content-wrapper {
            padding-top: 50px;
        }

        .main-sidebar {
            position: fixed;
            height: 100vh;
        }
    }

    .wrapper.hide_logo {
        @media (max-width: 767px) {
            .main-header .logo {
                display: none;
            }
        }
    }

    .logo-mini,
    .logo-lg {
        img {
            padding: 3px 2px!important;
        }
    }

    .logo-lg {
        img {
            display: -webkit-inline-box;
            width: 100%;
        }
    }

    .user-panel {
        height: 4em;
    }

    hr.visible-xs-block {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.17);
        height: 1px;
        border-color: transparent;
    }
    .skin-blue .main-header .logo.mini-text-logo{
        font-size: 12px;
        padding:0
    }
    .main-header .navbar-custom-menu, .main-header .navbar-right {
        margin-right: 20px;
    }
    .main-header .navbar{
        margin-left:210px
    }
    .main-header .logo {
        width:210px;
    }
    .main-header .sidebar-toggle{
        padding: 15px 0;
    }
    .nav{
        font-size: 16px;
    }
    nav .navbar-title {
        margin-left: 20px;
        line-height: 47px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #ffffff; //style="color: #fff;;font-size: 16px;"
    }

    nav .navbar-timer {
        margin-left: 20px;
        line-height: 47px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #ffffff;
    }
    .language{
        width:90px;
        height:26px;
        color:rgba(51,51,51,1) !important;
        background:rgba(242,245,246,1);
        border:1px solid rgba(13,63,130,1);
        border-radius:15px;
        vertical-align: middle;
        margin-top: 12px;
        padding: 0 6px;
        text-align: center;
    }
</style>
