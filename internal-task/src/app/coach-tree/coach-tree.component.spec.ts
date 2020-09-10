import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTreeComponent } from './coach-tree.component';

xdescribe('CoachTreeComponent', () => {
  let component: CoachTreeComponent;
  let fixture: ComponentFixture<CoachTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
