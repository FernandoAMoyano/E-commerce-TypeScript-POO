import { ProductListComponent } from "./BaseUIComponent";
import { CartComponent } from "./CartComponent";
import { CartManager } from "./cartManager";
import { CheckoutComponent } from "./CheckoutComponent";
import { EventManager } from "./EventManager";
import {
  CartEvents,
  ICartItem,
  IProduct,
  IProductRepository,
  UIEvents,
} from "./src/types/interfaces/IProduct";
import { NotificationService } from "./NotificationService";
import { ProductRepository } from "./ProductRepository";

class ApplicationController {
  private cartManager: CartManager;
  private productRepository: IProductRepository;
  private eventManager: EventManager;
  private productListComponent?: ProductListComponent;
  private cartComponent?: CartComponent;
  private checkoutComponent?: CheckoutComponent;

  constructor() {
    this.cartManager = CartManager.getInstance();
    this.productRepository = new ProductRepository();
    this.eventManager = EventManager.getInstance();

    this.initializeServices();
    this.initializeComponents();
    this.setupApplicationEventListeners();
  }

  private initializeServices(): void {
    NotificationService.initialize();
  }

  private initializeComponents(): void {
    // Initialize components based on current page
    if (document.getElementById("productList")) {
      this.productListComponent = new ProductListComponent(
        this.productRepository
      );
      this.cartComponent = new CartComponent(this.cartManager);
      this.setupCartToggle();
    }

    if (document.querySelector(".checkout__items")) {
      this.checkoutComponent = new CheckoutComponent();
    }
  }

  private setupApplicationEventListeners(): void {
    this.eventManager.subscribe<IProduct>(
      UIEvents.PRODUCT_CLICKED,
      (product) => {
        this.cartManager.addItem(product, 1);
      }
    );

    this.eventManager.subscribe<{ product: IProduct; quantity: number }>(
      CartEvents.ITEM_ADDED,
      (data) => {
        NotificationService.showSuccess(
          `${data.product.title} agregado al carrito`
        );
      }
    );

    this.eventManager.subscribe<ICartItem>(CartEvents.ITEM_REMOVED, (item) => {
      NotificationService.showSuccess("Producto eliminado del carrito");
    });
  }

  private setupCartToggle(): void {
    const cartOpenButton = document.querySelector(".cart__openButton");
    const cartSidebar = document.querySelector(".cart__sidebar");
    const cartCloseButton = document.querySelector(".cart__close");

    if (cartOpenButton && cartSidebar) {
      cartOpenButton.addEventListener("click", () => {
        cartSidebar.classList.add("cart__sidebar--open");
      });
    }

    if (cartCloseButton && cartSidebar) {
      cartCloseButton.addEventListener("click", () => {
        cartSidebar.classList.remove("cart__sidebar--open");
      });
    }
  }
}
