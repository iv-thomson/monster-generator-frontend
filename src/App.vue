<script setup lang="ts"></script>

<template>
  <main>
    <header class="level box">
      <div class="buttons is-right">
        <router-link to="/admin/creature" class="button">Creatures</router-link>
        <router-link to="/admin/location" class="button">Locations</router-link>
        <router-link to="/admin/encounter" class="button">Encounters</router-link>
        <router-link to="/admin/map-editor" class="button">Map Editor</router-link>
      </div>
      <div class="buttons is-right">
        <router-link to="/map" class="button">Map preview</router-link>
      </div>
    </header>
    <router-view />
  </main>
</template>
