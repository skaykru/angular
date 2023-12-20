import { SharedModule } from './shared/shared.module';
import { NotAuthenticatedGuard } from './modules/auth/guards/not-authenticated.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlreadyAuthenticatedGuard } from './modules/auth/guards/already-authenticated.guard';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { LogInterceptor } from './shared/interceptors/log.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavigationComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    NotAuthenticatedGuard,
    AlreadyAuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
