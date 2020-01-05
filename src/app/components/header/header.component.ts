import { Component, OnInit } from '@angular/core';
import { ScrollerService } from '../../services/scroller/scroller.service';
import { ShoppingcartService } from 'src/app/services/shopingcart/shopingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public summ: any;

  constructor(
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
  ) { }

  ngOnInit() {
    this.shoppingcart.getSumm()
      .subscribe(data => {
        this.summ = data;
        console.log('this.summ', this.summ);
      })
  }

  updateData(value: string) {
    this.scroller.updateData(value);
  }
}
