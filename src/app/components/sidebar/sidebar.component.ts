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
    this.router.navigate(['orarend']);
  }

  goToSubjects() {
    this.router.navigate(['tantargyak']);
  }

  goToGroups() {
    this.router.navigate(['csapatok']);
  }

  logout() {
    this.authService.logout();
  }

}
