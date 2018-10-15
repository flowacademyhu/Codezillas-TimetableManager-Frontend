import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { DxSchedulerComponent } from 'devextreme-angular';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements AfterViewInit {

  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

  classes: Class[] = [];
  subjects: Subject[] = [];
  currentDate = Date.now();

  constructor(private classService: ClassService, private subjectService: SubjectService) {
  }

  ngAfterViewInit() {
    this.classService.getClasses(
      this.scheduler.instance.getStartViewDate(),
      this.scheduler.instance.getEndViewDate()
      ).subscribe((res) => {
      this.classes = res;
    });
    this.subjectService.getSubjects().subscribe((res) => {
      this.subjects = res;
    });
  }

  onAppointmentFormCreated(classes) {
    const that = this,
      form = classes.form,
      // subjectInfo = that.getSubjectById(classes.appointmentData.subjectId) || {},
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

  // cls refers to class
  editDetails(cls) {
    this.scheduler.instance.showAppointmentPopup(this.getDataObj(cls), false);
  }

  getDataObj(objData) {
    for (let i = 0; i < this.classes.length; i++) {
      return this.classes[i];
    }
    return null;
  }

  getSubjectById(id) {
    for (let i = 0; i < this.subjects.length; i++) {
      if (id === this.subjects[i].id) {
        return this.subjects[i];
      }
    }
    return 'name not found';
}
}
