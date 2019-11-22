import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  position = {position: 'absolute',
     bottom: '0', width: '100%'}
  
  onResize(event) {
    if (event.target.innerHeight > 963) {
      this.footerToBottom()
    }
  }

  footerToBottom() {
    this.position.bottom = '0';
  }
}
