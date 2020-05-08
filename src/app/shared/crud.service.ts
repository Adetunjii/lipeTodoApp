import { Injectable, OnInit } from '@angular/core';
import { ITodo } from './ITodo.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService implements OnInit {
  todoCollection;

  constructor(public afs: AngularFirestore) {}

  getEvents() {
    return this.afs.collection('todo').snapshotChanges();
  }

  ngOnInit(): void {}
}
