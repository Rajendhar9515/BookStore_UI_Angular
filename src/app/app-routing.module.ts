import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { OrderComponent } from './components/order/order.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashBoard', pathMatch: 'full' },
  { path: 'dashBoard', component: DashBoardComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
