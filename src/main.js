import Vue from 'vue'
import App from './App.vue'
import { BDropdown } from 'bootstrap-vue'
import ToggleButton from 'vue-js-toggle-button'
import { BFormSelect } from 'bootstrap-vue'
import { BFormTextarea } from 'bootstrap-vue'
import { TabsPlugin } from 'bootstrap-vue'
import { ImagePlugin } from 'bootstrap-vue'
Vue.use(ImagePlugin)
Vue.use(TabsPlugin)
Vue.component('b-form-textarea', BFormTextarea)
Vue.component('b-form-select', BFormSelect)
Vue.use(ToggleButton)
Vue.config.productionTip = false
Vue.component('b-dropdown', BDropdown)

new Vue({
  render: h => h(App)
}).$mount('#app')
