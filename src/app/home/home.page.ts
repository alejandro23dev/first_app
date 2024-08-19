import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClientLogService } from '../client-log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [HttpClient],
})
export class HomePage implements OnInit {
  user = {} as User;
  credentialSave = {};
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private clientLogService: ClientLogService
  ) {
    this.initStorage();
	this.clientLogService.setClientLog('');
  }

  ngOnInit() {
    console.log('login');
  }

  async initStorage() {
    await this.storage.create();
    this.credentialSave = [
      this.storage.get('email'),
      this.storage.get('password'),
    ];
    console.log(this.credentialSave);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  async login(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: 'Cargando',
      });
      await loader.present();

      try {
        await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .then((data) => {
            if (data.user) {
              this.clientLogService.setClientLog({
                uid: data.user.uid,
                email: data.user.email,
              });
              console.log(data.user);
            }
            this.storage.set('email', user.email);
            this.storage.set('password', user.password);
            this.navCtrl.navigateRoot('main');
          });
      } catch (e: any) {
        e.message = 'Error al registrarse';
        let errorMessage = e.message || e.getLocalizedMessage();

        console.log(e);
        if (e.code == 'auth/invalid-credential')
          this.showToast('Rectifique sus credenciales');
        else if (e.code == 'auth/invalid-email')
          this.showToast('Correo electrónico incorrecto');
        else this.showToast(errorMessage);
      }

      await loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast('Ingrese un email');
      return false;
    }

    if (!this.user.password) {
      this.showToast('Ingrese una contraseña');
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 2500,
      })
      .then((toastData) => toastData.present());
  }
}
