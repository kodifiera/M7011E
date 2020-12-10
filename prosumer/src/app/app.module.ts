import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimulatorInfoComponent } from './components/simulator-info/simulator-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

export function tokenGetter() {
  return localStorage.getItem("auth-token");
}
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SimulatorInfoComponent,
    RegisterComponent,
    SimulatorComponent,
    LoginComponent,
    NewUserComponent,
    ImageUploadComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
      allowedDomains: ["http://localhost:4001", "http://localhost:4000"]
      },
    }),
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
