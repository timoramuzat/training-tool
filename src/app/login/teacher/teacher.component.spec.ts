import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teacher } from './teacher.component';

describe('LoginTeacherComponent', () => {
  let component: Teacher;
  let fixture: ComponentFixture<Teacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Teacher ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Teacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
