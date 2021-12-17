import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';

import { HomeComponent } from './home';
import { LabComponent } from './lab/lab.component';
import { MakeAppointmentsComponent } from './makeAppointments/makeAppointments.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },
    { path: 'lab', component: LabComponent, canActivate: [AuthGuard]},
    { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
    { path: 'make-appointment', component: MakeAppointmentsComponent, canActivate: [AuthGuard]},
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
