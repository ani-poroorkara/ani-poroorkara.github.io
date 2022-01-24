import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  featuredProjects : any = [];
  projects : any = [];

  constructor( private http : HttpClient) { }

  ngOnInit(): void {
    this.getFeaturedProjects();
    this.getProjects();

  }

  getFeaturedProjects(){
    this.http.get('../assets/data/featured_projects.json').subscribe(
      data => {
        this.featuredProjects = data;
      }
    )
  }

  getProjects(){
    this.http.get('../assets/data/projects.json').subscribe(
      data => {
        this.projects = data;
      }
    )
  }

}
