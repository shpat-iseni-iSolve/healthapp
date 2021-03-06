import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LabComponent } from './lab/lab.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FileComponent } from './file/file.component';
import { ProgressComponent } from './progress/progress.component';
import { MakeAppointmentsComponent } from './makeAppointments/makeAppointments.component';
import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MaterialExampleModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LabComponent,
        AppointmentsComponent,
        MakeAppointmentsComponent,
        FileComponent,
        ProgressComponent,

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { };