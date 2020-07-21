import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class BookEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  bookData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.restApi.getBook(this.id).subscribe((data: {}) => {
      this.bookData = data;
    })
  }

  // Update employee data
  update() {
    if (window.confirm('Are you sure, you want to update?')) {
      if (this.bookData.name && this.bookData.author && this.bookData.uniqueId && this.bookData.publishDate && this.bookData.bookCover) {
        delete this.bookData["_id"];
        this.restApi.updateBook(this.id, this.bookData).subscribe(data => {
          this.router.navigate(['/list'])
        })
      } else {
        alert('Please provide all details.');
      }
    }
  }

}
