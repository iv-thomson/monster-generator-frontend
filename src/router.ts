import { createRouter, createWebHashHistory } from 'vue-router';
import CreatureEditorVue from './views/CreatureEditor.vue';
import EncounterEditorVue from './views/EncounterEditor.vue';
import HomeVue from './views/HomeView.vue';
import LocationEditorVue from './views/LocationEditor.vue';

const routes = [
  { path: '/', component: HomeVue },
  { path: '/admin/creature', component: CreatureEditorVue },
  { path: '/admin/location', component: LocationEditorVue },
  { path: '/admin/encounter', component: EncounterEditorVue },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
