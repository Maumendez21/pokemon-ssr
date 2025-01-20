import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector:'navbar',
  standalone:true
})
class NavBarComponentMock {};

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;
  let compiled:HTMLDivElement;

  beforeEach(async () => {


    // ! SUGGESTED
    // TestBed.overrideComponent(AppComponent, {
    //   add: {
    //     imports: [NavBarComponentMock],
    //     schemas:[CUSTOM_ELEMENTS_SCHEMA]
    //   }
    // })

    // ! RECOMENDED
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ]
    })
    .overrideComponent(AppComponent, {
      add: {
        imports: [NavBarComponentMock]
      },
      remove:{
        imports:[NavbarComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled=fixture.nativeElement as HTMLDivElement;

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    expect(compiled.querySelector('navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
