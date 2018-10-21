import { Injectable } from '@angular/core';
import { DataService } from "./data.service"
import FILTER_FIELDS from "./filter/FILTER-FIELDS";
import { Subject } from "rxjs/index";

import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private INVERT_FILTERS = _.invert(FILTER_FIELDS);
  public filterSubject$ = new Subject<any>();
  public filteredData: (data:string, label:string, checked: boolean) => any;
  constructor(private _dataService: DataService) {
    this.filteredData = new this.setFilters();
  }
  public getFiltersParams(data, label, model) {
    this.filteredData(data, label, model)
  }
  private setFilters() {
    let middlewareData = [];
    let filterValues = [];
    return function(data, label, model) {
      let findStateIndex = _.findIndex(filterValues, (o) => {
        return _.includes(o, data)
      });
      if(findStateIndex !== -1) {
        filterValues[findStateIndex].checked = model.checked
      } else {
        filterValues.push({
          label: label,
          value: model.value,
          checked: model.checked
        });
      }

      this._dataService.getData().subscribe(values => {
        let result = [];
        middlewareData = _.cloneDeep(values);
        console.log(this)
        _.forEach(filterValues, filterObj => {
          if(filterObj.checked && filterValues[0].label === label) {
            result.push(..._.filter(middlewareData, (o) => {
              return _.includes(o, filterObj.value)
            }));
          } else {
            result = _.filter(result, (o) => {
              console.log(o)
              return _.includes(o, filterObj.value)
            });
          }
        })
        // if(middlewareData.length === 0) {
        //   middlewareData = _.cloneDeep(values);
        //   _.forEach(filterValues, filterObj => {
        //     let result;
        //     if(filterObj.checked) {
        //       result = _.filter(middlewareData, (o) => {
        //         return _.includes(o, filterObj.value)
        //       });
        //     }
        //     console.log(result)
        //   })
        //
        //   // middlewareData.push(..._.filter(values, (o) => {
        //   //   return o[this.INVERT_FILTERS[label]].toLowerCase() === data.toLowerCase()
        //   // }));
        // } else {
        //   const result = _.filter(middlewareData, (o) => {
        //     return _.includes(o, data)
        //   })
        //   console.log(result)
        //
        //   // middlewareData.push(..._.filter(middlewareData, (o) => {
        //   //   return o[this.INVERT_FILTERS[label]].toLowerCase() === data.toLowerCase()
        //   // }));
        // }
        // console.log(data)
        // console.log(filterValues)
        // console.log(findStateIndex)
        // if(_.get(filterValues[findStateIndex], 'checked', true)) {
        //   this.filterSubject$.next(middlewareData);
        //   return middlewareData;
        // }
        // else {
        //   this.filterSubject$.next(values);
        //   return values
        // }
      })
    }
  }

}
