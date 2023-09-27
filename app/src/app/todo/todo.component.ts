import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  userTodos: any;
  avatar!: string;
  Name!: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  logOut(): void {
    localStorage.removeItem('userAutherization');
    window.location.href = "/"

  }
  
  fetchTodos(): void {
    let storedValue = localStorage.getItem('userAutherization');
    if (storedValue) {
      const headers = new HttpHeaders({
        'Authorization': storedValue
      });

      this.http.get('http://localhost:4000/todos', { headers: headers })
        .subscribe((response: any) => {
          this.userTodos = response;
          for ( let todo of this.userTodos){
            if(todo.user_id == 1){
              this.avatar = "https://robohash.org/zucker-ping.png";
              this.Name = "Zucker Ping";
            }
            if(todo.user_id == 2){
              this.avatar = "https://robohash.org/felon-must.png";
              this.Name = "Felon Must";
            }
            if(todo.user_id == 3){
              this.avatar = "https://robohash.org/robon-wood.png";
              this.Name = "Robon Wood";
            }
          }
        }, error => {
          console.error('Error fetching data:', error);
          window.location.href = "/"
        });
    } else {
      window.location.href = "/"
    }

  }

  DeleteTask(id: any) {
    let storedValue = localStorage.getItem('userAutherization');
    if (storedValue) {
      const headers = new HttpHeaders({
        'Authorization': storedValue
      });
      this.http.delete(`http://localhost:4000/todos/${id}`, { headers: headers }).subscribe((Response: any) => { this.userTodos = Response })
      location.reload();
    }
  }
  AddTask(task: string) {
    let storedValue = localStorage.getItem('userAutherization');
    if (storedValue) {
      const headers = new HttpHeaders({
        'Authorization': storedValue
      });
      const body = { task: task }
      this.http.post('http://localhost:4000/todos', body, { headers: headers }).subscribe((Response: any) => { this.userTodos = Response });
      location.reload();
    }
  }
  ToggleTask(todoId: any) {
    let storedValue = localStorage.getItem('userAutherization');
    if (storedValue) {
      const headers = new HttpHeaders({
        'Authorization': storedValue
      });
      this.http.put(`http://localhost:4000/todos/${todoId}`, '' ,{headers: headers}).subscribe((Response: any) => { this.userTodos = Response })
      location.reload();
    }
  }
}