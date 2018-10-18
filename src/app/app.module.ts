import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DxSchedulerModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'primeng/colorpicker';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ClassService } from './services/class.service';
import { GroupService } from './services/group.service';
import { UserService } from './services/user.service';
import { SubjectComponent } from './components/subject/subject.component';
import { GroupComponent } from './components/group/group.component';
import { ButtonColorDirective } from './button-color.directive';
import { UsersComponent } from './components/users/users.component';
import { SubjectService } from './services/subject.service';
import { SpringbootInterceptor } from './services/interceptor.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'timetable', component: TimeTableComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/:id/:name', component: UsersComponent, canActivate: [AuthGuard] }
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
    InputTextModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [AuthGuard, AuthService, ClassService, GroupService,
    SubjectService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: SpringbootInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
