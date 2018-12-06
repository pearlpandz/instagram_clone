import { Component, OnInit } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { HttpClient } from '@angular/common/http';
import{ExploreService} from './explore.service'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private https :HttpClient, private explore : ExploreService) {  }
  ngOnInit() {
    this.explore.getexplore().map( request => request).subscribe( request => {
      console.log('explore',request['data']);
      })
  }

}
