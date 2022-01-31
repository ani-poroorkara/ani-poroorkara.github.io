import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  
  myData : any = [];

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get('../assets/data/contact.json').subscribe(
      data => {
        this.myData = data;
      }
    )
  }

}
