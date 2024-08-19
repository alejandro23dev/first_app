import { Component, OnInit } from '@angular/core';
import { ClientLogService } from '../client-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string = '';
  userlog :any;

  constructor(
    private clientLogService: ClientLogService,
    private router: Router
  ) {
	console.log(this.clientLogService.getClientLog());
	this.userlog = this.clientLogService.getClientLog();
	this.email = this.userlog.email;
  }

  ngOnInit() {
    console.log('Profile');
  }

  navigateToMain() {
    this.router.navigate(['/main']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
