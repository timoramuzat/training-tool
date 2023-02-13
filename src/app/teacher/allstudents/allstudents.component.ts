import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-seestudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.css']
})
export class AllstudentsComponent implements OnInit {
  msg: any = [];
  public users: any[];
  avail: boolean;
  empty: boolean;
  public loading: any = true;
  constructor(private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.empty = false;
    this.getdata();
  }

  getdata() {
    this.teacherService.seestudent()
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


}
