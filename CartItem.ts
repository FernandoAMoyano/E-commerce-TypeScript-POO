import { ICartItem, IProduct } from "./interfaces/interfaces";

export class CartItem implements ICartItem {
  public id: number;
  public title: string;
  public price: number;
  public quantity: number;
  public image?: string;

  constructor(product: IProduct, quantity: number = 1) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.quantity = quantity;
    this.image = product.image;
  }

  public getSubtotal(): number {
    return this.price * this.quantity;
  }

  public updateQuantity(newQuantity: number): void {
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this.quantity = newQuantity;
  }
}
