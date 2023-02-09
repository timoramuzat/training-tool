import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class Student implements OnInit {
  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    $(document).ready(function () {

      $("#sign-in-btn").click(function () {
        $(".containerr").addClass("sign-up-mode");

      });

      $("#sign-up-btn").click(function () {
        $(".containerr").removeClass("sign-up-mode");
      });

    });
  }

  onSubmitRegister(f: NgForm) {


    if (f.controls.p1.value != f.controls.p2.value) {
      this.msg = "Password   doesn't match";
      this.avail = true;
      return;
    }

    if (!f.valid) {
      this.msg = "Invalid Form Fields";
      this.avail = true;
      return;
    }

    this.authService.registerStudent(JSON.stringify(f.value))
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }

          if (data['role'] == "student") {

            localStorage.setItem('token', data['token']);
            localStorage.setItem('userid', f.controls.username.value);
            localStorage.setItem('admin', 'no');
            localStorage.setItem('student', 'yes');
            localStorage.setItem('teacher', 'no');
            this.router.navigate(['/student/home']);


          }


          else {
            localStorage.setItem('token', data['token']);
            localStorage.setItem('userid', f.controls.username.value);
            localStorage.setItem('admin', 'no');
            localStorage.setItem('student', 'no');
            localStorage.setItem('teacher', 'yes');
            this.router.navigate(['/teacher/home']);


          }

        },
        error => {      this.router.navigate(['/error']); }
      );
  }

  onSubmitLogin(f: NgForm) {


    if (!f.valid) {
      this.msg = "Invalid Email or Password";
      this.avail = true;
      return;
    }


    this.authService.login(JSON.stringify(f.value))
      .subscribe(
        data => {

          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }

          if (data['role'] == "student") {
              localStorage.setItem('token', data['token']);
              localStorage.setItem('userid', f.controls.username.value);
              localStorage.setItem('admin', 'no');
              localStorage.setItem('student', 'yes');
              localStorage.setItem('teacher', 'no');
              this.router.navigate(['/student/home']);
          }
          else {


              localStorage.setItem('token', data['token']);
              localStorage.setItem('userid', f.controls.username.value);
              localStorage.setItem('admin', 'no');
              localStorage.setItem('teacher', 'yes');
              localStorage.setItem('student', 'no');
              this.router.navigate(['/teacher/home']);
            }



        },
        error => {      this.router.navigate(['/error']); }
      )
  }

  signinup() {
    // console.log("hello1");
    this.msg = "";
    this.avail = false;
  }

}
