import Vue from 'vue'
// import ElInput from './input/input.vue'
import d2Container from './d2-container'
import vueFileUpload from './vue-file-upload/vue-file-upload.vue'
// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-page-cover', () => import('./d2-page-cover'))
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))

// 自定义组件
Vue.component('m-form', () => import('./m-form/index.vue'))
Vue.component('m-breadcrumb', () => import('./m-breadcrumb/index.vue'))
Vue.component('m-hint-box', () => import('./m-hint-box/index.vue'))
Vue.component('m-table', () => import('./m-table/index.vue'))
Vue.component('m-form-res', () => import('./m-form-res/index.vue'))
Vue.component('m-balance', () => import('./m-balance/index.vue'))
Vue.component('d2-mng-page', () => import('./d2-mng-page/index.vue'))
Vue.component('b-result-page', () => import('./b-result-page/index.vue'))
Vue.component('m-new-form', () => import('./m-new-form/index.vue'))
Vue.component('m-steps', () => import('./m-steps/index'))
Vue.component('d-trading-res', () => import('./d-trading-res/index.vue'))
Vue.component('d-table', () => import('./d-table/index.vue'))
Vue.component('d-vertical-table', () => import('./d-vertical-table/index.vue'))
Vue.component('m-form-inner', () => import('./m-form-inner/index.vue'))
Vue.component('d-table-classification', () => import('./d-table-classification'))
Vue.component('d-form-previewer', () => import('./d-form-previewer'))
Vue.component('m-btn', () => import('./m-btn'))
Vue.component('vue-file-upload', vueFileUpload)
// Vue.component('el-input', ElInput)
