import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { FilterService } from "../filter.service";
import * as _ from 'lodash';
import FILTER_FIELDS from './FILTER-FIELDS'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  private filterData: Array<any> = [];
 // private filtersValue: any;
  public state: boolean;

  constructor(private _dataService: DataService, private _filterService: FilterService) {
    this.state = true

  }

  ngOnInit() {
    this._filterService.filterSubject$.subscribe((data) => {
      console.log(data)
    })
    this.getFiltersData()
  }
  private filtersValue(value, label, model) {
    this._filterService.getFiltersParams(value, label, model)
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
              _.includes(this.filterData[sortable].value,value[key]) ? null : this.filterData[sortable].value.push(value[key])
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
