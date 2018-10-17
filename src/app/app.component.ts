import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timetable';
  
  private hideNavbar = false;
  
  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = this._router.url === '/' || this._router.url === '/registration';
      }
    })
  }
}
