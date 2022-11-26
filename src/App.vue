<script setup lang="ts"></script>

<template>
  <main>
    <header class="level box">
      <div class="buttons is-right">
        <router-link to="/admin/creature" class="button">Creatures</router-link>
        <router-link to="/admin/location" class="button">Locations</router-link>
      </div>
    </header>
    <router-view />
  </main>
</template>
