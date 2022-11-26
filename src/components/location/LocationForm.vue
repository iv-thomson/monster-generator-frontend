<script lang="ts" setup>
import { Ref, ref } from "vue";
import { LocationState } from "@/models";
import { LocationService } from "@/services";

const state: Ref<LocationState> = ref(LocationState.empty());

const emit = defineEmits(["submit"]);

const onSubmit = () => {
  LocationService.create(state.value);

  emit("submit");
};
</script>

<template>
  <form class="form">
    <div class="field">
      <label class="label">Name</label>
      <input v-model="state.name" class="input" />
    </div>

    <div class="field">
      <label class="label">Description</label>
      <input v-model="state.description" class="input" type="textarea" />
    </div>

    <div class="field">
      <label class="label">Image</label>
      <input v-model="state.image" class="input" />
    </div>
    <button class="button is-action" @click.prevent="onSubmit">Submit</button>
  </form>
</template>
