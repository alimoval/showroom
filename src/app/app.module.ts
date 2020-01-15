import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ShoppingCartModule } from 'ng-shopping-cart';

import { CatalogComponent } from './components/catalog/catalog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { CartComponent, CartModal } from './components/cart/cart.component';

import { ProductService } from './services/product/product.service';
import { ScrollerService } from './services/scroller/scroller.service';
import { ShoppingcartService } from './services/shopingcart/shopingcart.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    FooterComponent,
    HeaderComponent,
    ProductDetailsPageComponent,
    CartComponent,
    CartModal,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ShoppingCartModule.forRoot({ // <-- Add the cart module to your root module
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    }),
  ],
  providers: [
    ProductService,
    ScrollerService,
    ShoppingcartService,
  ],
  entryComponents: [
    CartModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
