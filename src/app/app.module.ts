import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DxSchedulerModule, DxSchedulerComponent, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
 import { TimeTableComponent } from './components/time-table/time-table.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { ClassService } from './services/class.service';
import { SubjectComponent } from './components/subject/subject.component';
import { GroupComponent } from './components/group/group.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'regisztracio', component: RegistrationComponent },
  { path: 'orarend', component: ProfileComponent },
  { path: 'tantargyak', component: SubjectComponent },
  { path: 'csapatok', component: GroupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
     TimeTableComponent,
    RegistrationComponent,
    SidebarComponent,
    SubjectComponent,
    GroupComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxButtonModule,
  ],
  providers: [AuthService, ClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
