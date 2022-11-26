import { ref, Ref } from "vue";

type ConfirmAction = () => void;

export class ConfirmModal {
  private confirmHandler: ConfirmAction = () => () => {};
  private declineHandler: ConfirmAction = () => () => {};

  public isOpen: Ref<boolean> = ref(false);

  public confirm(): void {
    this.confirmHandler();
    this.isOpen.value = false;
    this.clear();
  }

  public decline(): void {
    this.declineHandler();
    this.isOpen.value = false;
    this.clear();
  }

  public open() {
    this.isOpen.value = true;

    return this;
  }

  public onConfirm = (action: ConfirmAction) => {
    this.confirmHandler = action;

    return this;
  };
  public onDecline = (action: ConfirmAction) => {
    this.declineHandler = action;

    return this;
  };

  private clear(): void {
    this.confirmHandler = () => new Promise(() => {});
    this.declineHandler = () => new Promise(() => {});
  }
}
