import { CartEvents, ICartItem } from "./interfaces/interfaces";
import { NotificationService } from "./NotificationService";
import { CartManager } from "./cartManager";
import { BaseUIComponent } from "./BaseUIComponent";

export class CartComponent extends BaseUIComponent {
  private itemsContainer: HTMLElement | null = null;
  private totalContainer: HTMLElement | null = null;
  private countElement: HTMLElement | null = null;
  private checkoutButton: HTMLElement | null = null;

  constructor(private cartManager: CartManager) {
    super();
    this.initializeElements();
    this.initialize();
  }

  private initializeElements(): void {
    this.itemsContainer = document.querySelector(".cart__items");
    this.totalContainer = document.querySelector(".cart__totalPrice");
    this.countElement = document.querySelector(".cart__item-count");
    this.checkoutButton = document.querySelector(".cart__checkout");
  }

  protected initialize(): void {
    this.setupEventListeners();
    this.updateDisplay();
  }

  protected setupEventListeners(): void {
    this.eventManager.subscribe<ICartItem[]>(
      CartEvents.CART_UPDATED,
      this.updateDisplay.bind(this)
    );

    if (this.itemsContainer) {
      this.itemsContainer.addEventListener(
        "click",
        this.handleCartAction.bind(this)
      );
    }

    if (this.checkoutButton) {
      this.checkoutButton.addEventListener(
        "click",
        this.handleCheckout.bind(this)
      );
    }
  }

  private updateDisplay(): void {
    this.updateCartItems();
    this.updateCartTotal();
    this.updateCartCount();
    this.toggleCheckoutButton();
  }

  private updateCartItems(): void {
    if (!this.itemsContainer) return;

    this.itemsContainer.innerHTML = "";
    const cartItems = this.cartManager.getItems();

    cartItems.forEach((item) => {
      const cartItemElement = this.createCartItemElement(item);
      this.itemsContainer!.appendChild(cartItemElement);
    });
  }

  private createCartItemElement(item: ICartItem): HTMLElement {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", item.id.toString());

    const subtotal = item.price * item.quantity;

    cartItem.innerHTML = `
      <div class="cart__item-title">${item.title}</div>
      <div>${item.price.toFixed(2)} x ${item.quantity} = $${subtotal.toFixed(
      2
    )}</div>
      <div>
        <button class="cart__increase">+</button>
        <button class="cart__decrease">-</button>
        <button class="cart__remove">Eliminar</button>     
      </div>  
    `;

    return cartItem;
  }

  private updateCartTotal(): void {
    if (this.totalContainer) {
      this.totalContainer.innerText = `Total: $${this.cartManager
        .getTotalPrice()
        .toFixed(2)}`;
    }
  }

  private updateCartCount(): void {
    if (!this.countElement) return;

    const totalItems = this.cartManager.getTotalItems();

    if (totalItems > 0) {
      this.countElement.innerText = totalItems.toString();
      this.countElement.style.display = "flex";
    } else {
      this.countElement.style.display = "none";
    }
  }

  private toggleCheckoutButton(): void {
    if (!this.checkoutButton) return;

    const cartItems = this.cartManager.getItems();
    this.checkoutButton.style.display =
      cartItems.length > 0 ? "inline-block" : "none";
  }

  private async handleCartAction(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    const cartItem = target.closest(".cart__item") as HTMLElement;

    if (!cartItem) return;

    const productId = parseInt(cartItem.getAttribute("data-id") || "0");

    if (target.classList.contains("cart__remove")) {
      const confirmed = await NotificationService.showConfirmation(
        "¿Estás seguro?",
        "Este producto será eliminado del carrito."
      );

      if (confirmed) {
        this.cartManager.removeItem(productId);
      }
    } else if (target.classList.contains("cart__increase")) {
      this.cartManager.increaseQuantity(productId);
    } else if (target.classList.contains("cart__decrease")) {
      this.cartManager.decreaseQuantity(productId);
    }
  }

  private handleCheckout(): void {
    this.cartManager.prepareCheckout();
    window.location.href = "checkout.html";
  }
}
