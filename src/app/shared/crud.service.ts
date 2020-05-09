import { Injectable, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITodo } from './ITodo.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CrudService implements OnInit {
  todoCollection;

  constructor(public afs: AngularFirestore) {}

  getTodoList() {
    return this.afs.collection('todo').snapshotChanges();
  }

  updateTodoList(id: string) {
    this.afs.collection('todo').doc(id).update({ status: true });
  }

  //create a new Todo List item
  createTodoItem(todoItem: ITodo) {
    this.afs.collection('todo').add({
      name: todoItem.name,
      date: todoItem.date,
      status: todoItem.status,
      description: todoItem.description,
      completionDate: todoItem.completionDate,
    });
  }

  deleteTodoItem(id) {
    return this.afs.collection('todo').doc(id).delete();
  }

  ngOnInit(): void {}
}
