import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{
  title = 'Anirudh Poroorkara';
  navbarColor:String = '';
  ngOnInit(): void{
    window.addEventListener('scroll', this.scroll, true)
  }
  scroll = (): void => {

    let scrollHeight;
 
    if(window.innerWidth < 350){
     scrollHeight = 10;
    }else if(window.innerWidth < 500 && window.innerWidth > 350){
     scrollHeight = 20;
    }else if(window.innerWidth < 700 && window.innerWidth > 500){
     scrollHeight = 20;
    }else if(window.innerWidth < 1000 && window.innerWidth > 700){
     scrollHeight = 20;
    }else{ 
      scrollHeight = 20;
    }
 
     if(window.scrollY >= scrollHeight){
       this.navbarColor = "solid-nav";
     }else if(window.scrollY < scrollHeight){
       this.navbarColor = "transparent-nav";
     }
   }
}
