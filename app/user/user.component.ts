import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as UserActions from './../actions/user.actions';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  @ViewChild("addForm") addNewUserForm: NgForm;
  newUser: User;
  userToEdit: User;
  userAdded = false;
  private mode = "add";
  users: Observable<Array<User>>;
  myUsers:[User];
  private showUserDetails = false;
  private userId: number;


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<any>
  ) {
    _store.select('users').subscribe(users => {
      this.myUsers = users;
      if(this.myUsers.length > 0){
        this.showUserDetails = true;
      }
    });
   // this.users = store.select(state => state.users);
  }

  ngOnInit() {
    var self = this;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = Number(paramMap.get('userId'));
        this.showUserDetails = true;
       // this.userToEdit = this.getUserToEdit();
        // this.taskService.getTask(this.taskId).subscribe(response => {
        //   this.taskToEdit = response.data;
        // });

      } else {
        this.mode = "add";
        //this.showUserDetails = false;
      }
    });
  }
  // getUserToEdit(){
  //   for(let i=0;  i< this.users.length; i++){
  //     if(this.users[i].empId == this.userId){
  //       return this.users[i];
  //     }
  //   }
  // }
  onSaveUser() {
    if (this.addNewUserForm.invalid) {
      return;
    }

    if (this.mode === "add") {
      this.newUser = new User(
        this.addNewUserForm.value.empId,
        this.addNewUserForm.value.firstName,
        this.addNewUserForm.value.lastName,
        null
      );
        console.log("Users"+ this.users);
      this._store.dispatch(new UserActions.AddUser(this.newUser));
      this.showUserDetails = true;
     

      // this.userService.addTask(this.newUser);
      //this.users.push(this.newUser);
      // if (this.myUsers.length > 0) {
      //   this.showUserDetails = true;
      // } else {
      //   this.showUserDetails = false;
      // }
      //this.myUsers = this.users;
      this.onReset();
    } else {
      this.userToEdit.empId = this.addNewUserForm.value.empId;
      this.userToEdit.firstName = this.addNewUserForm.value.firstName;
      this.userToEdit.lastName = this.addNewUserForm.value.lastName;

      //this.userService.updateTask(this.userToEdit);
    }
    //this.userService.reset();
    // this.userAdded = true;
    //this.router.navigate(['/view_task']);
  }
  sortByFirstName(){
    
    this.myUsers.sort(function(a, b){
      var x =  a.firstName.toLowerCase();
      var y =  b.firstName.toLowerCase();          
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;          
    });
  }
  sortByLastName(){
    
    this.myUsers.sort(function(a, b){
      var x =  a.lastName.toLowerCase();
      var y =  b.lastName.toLowerCase();          
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;          
    });
  }
  sortByEmpId(){
    
    this.myUsers.sort(function(a, b){
      var x =  a.empId;
      var y =  b.empId;          
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;          
    });
  }

  onReset() {
    this.addNewUserForm.reset();
  }
}
