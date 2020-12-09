import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedInAuthGuardService } from './services/logged-in-auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'register', 
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [LoggedInAuthGuardService]

  },
  {
    path: 'simulator', 
    component: SimulatorComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
