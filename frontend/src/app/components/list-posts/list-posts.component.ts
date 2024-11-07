import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent {
  posts?: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7110/api/Post')
      .subscribe({
        next: (data: Post[]) => {
          this.posts = data;
          console.log(this.posts);
        },
      error: (err) => { console.error('Failed to fetch posts', err) }
    })
  }
}
