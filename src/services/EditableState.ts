import { Identifiable } from '@/models';
import { ref, Ref } from 'vue';

export class EditableItemsState<T extends Identifiable> {
  private state: Ref<Record<string, boolean>>;

  public constructor(items: T[]) {
    this.state = ref(
      items.reduce((result, item) => ({ ...result, [item.id]: false }), {})
    );

    this.toggleEditable = this.toggleEditable.bind(this);
    this.isEditable = this.isEditable.bind(this);
  }

  public toggleEditable(id: string, isActive: boolean): void {
    this.state.value[id] = isActive;
  }

  public isEditable(id: string): boolean {
    return this.state.value[id];
  }
}
