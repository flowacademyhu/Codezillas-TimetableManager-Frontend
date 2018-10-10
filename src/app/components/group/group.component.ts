import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: Group[] = [{
    id: 1,
    name: 'Alfa',
    location: '#00bfb2'
  }, {
    id: 2,
    name: 'Béta',
    location: '#088078'
  }, {
    id: 3,
    name: 'Gamma',
    location: '#00bfb2'
  }, {
    id: 4,
    name: 'Delta',
    location: '#088078'
  }
  ];
  constructor(private groupService: GroupService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.groupService.getAll().subscribe(data => {
      this.groups = data;
    });
  }

  goToGroup(groupId, groupName) {
    this.userService.getAll(groupId, groupName).subscribe(res =>
      this.router.navigate(['groups/:id/:name']), err => console.log(err));
  }

  addGroup() {

  }

}
