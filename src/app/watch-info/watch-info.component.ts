import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/index"

@Component({
  selector: 'app-watch-info',
  templateUrl: './watch-info.component.html',
  styleUrls: ['./watch-info.component.less']
})
export class WatchInfoComponent implements OnInit {
  private itemParams = Object.create(null);


  private parametersSubscription: Subscription;
  constructor(private route: ActivatedRoute) {
    this.parametersSubscription = route.queryParams.subscribe((queryParam: any) => {
      this.itemParams.image = queryParam['image'];
      this.itemParams.watchName = queryParam['name'];
      this.itemParams.os = queryParam['os'];
      this.itemParams.ram = queryParam['ramSize'];
      this.itemParams.rom = queryParam['romSize'];
      this.itemParams.price = queryParam['price'];
      this.itemParams.screenSize = queryParam['screenSize'];
      this.itemParams.screenType = queryParam['screenType'];
      this.itemParams.description = queryParam['description'];
      console.log(this.itemParams)
    })
  }

  ngOnInit() {
  }

}
