import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  // template: '<div> hello World </div>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SSW Firebootcamp';

  myDate = new Date();

  // textChanged(event: any){
  //   var newValue = event.target.value;

  //   this.title = newValue;
  // }
}
