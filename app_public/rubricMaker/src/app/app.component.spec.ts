import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
//import { AppComponent } from './app.component';
import { HomeListComponent} from "./home-list/home-list.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HomeListComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rubricMaker'`, () => {
    const fixture = TestBed.createComponent(HomeListComponent);
    const app = fixture.componentInstance;
    //expect(app.title).toEqual('rubricMaker');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('rubricMaker app is running!');
  });
});
