import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  myData : any = [];

  constructor( private http: HttpClient ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get('../assets/data/about.json').subscribe(
      data => {
        this.myData = data;
        // console.log(this.myData);
      }
    )
  }
}