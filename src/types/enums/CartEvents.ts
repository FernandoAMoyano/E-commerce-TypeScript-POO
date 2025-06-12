// Enums para eventos (más type-safe que strings)
export enum CartEvents {
  ITEM_ADDED = 'cart:item-added',
  ITEM_REMOVED = 'cart:item-removed',
  QUANTITY_UPDATED = 'cart:quantity-updated',
  CART_UPDATED = 'cart:updated',
  CART_CLEARED = 'cart:cleared',
}
