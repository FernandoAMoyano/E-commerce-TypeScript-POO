export interface IProduct {
  id: number;
  title: string;
  price: number;
  image?: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IEventListener<T = any> {
  (data: T): void;
}

export interface IObserver {
  update(event: string, data: any): void;
}

export interface ICartManager {
  addItem(product: IProduct, quantity?: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, newQuantity: number): void;
  getItems(): ICartItem[];
  getTotalPrice(): number;
  clear(): void;
}

export interface IProductRepository {
  getAllProducts(): IProduct[];
  getProductById(id: number): IProduct | undefined;
}

// Enums para eventos (más type-safe que strings)
export enum CartEvents {
  ITEM_ADDED = "cart:item-added",
  ITEM_REMOVED = "cart:item-removed",
  QUANTITY_UPDATED = "cart:quantity-updated",
  CART_UPDATED = "cart:updated",
  CART_CLEARED = "cart:cleared",
}

export enum UIEvents {
  PRODUCT_CLICKED = "ui:product-clicked",
  CART_TOGGLED = "ui:cart-toggled",
}
