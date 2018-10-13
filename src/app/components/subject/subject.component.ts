import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  newSubject = {};
  subjects: Subject[] = [{
    id: 1,
    title: 'Java',
    color: '#00bfb2'
  }];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(res => this.subjects = res, err => console.log(err));
  }

  addSubject() {
    this.subjectService.addNewSubject(this.newSubject)
      .subscribe(res => console.log('success'), err => console.log(err));
  }

  delete(id) {
    this.subjectService.delete(id)
      .subscribe(res => console.log('success'), err => console.log(err));
  }

}
