import { Component, OnInit } from '@angular/core';
import { GroupService } from './../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  newGroup = "";
  groupToRemove = "";
  createGroup = false;
  removeGroup = false;
  admin = false;
  loggedIn = false;
  

  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    if (sessionStorage.getItem('Authenticated_user') == null) {
      return this.router.navigateByUrl('');
    } else {
      this.loggedIn = true;
    }
    if (this.user.ofGroupAdminRole == true)
    {
      this.admin = !this.admin;
    }
  }

  showCreateGroup() {
    this.createGroup = !this.createGroup;
    if (this.removeGroup == true) {
      this.removeGroup = false;
    }
  }
  showRemoveGroup() {
    this.removeGroup = !this.removeGroup;
    if(this.createGroup == true) {
      this.createGroup = false;
    }
  }

  selectGroup(group) {
    sessionStorage.setItem('Group', group);
  }

  create(){
    this.user.adminGroupList.push(this.newGroup);
    this.user.groupList.push(this.newGroup);
    this.newGroup = "";

    let data = JSON.stringify(this.user);

    this.groupService.createGroup(data).subscribe((response) => {
      console.log('response: ', response);
      sessionStorage.setItem('Authenticated_user', data);
    }, (error) => {
        console.log('error: ', error);
    });
    }

    remove() {
      let post = {
        group: this.groupToRemove,
        user: this.user.username
      };

      this.groupService.removeGroup(JSON.stringify(post)).subscribe((response) => {
        console.log('response: ', response);
        sessionStorage.setItem('Authenticated_user', JSON.stringify(response));
        this.user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
      }, (error) => {
        console.log('error: ', error);
      });
    }

}
