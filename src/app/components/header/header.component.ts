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
      this.padding = { 'padding': '3vh 2vh 0.1vh 0vh!important' };
  }

  updateData(value: string) {
    this.scroller.updateData(value);
  }

  onResize(event) {
    if (event.target.innerWidth <= 640) {
      console.log(event.target.innerWidth);
    } else if (event.target.innerWidth > 640 && event.target.innerWidth <= 900) {
      this.padding = '2vh 4vh 0.1vh 0vh'
      console.log(event.target.innerWidth);
    } else if (event.target.innerWidth > 900) {
      this.padding = '3vh 6vh 0.1vh 0vh'
      console.log(event.target.innerWidth);
    }
  } 
}
