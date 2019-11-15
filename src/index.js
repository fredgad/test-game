window.Vue = require('vue')
import './js/common'
import './scss/main.scss'
import store from './store/store'
import VueRouter from 'vue-router'
const Menu = require('./components/Menu.vue').default
const Game = require('./components/Game.vue').default
 
Vue.component('App', require('./components/App.vue').default)
Vue.component('Metrix', require('./components/Metrix.vue').default)
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/menu', component: Menu },
        { path: '/game', component: Game }
    ]
})

new Vue({
    router,
    store,
    el: '#app',
})

onload = () => {
    location.href = '/#/menu'
}