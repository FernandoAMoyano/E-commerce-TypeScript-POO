interface IProduct {
  id: number;
  title: string;
  price: number;
  image?: string;
}

interface ICartItem extends IProduct {
  quantity: number;
}

interface IEventListener<T = any> {
  (data: T): void;
}

interface IObserver {
  update(event: string, data: any): void;
}

interface ICartManager {
  addItem(product: IProduct, quantity?: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, newQuantity: number): void;
  getItems(): ICartItem[];
  getTotalPrice(): number;
  clear(): void;
}

interface IProductRepository {
  getAllProducts(): IProduct[];
  getProductById(id: number): IProduct | undefined;
}

// Enums para eventos (más type-safe que strings)
enum CartEvents {
  ITEM_ADDED = "cart:item-added",
  ITEM_REMOVED = "cart:item-removed",
  QUANTITY_UPDATED = "cart:quantity-updated",
  CART_UPDATED = "cart:updated",
  CART_CLEARED = "cart:cleared",
}

enum UIEvents {
  PRODUCT_CLICKED = "ui:product-clicked",
  CART_TOGGLED = "ui:cart-toggled",
}
