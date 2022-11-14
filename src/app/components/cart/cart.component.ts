import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any;
  token: any;
  address: any;
  isExpanded: boolean = false;
  isExpandedSummary: boolean = false;
  userDetails: any = {};

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.token = localStorage.getItem('token');
    this.cartService.cartdata(this.token).subscribe((resp) => {
      this.cartData = resp.data;
      this.userDetails = this.cartData[0].userDetails;
    });
  }

  onOrder() {
    this.token = localStorage.getItem('token');
    const data = {
      address: '2-6-167 srinivasa road',
    };
    this.orderService.placeOrder(this.token, data).subscribe((resp) => {
      this.router.navigateByUrl('/order');
    });
  }
  onPlaceOrder() {
    this.isExpanded = true;
  }

  onContinue() {
    this.isExpandedSummary = true;
    this.userService
      .updateUserData(this.token, this.userDetails)
      .subscribe((resp) => {});
  }

  onRemove(cartID: any) {
    this.cartService.removeCart(cartID, this.token).subscribe((data) => {
      const cart = this.cartData.filter((item: any) => item.id !== cartID);
      this.cartData = cart;
    });
  }

  onIncriment(index: number, quantity: number, cartId: number) {
    if (quantity <= this.cartData[index].quantity) return;
    this.cartData[index].quantity = this.cartData[index].quantity + 1;
    this.updateCart(cartId, this.cartData[index].quantity);
  }

  onDecriment(index: number, cartId: number) {
    if (this.cartData[index].quantity <= 1) return;
    this.cartData[index].quantity = this.cartData[index].quantity - 1;
    this.updateCart(cartId, this.cartData[index].quantity);
  }

  updateCart(cartId: number, quantity: number) {
    this.cartService
      .updateBookQuantity(cartId, quantity, this.token)
      .subscribe((data) => {
        this.getCartData();
      });
  }
}
