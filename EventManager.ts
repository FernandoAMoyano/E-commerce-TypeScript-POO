import { IEventListener } from "./interfaces/interfaces";

export class EventManager {
  private static instance: EventManager;
  private listeners: Map<string, IEventListener[]> = new Map();

  private constructor() {}

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  public subscribe<T>(event: string, callback: IEventListener<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public unsubscribe<T>(event: string, callback: IEventListener<T>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  public emit<T>(event: string, data: T): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data));
    }
  }
}
