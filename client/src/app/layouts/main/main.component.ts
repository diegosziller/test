import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationError, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(private titleService: Title, private router: Router) {}

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }
}
