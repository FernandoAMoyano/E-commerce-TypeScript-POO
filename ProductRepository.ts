import { IProduct, IProductRepository } from "./interfaces/interfaces";

export class ProductRepository implements IProductRepository {
  private readonly products: IProduct[] = [
    {
      id: 1,
      title: "Curso de JavaScript",
      price: 3600.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
    {
      id: 2,
      title: "Curso de Angular",
      price: 2500.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
    {
      id: 3,
      title: "Curso de SQL",
      price: 1200.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
    {
      id: 4,
      title: "Curso de React Js",
      price: 5000.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
    {
      id: 5,
      title: "Curso de Diseño",
      price: 2000.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
    {
      id: 6,
      title: "Curso de Excel",
      price: 1400.0,
      image:
        "https://www.solumex.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
    },
  ];

  public getAllProducts(): IProduct[] {
    return [...this.products];
  }

  public getProductById(id: number): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }
}
