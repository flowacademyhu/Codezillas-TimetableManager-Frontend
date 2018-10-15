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
  newUser = {};
  users: User[] = [{
    id: 1,
    name: 'kutya',
    nickname: 'kutyi',
    email: 'kutya@gmail.com',
    password: 'fdsf',
    confirmPassword: 'ffsdf'
  }, {
    id: 2,
    name: 'kacsa',
    nickname: 'Bubó',
    email: 'kacsa@gmail.com',
    password: 'fdsf',
    confirmPassword: 'ffsdf'
  }, {
    id: 3,
    name: 'cica',
    nickname: 'cicuka',
    email: 'cica@gmail.com',
    password: 'fdsf',
    confirmPassword: 'ffsdf'
  }];

  constructor(private userService: UserService, private groupService: GroupService, private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.groupId = route.snapshot['_routerState'].url.split('/')[2];
    // this.groupName = route.snapshot['_routerState'].url.split('/')[3];
  }

  ngOnInit() {
    this.userService.getUsersFromGroup(this.groupId, this.groupName).subscribe(res => this.users = res, err => console.log(err));
    this.groupService.getOne(this.groupId).subscribe(group => this.groupName = group.name, err => console.log(err));
  }

  delete(id) {
    this.userService.delete(id)
      .subscribe(res => console.log('success'), err => console.log(err));
  }

  addUser() {
    this.userService.addNewUser(this.newUser, this.groupId)
      .subscribe(res => console.log('success'), err => console.log(err));
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
