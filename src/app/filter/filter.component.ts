import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import * as _ from 'lodash';
import FILTER_FIELDS from './FILTER-FIELDS'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  private filterData: Array<any> = [];
  public state: boolean;

  constructor(private _dataService: DataService) {
    this.state = true
  }

  ngOnInit() {
    this.getFiltersData()
  }

  private getFiltersData(): void {
    this._dataService.getData().subscribe((data: Array<object>) => {
      this.setFilterData(data);
    })
  }
  private setFilterData(data): void {
    _.forEach(data, value => {
      for (let key in value) {
        if (key !== 'price' && FILTER_FIELDS.hasOwnProperty(key)) {
          let sortable = _.findIndex(this.filterData, (o) => {
            return o.label === FILTER_FIELDS[key]
          });
          if(sortable !== -1) {
            if (this.filterData[sortable].hasOwnProperty('value')) {
              this.filterData[sortable].value.push(value[key]);
            } else {
              _.set(this.filterData[sortable],'value',[]);
              this.filterData[sortable].value.push(value[key]);
            }
          } else {
            this.filterData.push({
              label: FILTER_FIELDS[key]
            })
          }
        }
      }
    });
  }



}
