import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { DataService } from 'src/app/services/data.service';
import { DataChangeService } from 'src/app/services/data-change.service';
import { StubDataService } from 'src/app/services/data.service.stub';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { users } from 'src/app/services/users.mock';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let de: DebugElement
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ 
        HttpClientTestingModule, 
        RouterModule.forRoot([]) 
      ],
      providers: [
        { provide: DataService, useClass: StubDataService }, 
          DataChangeService 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('users list should be set correctly', () => {
    expect(component.users.length).toEqual(2);
    for(let i = 0; i < users.length; ++i) {
      expect(component.users[i].name).toEqual(users[i].name);
      expect(component.users[i].id).toEqual(users[i].id);
    }
  })

  it('should render the template', () => {
    expect(de.queryAll(By.css('tbody tr')).length).toEqual(users.length);
    const items = fixture.debugElement.queryAll(By.css('tbody tr'));
    for(let i = 0; i < items.length; ++i) {
      expect(items[i].properties['innerHTML']).toContain(users[i].id);
      expect(items[i].properties['innerHTML']).toContain(users[i].name);
      expect(items[i].properties['innerHTML']).toContain('view');
    }
  })

});
