import { createRouter, createWebHashHistory } from 'vue-router';

import CreatureEditorVue from './views/CreatureEditor.vue';
import EncounterEditorVue from './views/EncounterEditor.vue';
import HomeVue from './views/HomeView.vue';
import LocationEditorVue from './views/LocationEditor.vue';
import MapEditorVue from './views/MapEditor.vue';

import MapListView from './views/MapListView.vue';
import MapItemView from './views/MapItemView.vue';
import MapHubViewVue from './views/MapHubView.vue';

const routes = [
  { path: '/', component: HomeVue },
  { path: '/map', component: MapListView },
  { path: '/map/:id', component: MapItemView },
  { path: '/admin/creature', component: CreatureEditorVue },
  { path: '/admin/location', component: LocationEditorVue },
  { path: '/admin/encounter', component: EncounterEditorVue },
  { path: '/admin/maps', component: MapHubViewVue },
  { path: '/admin/map-editor', component: MapEditorVue },
  { path: '/admin/map-editor/:id', component: MapEditorVue },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
