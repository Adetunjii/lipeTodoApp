import { Component, OnInit } from '@angular/core';
import { CrudService } from './shared/crud.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms';
import { ITodo } from './shared/ITodo.model';
import { Subscriber } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LIPE-to-do-App';
  events: ITodo[];

  item: ITodo = {
    name: '',
    date: '',
    status: '',
    completionDate: '',
    description: '',
  };

  eventName = new FormControl('', Validators.required);
  eventDate = new FormControl('', Validators.required);
  eventDescription = new FormControl('', Validators.required);
  eventForm: FormGroup;

  editName: FormControl;
  editDate: FormControl;
  editDescription: FormControl;
  editForm: FormGroup;

  // get eventName() {
  //   return this.eventForm.get('eventName');
  // }

  // get eventDate() {
  //   return this.eventForm.get('eventDate');
  // }

  // get eventDescription() {
  //   return this.eventForm.get('eventDescription');
  // }

  newTodoItem: ITodo;

  public constructor(
    public crudService: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  getTodoList() {
    this.crudService.getTodoList().subscribe(
      (todoListItem) =>
        (this.events = todoListItem.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as ITodo;
        }))
    );
  }

  addTodoItem() {
    const status = true;
    const item = {
      name: this.eventName.value,
      date: this.datePipe.transform(new Date(), 'dd-MM-yyyy').toString(),
      status: !status,
      description: this.eventDescription.value,
      completionDate: this.datePipe
        .transform(this.eventDate.value, 'dd-MM-yyyy')
        .toString(),
    };
    this.crudService.createTodoItem(item);
    this.eventForm.reset();
  }

  // editTodoItem(id) {

  //   this.editForm = new FormGroup({
  //     editName: new FormControl(item.name, Validators.required),
  //     editDate: new FormControl(item.date),
  //   });
  // }

  removeTodoItem(id: string) {
    this.crudService.deleteTodoItem(id);
  }

  updateTodoItem(id: string) {
    this.crudService.updateTodoList(id);
  }

  ngOnInit(): void {
    this.getTodoList();

    this.eventForm = new FormGroup({
      eventName: this.eventName,
      eventDate: this.eventDate,
      eventDescription: this.eventDescription,
    });
  }
}
