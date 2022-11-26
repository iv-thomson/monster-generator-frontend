import { createRouter, createWebHashHistory } from 'vue-router'
import CreatureEditorVue from './views/CreatureEditor.vue'
import HomeVue from './views/Home.vue'
import LocationEditorVue from './views/LocationEditor.vue'



const routes = [
    { path: '/', component: HomeVue },
    { path: '/admin/creature', component: CreatureEditorVue },
    { path: '/admin/location', component: LocationEditorVue },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

