import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Student } from './student.component';

describe('LoginStudentComponent', () => {
  let component: Student;
  let fixture: ComponentFixture<Student>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Student ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Student);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
