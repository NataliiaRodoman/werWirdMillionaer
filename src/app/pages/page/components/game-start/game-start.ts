import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-game-start',
  styleUrl: './game-start.scss',
  templateUrl: './game-start.html',
})

export class GameStart {
  istGestartet = input<boolean>(false);
  istGewonnen = input<boolean>(false);
  feedback = input<string | null>(null);
  startGeklickt = output<void>();
  naechsterSchrittGeklickt = output<void>();
}
