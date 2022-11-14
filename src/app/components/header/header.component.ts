import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: any = '';
  searchBookName: string = '';
  @Input() cartCount: any;
  @Output() checkLoggedOut = new EventEmitter<boolean>();
  @Output() searchBookData = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.login();
  }
  onLogOut() {
    this.checkLoggedOut.emit(true);
    localStorage.clear();
    this.login();
  }

  onBookList() {
    this.searchBookData.emit(this.searchBookName);
  }

  login() {
    this.userName = localStorage.getItem('name');
  }
}
