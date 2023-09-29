import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: any;
  currentUsername: any = null;
  userAutherization: any = null;
  LoginForm!: FormGroup;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();

    this.LoginForm = new FormGroup(
      {
        'Username': new FormControl(''),
        'Password': new FormControl('' , Validators.required),
      }
    )

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
    this.router.navigate(['todos']);
  }
}

