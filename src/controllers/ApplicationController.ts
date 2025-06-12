import { CartComponent } from "../components/CartComponent";
import { CartManager } from "../services/cartManager";
import { CheckoutComponent } from "../components/CheckoutComponent";
import { EventManager } from "../../EventManager";
import { NotificationService } from "../services/NotificationService";
import { IProductRepository } from "../types/interfaces/IProductRepository";
import { IProduct } from "../types/interfaces/IProduct";
import { UIEvents } from "../types/enums/UIEvents";
import { CartEvents } from "../types/enums/CartEvents";
import { ICartItem } from "../types/interfaces/ICartItem";
import { ProductListComponent } from "../components/BaseUIComponent";
import { ProductRepository } from "../repositories/ProductRepository";

export class ApplicationController {
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
