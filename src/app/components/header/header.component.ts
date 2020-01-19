import { Component, OnInit } from '@angular/core';
import { ScrollerService } from '../../services/scroller/scroller.service';
import { ShoppingcartService } from 'src/app/services/shopingcart/shopingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public padding: any;
  public summ: any;

  constructor(
    private scroller: ScrollerService,
    private shoppingcart: ShoppingcartService,
  ) { }

  ngOnInit() {
    this.shoppingcart.getData()
      .subscribe(data => {
        let summ = 0;
        for (let i = 0; i < data.length; i++) {
          summ += data[i].price * data[i].quantity;
        }
        this.summ = summ;
      })
  }

  updateData(value: string) {
    this.scroller.updateData(value);
  }

  onResize(event) {
    if (event.target.innerWidth <= 640) {
    } else if (event.target.innerWidth > 640 && event.target.innerWidth <= 900) {
    } else if (event.target.innerWidth > 900) {
    }
  } 
}
