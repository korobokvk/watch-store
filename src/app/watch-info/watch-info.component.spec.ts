import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchInfoComponent } from './watch-info.component';

describe('WatchInfoComponent', () => {
  let component: WatchInfoComponent;
  let fixture: ComponentFixture<WatchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
