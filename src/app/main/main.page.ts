import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  userLog: string = '';

  constructor(private storage: Storage, private router: Router) {
  }

  ngOnInit() {
    console.log('Main');
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
