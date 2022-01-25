import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit {

  items : any = [];
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.http.get("../assets/data/timeline.json").subscribe(
      data =>{
        this.items = data;
      }
    )
  }

}
