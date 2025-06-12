import { StorageService } from '../services/StorageService';
import { ICartItem } from '../types/interfaces/ICartItem';
import { BaseUIComponent } from './BaseUIComponent';

export class CheckoutComponent extends BaseUIComponent {
  private itemsContainer: HTMLElement | null = null;
  private totalContainer: HTMLElement | null = null;

  constructor() {
    super();
    this.itemsContainer = document.querySelector('.checkout__items');
    this.totalContainer = document.querySelector('.checkout__total');
    this.initialize();
  }

  protected initialize(): void {
    this.render();
    this.setupEventListeners();
  }

  protected setupEventListeners(): void {
    // No event listeners needed for checkout display
  }

  private render(): void {
    if (!this.itemsContainer || !this.totalContainer) return;

    const cart = StorageService.loadCheckoutCart();
    let total = 0;

    this.itemsContainer.innerHTML = '';

    if (cart.length === 0) {
      this.itemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
      this.totalContainer.innerHTML = '';
    } else {
      cart.forEach((item) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const itemElement = this.createCheckoutItemElement(item, subtotal);
        this.itemsContainer!.appendChild(itemElement);
      });

      this.totalContainer.innerHTML = `<strong>Total: $${total.toFixed(
        2
      )}</strong>`;
    }
  }

  private createCheckoutItemElement(
    item: ICartItem,
    subtotal: number
  ): HTMLElement {
    const div = document.createElement('div');
    div.className = 'checkout__item';
    div.innerHTML = `
      <div class="cart__item-title">${item.title}</div>
      <div>${item.price.toFixed(2)} x ${item.quantity} = $${subtotal.toFixed(
        2
      )}</div>
    `;
    return div;
  }
}
