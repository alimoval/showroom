import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'product/:id', component: ProductDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
