import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/subject.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  ids = [];
  mentorList = [];
  newSubject = {
    title: '',
    color: '',
    userIds: []
  };
  subjects: Subject[];
  mentors: User[];

  constructor(private subjectService: SubjectService, private userService: UserService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(res => this.subjects = res, err => console.log(err));
    this.userService.getMentors().subscribe(res => this.mentors = res, err => console.log(err));
  }

  addSubject() {
    this.mentorList.forEach(mentor => {
      this.ids.push(mentor.id);
    });
    this.newSubject.userIds = this.ids;
    this.subjectService.addNewSubject(this.newSubject)
      .subscribe(res => console.log('success'), err => console.log(err));
  }

  delete(id) {
    this.subjectService.delete(id)
      .subscribe(res => console.log('success'), err => console.log(err));
  }

}
