import { Component} from '@angular/core';
import { Header } from './components/header/header';
import { Frages } from './fragen';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  
  readonly frages = Frages



}
