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
  @Input() events;
  editForm: FormGroup;

  constructor(public crudService: CrudService) {}

  ngOnInit(): void {}
}
