import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const { username, password } = this.form;

    // Log form values to ensure they are being captured correctly
    console.log('Form Values:', { username, password });

    this.http.post<LoginPostData>("https://localhost:7110/api/Login/login", { UserName: username, Password: password })
      .subscribe(data => {
        console.log('Login response:', data);
        this.tokenStorage.saveToken(data.id_token);
        this.tokenStorage.saveUser(data.id);
        this.router.navigate([this.authService.redirectUrl]);
        window.location.reload();
      }, error => {
        // Log the error response for debugging
        console.error('Login error', error);
        this.errorMessage = 'Invalid username or password';
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
}

export interface LoginPostData {
  id_token: string;
  id: number;
}
