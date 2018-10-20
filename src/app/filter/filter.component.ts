import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import * as _ from 'lodash';

interface filterData {
  price: {
    label: string,
    from: number,
    to: number
  }
  manufacturer: {
    label: string,
    value: [string]
  };
  os: {
    label: string,
    value: [string]
  };
  screenType: {
    label: string,
    value: [string]
  };
  ramSize: {
    label: string,
    value: [string]
  };
  romSize: {
    label: string,
    value: [string]
  };
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  private filtersData;
  public state: boolean;
  constructor(private _dataService: DataService) {
    this.state = true
  }

  ngOnInit() {
    this.getFiltersData()
  }
  private getFiltersData(): void {
    this._dataService.getData().subscribe((data) => {
      this.filtersData = data;
      console.log(data)
    })
  }



}
