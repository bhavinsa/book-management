import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  book: any = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadEmployees()
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getBooks().subscribe((data: {}) => {
      this.book = data;
    })
  }

  // Delete employee
  delete(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.delete(id).subscribe(data => {
        this.loadEmployees()
      })
    }
  }

}
