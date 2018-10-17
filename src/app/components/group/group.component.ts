import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { Router } from '../../../../node_modules/@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  closeResult: string;
  newGroup = {};

  groups: Group[];
  constructor(private groupService: GroupService, private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.groupService.getAll().subscribe(data => {
      this.groups = data;
    });
  }

  goToGroup(groupId, groupName) {
    this.router.navigate([`groups/${groupId}/${groupName}`]);
  }

  createGroup() {
    this.groupService.newGroup(this.newGroup)
      .subscribe(res => this.onCreateSuccess(res.id, res.name), err => console.log(err));
  }

  onCreateSuccess(groupId, groupName) {
    this.router.navigate([`groups/${groupId}/${groupName}`]);
  }

  addNew(group) {
    this.modalService.open(group, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(groupId) {
    this.groupService.delete(groupId).subscribe(res => console.log('success'), err => console.log(err));
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
