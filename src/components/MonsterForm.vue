<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { CreatureService } from '../services/CreatureService';
import { CreatureState } from '../models/Creature/Creature'

const state: Ref<CreatureState> = ref({
    name: '',
    image: '',
    strength: 0,
    vitality: 0,
    dexterity: 0
})

const emit = defineEmits(['submit'])


const onSubmit = () => {
    console.log(state.value)
    CreatureService.create(state.value)

    emit('submit')
}
</script>

<template>
    <form class="form">
        <div class="field">
            <label class="label">Name</label>
            <input v-model="state.name" class="input" />
        </div>

        <div class="field">
            <label class="label">Strength</label>
            <input v-model="state.strength" class="input" type="number" />
        </div>

        <div class="field">
            <label class="label">Vitality</label>
            <input v-model="state.vitality" class="input" type="number" />
        </div>

        <div class="field">
            <label class="label">Dexteroty</label>
            <input v-model="state.dexterity" class="input" type="number" />
        </div>

        <div class="field">
            <label class="label">Image</label>
            <input v-model="state.image" class="input" />
        </div>
        <button class="button is-action" @click.prevent="onSubmit">Submit</button>
    </form>
</template>
