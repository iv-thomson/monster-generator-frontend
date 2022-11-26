import { createRouter, createWebHashHistory } from 'vue-router'
import AdminVue from './views/Admin.vue'
import HomeVue from './views/Home.vue'



const routes = [
    { path: '/', component: HomeVue },
    { path: '/admin', component: AdminVue },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

