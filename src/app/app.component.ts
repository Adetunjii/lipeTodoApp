import { Component, OnInit } from '@angular/core';
import { CrudService } from './shared/crud.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITodo } from './shared/ITodo.model';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LIPE-to-do-App';
  events: ITodo[];

  eventForm: FormGroup;

  public constructor(public crudService: CrudService, private router: Router) {}

  get eventName() {
    return this.eventForm.get('eventName');
  }

  get eventDescription() {
    return this.eventForm.get('eventDescription');
  }

  getTodoList() {
    this.crudService.getEvents().subscribe(
      (todoListItem) =>
        (this.events = todoListItem.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as ITodo;
        }))
    );
  }

  ngOnInit() {
    //return todo list from the service;
    this.getTodoList();
    console.log(this.getTodoList());

    console.log(new Date());
    console.log(this.events);
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      eventDescription: new FormControl('', Validators.required),
    });
  }
}
