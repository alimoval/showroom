import { TestBed } from '@angular/core/testing';

import { ShoppingcartService } from './shopingcart.service';

describe('ShopingcartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingcartService = TestBed.get(ShoppingcartService);
    expect(service).toBeTruthy();
  });
});
