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
  ansOfOneQuestion: any[] = [];
  ansKey: any[] = [];
  time: any = 20;

  timePerQuestion: any;
  interval: any;
  temp: any;
  score: any = 0;
  flageLast: any = false;
  totalQuestion: any;
  questionCounter: any = 1;
  answerCorrect: number[] = [];

  totalScore: number[] = [];
  finishflag: any = false;
  finalsubmit: boolean = false;
  // submitAvail:any = true;
  oneQuestion: any;
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
            if (!this.users.length) {
              this.empty = true;
            }
            else {
              this.empty = false;
            }
          }
        },
        error => {
          this.router.navigate(['/error']);
        }


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
            this.timePerQuestion = this.time;
            this.totalQuestion = this.allQuestions.length;
            this.oneQuestion = this.allQuestions[0];
            this.countdown();
          }

          // console.log(this.allQuestions);

        },
        error => {
          this.router.navigate(['/error']);
        }


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
      this.ansKey.push({ qid: id, ans: ans });


    }
    // console.log("key");
    // console.log(this.ansKey);
  }
  private countdown() {

    this.interval = setInterval(() => {
      if (this.timePerQuestion > 0) {
        this.timePerQuestion--;
      }
      if (this.timePerQuestion == 0) {
        // reset
        if (this.questionCounter + 1 <= this.totalQuestion) {
          this.oneQuestion = this.allQuestions[this.questionCounter];
          this.questionCounter++;
          if (this.questionCounter == this.totalQuestion) {
            this.flageLast = true;
          }
          this.timePerQuestion = this.time;
          // console.log("reset timer");
        }
        else {
          // this.router.navigate(['/']);
          this.myStopFunction(this.interval);
          // localStorage.removeItem('load');
          // console.log("timeout");
          this.finalsubmit = true;
        }

      }
    }, 1000);

    // console.log("hloo");
  }

  myStopFunction(a) {
    clearInterval(a);
  }

  nextQuestion() {
    if (this.ansOfOneQuestion) {

alert("haha");
    }
    if (this.questionCounter != this.totalQuestion) {
      this.getScore();
      this.questionCounter++;

      if (this.questionCounter == this.totalQuestion) {
        this.flageLast = true;

      }
      this.oneQuestion = this.allQuestions[this.questionCounter - 1];


      this.timePerQuestion = this.time;

    }
    if (this.questionCounter > this.totalQuestion) {
      this.myStopFunction(this.interval);
      this.oneQuestion = this.allQuestions[this.questionCounter - 1];
    }

  }
  navigatehome() {

    this.router.navigate(['/student/home']);
  }

  answer(qid, ans) {
    this.temp = this.ansOfOneQuestion.pop()
    if (this.temp) {
      if (this.temp.qid != qid) {
        this.ansOfOneQuestion.push(this.temp);

      }
    }
    this.ansOfOneQuestion.push({ qid: qid, ans: ans });
  }

  getScore() {
    for (let i = 0; i < this.ansOfOneQuestion.length; i++) {
      for (let j = 0; j < this.ansKey.length; j++) {
        if (this.ansOfOneQuestion[i].qid == this.ansKey[j].qid) {
          if (this.ansOfOneQuestion[i].ans == this.ansKey[j].ans) {
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
    // localStorage.removeItem('load');
    this.myStopFunction(this.interval);
  }




}

