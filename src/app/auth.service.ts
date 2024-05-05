import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(name: string, username: string, email: string, dob: string, password: string) {
    return this.http.post<any>('http://localhost:3000/register', { name, username, email, dob, password });
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { username, password });
  }
}
