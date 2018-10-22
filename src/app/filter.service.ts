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
    let result = [];
    let results = [];
    let filterValues = [];
    let finalyObj = [];
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
        _.forEach(filterValues, filterObj => {
          if(filterObj.checked && filterValues[0].label === label) {
            result.push(...this.getUniq(values, filterObj.value, result));
            middlewareData = _.cloneDeep(result);
          } else if(filterObj.checked) {
              if(this.getUniq(middlewareData, data, results) && this.getUniq(middlewareData, data, results).length ===0) {
                results.push(...result);
              } else {
                results.push(...this.getUniq(middlewareData, data, results))
              }
          } if(!filterObj.checked) {
            let objectToDelete = _.filter(middlewareData, (o) => {
              return _.includes(o, filterObj.value)

            });
            _.forEach(objectToDelete, deleteIt => {
              let indexes = _.findIndex(results, deleteIt);
              results.splice(indexes, 1);
              finalyObj = _.uniqBy(_.concat(result, results), 'id')

            });
          }
      });
        results.length === 0 ? this.filterSubject$.next(result) : this.filterSubject$.next(results);
      })
    }
  }
  private getUniq(array, filter, iterableArr) {
    let filteredVal =_.filter(array, (o) => {
      return _.includes(o, filter)
    });
    if(_.findIndex(iterableArr, ...filteredVal) === -1) {
      return filteredVal;
    }
  }

}
