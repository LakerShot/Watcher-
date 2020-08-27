import { MaterialService } from './../shared/classes/material.service';
import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }
  
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      }, (error) => {
        const {message} = error.error
        MaterialService.toast(message)
        this.form.get('password').reset();
        this.form.enable()
      })
  }

}
