import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStatsPageComponent } from './dynamic-stats-page.component';

describe('DynamicStatsPageComponent', () => {
  let component: DynamicStatsPageComponent;
  let fixture: ComponentFixture<DynamicStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicStatsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
