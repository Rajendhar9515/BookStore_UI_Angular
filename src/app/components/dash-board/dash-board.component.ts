import { Component, OnInit } from '@angular/core';
import { BookStoreService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  token: any;
  cartCount: number = 0;
  p: number = 0;
  wishlist: any;
  bookName: string = '';
  isLoggedout: boolean = false;
  cartIds: any = [];
  dropDownList = [
    'Sort by relevence',
    'Price:Low to High',
    'Price:High to Low',
    'Newest Arrivals',
  ];

  dataList: any;
  sortingPrice: any;
  cartData: any = [];

  constructor(
    private service: BookStoreService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getBooksDetails();
    this.token = localStorage.getItem('token');
    if (!this.token) return;
    this.getCartData();
  }

  getBooksDetails() {
    this.service.getBookStoreData().subscribe((data) => {
      this.dataList = data.data;
      if (!this.cartIds) return;
      this.modifyBookData();
    });
  }

  onSortByPrice(event: any) {
    if (event.target.value === 'Price:Low to High') {
      this.service.lowToHighPrice().subscribe((data) => {
        this.dataList = data.data;
        this.modifyBookData();
      });
    } else if (event.target.value === 'Price:High to Low') {
      this.service.highToLowPrice().subscribe((data) => {
        this.dataList = data.data;
        this.modifyBookData();
      });
    } else {
      this.getBooksDetails();
    }
  }

  addToCart(bookId: number) {
    if (!this.token) return;
    const data = {
      book_id: bookId,
      quantity: 1,
    };
    this.cartService.addToCart(this.token, data).subscribe((resp) => {
      this.cartData = [resp.data.bookDetails.id];
      this.getCartData();
    });
  }

  getCartData() {
    this.cartService.cartdata(this.token).subscribe((resp) => {
      this.cartCount = resp.data.length;
      this.cartIds = resp.data.map((item: any) => item.bookDetails.id);
      this.modifyBookData();
    });
  }

  onWishlist(bookId: number) {
    this.wishlistService.addWishlist(this.token, bookId).subscribe((resp) => {
      this.wishlist = resp.data;
    });
  }

  emittedData(data: any) {
    this.isLoggedout = data;
    if (this.isLoggedout) {
      this.dataList.map((obj: any) => {
        obj.isAddedToCart = false;
        return obj;
      });
      this.cartCount = 0;
    }
  }

  onReceiveBookName(data: any) {
    this.bookName = data;
  }

  modifyBookData() {
    this.dataList.map((obj: any) => {
      obj.isAddedToCart = this.cartIds.includes(obj.id);
      return obj;
    });
  }
}
