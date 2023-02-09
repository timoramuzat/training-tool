import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './index/navigation/./navigation.component';
import { HeaderComponent } from './index/header/header.component';
import { Teacher } from './login/teacher/teacher.component';
import { Student } from './login/student/student.component';
import { TeacherGuard } from './teacher/teacher.guard';
import { StudentGuard } from './student/student.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeComponent } from './teacher/home/home.component';
import { TeachernavComponent } from './teacher/navigation/navigation.component';
import { StudentnavComponent } from './student/navigation/navigation.component';
import { Home } from './student/home/home.component';
import { CreatequizComponent } from './teacher/createquiz/createquiz.component';
import { UploadquizComponent } from './teacher/uploadquiz/uploadquiz.component';
import { AllstudentsComponent } from './teacher/allstudents/allstudents.component';
import { AddquestionComponent } from './teacher/addquestion/addquestion.component';
import { QuestionsComponent } from './teacher/questions/questions.component';
import { NotfoundErrorComponent } from './error/404/404.component';
import { ServerComponent } from './error/server/server.component';
import { LoadingComponent } from './loading/loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import { QuizComponent } from './student/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    Teacher,
    Student,
    HomeComponent,
    TeachernavComponent,
    StudentnavComponent,
    Home,
    CreatequizComponent,
    UploadquizComponent,
    AllstudentsComponent,
    AddquestionComponent,
    QuestionsComponent,
    NotfoundErrorComponent,
    ServerComponent,
    LoadingComponent,
    MessagesComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // WebcamModule,
    // RecaptchaMo
    // NgxCaptchaModule,
    BrowserAnimationsModule, // required animations  module
    ToastrModule.forRoot(),
  ],
  providers: [TeacherGuard,StudentGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
