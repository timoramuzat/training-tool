import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = process.env.BACKEND_URL;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  registerStudent(body: any)
  { return this.http.post(process.env.BACKEND_URL+'/registerstudent', body,
      { observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }
  registerTeacher(body: any) {
    return this.http.post(process.env.BACKEND_URL+'/registerteacher', body,
        {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
       return this.http.post(process.env.BACKEND_URL+'/login', body,
          {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }




  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }


  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('student');
    localStorage.removeItem('teacher');
    this.router.navigate(['/'])
  }

  check() {
    return this.http.get(this.baseUri + "/check", { headers: this.headers });
  }
}
