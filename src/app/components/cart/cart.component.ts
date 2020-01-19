import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { of, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ScrollerService } from 'src/app/services/scroller/scroller.service';
import { ShoppingcartService } from 'src/app/services/shopingcart/shopingcart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit {
  public cart: any;
  public form: FormGroup;
  public colsVar: any;
  public rowsVar: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
    public dialog: MatDialog,
  ) {
    this.form = null;
    this.colsVar = 6;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.form = this.formBuilder.group(this.initForm());

    this.shoppingcart.getData()
      .pipe(switchMap(data => {
        this.cart = data;
        this.rowsVar = this.cart.length * 10;
        return this.scroller.getData()
      }))
      .subscribe(data => {
        if (this.router.url !== '/') {
          this.router.navigate(['/']).then(res => {
            setTimeout(() => {
              this.scrollToCategory(data);
            }, 400);
          });
        }
      })
  }

  private initForm = () => {
    let form: object;
    form = {
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      street: ['', [Validators.required]],
      house: ['', [Validators.required]],
      flat: ['', [Validators.required]],
      comment: [''],
    };

    return form;
  }

  private showModal(res) {
    const dialogRef = this.dialog.open(CartModal, {
      width: '350px',
      data: { value: res }
    });
  }

  public submit = () => {
    if (this.form.valid) {
      of(this.form.value)
        .pipe(switchMap(form => forkJoin([of(form), of(this.cart)])))
        .subscribe(
          ([form, cart]) => {
            this.showModal(form);
            this.form.reset();
            this.shoppingcart.removeCartItems();
            this.form.markAsPristine();
            this.form.markAsUntouched();
            console.log('[ ORDER SUCCESS ]', form, cart);
          },
          err => {
            console.log('[ ORDER ERROR ]', err);
          }
        );
    }
  }

  scrollToCategory(data) {
    if (this.router.url === '/') {
      const elem = document.getElementById(data);
      const yOffset = -120;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  onClickRemoveButton(product) {
    this.shoppingcart.removeQuantity(product)
  }

  onClickAddButton(product) {
    if (product.quantity > 0) {
      this.shoppingcart.addQuantity(product)
    } else {
      this.shoppingcart.addItem(product);
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 690) {
      this.colsVar = 6;
    } else if (event.target.innerWidth > 690) {
      this.colsVar = 3;
    }

  }
}

@Component({
  selector: 'cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModal {

  constructor(
    public dialogRef: MatDialogRef<CartModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

}