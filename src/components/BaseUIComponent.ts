import { EventManager } from "../services/EventManager";
import { UIEvents } from "../types/enums/UIEvents";
import { IProduct } from "../types/interfaces/IProduct";
import { IProductRepository } from "../types/interfaces/IProductRepository";

export abstract class BaseUIComponent {
  protected eventManager: EventManager;

  constructor() {
    this.eventManager = EventManager.getInstance();
  }

  protected abstract initialize(): void;
  protected abstract setupEventListeners(): void;
}
