import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: any = '';
  bookName: string = '';
  @Input() cartCount: any;
  @Output() booksList = new EventEmitter<any>();
  @Output() bookData = new EventEmitter<any>();
  // isLogedout: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.login();
  }
  onLogOut() {
    this.booksList.emit(true);
    localStorage.clear();
    this.login();
  }
  onBookList() {
    this.bookData.emit(this.bookName);
  }

  login() {
    this.userName = localStorage.getItem('name');
  }
}
