import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  projects : any = [];
  projects_featured : any = [];

  constructor( private http : HttpClient) { }

  ngOnInit(): void {
    this.getProjects();
    this.getFeaturedProjects();
  }
  
  getProjects(){
    this.http.get('../assets/data/projects/projects.json').subscribe(
      data => {
        this.projects = data;
      }
    )
  }
  getFeaturedProjects(){
    this.http.get('../assets/data/projects/projects-featured.json').subscribe(
      data => {
        this.projects_featured = data;
      }
    )
  }

}