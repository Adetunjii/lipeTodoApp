import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { CrudService } from '../shared/crud.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  //recieve events from app component
  @Input() events;

  constructor(public crudService: CrudService) {}

  ngOnInit(): void {}

  //remove item from todo List
  removeTodoItem(id: string) {
    this.crudService.deleteTodoItem(id);
  }

  //update todo list item
  updateTodoItem(id: string) {
    this.crudService.updateTodoList(id);
  }
}
