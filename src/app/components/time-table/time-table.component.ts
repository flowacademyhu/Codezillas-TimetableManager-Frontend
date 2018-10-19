import { Component, ViewChild, OnInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Class } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { SubjectService } from '../../services/subject.service';
import { DxSchedulerComponent } from 'devextreme-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;

  closeResult: String;
  mentorList: User[] = [];
  classes: Class[] = [];
  subjects: Subject[] = [];
  mentors: User[] = [];
  currentDate = Date.now();
  newClass: any = {
    id: null,
    comment: '',
    endDate: null,
    startDate: null,
    groupId: null,
    subjectId: null,
    mentorIds: []
  };
  groups: Group[] = [{
    id: 1,
    name: 'Alfa',
    userIds: [1],
    classIds: [1]
  }];
  selectedGroup: Group;
  selectedSubject: Subject;
  selectedMentor: User;

  constructor(private classService: ClassService, private subjectService: SubjectService, private groupService: GroupService,
    private userService: UserService, private modalService: NgbModal) {
  }

  filterMentors() {
    const subjectId = this.selectedSubject.id;
    this.subjectService.getMentors(subjectId).subscribe(data => {
      this.mentors = data;
    });
  }

  getMentorById(mentorId) {
    for (let i = 0; i < this.mentorList.length; i++) {
      if (mentorId === this.mentorList[i].id) {
        return this.mentorList[i];
      }
    }
    return 'name not found';
  }

  ngOnInit() {
    this.groupService.getAll().subscribe(data => {
      this.groups = data;
    });
    this.userService.getMentors().subscribe(data => {
      this.mentorList = data;
    });
  }

  getClassesAndSubjects() {
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

  delete(id) {
    this.classService.delete(id).subscribe(res =>
      this.getClassesAndSubjects(), err => console.log(err));
  }

  getSubjectById(id) {
    for (let i = 0; i < this.subjects.length; i++) {
      if (id === this.subjects[i].id) {
        return this.subjects[i];
      }
    }
    return 'name not found';
  }

  isInvalid() {
    if (!this.selectedGroup) {
      return true;
    } else {
      return false;
    }
  }

  createClass() {
    this.newClass.groupId = this.selectedGroup.id;
    this.newClass.mentorIds.push(this.selectedMentor.id);
    this.newClass.subjectId = this.selectedSubject.id;
    this.classService.newClass(this.newClass)
      .subscribe(res => this.getClassesAndSubjects(), err => console.log(err));
      this.newClass = {
        id: null,
        comment: '',
        endDate: null,
        startDate: null,
        groupId: null,
        subjectId: null,
        mentorIds: []
      };
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
