import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public avail: boolean = false;
  private quizid: any;

  private quizname: any;

  private userid: any;
  public msg: string = "";
  private baseUri: string = process.env.BACKEND_URL+'/student';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  getAllQuiz() {
    return this.http.get(this.baseUri + "quiz", { headers: this.headers });
  }

  getUsername() {
    return this.userid;
  }

  setQuizId(id) {
    this.quizid = id;
  }

  setQuizName(quizname) {
    this.quizname = quizname;
  }

  getUser() {
    return this.userid;
  }

  getQuizId() {
    return this.quizid;
  }

  getQuizName() {
    return this.quizname;
  }


  getAllQuestion(id) {
    return this.http.get(this.baseUri + "getallquestion/" + id, { headers: this.headers });
  }


}
