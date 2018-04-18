import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  organization?:string;
  branch?:string;
  brand?:string;
  city?:string;
  country?:string;
  state?:string;
  address?:string;
  name:string;

}
@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }


  public loginUserWithEmail(email,password){
  console.log(email)
  return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
    this.router.navigate(['/userdashboard']);
  })
}

 public createUserWithEmail(email,password,userdata){
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['/userdashboard']);
        return this.updateUserData(user,userdata); // if using firestore
      })
      .catch((error) => { this.handleError(error)
      });
}
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        
      })
  }
  private updateUserData(user,userdata) {
    // Sets user data to firestore on login
    console.log(userdata)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      name:userdata.name,
    }
    console.log(user.uid) 
    console.log("New Agent is Added")
    return userRef.set(data)
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/userlogin']);
    });
  }
      // If error, console log and notify user
      private handleError(error: Error) {
        alert(error);
        console.error(error);
      }
}