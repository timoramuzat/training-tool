import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-playquiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  username = localStorage.getItem('userid');
  quizid: any;


  quizname: any;
  allQuestions: any;
  public loading: any = true;
  solutionArray: any[] = [];
  currentAnswer: any[] = [];
  answerKeys: any[] = [];
  time: number = 600;
  minutes: string = "10";
  seconds: string = "00";

  interval: any;
  temp: any;
  score: any = 0;
  flageLast: any = false;
  totalQuestion: any;
  questionCounter: any = 0;
  answerCorrect: number[] = [];
  progress: string = "0";
  questionAnswered: any[] = [];
  totalScore: number[] = [];
  finishflag: any = false;
  finalsubmit: boolean = false;
  currentQuestion: any;
  load: any;
  empty: boolean;

  myurl: any
  private users: any;
  constructor(private studentService: StudentService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.toggleFullScreen(document.body)
    this.load = true
    if (this.studentService.getQuizId() == undefined) {
      this.router.navigate(['/student/home']);
    }
    else {
      this.quizid = this.studentService.getQuizId();
      this.quizname = this.studentService.getQuizName();
      this.getAllQuestions(this.quizid)
      this.myurl = this.router.url;
      this.loading = true;
      this.empty = false;
    }
  }

  getdata() {
    this.studentService.getUser()
      .subscribe(
        data => {
          if (data['user']) {
            this.users = data['user']
            this.loading = false
            if (!this.users.length) { this.empty = true }
            else { this.empty = false }
          }
        },
        error => { this.router.navigate(['/error']) }
      )
  }

  getAllQuestions(quizid) {
    this.studentService.getAllQuestion(quizid)
      .subscribe(
        data => {
          if (data['msg']) {
            this.load = false
            this.allQuestions = data['msg']
            this.createAns();
            this.shuffleQuestion();
            this.totalQuestion = this.allQuestions.length;
            this.currentQuestion = this.allQuestions[0];
            this.countdown();
          }
        },
        error => { this.router.navigate(['/error']) }
      )
  }

  shuffleQuestion() {
    var m = this.allQuestions.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.allQuestions[m];
      this.allQuestions[m] = this.allQuestions[i];
      this.allQuestions[i] = t;
    }
    this.shuffleOption();
  }

  shuffleOption() {
    for (let i = 0; i < this.allQuestions.length; i++) {
      var x = this.allQuestions[i].options;
      var m = 4, t, j;
      while (m) {
        j = Math.floor(Math.random() * m--);
        t = x[m];
        x[m] = x[j];
        x[j] = t;
      }
    }
  }

  createAns() {
    for (let index = 0; index < this.allQuestions.length; index++) {
      const id = this.allQuestions[index].questionId;
      const ans = this.allQuestions[index].answer;
      this.answerKeys.push({ qid: id, ans: ans });
    }
  }

  private countdown() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        if (this.seconds == "00") {
            this.minutes = (parseInt(this.minutes) - 1).toString();
        }
        if (this.seconds == "00") { this.seconds = "59"}
        else {
          var seconds = (parseInt(this.seconds) - 1);
          if (seconds < 10) {
            this.seconds = "0" + seconds.toString();
          }
          else {
            this.seconds = seconds.toString();
          }
        }
        this.time--;
      }
      if (this.time == 0) {
          clearInterval(this.interval);
          this.finalsubmit = true;
      }
    }, 1000);
  }

  previousQuestion() {
    this.questionCounter--;
    this.currentQuestion = this.allQuestions[this.questionCounter];
  }

  nextQuestion() {
    this.questionCounter++;
    this.currentQuestion = this.allQuestions[this.questionCounter];
  }

  navigatehome() { this.router.navigate(['/student/home']) }

  answer(qid, ans) {
    if (!this.questionAnswered.includes(qid)) {
        this.questionAnswered.push(qid);
        this.progress = ((this.questionAnswered.length / this.totalQuestion) * 100).toString();
    }
    this.temp = this.currentAnswer.pop()
    if (this.temp) {
      if (this.temp.qid != qid) { this.currentAnswer.push(this.temp); }
    }
    this.currentAnswer.push({ qid: qid, ans: ans });
  }

  getScore() {
    for (let i = 0; i < this.currentAnswer.length; i++) {
      for (let j = 0; j < this.answerKeys.length; j++) {
        if (this.currentAnswer[i].qid == this.answerKeys[j].qid) {
          if (this.currentAnswer[i].ans == this.answerKeys[j].ans) {
            this.score++;
            this.answerCorrect.push(i);
          }
        }
      }
    }
  }

  submitQuiz() {
    this.getScore();
    this.totalScore.push(this.score);
    this.finalsubmit = true;
    clearInterval(this.interval);
  }

}

