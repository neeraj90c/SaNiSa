import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Common/Authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarClosed: boolean = false;
  authService = inject(AuthService)

  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

  router = inject(Router)
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      console.log(event);
    });
    // Initially set the sidebar to be open
    this.isSidebarClosed = false;
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMenu(event: Event): void {
    const arrowParent = (event.target as HTMLElement).closest('li'); // Select the closest parent <li> element
    arrowParent?.classList.toggle('showMenu');
  }

  Logout() {
    this.authService.SignOutUser()
  }
}