import { AuthService } from './modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadingCurrentUser = false;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.loadingCurrentUser = true;

    this.authServ.getCurrentUser().subscribe({
      next: () => (this.loadingCurrentUser = false),
      error: () => (this.loadingCurrentUser = false),
    });
  }
}
