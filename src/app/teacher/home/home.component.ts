import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacherhome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg: any = [];
  empty: boolean;
  avail: boolean;
  public quiz: any[];
  public loading: any = true;
  constructor(private teacherService: TeacherService, private router: Router) { }
  ngOnInit(): void {
    this.loading = true
    this.empty = false;
    this.getdata();
  }



  getdata() {
    this.teacherService.getallquiz()
      .subscribe(
        data => {
          if (data['quiz']) {
            this.quiz = data['quiz']
            this.loading = false;

            if (!this.quiz.length) {
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

  viewQuestion(q) {
    this.teacherService.setQuizId(q._id);
    this.teacherService.setDelete(q.upload)
    this.router.navigate(['/teacher/questions']);
  }

  add(quiz) {
    this.teacherService.setQuizId(quiz._id);
    this.router.navigate(['/teacher/addquestion']);
  }

  upload(quiz) {
    this.teacherService.uploadquiz(quiz._id)
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];

            this.avail = true;
            return;
          }
          if (data['message']) { window.location.reload() }
          else {
            this.msg = "something went wrong!!";
            this.avail = true;
            return;
          }
        },
        error => { this.router.navigate(['/error']); }
      )
  }

  download(quiz) {
    this.teacherService.downloadquiz(quiz._id)
    .subscribe(
      data =>
        {
          if (data['msg']) { this.msg = data['msg']; this.avail = true; return; };
          window.location.reload();
        },
      error => { this.router.navigate(['/error']); }
    )
  }

  delete(quiz) {
    this.teacherService.deletequiz(quiz._id)
      .subscribe(
        data => {

          // console.log(data);
          this.getdata();

        },
        error => {
          this.router.navigate(['/error']);
        }


      );
  }

}
