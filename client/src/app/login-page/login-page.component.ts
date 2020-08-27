import { MaterialService } from './../shared/classes/material.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription 

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      (params['registered']) ? MaterialService.toast('Now you can login') : 
      (params['accessDenied']) ? MaterialService.toast('The session has expired. Please login again') : ''
    })
  }

  onSubmit() {
    this.form.disable()
    // or this sintax => email: this.form.value.email, password: this.form.value.password
    this.aSub = this.auth.login(this.form.value).subscribe(() => this.router.navigate(['/analytics']),
        (error) => {
        const {message} = error.error
        MaterialService.toast(message)
        this.form.get('password').reset();
        this.form.enable()  
      }
    )
  }

  // call this method when component login destroied
  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe()
  }

}
