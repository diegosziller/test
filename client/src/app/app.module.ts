import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { fontAwesomeIcons } from './core/config/font-awesome-icons';
import { httpInterceptorProviders } from './core/interceptor';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    NgxWebstorageModule.forRoot({caseSensitive: true})
  ],
  declarations: [NavbarComponent, MainComponent, FooterComponent],
  providers: [httpInterceptorProviders, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [MainComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary) {
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
