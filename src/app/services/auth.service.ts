import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../intefaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/check-email-exists`;
    return this.http.post<boolean>(url, { email });
  }
}
