import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  closeResult: string;
  groupId: String;
  groupName: String;
  users: User[];
  usersWithoutGroup: User[];
  newUser = {};
  updateUserList = [];

  constructor(private userService: UserService, private groupService: GroupService, private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.groupId = route.snapshot['_routerState'].url.split('/')[2];
  }

  ngOnInit() {
    this.userService.getUsersFromGroup(this.groupId).subscribe(res => this.users = res, err => console.log(err));
    this.userService.getUsersWithoutGroup().subscribe(res => this.usersWithoutGroup = res, err => console.log(err));
    this.groupService.getOne(this.groupId).subscribe(group => this.groupName = group.name, err => console.log(err));
  }

  removeFromGroup(user) {
    this.userService.removeFromGroup(user)
      .subscribe(res => this.ngOnInit(), err => console.log(err));
  }

  addUsers() {
    this.updateUserList.forEach(user => {
      user.groupId = this.groupId;
    });
    this.userService.addUsers(this.updateUserList)
      .subscribe(res => this.ngOnInit(), err => console.log(err));
  }

  inviteUser() {
    this.userService.inviteNewUser(this.newUser, this.groupId)
      .subscribe(res => this.ngOnInit(), err => console.log(err));
  }

  addNew(user) {
    this.modalService.open(user, { centered: true }).result.then((result) => {
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
