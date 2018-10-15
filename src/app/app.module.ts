import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DxSchedulerModule, DxSchedulerComponent, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'primeng/colorpicker';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
 import { TimeTableComponent } from './components/time-table/time-table.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { ClassService } from './services/class.service';
import { GroupService } from './services/group.service';
import { UserService } from './services/user.service';
import { SubjectComponent } from './components/subject/subject.component';
import { GroupComponent } from './components/group/group.component';
import { ButtonColorDirective } from './button-color.directive';
import { UsersComponent } from './components/users/users.component';
import { SubjectService } from './services/subject.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'timetable', component: TimeTableComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'groups/:id/:name', component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimeTableComponent,
    RegistrationComponent,
    SidebarComponent,
    SubjectComponent,
    GroupComponent,
    ButtonColorDirective,
    UsersComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule,
    DxSchedulerModule,
    DxTemplateModule,
    DxButtonModule,
    NgbModule,
    ColorPickerModule,
    MultiSelectModule,
    InputTextModule
  ],
  providers: [AuthService, ClassService, GroupService, SubjectService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
