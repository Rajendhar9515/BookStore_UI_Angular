import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  token: any;
  wishlistData: any;
  wishlist: any;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this.token = localStorage.getItem('token');
    this.wishlistService.getWishlist(this.token).subscribe((resp) => {
      this.wishlistData = resp.data;
    });
  }
  onRemoveWishlist(wishlistId: number) {
    this.wishlistService
      .removeWishlist(this.token, wishlistId)
      .subscribe((resp) => {
        const wishlist = this.wishlistData.filter(
          (item: any) => item.id !== wishlistId
        );
        this.wishlistData = wishlist;
      });
  }
}
