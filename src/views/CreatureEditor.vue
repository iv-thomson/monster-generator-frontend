<script setup lang="ts">
import { CreatureState } from '@/models';
import { creatureService } from '@/services';
import { ConfirmModal } from '@/utils';

import { MonsterForm, CreatureCard, CreatureCardEditable } from '@/components';
import UModal from '@/components/ui/UModal.vue';
import { EditableItemsState } from '@/services/EditableState';
import { EditorPageState } from '@/services/EditorService';

const state = new EditorPageState(creatureService);
const modal = new ConfirmModal();
const editableItems = new EditableItemsState(state.items.value);

const onDelete = (id: string) => modal.open().onConfirm(() => state.delete(id));
const onSave = (id: string, item: CreatureState) => {
  state.onSave(id, item);
  editableItems.toggleEditable(id, false);
};
</script>

<template>
  <section class="section creatures">
    <div class="container columns" style="margin: auto">
      <div class="box panel column is-one-quarter">
        <MonsterForm @submit="state.update" />
      </div>

      <div v-if="state.items.value.length" class="block column">
        <ul class="content grid">
          <li v-for="item in state.items.value" :key="item.id">
            <CreatureCardEditable
              v-if="editableItems.isEditable(item.id)"
              :item="item"
              @save="onSave(item.id, $event)"
              @cancel="editableItems.toggleEditable(item.id, false)"
            />
            <CreatureCard
              v-else
              :item="item"
              @delete="onDelete"
              @edit="editableItems.toggleEditable(item.id, true)"
            />
          </li>
        </ul>
      </div>

      <UModal :is-active="modal.isOpen.value" @close="modal.decline()"
        ><div class="card">
          <header class="card-header">
            <h3 class="card-header-title" style="width: 300px">
              Delete creature
            </h3>
          </header>
          <section class="card-content">
            <div class="content">
              <p>
                Are you sure you want to delete this creature? This action is
                irreversible.
              </p>
            </div>
          </section>
          <section class="card-footer">
            <button class="button card-footer-item" @click="modal.decline">
              CANCEL
            </button>
            <button
              class="button is-danger card-footer-item"
              @click="modal.confirm"
            >
              CONFIRM
            </button>
          </section>
        </div></UModal
      >
    </div>
  </section>
</template>

<style lang="scss">
.creatures {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    > li {
      width: calc(100% / 4 - 16px);
    }
  }

  @media (max-width: 1400px) {
    .grid {
      > li {
        width: calc(100% / 3 - 16px);
      }
    }
  }

  @media (max-width: 1200px) {
    .grid {
      > li {
        width: calc(100% / 2 - 16px);
      }
    }
  }

  @media (max-width: 600px) {
    .grid {
      > li {
        width: calc(100% - 16px);
      }
    }
  }
}
</style>
