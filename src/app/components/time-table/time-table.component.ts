import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import Query from 'devextreme/data/query';
import { Subject } from '../../models/subject.model';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { DxSchedulerComponent } from 'devextreme-angular';
@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent {

  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

  classes: Class[];
  subjects: Subject[];
  currentDate: Date = new Date(2018, 9, 8);

  constructor(classService: ClassService) {
    classService.getClasses().subscribe((res) => {
      this.classes = res;
    });
    this.subjects = classService.getSubjects();
  }

  onAppointmentFormCreated(classes) {
    const that = this,
      form = classes.form,
      subjectInfo = that.getSubjectById(classes.appointmentData.subjectId) || {},
      startDate = classes.appointmentData.startDate;

    form.option('items', [{
      label: {
        text: 'Subject'
      },
      editorType: 'dxSelectBox',
      dataField: 'subjectId',
      editorOptions: {
        items: that.subjects,
        displayExpr: 'text',
        valueExpr: 'id',
      }
    }, {
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      }
    }, {
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        readOnly: true
      }
    }]);
  }

  editDetails(showtime) {
    this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
  }

  getDataObj(objData) {
    for (let i = 0; i < this.classes.length; i++) {
      return this.classes[i];
    }
    return null;
  }

  getSubjectById(id) {
    return Query(this.subjects).filter(['id', '=', id]).toArray()[0];
  }

}
