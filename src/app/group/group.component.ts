import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { GroupService } from './../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user = JSON.parse(sessionStorage.getItem('Authenticated_user'));
  group = sessionStorage.getItem('Group');
  channelList = [];
  newChannel = "";
  createChannel = false;
  createUser = false;
  admin = false;

  constructor(private authService: AuthService, private groupService: GroupService) { }

  ngOnInit() {
    if (this.user.ofGroupAdminRole == true) {
      this.admin = !this.admin;
    }
    let data = JSON.stringify({ group: this.group});

    this.groupService.getChannels(data).subscribe((res) => {
      this.channelList = [];
      console.log(res);
      this.channelList = res.channels;
    });
  }

  showCreateChannel() {
    this.createChannel = !this.createChannel;
    if(this.createUser == true) {
      this.createUser = false;
    }
  }

  showCreateUser() {
    this.createUser = !this.createUser;
    if (this.createChannel == true) {
      this.createChannel = false;
    }
  }

  addUser() {

  }

  create() {
    this.channelList.push(this.newChannel);
    this.newChannel = "";
    let groupObj = {
      group: this.group,
      channels: this.channelList
    };

    let data = JSON.stringify(groupObj);

    this.authService.createChannel(data).subscribe((response) => {
      console.log('response: ', response);

    }, (error) => {
      console.log('error: ', error);
    });
  }
}
