import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['timetable']);
  }

  goToSubjects() {
    this.router.navigate(['subjects']);
  }

  goToGroups() {
    this.router.navigate(['groups']);
  }

  logout() {
    this.authService.logout();
  }

}
