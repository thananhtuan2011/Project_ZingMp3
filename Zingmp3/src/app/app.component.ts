import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myAge: number = 20;
  myStatus: boolean = true;

}

// logic, view, stylesheet
// .ts, .html, .scss


// function Component(){
//   return JSX
// }
// <Component />