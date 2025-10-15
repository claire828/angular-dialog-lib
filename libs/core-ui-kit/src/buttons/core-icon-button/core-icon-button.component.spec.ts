import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreIconButtonComponent } from './core-icon-button.component';

describe('CoreIconButtonComponent', () => {
  let component: CoreIconButtonComponent;
  let fixture: ComponentFixture<CoreIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreIconButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoreIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toBe('Add Source');
  });

  it('should emit buttonClick when clicked', () => {
    spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    
    button?.click();
    
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should not emit when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    
    button?.click();
    
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should apply correct color classes', () => {
    fixture.componentRef.setInput('color', 'blue');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button?.className).toContain('bg-blue-100');
  });
});
