import {Component, OnChanges, OnInit, Output, EventEmitter, Input} from '@angular/core';
import SELECTED_VALUES from "./SELECTED-VALUES"

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.less']
})
export class SortingComponent implements OnInit {
  private options;

  constructor() {
    this.options = SELECTED_VALUES;

  }
  @Input() select: string;
  @Output() selectChange: EventEmitter<string> = new EventEmitter<string>();
  onSelectChange(model) {
    this.select = model;
    this.selectChange.emit(model);
  }

  ngOnInit() {
  }
}

