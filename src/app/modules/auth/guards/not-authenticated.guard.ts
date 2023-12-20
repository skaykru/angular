import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { switchMap, Observable, Subscriber, catchError } from 'rxjs';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    if (this.authServ.isAuthenticated()) {
      return true;
    }

    return this.authServ.getCurrentUser().pipe(
      switchMap(() => {
        return new Observable((subscriber: Subscriber<boolean>) => {
          subscriber.next(true);
        });
      }),
      catchError(() => {
        return new Observable((subscriber: Subscriber<boolean>) => {
          this.router.navigate(['/']);
          subscriber.next(false);
        });
      })
    );
  }
}
