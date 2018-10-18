import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { DxSchedulerComponent } from 'devextreme-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements /* OnInit, */ AfterViewInit {

  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

  closeResult: String;
  classes: Class[] = [];
  subjects: Subject[] = [];
  currentDate = Date.now();
  newClass = {};
  groups: Group[] = [{
    id: 1,
    name: 'Alfa',
    userIds: [1],
    classIds: [1]
  }];
  selectedGroup: Group;

  constructor(private classService: ClassService, private subjectService: SubjectService, private modalService: NgbModal) {
  }

  ngAfterViewInit() {
    this.classService.getClasses(
      this.scheduler.instance.getStartViewDate(),
      this.scheduler.instance.getEndViewDate(),
      this.selectedGroup.id
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
        text: 'Tantárgy'
      },
      editorType: 'dxSelectBox',
      dataField: 'subjectId',
      editorOptions: {
        items: that.subjects,
        displayExpr: 'text',
        valueExpr: 'id',
      }
    }, {
      label: {
        text: 'Mentor'
      },
      editorType: 'dxSelectBox',
      dataField: 'userId',
      editorOptions: {
        items: that.subjects,
        displayExpr: 'text',
        valueExpr: 'id',
      }
    }, {
      label: {
        text: 'Ettől'
      },
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
      }
    }, {
      label: {
        text: 'Eddig'
      },
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime'
      }
    }
  ]);
  }

  onAppointmentAdding(event) {
    console.log(event.appointmentData);
  }

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

  addNew(cls) {
    this.modalService.open(cls, { centered: true }).result.then((result) => {
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
