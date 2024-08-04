import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [HttpClient],
})
export class HomePage implements OnInit {
  user: string;
  password: string;
  isAlertOpen = false;
  alertButtons = ['Ok'];
  alertTitle: string = '';
  alertMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.user = '';
    this.password = '';
  }

  ngOnInit() {
    console.log('Home');
  }

  async verifyCredentials() {
    if (this.user != '' && this.password != '') {
      if (this.user == 'alejandro' && this.password == '123') {
        this.http
          .get('https://randomuser.me/api/')
          .subscribe((response: any) => {
            console.log(response.results[0]['name']['first'] + ' '+response.results[0]['name']['last']);
			this.router.navigate(['/main']);
          });
      } else {
        this.setOpen(true, 'Atención', 'Rectifique sus crendenciales');
      }
    } else {
      this.setOpen(true, 'Atención', 'Campos Requeridos');
    }
  }

  setOpen(isOpen: boolean, title: any = '', msg: any = '') {
    this.isAlertOpen = isOpen;
    this.alertTitle = title;
    this.alertMsg = msg;
  }
}
