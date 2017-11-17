import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { XrpModule } from './xrp/xrp.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickListModule } from 'primeng/primeng';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [BrowserAnimationsModule, BrowserModule, HttpModule, AppRoutingModule,
    XrpModule, HomeModule, LoginModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
