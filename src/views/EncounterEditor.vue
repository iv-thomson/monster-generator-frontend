<script setup lang="ts">
import ConfirmModalVue from '@/components/ui/ConfirmModal.vue';

import { encounterService } from '@/services';
import EncounterForm from '@/components/encounter/EncounterForm.vue';
import EncounterCard from '@/components/encounter/EncounterCard.vue';
import EncounterCardEditable from '@/components/encounter/EncounterCardEditable.vue';
import { EditorPageState } from '@/services/EditorService';
import { EditableItemsState } from '@/services/EditableState';

import { ConfirmModal } from '@/utils';
import { EncounterState } from '@/models';

const state = new EditorPageState(encounterService);
const modal = new ConfirmModal();
const editableItems = new EditableItemsState(state.items.value);

const onDelete = (id: string) => modal.open().onConfirm(() => state.delete(id));
const onSave = async (id: string, item: EncounterState) => {
  await state.onSave(id, item);
  editableItems.toggleEditable(id, false);
};
</script>

<template>
  <section class="section locations">
    <div class="container columns" style="margin: auto">
      <div class="box panel column is-one-quarter">
        <EncounterForm @submit="state.update" />
      </div>

      <div v-if="state.items.value" class="block column">
        <ul class="content grid">
          <li v-for="item in state.items.value" :key="item.id">
            <EncounterCardEditable
              v-if="editableItems.isEditable(item.id)"
              :item="item"
              @save="onSave(item.id, $event)"
              @cancel="editableItems.toggleEditable(item.id, false)"
            />
            <EncounterCard
              v-else
              :item="item"
              @delete="onDelete"
              @edit="editableItems.toggleEditable(item.id, true)"
            />
          </li>
        </ul>
      </div>
    </div>
    <ConfirmModalVue
      title="Delete encounter"
      content="Are you sure you want to delete this encounter? This action is
              irreversible."
      :is-active="modal.isOpen.value"
      @confirm="modal.confirm()"
      @decline="modal.decline()"
    />
  </section>
</template>

<style lang="scss">
.locations {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    > li {
      width: calc(100% / 2 - 16px);
    }
  }

  @media (max-width: 1200px) {
    .grid {
      > li {
        width: calc(100% - 16px);
      }
    }
  }
}
</style>
