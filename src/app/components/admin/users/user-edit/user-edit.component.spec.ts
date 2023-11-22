import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { StubDataService } from 'src/app/services/data.service.stub';
import { DataChangeService } from 'src/app/services/data-change.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

fdescribe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let service: StubDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent ],
      imports: [ 
        RouterModule.forRoot([]),
        ReactiveFormsModule,
      ],
      providers: [
        { provide: DataService, useClass: StubDataService },
        DataChangeService,
      ]
    })
    .compileComponents();
    service = new StubDataService();
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(component.user).toBeTruthy();
  });

  it('should set the name', () => {
    const input = fixture.debugElement.query(By.css('#name'))
    input.nativeElement.value = 'Joe';
    input.nativeElement.dispatchEvent(new CustomEvent('input'));
    expect(component.userForm.controls['name'].value).toBe('Joe')
  });

  it('should disable save button', () => {
    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('#save')).nativeElement;
    component.userForm.controls['name'].setValue('');
    fixture.detectChanges();
    expect(saveButton.disabled).toBeTrue();
  });

  it('should enable save button and call updateUser', () => {
    const spy = spyOn(component, 'updateUser');
    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('#save')).nativeElement;
    component.userForm.controls['name'].setValue('Joe');
    fixture.detectChanges();
    expect(saveButton.disabled).toBeFalse();
    saveButton.click();
    expect(spy).toHaveBeenCalled();
  })
});


