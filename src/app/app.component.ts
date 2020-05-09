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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LIPE-to-do-App';

  events = [];
  newTodoItem: ITodo;

  isEmpty() {
    if (this.events.length == 0) return true;
  }

  //modal form data
  eventName = new FormControl('', Validators.required);
  eventDate = new FormControl('', Validators.required);
  eventDescription = new FormControl('', Validators.required);
  eventForm: FormGroup;

  //filters
  sortByName() {
    return this.events.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  sortByCompletionDate() {
    return this.events.sort((a, b) =>
      a.completionDate > b.completionDate ? 1 : -1
    );
  }

  sortByDateCreated() {
    return this.events.sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  public constructor(
    public crudService: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  //subscribe to the observable returned from the service
  getTodoList() {
    this.crudService.getTodoList().subscribe(
      (todoListItem) =>
        (this.events = todoListItem.map((e) => {
          const data = e.payload.doc.data() as ITodo;
          const id = e.payload.doc.id;
          return { id, ...data };
        }))
    );
  }

  //create a new item
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

  ngOnInit(): void {
    this.getTodoList();

    this.eventForm = new FormGroup({
      eventName: this.eventName,
      eventDate: this.eventDate,
      eventDescription: this.eventDescription,
    });
  }
}
