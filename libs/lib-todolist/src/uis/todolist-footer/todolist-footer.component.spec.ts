import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodolistFooterComponent } from './todolist-footer.component';
import { CoreButtonComponent } from 'core-ui-kit'; // Ensure this matches the alias in tsconfig

describe('TodolistFooterComponent', () => {
  let component: TodolistFooterComponent;
  let fixture: ComponentFixture<TodolistFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistFooterComponent, CoreButtonComponent], // Ensure CoreButtonComponent is included
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistFooterComponent);
    component = fixture.componentInstance;

    // Use setInput to set the value of showCompletedArea
    fixture.componentRef.setInput('showCompletedArea', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
