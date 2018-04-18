import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CoreModule } from './core/core.module';
import {AuthGuard} from './core/auth.guard';
import { AgmCoreModule } from '@agm/core';
import { 
   
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule } from '@angular/material';

  import { FormsModule } from '@angular/forms';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';

export const firebaseConfig = {
  apiKey: "AIzaSyCTw97aQe6ieoeyMa8vcFAxdmCPGaDQcAU",
  authDomain: "bloodapp-441da.firebaseapp.com",
  databaseURL: "https://bloodapp-441da.firebaseio.com",
  projectId: "bloodapp-441da",
  storageBucket: "bloodapp-441da.appspot.com",
  messagingSenderId: "301499580098"
};

  const appRoutes: Routes = [
    { path: '', component: UserloginComponent,   data: { animation: 'userlogin' }},
    { path: 'userlogin', component: UserloginComponent,   data: { animation: 'userlogin' }},
    { path: 'userdashboard', component: UserdashboardComponent,   data: { animation: 'userdashboard' }},
    { path: 'dashboard', component: DashboardComponent,   data: { animation: 'dashboard' }},
  ];
@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    UserdashboardComponent,
    DashboardComponent
  ],
  imports: [FormsModule,MatFormFieldModule, 
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, AngularFirestoreModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ), CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdbtR5Xl4vvX3NagCtnYic-eAMmNjBnHU'
    })
  ],
  providers: [AngularFirestoreModule,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
