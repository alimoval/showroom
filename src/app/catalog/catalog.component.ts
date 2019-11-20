import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  matMenuTriggerFor = ''
  
  constructor() { }

  ngOnInit() {
    try {
      this.initCatalog()
    } catch (error) {
      console.error(error)
      throw error
    }
    
  }

  public initCatalog = () => {}

}
