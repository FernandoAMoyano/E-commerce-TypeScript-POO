import { ICartItem } from "../types/interfaces/ICartItem";

export class StorageService {
  private static readonly CART_KEY = "cart";
  private static readonly CHECKOUT_KEY = "checkoutCart";

  public static saveCart(items: ICartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  public static loadCart(): ICartItem[] {
    const data = localStorage.getItem(this.CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  public static saveCheckoutCart(items: ICartItem[]): void {
    localStorage.setItem(this.CHECKOUT_KEY, JSON.stringify(items));
  }

  public static loadCheckoutCart(): ICartItem[] {
    const data = localStorage.getItem(this.CHECKOUT_KEY);
    return data ? JSON.parse(data) : [];
  }

  public static clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }
}
