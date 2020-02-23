import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCommandComponent } from './console-command.component';

describe('ConsoleCommandComponent', () => {
  let component: ConsoleCommandComponent;
  let fixture: ComponentFixture<ConsoleCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
