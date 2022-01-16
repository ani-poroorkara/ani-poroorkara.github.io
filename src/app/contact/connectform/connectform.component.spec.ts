import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectformComponent } from './connectform.component';

describe('ConnectformComponent', () => {
  let component: ConnectformComponent;
  let fixture: ComponentFixture<ConnectformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
