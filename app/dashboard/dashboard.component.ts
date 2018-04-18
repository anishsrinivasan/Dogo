import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Component, OnInit,ElementRef, NgZone, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { DocumentRef } from '@agm/core/utils/browser-globals';

import {MatSnackBar} from '@angular/material';
let a;
declare var $: any;
let postId:any;
let postRef:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
     
  pos:any;
  lat: any;
  lng: any;
  bloodneedlistCol:any;
  bloodneedlist:any;
  patientname:any;
  patientbloodgroup:any;
  patientcontactnumber:any;
  patientlocation:any;


  constructor( private snackbar:MatSnackBar,
    private ngZone: NgZone,
    private afs: AngularFirestore, private router: Router, public auth: AuthService,private afAuth: AngularFireAuth) 
  {

  this.getData()
  postRef = this.afs.collection('donationlist');
   }
   
  ngOnInit() {

}


  getData(){
    this.bloodneedlistCol=  this.afs.collection('donationlist',ref => ref.orderBy('timestamp','desc'))
    this.bloodneedlist = this.bloodneedlistCol.snapshotChanges()
    .map(actions => {
      this.snackbar.open('New Donation Update','Dismiss',{
        duration: 500,
      })
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
      console.log(this.bloodneedlist)
  }

 

  setToFalse(docid){
    this.bloodneedlistCol.doc(docid).update({"donorstatus":false})
  }

  delete(docid){
    this.bloodneedlistCol.doc(docid).delete();
  }

  getLocation(){
   var self = this
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.lat = position.coords.latitude;
          self.lng = position.coords.longitude;
          console.log("Got Location")

  })
}
    }

}
