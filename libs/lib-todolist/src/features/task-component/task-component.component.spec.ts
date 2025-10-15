import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEntity } from 'todolist-store';
import { TodolistSignalStore } from '../../stores';
import { TaskComponentComponent } from './task-component.component';
import { CoreButtonComponent, CoreCheckboxComponent} from 'core-ui-kit';

describe('TaskComponent', () => {
  let component: TaskComponentComponent;
  let fixture: ComponentFixture<TaskComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoreButtonComponent, CoreCheckboxComponent],
      providers: [TodolistSignalStore],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create and display the task name', () => {
    // Arrange: Create a mock TaskEntity
    const mockTask: TaskEntity = {
      id: '1',
      name: 'Test Task',
      completed: false,
      ts: new Date().toISOString()
    };

    // Act: Set the required input before initial change detection
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges(); // Trigger change detection

    // Assert: Verify the component is created
    expect(component).toBeTruthy();

    // Assert: Check if the task name is rendered correctly
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Task');
  });
});
