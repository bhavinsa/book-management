import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Input() bookData = { name: '', author: '', uniqueId: 0, publishDate: '', bookCover: '' }

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() { }

  addBook() {
    if (this.bookData.name && this.bookData.author && this.bookData.uniqueId && this.bookData.publishDate && this.bookData.bookCover) {
      this.restApi.addBook(this.bookData).subscribe((data: {}) => {
        this.router.navigate(['/list'])
      })
    } else {
      alert('Please provide all details.');
    }

  }

}
