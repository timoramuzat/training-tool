import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private quizid: any;
  private delete:any;
  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = "https://training-tool-backend-production.up.railway.app/teacher/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  createQuiz(body: any) {
    return this.http.post(this.baseUri + "createquiz", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getuploadquiz() {
    return this.http.get(this.baseUri + "getuploadquiz", { headers: this.headers });
  }

  getallquiz() {
    return this.http.get(this.baseUri + "getallquiz", { headers: this.headers });
  }

  seestudent() {
    return this.http.get(this.baseUri + "seestudent", { headers: this.headers });
  }




  setQuizId(id) {
    this.quizid = id;
  }

  getQuizId() {
    return this.quizid;
  }

  deletequiz(id) {
    return this.http.delete(this.baseUri + "deletequiz/" + id, { headers: this.headers });
  }

  uploadquiz(body) {
    return this.http.post(this.baseUri + "uploadquiz", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadquiz(body) {
    return this.http.post(this.baseUri + "downloadquiz", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  addQuestion(body) {
    return this.http.post(this.baseUri + "addquestion", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllQuestion(id) {
    return this.http.get(this.baseUri + "getallquestion/" + id, { headers: this.headers });
  }

  deleteQuestion(id) {
    return this.http.delete(this.baseUri + "deletequestion/" + id, { headers: this.headers });
  }

  setDelete(data) {
    this.delete = data;
  }

  getDelete() {
    return this.delete;
  }
}
