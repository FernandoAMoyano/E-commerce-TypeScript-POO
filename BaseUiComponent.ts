import { EventManager } from "./EventManager";
import {
  IProduct,
  IProductRepository,
  UIEvents,
} from "./interfaces/interfaces";

abstract class BaseUIComponent {
  protected eventManager: EventManager;

  constructor() {
    this.eventManager = EventManager.getInstance();
  }

  protected abstract initialize(): void;
  protected abstract setupEventListeners(): void;
}

export class ProductListComponent extends BaseUIComponent {
  private container: HTMLElement | null = null;

  constructor(private productRepository: IProductRepository) {
    super();
    this.container = document.getElementById("productList");
    this.initialize();
  }

  protected initialize(): void {
    if (this.container) {
      this.render();
      this.setupEventListeners();
    }
  }

  protected setupEventListeners(): void {
    if (this.container) {
      this.container.addEventListener(
        "click",
        this.handleProductClick.bind(this)
      );
    }
  }

  private render(): void {
    if (!this.container) return;

    const products = this.productRepository.getAllProducts();

    products.forEach((product) => {
      const productCard = this.createProductCard(product);
      this.container!.appendChild(productCard);
    });
  }

  private createProductCard(product: IProduct): HTMLElement {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id.toString());

    productCard.innerHTML = `
      <div>
        <img class="product__image" src="${product.image}" alt="${
      product.title
    }" />
      </div>
      <div>
        <h5 class="product__title">${product.title}</h5>
        <p class="product__price">${product.price.toFixed(2)}</p>
      </div>
      <button class="product__add">Agregar</button>
    `;

    return productCard;
  }

  private handleProductClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains("product__add")) {
      const card = target.closest(".product") as HTMLElement;
      const productId = parseInt(card.getAttribute("data-id") || "0");
      const product = this.productRepository.getProductById(productId);

      if (product) {
        this.eventManager.emit(UIEvents.PRODUCT_CLICKED, product);
      }
    }
  }
}
