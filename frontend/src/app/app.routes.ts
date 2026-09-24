import { Routes } from '@angular/router';

import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
  {
    path: 'produtos',
    component: ProductListComponent,
  },
  {
    path: 'produtos/novo',
    component: ProductFormComponent,
  },
  {
    path: 'produtos/:id/editar',
    component: ProductFormComponent,
  },
  {
    path: '**',
    redirectTo: 'produtos',
  },
];
