import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interface/message.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: any= {};
  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) { 

                this.auth.authState.subscribe( user=>{
                  console.log('User state:', user);
                  if(!user){
                    return
                  }
                  this.user.name = user.displayName;
                  this.user.uid = user.uid;
                } )
               }

  login(provider:string) {
    if(provider==='Google'){
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }else{
    this.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
  }
  logout() {
    this.auth.signOut();
    this.user = {};
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        console.log(messages);
        this.chats = [];
        for (let message of messages) {
          this.chats.unshift(message);
        }
        return this.chats;
        // this.chats = messages;

      }))
  }

  addMessage(text: string) {
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }
    return this.itemsCollection.add(message);
  }
}
