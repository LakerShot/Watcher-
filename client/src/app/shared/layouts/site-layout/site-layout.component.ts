import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent  {
  
  links = [
    {url: '/overview', name: 'Overview', icon: 'star_border'},
    {url: '/analytics', name: 'Analytics', icon: 'assessment'},
    {url: '/history', name: 'History', icon: 'history'},
    {url: '/order', name: 'Add order', icon: 'assignment'},
    {url: '/categories', name: 'Categories', icon: 'apps'}
  ]
  
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
