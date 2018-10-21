import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { DataService } from "../data.service";
import { PaginationService } from "../pagination.service"

@Component({
  selector: 'app-watch-item',
  templateUrl: './watch-item.component.html',
  styleUrls: ['./watch-item.component.less']
})
export class WatchItemComponent implements OnInit, OnDestroy {
  public selectOption: string = 'popular';
  constructor(private _dataService: DataService, private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.getItemsData();
  }

  ngOnDestroy() {
  }

  private getItemsData() {
    this._dataService.getData().subscribe((data: Array<object>) => {
      this.allItems = [...data];
      this.setPage(1);
    })
  }
  public allItems: any[];
  pager: any = {};
  pagedItems: any[];



  private setPage(page: number) {
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
