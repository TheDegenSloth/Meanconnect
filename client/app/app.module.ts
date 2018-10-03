
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { TosComponent } from './tos/tos.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

@NgModule({
    declarations: [
        AppComponent,
        BlogComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        TosComponent,
        PrivacypolicyComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
            apiKey: 'Your_api_key'
        }),
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
