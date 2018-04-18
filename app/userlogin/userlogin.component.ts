import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
email:any;
password:any;
name:any;
bloodgroup:any;
userdata:any;
loginuserpage=true;
  constructor(private afs: AngularFirestore, private router: Router, public auth: AuthService) { }

  ngOnInit() {
  }


  loginUser(){
    this.auth.loginUserWithEmail(this.email,this.password)
  }

  createUser() {
    this.userdata = {
      "name":this.name,
    }
    this.auth.createUserWithEmail(this.email, this.password,this.userdata);
  }
userLogout(){
  this.auth.signOut();
}
  changeLoginPage(){
    if(this.loginuserpage==false){
      this.loginuserpage=true;
    }
    else{
      this.loginuserpage=false;
    }
  }
}
