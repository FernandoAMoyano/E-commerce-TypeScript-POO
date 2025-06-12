import { ICartItem } from './ICartItem';
import { IProduct } from './IProduct';

export interface ICartManager {
  addItem(product: IProduct, quantity?: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, newQuantity: number): void;
  getItems(): ICartItem[];
  getTotalPrice(): number;
  clear(): void;
}
