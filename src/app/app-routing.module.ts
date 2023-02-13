import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Student } from './login/student/student.component';
import { Teacher } from './login/teacher/teacher.component';


import { StudentGuard } from './student/student.guard';
import { TeacherGuard } from './teacher/teacher.guard';
import { HomeComponent } from './teacher/home/home.component';
import { CreatequizComponent } from './teacher/createquiz/createquiz.component';
import { UploadquizComponent } from './teacher/uploadquiz/uploadquiz.component';
import { AllstudentsComponent } from './teacher/allstudents/allstudents.component';
import { AddquestionComponent } from './teacher/addquestion/addquestion.component';
import { QuestionsComponent } from './teacher/questions/questions.component';
import { Home } from './student/home/home.component';
import { NotfoundErrorComponent } from './error/404/404.component';
import { ServerComponent } from './error/server/server.component';
import { QuizComponent } from './student/quiz/quiz.component';

const routes: Routes = [
  // root
  { path: '', component: Student }, // Main page
  // login register
  { path: 'teacher', component: Teacher},
  { path: 'student', component: Student },
  { path: 'teacher/home', component: HomeComponent, canActivate: [TeacherGuard] },
  { path: 'teacher/createquiz', component: CreatequizComponent, canActivate: [TeacherGuard] },
  { path: 'teacher/uploadquiz', component: UploadquizComponent, canActivate: [TeacherGuard] },
  { path: 'teacher/allstudents', component: AllstudentsComponent, canActivate: [TeacherGuard] },
  { path: 'teacher/addquestion', component: AddquestionComponent, canActivate: [TeacherGuard] },
  { path: 'teacher/questions', component: QuestionsComponent, canActivate: [TeacherGuard] },
  // student
  { path: 'student/home', component: Home, canActivate: [StudentGuard] },
  { path: 'student/playquiz', component: QuizComponent, canActivate: [StudentGuard]},
  // error
  { path: 'error', component: ServerComponent },
  { path: '**', component: NotfoundErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
