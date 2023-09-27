import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: any;
  currentUsername: any = null;
  userAutherization: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get('http://localhost:4000/users')
      .subscribe(response => {
        this.users = response;
      }, error => {
        console.error('Error fetching data:', error);
      });
  }

  signIn(username: string): void {
    this.currentUsername = username;
  }
  sendPasswordAndLogIn(password: string): void {
    this.userAutherization = 'Basic ' + btoa(this.currentUsername + ':' + password);
    localStorage.setItem('userAutherization', this.userAutherization);
    window.location.href = "/todos"
  }
}

