import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = '../assets/watches.json';
  constructor(private _http: HttpClient) {
  }

  public getData() {
    return this._http.get(this.url)
  }
}
