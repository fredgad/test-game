window.Vue = require('vue')
import './scss/main.scss'
 
Vue.component('App', require('./components/App.vue').default)

new Vue({
    el: '#app',
}) 