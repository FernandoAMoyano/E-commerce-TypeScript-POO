import { IProduct } from './IProduct';

export interface IProductRepository {
  getAllProducts(): IProduct[];
  getProductById(id: number): IProduct | undefined;
}
