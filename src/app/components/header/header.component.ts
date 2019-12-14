import { Component, OnInit } from '@angular/core';
import { ScrollerService } from '../../services/scroller/scroller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private scroller: ScrollerService,
  ) { }

  ngOnInit() {
  }

  updateData(value: string) {
    this.scroller.updateData(value);
  }
}
