import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {MatSnackBar} from '@angular/material';
declare var $:any;
let userID:any;
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
userdata:any;
name:any;
bloodgroup:any;
email:any;
userid:any;
bloodneedlistCol:any;
totaldonations:any;
bloodneedlistarray:any;
adults_male = 0;
adults_female = 0;
kids_male = 0;
kids_female = 0;
  constructor(public snackBar: MatSnackBar,private afs: AngularFirestore, private router: Router, public auth: AuthService,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userdata = this.afs.doc(`users/${user.uid}`).ref.get().then(doc => {
          this.name = doc.data().name;
          this.email = doc.data().email;
          this.userid = doc.data().uid;
          userID = doc.data().uid;
        }).then(check => {
          this.getRecords()
        })
   }})
  }

  ngOnInit() {
    this.bloodneedlistCol=  this.afs.collection('donationlist')
  }
  userLogout(){
    this.auth.signOut();
  }

getRecords(){
  console.log("Getting Records"+this.userid)
  this.afs.collection('donationlist',ref =>ref.where('uid','==',this.userid)).valueChanges().subscribe((data)=> {
    console.log(data)
    this.bloodneedlistarray = [];
    data.forEach((doc) => {
      this.bloodneedlistarray.push(doc)
      console.log(this.bloodneedlistarray)
    })
  })

}

  submit(){
this.bloodneedlistCol.add({'adults_male':this.adults_male,
'adults_female':this.adults_female,
'kids_male':this.kids_male,
'kids_female':this.kids_female,
'uid':this.userid,
'timestamp':new Date(),
'name':this.name})
this.getRecords();
this.snackBar.open('Thank you for your donation','Dismiss',{
  duration: 1000,
})
  }

}


  

    
