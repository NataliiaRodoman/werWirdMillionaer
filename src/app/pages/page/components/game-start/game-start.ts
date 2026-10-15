import { Component, EventEmitter, Input, input, Output } from '@angular/core';

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
  actuelleSchwierigkeit = input<number>(1);

  @Output() startGeklickt = new EventEmitter<void>();
  @Output() naechsterSchrittGeklickt = new EventEmitter<void>();
  @Output() schwierigkeitGeaendert = new EventEmitter<number>();
}
