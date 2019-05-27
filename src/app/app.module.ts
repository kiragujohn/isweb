import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { CalendarModule } from 'angular-calendar';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageUploadModule } from 'angular2-image-upload';
import { BsDropdownModule, CollapseModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from './modules/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const jwtConf = {
  config: {
    throwNoTokenError: false,
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost:8080'],
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot(),
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    NgxCaptchaModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ImageUploadModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot(jwtConf),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
  ],
  providers: [
    TranslateService],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
  }
}
