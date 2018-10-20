import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.less']
})
export class AccordionComponent implements OnInit, OnChanges {
  @Input() state: boolean;
  @Input() name: string;
  private contentState: boolean = false;
  constructor() {

  }
  ngOnChanges() {
    this.contentState = this.state;

  }
  ngOnInit() {
  }
  private toggleContent() {
    this.contentState = !this.contentState;
  }
}
