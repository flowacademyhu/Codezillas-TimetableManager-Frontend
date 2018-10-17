import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { DxSchedulerComponent } from 'devextreme-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements AfterViewInit {

  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

  closeResult: string;
  classes: Class[] = [];
  subjects: Subject[] = [];
  currentDate = Date.now();
  newClass = {};

  constructor(private classService: ClassService, private subjectService: SubjectService, private modalService: NgbModal) {
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

  onOptionChanged(event) {
    if (event.name === 'currentDate') {
      this.scheduler.instance.repaint();
      this.classService.getClasses(
        this.scheduler.instance.getStartViewDate(),
        this.scheduler.instance.getEndViewDate()
        ).subscribe((res) => {
        this.classes = res;
     });
    }
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

  /*
  // cls refers to class
  editDetails(cls) {
    this.scheduler.instance.showAppointmentPopup(this.getDataObj(cls), false);
  }
*/

  delete(id) {
    this.classService.delete(id).subscribe(res =>
      this.ngAfterViewInit(), err => console.log(err));
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

  createClass() {
    this.classService.newClass(this.newClass)
      .subscribe(res => this.ngAfterViewInit(), err => console.log(err));
  }

  addNew(class) {
    this.modalService.open(class, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
