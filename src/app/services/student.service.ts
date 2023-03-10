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
  private baseUri: string = "https://training-tool-backend-production.up.railway.app/student/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  getAllTrainingQuiz() {
    return this.http.get(this.baseUri + "training", { headers: this.headers });
  }

  getAllTestQuiz() {
    return this.http.get(this.baseUri + "test", { headers: this.headers });
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
