import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { DataService } from 'src/app/services/data.service';
import { StubDataService } from 'src/app/services/data.service.stub';
import { DataChangeService } from 'src/app/services/data-change.service';
import { RouterModule } from '@angular/router';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      providers: [
        { provide: DataService, useClass: StubDataService },
        DataChangeService,
      ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component and set user property', () => {
    expect(component).toBeTruthy();
    expect(component.user).toBeTruthy();
  });

  it('should render the template', () => {
    const items = el.querySelectorAll('tr');
    expect(items[0].textContent).toContain('1');
    expect(items[1].textContent).toContain('Ali')
  })

});
