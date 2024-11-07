import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.username && this.form.password && this.form.firstName && this.form.lastName) {
      this.http.post("https://localhost:7110/api/Login/register", this.form, { responseType: 'text' }).subscribe(data => {
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration error', error);
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
