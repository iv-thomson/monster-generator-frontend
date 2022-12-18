export enum EventName {
  CellClicked = 'cell-clicked',
}

export class EventBus {
  public events: Partial<Record<EventName, Function[]>>;
  constructor() {
    this.events = {};
  }

  public on(eventName: EventName, fn: Function) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName]!.push(fn);
  }

  public off(eventName: EventName, fn: Function) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName]!.length; i++) {
        if (this.events[eventName]![i] === fn) {
          this.events[eventName]?.splice(i, 1);
          break;
        }
      }
    }
  }

  public trigger<T = unknown>(eventName: EventName, data: T) {
    if (this.events[eventName]) {
      this.events[eventName]!.forEach(function (fn) {
        fn(data);
      });
    }
  }
}

export const emitter = new EventBus();
