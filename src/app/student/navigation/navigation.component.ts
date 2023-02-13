import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-studentmenu',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class StudentnavComponent implements OnInit {

   username = localStorage.getItem('userid');

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  logoutuser() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }


}
