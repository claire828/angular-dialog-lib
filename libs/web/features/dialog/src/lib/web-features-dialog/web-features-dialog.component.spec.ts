import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEvent } from '../models';
import { DIALOG_DEFAULT_PROVIDER } from '../providers';
import { DecorateOverlayRef } from '../utils';
import { WebFeaturesDialogComponent } from './web-features-dialog.component';

describe('WebFeaturesDialogComponent', () => {
  let component: WebFeaturesDialogComponent;
  let fixture: ComponentFixture<WebFeaturesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeaturesDialogComponent],
      providers: [
        {
          provide: DecorateOverlayRef, useValue: {}
        },
        {
          provide: DIALOG_DEFAULT_PROVIDER, useValue: {
            name: 'test-dialog',
            title: 'Test Dialog Title',
            content: 'Test Dialog Content',
            btns: [{ type: DialogEvent.Enter, displayName: 'Enter' }, { type: DialogEvent.Cancel, displayName: 'Close' }],
            overlayConfig: {
              hasBackdrop: true,
              backdropClass: ['bg-gray-500/30'],
              panelClass: [],
            }
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WebFeaturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
