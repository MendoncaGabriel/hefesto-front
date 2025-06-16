import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardLineComponent } from "./card-line/card-line.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardLineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hefesto-front';
}
