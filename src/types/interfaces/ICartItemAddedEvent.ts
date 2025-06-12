import { IProduct } from './IProduct';

export interface ICartItemAddedEvent {
  product: IProduct;
  quantity: number;
}
