import { CartItem } from "../entities/CartItem";
import { CartEvents } from "../types/enums/CartEvents";
import { ICartItem } from "../types/interfaces/ICartItem";
import { ICartManager } from "../types/interfaces/ICartManager";
import { IProduct } from "../types/interfaces/IProduct";
import { EventManager } from "./EventManager";

import { StorageService } from "./StorageService";

export class CartManager implements ICartManager {
  private static instance: CartManager;
  private items: CartItem[] = [];
  private eventManager: EventManager;

  private constructor(
    private storageService: typeof StorageService = StorageService
  ) {
    this.eventManager = EventManager.getInstance();
    this.loadFromStorage();
  }

  public static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  private loadFromStorage(): void {
    const storedItems = this.storageService.loadCart();
    this.items = storedItems.map((item) => new CartItem(item, item.quantity));
  }

  private saveToStorage(): void {
    this.storageService.saveCart(this.items);
    this.eventManager.emit(CartEvents.CART_UPDATED, this.items);
  }

  public addItem(product: IProduct, quantity: number = 1): void {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.updateQuantity(existingItem.quantity + quantity);
    } else {
      this.items.push(new CartItem(product, quantity));
    }

    this.saveToStorage();
    this.eventManager.emit(CartEvents.ITEM_ADDED, { product, quantity });
  }

  public removeItem(productId: number): void {
    const itemToRemove = this.items.find((item) => item.id === productId);
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveToStorage();

    if (itemToRemove) {
      this.eventManager.emit(CartEvents.ITEM_REMOVED, itemToRemove);
    }
  }

  public updateQuantity(productId: number, newQuantity: number): void {
    const item = this.items.find((item) => item.id === productId);

    if (!item) {
      throw new Error(`Product with id ${productId} not found in cart`);
    }

    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }

    item.updateQuantity(newQuantity);
    this.saveToStorage();
    this.eventManager.emit(CartEvents.QUANTITY_UPDATED, {
      productId,
      newQuantity,
    });
  }

  public increaseQuantity(productId: number): void {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  public decreaseQuantity(productId: number): void {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  public getItems(): ICartItem[] {
    return this.items.map((item) => ({ ...item })); // Return copy
  }

  public getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  public getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  public clear(): void {
    this.items = [];
    this.saveToStorage();
    this.eventManager.emit(CartEvents.CART_CLEARED, null);
  }

  public prepareCheckout(): ICartItem[] {
    this.storageService.saveCheckoutCart(this.items);
    return this.getItems();
  }
}
