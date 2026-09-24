import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.list().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error =
          'Não foi possível carregar os produtos. ' +
          'Se estiver offline, abra a lista online pelo menos uma vez.';
        this.loading = false;
      },
    });
  }

  remove(product: Product): void {
    if (!navigator.onLine) {
      this.error =
        'A exclusão precisa de conexão neste exemplo básico.';
      return;
    }

    const confirmed = window.confirm(
      `Deseja excluir o produto "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.productService.remove(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(
          (item) => item.id !== product.id
        );
      },
      error: () => {
        this.error = 'Não foi possível excluir o produto.';
      },
    });
  }
}
